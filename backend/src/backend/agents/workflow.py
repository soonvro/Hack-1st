"""Workflow orchestration for the multi-agent system."""

import asyncio
import json

from google.genai import types
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

from .agents import (
    profiler_agent,
    market_analyst_agent,
    item_recommender_agent,
    roadmap_architect_agent,
)
from .schemas import (
    PersonalInfo,
    ProjectInfo,
    Roadmap,
    PersonaProfile,
    MarketAnalysis,
    RecommendedItem,
    FinalReport,
)


APP_NAME = "codyssey"


def _extract_final_response(events) -> dict:
    """Extract the final JSON response from agent events."""
    for event in events:
        if event.is_final_response() and event.content:
            final_answer = event.content.parts[0].text.strip()
            return json.loads(final_answer)
    raise ValueError("No final response found in events")


def _generate_executive_summary(
    persona: PersonaProfile,
    market_list: list[MarketAnalysis],
    items: list[RecommendedItem],
    roadmaps: list[Roadmap],
) -> str:
    """Generate an executive summary from workflow results."""
    top_item = items[0] if items else None
    
    if not top_item:
        return "창업 아이템 분석이 완료되었습니다."
    
    # Use the first market analysis for summary, or aggregate if multiple
    market_info = ""
    if market_list:
        if len(market_list) == 1:
            market = market_list[0]
            market_info = f"""
### 시장 분석 결과
분석 지역: {market.dong}
- {market.demographics}
- 주요 트렌드: {', '.join(market.emerging_trends[:2])}"""
        else:
            dong_names = [m.dong for m in market_list[:3]]
            market_info = f"""
### 시장 분석 결과
분석 지역: {', '.join(dong_names)}{' 외' if len(market_list) > 3 else ''} ({len(market_list)}개 동)
- 총 {len(market_list)}개 동에 대한 상세 시장 분석 완료"""
    
    summary = f"""
## 창업 컨설팅 종합 보고서

### 창업자 프로필
{persona.persona_summary}
- 리스크 수용도: {persona.risk_tolerance}
- 주요 강점: {', '.join(persona.strengths[:2])}
{market_info}

### 최우선 추천 아이템
**{top_item.item}**
- 시장 적합도: {top_item.market_fit_score:.1f}점
- 페르소나 적합도: {top_item.persona_fit_score:.1f}점
- 수익성 전망: {top_item.profitability_score:.1f}점

총 {len(items)}개의 맞춤형 창업 아이템과 {len(roadmaps)}개의 상세 실행 로드맵이 준비되었습니다.
""".strip()
    
    return summary


async def _run_agent_async(
    agent,
    query: str,
    session_service: InMemorySessionService,
    user_id: str,
    session_id: str,
) -> dict:
    """Run a single agent asynchronously and return parsed result."""
    runner = Runner(agent=agent, app_name=APP_NAME, session_service=session_service)
    content = types.Content(role="user", parts=[types.Part(text=query)])
    events = runner.run(user_id=user_id, session_id=session_id, new_message=content)
    # Convert iterator to list to ensure all events are collected
    events_list = list(events)
    return _extract_final_response(events_list)


async def run_workflow_async(
    personal_info: dict | PersonalInfo, project_info: dict | ProjectInfo
) -> FinalReport:
    """
    Run the complete multi-agent workflow.
    
    Args:
        personal_info: Personal information for persona profiling
        project_info: Project information including food sector, region, and capital
        
    Returns:
        FinalReport containing persona profile, market analysis, recommended items, and roadmaps
    """
    # Convert to dict if Pydantic models
    if isinstance(personal_info, PersonalInfo):
        personal_info = personal_info.model_dump()
    if isinstance(project_info, ProjectInfo):
        project_info = project_info.model_dump()
    
    # Create session
    session_service = InMemorySessionService()
    user_id = "workflow_user"
    session_id = f"session_123"
    await session_service.create_session(
        app_name=APP_NAME, user_id=user_id, session_id=session_id
    )
    
    # Step 1: Run profiler_agent and market_analyst_agent in parallel
    personal_info_query = json.dumps(personal_info, ensure_ascii=False, indent=2)
    project_info_query = json.dumps(project_info, ensure_ascii=False, indent=2)
    
    profiler_task = _run_agent_async(
        profiler_agent, personal_info_query, session_service, user_id, session_id
    )
    market_analyst_task = _run_agent_async(
        market_analyst_agent, project_info_query, session_service, user_id, session_id
    )
    
    persona_profile, market_analysis_list = await asyncio.gather(
        profiler_task, market_analyst_task
    )
    
    # Step 2: Run item_recommender_agent with combined inputs
    item_recommender_query = (
        json.dumps(persona_profile, ensure_ascii=False, indent=2)
        + "\n\n"
        + json.dumps(project_info, ensure_ascii=False, indent=2)
        + "\n\n"
        + json.dumps(market_analysis_list, ensure_ascii=False, indent=2)
    )
    
    recommended_items_result = await _run_agent_async(
        item_recommender_agent,
        item_recommender_query,
        session_service,
        user_id,
        session_id,
    )
    
    # Step 3: Run roadmap_architect_agent for each recommended item
    recommended_items = recommended_items_result["recommended_items"]
    roadmap_tasks = []
    
    for idx, item in enumerate(recommended_items):
        roadmap_query = (
            json.dumps(persona_profile, ensure_ascii=False, indent=2)
            + "\n\n"
            + json.dumps(project_info, ensure_ascii=False, indent=2)
            + "\n\n"
            + json.dumps(item, ensure_ascii=False, indent=2)
        )
        
        roadmap_tasks.append(
            _run_agent_async(
                roadmap_architect_agent,
                roadmap_query,
                session_service,
                user_id,
                session_id,
            )
        )
    
    roadmaps_data = await asyncio.gather(*roadmap_tasks)
    
    # Step 4: Convert to Pydantic objects
    roadmaps = [Roadmap(**roadmap_data) for roadmap_data in roadmaps_data]
    persona_profile_obj = PersonaProfile(**persona_profile)
    recommended_items_objs = [
        RecommendedItem(**item) for item in recommended_items
    ]
    
    # Convert market analysis list to Pydantic objects
    market_analyses = market_analysis_list["market_analyses"]
    if not market_analyses:
        raise ValueError("No market analysis data available")
    market_analysis_objs = [
        MarketAnalysis(**market_analysis) for market_analysis in market_analyses
    ]
    
    # Step 5: Generate executive summary
    executive_summary = _generate_executive_summary(
        persona_profile_obj, market_analysis_objs, recommended_items_objs, roadmaps
    )
    
    # Step 6: Create and return FinalReport
    final_report = FinalReport(
        executive_summary=executive_summary,
        persona_profile=persona_profile_obj,
        market_analysis_list=market_analysis_objs,
        recommended_items=recommended_items_objs,
        roadmaps=roadmaps,
    )
    
    return final_report


def run_workflow(
    personal_info: dict | PersonalInfo, project_info: dict | ProjectInfo
) -> FinalReport:
    """
    Synchronous wrapper for run_workflow_async.
    
    This function automatically detects if it's running in an environment with an
    existing event loop (like Jupyter notebooks) and handles it accordingly.
    
    Args:
        personal_info: Personal information for persona profiling
        project_info: Project information including food sector, region, and capital
        
    Returns:
        FinalReport containing complete analysis and recommendations
        
    Example:
        >>> personal_info = {
        ...     "gender": "여성",
        ...     "age": 34,
        ...     "mbti": "ENTJ",
        ...     "previous_job": "마케터",
        ...     "self_employed_experience": True
        ... }
        >>> project_info = {
        ...     "food_sector": "닭강정 전문점",
        ...     "region": "서울시 강동구",
        ...     "capital": "30000000원 ~ 50000000원"
        ... }
        >>> report = run_workflow(personal_info, project_info)
        >>> len(report.roadmaps)  # Should return 3 roadmaps
        3
        >>> print(report.executive_summary)  # View summary
    """
    try:
        # Try to get the running event loop (e.g., in Jupyter notebooks)
        loop = asyncio.get_running_loop()
    except RuntimeError:
        # No event loop is running, we can use asyncio.run()
        return asyncio.run(run_workflow_async(personal_info, project_info))
    else:
        # An event loop is already running (e.g., Jupyter notebook)
        # Create a task and run it in the existing loop
        import nest_asyncio
        nest_asyncio.apply()
        return asyncio.run(run_workflow_async(personal_info, project_info))

