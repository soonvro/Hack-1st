"""FastAPI main application for F&B Startup Navigator."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import logging

from .agents.workflow import run_workflow_async
from .agents.schemas import PersonalInfo, ProjectInfo, FinalReport

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="F&B Startup Navigator API",
    description="Multi-agent system for food & beverage startup consulting",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 허용 오리진 전체
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PersonalInfoRequest(BaseModel):
    """Request model for personal information from frontend."""
    
    name: str = Field(description="이름 (현재 사용되지 않음)")
    gender: str = Field(description="성별 (m/f)")
    age: int = Field(description="나이")
    mbti: str = Field(description="MBTI 성격 유형")
    previous_job: str = Field(description="이전 직무")
    self_employed_experience: bool = Field(description="자영업 경험 여부")


class ProjectInfoRequest(BaseModel):
    """Request model for project information from frontend."""
    
    foodSector: str = Field(description="창업 희망 업종")
    region: str = Field(description="창업 희망 지역, 구 단위")
    capital: int = Field(description="자본금 (숫자)")


class SubmitRequest(BaseModel):
    """Complete request model for /api/submit endpoint."""
    
    personalInfo: PersonalInfoRequest
    projectInfo: ProjectInfoRequest


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "F&B Startup Navigator API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post("/api/submit", response_model=FinalReport)
async def submit_startup_plan(request: SubmitRequest) -> FinalReport:
    """
    Process startup plan submission and generate complete analysis.
    
    Args:
        request: Contains personal information and project details
        
    Returns:
        FinalReport with persona profile, market analysis, recommended items, and roadmaps
        
    Raises:
        HTTPException: If workflow execution fails
    """
    try:
        logger.info("Received submission request")
        logger.info(f"Personal Info: age={request.personalInfo.age}, mbti={request.personalInfo.mbti}")
        logger.info(f"Project Info: sector={request.projectInfo.foodSector}, region={request.projectInfo.region}")
        
        # Transform frontend data to backend schema format
        personal_info = PersonalInfo(
            gender=request.personalInfo.gender,
            age=request.personalInfo.age,
            mbti=request.personalInfo.mbti,
            previous_job=request.personalInfo.previous_job,
            self_employed_experience=request.personalInfo.self_employed_experience
        )
        
        # Convert capital from number to string format
        capital_str = f"{request.projectInfo.capital:,}원"
        
        project_info = ProjectInfo(
            food_sector=request.projectInfo.foodSector,
            region=request.projectInfo.region,
            capital=capital_str
        )
        
        logger.info("Starting workflow execution...")
        
        # Run the multi-agent workflow
        final_report = await run_workflow_async(
            personal_info=personal_info,
            project_info=project_info
        )
        
        logger.info("Workflow execution completed successfully")
        logger.info(f"Generated {len(final_report.recommended_items)} items and {len(final_report.roadmaps)} roadmaps")
        
        return final_report
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"유효하지 않은 데이터: {str(e)}")
    except Exception as e:
        logger.error(f"Workflow execution failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"워크플로우 실행 중 오류가 발생했습니다: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)

