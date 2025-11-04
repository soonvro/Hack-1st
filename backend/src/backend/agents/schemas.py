"""Data schemas for the F&B Startup Navigator multi-agent system."""

from typing import Literal
from pydantic import BaseModel, Field


class PersonalInfo(BaseModel):
    """사용자 개인 정보."""

    gender: str = Field(description="성별")
    age: int = Field(description="나이")
    mbti: str = Field(description="MBTI 성격 유형", pattern=r"^[IE][NS][TF][JP]$")
    previous_job: str = Field(description="이전 직무")
    self_employed_experience: bool = Field(description="자영업 경험 여부")



class ProjectInfo(BaseModel):
    """프로젝트 정보."""

    food_sector: str = Field(description="창업 희망 업종")
    region: str = Field(description="창업 희망 지역, 구 단위")
    capital: str = Field(description="자본금 범위 (단위: 원)")


class PersonaProfile(BaseModel):
    """창업자 페르소나 프로필."""

    persona_summary: str = Field(description="페르소나 요약")
    recommended_style: list[str] = Field(description="추천 스타일 특성")
    risk_tolerance: Literal["Low", "Medium", "High"] = Field(description="리스크 수용도")
    strengths: list[str] = Field(description="강점")
    weaknesses: list[str] = Field(description="약점")
    suitable_business_types: list[str] = Field(description="적합한 사업 유형")


class MarketAnalysis(BaseModel):
    """시장 분석 데이터."""

    dong: str = Field(description="분석 동(지역 단위)")
    demographics: str = Field(description="인구통계학적 특성")
    avg_rent: str = Field(description="평균 임대료")
    foot_traffic: str = Field(description="유동인구 특성")
    emerging_trends: list[str] = Field(default_factory=list, description="신흥 트렌드")
    market_opportunities: list[str] = Field(
        default_factory=list, description="시장 기회"
    )


class MarketAnalysisList(BaseModel):
    """시장 분석 데이터 리스트."""

    market_analyses: list[MarketAnalysis] = Field(default_factory=list, description="구별 시장 분석 데이터 리스트")


class LocationStrategy(BaseModel):
    """입지 전략."""

    recommended_areas: list[str] = Field(description="추천 지역")
    location_criteria: list[str] = Field(description="입지 선정 기준")
    accessibility_notes: str = Field(description="접근성 메모")


class RecommendedItem(BaseModel):
    """추천 창업 아이템."""

    item: str = Field(description="아이템명")
    concept: str = Field(description="콘셉트")
    reason: str = Field(description="선정 이유")
    location_strategy: LocationStrategy = Field(description="입지 전략")
    market_fit_score: float = Field(description="시장성 점수", ge=0, le=100)
    persona_fit_score: float = Field(description="적합성 점수", ge=0, le=100)
    profitability_score: float = Field(description="수익성 점수", ge=0, le=100)


class RecommendedItemList(BaseModel):
    """추천 아이템 리스트."""

    recommended_items: list[RecommendedItem] = Field(default_factory=list, description="추천 아이템 리스트")

class SpacePlanning(BaseModel):
    """공간 기획."""

    interior_concept: str = Field(description="인테리어 콘셉트")
    signage_ideas: list[str] = Field(description="간판 아이디어")
    estimated_space: str = Field(description="예상 공간 크기")


class OperationPreparation(BaseModel):
    """운영 준비."""

    suppliers: list[str] = Field(description="주요 공급업체 유형")
    equipment_list: list[str] = Field(description="필요 장비 목록")
    packaging_ideas: list[str] = Field(description="패키징 아이디어")
    staffing_plan: str = Field(description="인력 계획")


class PolicyFund(BaseModel):
    """정책자금 정보."""

    name: str = Field(description="정책자금명")
    details: str = Field(description="간략한 특징")


class FinancialPlan(BaseModel):
    """자금 계획."""

    initial_investment: int = Field(description="초기 투자금")
    monthly_fixed_costs: int = Field(description="월 고정비")
    break_even_point: str = Field(description="손익분기점")
    funding_sources: list[str] = Field(description="자금 조달 방안")
    policy_funds: list[PolicyFund] = Field(
        default_factory=list, description="정책자금 목록"
    )


class AdministrativeTasks(BaseModel):
    """행정 및 인허가."""

    required_licenses: list[str] = Field(description="필요 인허가")
    registration_steps: list[str] = Field(description="등록 절차")
    required_education: list[str] = Field(description="필수 교육")
    estimated_timeline: str = Field(description="예상 소요 기간")


class SignatureMenuItem(BaseModel):
    """시그니처 메뉴 항목."""

    name: str = Field(description="메뉴명")
    price: int = Field(description="예상 가격(원)")
    description: str = Field(description="간략 설명")


class MenuDevelopment(BaseModel):
    """메뉴 개발."""

    signature_menu: list[SignatureMenuItem] = Field(description="시그니처 메뉴")
    pricing_strategy: str = Field(description="가격 전략")
    menu_diversity: str = Field(description="메뉴 다양성 전략")
    seasonal_items: list[str] = Field(default_factory=list, description="계절 메뉴")


class Roadmap(BaseModel):
    """상세 로드맵."""

    item: str = Field(description="아이템명")
    space_planning: SpacePlanning = Field(description="공간 기획")
    operation_prep: OperationPreparation = Field(description="운영 준비")
    financial_plan: FinancialPlan = Field(description="자금 계획")
    administrative_tasks: AdministrativeTasks = Field(description="행정 및 인허가")
    menu_development: MenuDevelopment = Field(description="메뉴 개발")


class FinalReport(BaseModel):
    """최종 보고서."""

    executive_summary: str = Field(description="요약")
    persona_profile: PersonaProfile = Field(description="창업자 페르소나")
    market_analysis_list: list[MarketAnalysis] = Field(description="시장 분석 리스트")
    recommended_items: list[RecommendedItem] = Field(description="추천 아이템 TOP 3")
    roadmaps: list[Roadmap] = Field(description="상세 로드맵")

