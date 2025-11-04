<div align="center">

# 🍽️ S.O.S (SecOnd-life Supporter)

### AI 기반 외식업 창업 컨설팅 플랫폼

**제2의 인생을 시작하는 예비 창업자들에게 데이터 기반의 성공 로드맵을 제공합니다**

![Python](https://img.shields.io/badge/Python-3.13+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0-8E75B2?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-Team_1st-green?style=flat-square)

[✨ 프로젝트 소개](#-프로젝트-소개) • [🚀 주요 기능](#-주요-기능) • [🏗️ 아키텍처](#%EF%B8%8F-시스템-아키텍처) • [💻 설치 가이드](#-설치-및-실행-가이드) • [📚 문서](#-문서)

</div>

---

## 📌 목차

- [프로젝트 소개](#-프로젝트-소개)
- [개발 배경](#-개발-배경)
- [주요 기능](#-주요-기능)
- [시스템 아키텍처](#%EF%B8%8F-시스템-아키텍처)
- [기술 스택](#-기술-스택)
- [설치 및 실행 가이드](#-설치-및-실행-가이드)
- [프로젝트 구조](#-프로젝트-구조)
- [핵심 기능 상세](#-핵심-기능-상세)
- [API 문서](#-api-문서)
- [문서](#-문서)
- [팀 소개](#-팀-소개)
- [라이센스](#-라이센스)

---

## ✨ 프로젝트 소개

**S.O.S (SecOnd-life Supporter)** 는 외식업 창업을 준비하는 예비 창업자들을 위한 AI 기반 종합 컨설팅 플랫폼입니다. 

많은 사람들이 은퇴 후 또는 새로운 인생을 시작하며 외식업 창업을 꿈꾸지만, 정보 부족과 준비 부족으로 실패하는 경우가 많습니다. S.O.S는 **AI 멀티 에이전트 시스템**을 활용하여 창업자의 개인 특성과 실제 시장 데이터를 종합 분석하고, **맞춤형 창업 아이템과 구체적인 실행 로드맵**을 제공합니다.

### 🎯 핵심 가치

- **데이터 기반 의사결정**: LLM의 환각을 최소화하고 실제 상권 데이터, 시장 트렌드를 기반으로 신뢰할 수 있는 분석 제공
- **개인 맞춤형 추천**: MBTI, 경력, 자본금 등 개인 특성을 고려한 최적의 창업 아이템 추천
- **실행 가능한 로드맵**: 공간 기획, 자금 계획, 메뉴 개발 등 창업 준비부터 실행까지 단계별 가이드
- **AI 멀티 에이전트 협업**: 각 전문 영역을 담당하는 6개의 AI 에이전트가 협업하여 종합 컨설팅 제공

---

## 💡 개발 배경

### 문제 정의

- **높은 창업 실패율**: 한국의 자영업 폐업률은 3년 내 약 70%에 달함
- **정보 비대칭**: 상권 분석, 시장 조사에 대한 전문 지식과 정보 접근성 부족
- **비용 장벽**: 전문 컨설팅 비용이 수백만 원에 달해 예비 창업자에게 부담
- **실행력 부족**: 아이디어는 있지만 구체적인 실행 계획 수립의 어려움

### 우리의 솔루션

S.O.S는 **Google Gemini 2.0 기반의 AI 멀티 에이전트 시스템**과 **실시간 상권 데이터**를 결합하여:

1. 전문 컨설턴트 수준의 분석을 **무료 또는 저비용**으로 제공
2. 창업자의 성향과 시장 데이터를 기반으로 **성공 가능성 높은 아이템** 추천
3. 단순 아이디어가 아닌 **실행 가능한 로드맵**과 **시각 자료**까지 제공
4. 공간 기획, 메뉴 개발, 자금 조달 등 **전 과정을 한 플랫폼**에서 관리

---

## 🚀 주요 기능

### 1. 🤖 AI 멀티 에이전트 시스템

**6개의 전문 AI 에이전트**가 협업하여 종합 컨설팅 제공:

| 에이전트 | 역할 | 주요 기능 |
|---------|------|-----------|
| **Profiler Agent** | 창업자 페르소나 분석 | MBTI, 경력, 리스크 수용도 기반 성향 분석 |
| **Market Analyst Agent** | 시장 및 상권 분석 | 실시간 상권 데이터, 경쟁 분석, 트렌드 분석 |
| **Idea Validator Agent** | 창업 아이템 검증 | 시장성, 적합성, 수익성 기반 TOP 3 아이템 선정 |
| **Roadmap Architect Agent** | 실행 로드맵 생성 | 단계별 실행 계획 및 시각 자료 생성 |
| **Report Synthesizer Agent** | 최종 보고서 작성 | 모든 분석 결과를 종합한 컨설팅 보고서 생성 |
| **Workflow Orchestrator** | 워크플로우 관리 | 에이전트 간 데이터 흐름 조율 및 전체 프로세스 관리 |

### 2. 📊 데이터 기반 분석

- **상권 분석**: 유동인구, 배후지 인구 통계, 평균 임대료 등 분석
- **경쟁 분석**: 선택 지역 내 동종 업종 밀집도, 프랜차이즈 비율 분석
- **법률 데이터 검색**: RAG 시스템을 활용한 창업 관련 법률 및 규제 정보 제공

### 3. 🎨 비주얼 컨텐츠 생성

AI가 창업 콘셉트를 시각화하여 제공:

- **인테리어 디자인**: 콘셉트에 맞는 인테리어 시안
- **간판 디자인**: 브랜드 아이덴티티를 반영한 간판 디자인
- **메뉴 사진**: 시그니처 메뉴 이미지 생성
- **패키지 디자인**: 테이크아웃 패키지 시안

### 4. 🗺️ 6단계 실행 로드맵

선택된 창업 아이템에 대한 구체적이고 실행 가능한 로드맵 제공:

1. **공간 기획** (Space Planning)
   - 인테리어 콘셉트 및 예상 비용
   - 간판 디자인 및 설치 가이드
   - 공간 배치 및 동선 계획

2. **운영 준비** (Operations Preparation)
   - 식자재 공급처 추천
   - 브랜드 패키지 디자인
   - 운영 매뉴얼 작성

3. **자금 계획** (Financial Planning)
   - 맞춤형 정책자금 추천
   - 예상 초기 투자 비용 산출
   - 손익분기점 분석

4. **입지 선정** (Location Selection)
   - 최적 입지 조건 제시
   - 계약 체크리스트
   - 권리금 및 임대료 가이드

5. **행정 및 인허가** (Administration & Permits)
   - 사업자등록 절차
   - 영업신고 및 위생교육
   - 필수 인허가 목록

6. **메뉴 개발** (Menu Development)
   - 시그니처 메뉴 추천
   - 레시피 및 원가 계산
   - 메뉴 가격 전략

### 5. 🎯 개인 맞춤형 추천

사용자의 다양한 특성을 고려한 맞춤형 분석:

- **MBTI 기반 성향 분석**: 업무 스타일, 고객 응대 방식 고려
- **경력 활용**: 이전 직무 경험을 창업에 활용하는 방법 제시
- **자본금 최적화**: 예산 내에서 최고의 결과를 낼 수 있는 아이템 추천
- **리스크 수용도**: 창업 경험 여부에 따른 아이템 난이도 조절

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                          Frontend (React)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  User Input  │→│  Form Pages  │→│  Result View │             │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTP/REST API
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       Backend (FastAPI)                         │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                  Workflow Orchestrator                 │     │
│  └─────┬──────────────────┬─────────────────────────┬─────┘     │
│        │                  │                         │           │
│  ┌─────▼────────┐  ┌──────▼───────┐  ┌──────────────▼─────┐     │
│  │   Profiler   │  │ Market       │  │ Idea Validator     │     │
│  │   Agent      │  │ Analyst      │ →│ Agent              │     │
│  └───────────┬──┘  │ Agent        │  └──┬─────────────────┘     │
│              │     └──────┬───────┘     │                       │
│              │            │             │                       │
│              │     ┌──────▼─────────────▼────┐                  │
│              └────>│  Roadmap Architect (x3) │                  │
│                    └──────┬──────────────────┘                  │
│                           │                                     │
│                    ┌──────▼──────────────────┐                  │
│                    │ Report Synthesizer      │                  │
│                    └─────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 워크플로우

1. **사용자 입력**: 개인 정보, 창업 희망 업종, 지역, 예산 입력
2. **Profiler Agent**: 창업자 페르소나 분석 및 프로파일 생성
3. **Market Analyst Agent**: 선택 지역의 상권 분석 및 시장 조사
4. **Idea Validator Agent**: 페르소나와 시장 데이터를 결합하여 최적의 창업 아이템 3개 선정
5. **Roadmap Architect Agent**: 각 아이템에 대한 6단계 실행 로드맵 생성 (3개)
6. **Report Synthesizer Agent**: 모든 결과를 종합한 최종 보고서 작성
7. **결과 제공**: 사용자에게 시각 자료와 함께 종합 컨설팅 보고서 제공

---

## 🛠 기술 스택

### Backend

- **Framework**: FastAPI 0.115+
- **Language**: Python 3.13+
- **AI/LLM**: 
  - Google Gemini 2.0 (Generative AI)
  - LiteLLM (Multi-model support)
  - Google ADK (Agent Development Kit)
- **Data Validation**: Pydantic 2.0+
- **Vector DB**: FAISS (Facebook AI Similarity Search)
- **Retry Logic**: Tenacity 8.0+
- **HTTP Client**: HTTPX 0.27+
- **Environment**: python-dotenv 1.0+
- **Package Manager**: uv

### Frontend

- **Framework**: React 18.3+
- **Language**: TypeScript 5.8+
- **Build Tool**: Vite 5.4+
- **UI Library**: 
  - shadcn/ui (Radix UI components)
  - Tailwind CSS 3.4+
- **State Management**: React Context API
- **Routing**: React Router DOM 6.30+
- **Form Handling**: React Hook Form 7.61+ with Zod validation
- **HTTP Client**: Fetch API
- **Icons**: Lucide React

### Infrastructure & Tools

- **API Documentation**: OpenAPI (Swagger/ReDoc)
- **CORS**: FastAPI CORS Middleware
- **Development**: 
  - Hot Reload (Vite HMR, Uvicorn auto-reload)
  - ESLint, TypeScript compiler

---

## 💻 설치 및 실행 가이드

### 사전 요구사항

- Python 3.13 이상
- Node.js 18 이상
- Google AI API Key ([발급 방법](https://makersuite.google.com/app/apikey))
- AWS Bedrock API Key ([발급 방법](https://aws.amazon.com/ko/bedrock/))

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd team-1st
```

### 2. 백엔드 설정 및 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치 (uv 사용)
uv sync

# 또는 pip 사용
pip install -e .

# 환경 변수 설정
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env

# 서버 실행
python run_server.py
```

**백엔드 서버 확인**:
- API 서버: http://localhost:8080
- API 문서 (Swagger): http://localhost:8080/docs
- API 문서 (ReDoc): http://localhost:8080/redoc
- Health Check: http://localhost:8080/health

### 3. 프론트엔드 설정 및 실행

새 터미널 창에서:

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 환경 변수 설정
echo "VITE_API_URL=http://localhost:8080" > .env

# 개발 서버 실행
npm run dev
```

**프론트엔드 확인**:
- 프론트엔드: http://localhost:5173

### 4. 전체 시스템 테스트

#### API 테스트 스크립트 실행

```bash
cd backend
python test_api.py
```

#### cURL로 직접 테스트

```bash
curl -X POST http://localhost:8080/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "name": "홍길동",
      "gender": "m",
      "age": 34,
      "mbti": "ENTJ",
      "previous_job": "마케터",
      "self_employed_experience": true
    },
    "projectInfo": {
      "foodSector": "카페",
      "region": "강남구",
      "capital": 50000000
    }
  }'
```

---

## 📁 프로젝트 구조

```
team-1st/
├── backend/                    # 백엔드 애플리케이션
│   ├── src/backend/
│   │   ├── agents/            # AI 에이전트 구현
│   │   │   ├── agents.py      # 6개 에이전트 클래스
│   │   │   ├── workflow.py    # 워크플로우 오케스트레이션
│   │   │   └── schemas.py     # Pydantic 데이터 모델
│   │   └── main.py            # FastAPI 애플리케이션
│   ├── data/
│   │   └── RAG/              # RAG 시스템 데이터
│   │       └── law_db/       # 법률 데이터베이스 (FAISS)
│   ├── data_generator/       # 벡터 DB 생성 도구
│   ├── run_server.py         # 서버 실행 스크립트
│   ├── test_api.py          # API 테스트 스크립트
│   ├── pyproject.toml       # Python 의존성 관리
│   ├── API_INTEGRATION.md   # API 연동 가이드
│   └── README.md            # 백엔드 문서
│
├── frontend/                  # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── pages/            # 페이지 컴포넌트
│   │   │   ├── Index.tsx     # 홈 페이지
│   │   │   ├── IndustrySelection.tsx      # 업종 선택
│   │   │   ├── LocationSelection.tsx      # 지역 선택
│   │   │   ├── SelectionSummary.tsx       # 선택 정보 요약
│   │   │   ├── RoadmapLoading.tsx         # 로딩 페이지
│   │   │   └── Roadmap.tsx                # 결과 페이지
│   │   ├── components/       # 재사용 가능한 컴포넌트
│   │   │   ├── ui/          # shadcn/ui 컴포넌트
│   │   │   └── roadmap/     # 로드맵 관련 컴포넌트
│   │   ├── contexts/        # React Context
│   │   │   └── FormContext.tsx  # 폼 데이터 관리
│   │   ├── api/             # API 클라이언트
│   │   │   └── startup.ts   # 백엔드 API 통신
│   │   └── assets/          # 이미지 및 정적 파일
│   ├── package.json         # Node.js 의존성
│   └── README.md            # 프론트엔드 문서
│
├── docs/                     # 프로젝트 문서
│   ├── agents.md            # 에이전트 시스템 설계 문서
│   └── 기능목록.md           # 기능 명세서
│
├── data/                    # 공통 데이터
│   └── 업종.json            # 외식업 업종 데이터
│
├── SETUP.md                 # 상세 설치 가이드
└── README.md                # 이 파일
```

---

## 🎯 핵심 기능 상세

### 1. AI 멀티 에이전트 시스템

#### Profiler Agent (창업자 프로파일링)

사용자의 개인 정보를 분석하여 창업 성향 파악:

- **성별/나이**: 타겟 고객층 설정 선호도 추론
- **MBTI 분석**: 
  - J 성향: 체계적 운영, 프로세스 중시
  - P 성향: 유연한 메뉴 개발, 창의적 접근
  - E/I: 고객 응대 방식 및 마케팅 전략 차별화
- **경력 분석**: 이전 직무 경험을 창업에 활용하는 방법 도출
- **리스크 수용도**: 창업 경험 유무에 따른 난이도 조절

**출력 예시**:
```json
{
  "persona_summary": "30대 여성, 스타트업 마케터 경력 보유. ENTJ 성향으로 체계적이면서도 리더십이 강함. 브랜딩과 전략 수립에 강점. 리스크 수용도: High",
  "recommended_style": ["브랜딩 중시", "체계적 운영", "고객 경험 중심"],
  "risk_tolerance": "High",
  "strengths": ["마케팅 역량", "시스템 구축", "트렌드 분석"],
  "weaknesses": ["실무 경험 부족", "음식업 경험 無"]
}
```

#### Market Analyst Agent (시장 분석)

외부 데이터를 적극 활용하여 객관적인 상권 분석:

- **상권 분석**: 유동인구, 배후지 인구 통계, 소득 수준
- **경쟁 분석**: 동종 업종 밀집도, 프랜차이즈 비율, 평균 평점
- **임대료 시세**: 평당 임대료, 권리금 수준
- **트렌드 분석**: 소셜 미디어 및 검색 트렌드 키워드 추출

**출력 예시**:
```json
{
  "region": "강남구",
  "dong": "역삼동",
  "demographics": "20-40대 직장인 중심, 높은 소득 수준",
  "avg_rent": "평당 35만원",
  "foot_traffic": "평일 10만명, 주말 5만명",
  "emerging_trends": ["수제 버거", "프리미엄 커피", "디저트 카페"],
  "market_opportunities": ["점심 시간대 수요 높음", "테이크아웃 문화 발달"]
}
```

#### Idea Validator Agent (아이템 검증)

페르소나와 시장 데이터를 결합하여 최적의 아이템 선정:

**점수화 모델**:
- **시장성 (40%)**: 트렌드 부합도, 경쟁 강도 (낮을수록 유리)
- **적합성 (30%)**: 페르소나 부합도, 운영 난이도
- **수익성 (30%)**: 예상 ROI, 객단가, 회전율

**출력 예시**:
```json
[
  {
    "rank": 1,
    "item": "프리미엄 샌드위치 카페",
    "concept": "건강식 샐러드와 수제 샌드위치 중심의 브런치 카페",
    "reason": "역삼동 직장인 타겟, 점심 시간 수요 높음. 사용자의 마케팅 역량으로 브랜딩 강화 가능. 경쟁 강도 '중'.",
    "market_fit_score": 92,
    "persona_fit_score": 88,
    "profitability_score": 85,
    "location_strategy": {
      "recommended_areas": ["역삼역 1번 출구", "강남역 11번 출구"],
      "location_criteria": ["유동인구 많은 1층", "테이크아웃 용이한 구조"],
      "accessibility_notes": "지하철역 도보 3분 이내"
    }
  }
]
```

#### Roadmap Architect Agent (로드맵 설계)

선정된 아이템에 대한 6단계 실행 로드맵 생성:

1. **공간 기획**: AI 생성 인테리어/간판 시안, 예상 비용
2. **운영 준비**: 식자재 공급처, 패키지 디자인, 운영 매뉴얼
3. **자금 계획**: 정책자금 추천, 초기 투자 비용, 손익분기점
4. **입지 선정**: 최적 입지 조건, 계약 체크리스트
5. **행정 인허가**: 사업자등록, 영업신고, 위생교육
6. **메뉴 개발**: 시그니처 메뉴, 원가 계산, 가격 전략

### 2. RAG 시스템 (법률 데이터베이스)

창업 관련 법률, 규제, 정책자금 정보를 빠르게 검색:

- **FAISS 벡터 DB**: 법률 문서 임베딩 및 유사도 검색
- **메타데이터 관리**: 법률명, 조항, 시행일 등 구조화된 정보
- **실시간 검색**: 사용자 질문에 대한 관련 법률 조항 즉시 제공

**활용 예시**:
- "일반음식점 영업신고에 필요한 서류는?"
- "청년창업 지원 정책자금 종류는?"
- "식품위생법상 주방 면적 기준은?"

---

## 📡 API 문서

### Base URL

```
http://localhost:8080
```

### 주요 엔드포인트

#### 1. Health Check

```http
GET /health
```

**응답**:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-02T10:30:00Z"
}
```

#### 2. 창업 계획 제출 및 분석

```http
POST /api/submit
Content-Type: application/json
```

**요청 본문**:
```typescript
{
  personalInfo: {
    name: string;              // 이름
    gender: "m" | "f";         // 성별
    age: number;               // 나이
    mbti: string;              // MBTI (예: "ENTJ")
    previous_job: string;      // 이전 직무
    self_employed_experience: boolean;  // 자영업 경험 여부
  };
  projectInfo: {
    foodSector: string;        // 업종 (예: "카페", "한식")
    region: string;            // 지역 (구 단위, 예: "강남구")
    capital: number;           // 자본금 (숫자)
  };
}
```

**응답**:
```typescript
{
  executive_summary: string;                    // 종합 요약
  persona_profile: {
    persona_summary: string;
    recommended_style: string[];
    risk_tolerance: "Low" | "Medium" | "High";
    strengths: string[];
    weaknesses: string[];
    suitable_business_types: string[];
  };
  market_analysis_list: [                          // 동별 시장 분석 리스트
    {
      dong: string;
      demographics: string;
      avg_rent: string;
      foot_traffic: string;
      emerging_trends: string[];
      market_opportunities: string[];
    }
  ];
  recommended_items: [                          // TOP 3 추천 아이템
    {
      item: string;
      concept: string;
      reason: string;
      location_strategy: {...};
      market_fit_score: number;
      persona_fit_score: number;
      profitability_score: number;
    }
  ];
  roadmaps: [                                   // 3개 아이템별 로드맵
    {
      item: string;
      space_planning: {...};
      operation_prep: {...};
      financial_plan: {...};
      administrative_tasks: {...};
      menu_development: {...};
    }
  ];
}
```

**예상 응답 시간**: 30초 ~ 2분 (AI 모델 처리 시간 포함)

### 상세 API 문서

서버 실행 후 다음 주소에서 인터랙티브한 API 문서 확인 가능:

- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc

---

## 📚 문서

### RAG 시스템 설정

벡터 데이터베이스 생성 및 테스트:

- [RAG 설정 가이드](./backend/data_generator/vectorDB/SETUP_AND_TEST.md)
- [RAG README](./backend/data_generator/vectorDB/README.md)

---

## 🎨 스크린샷

> 참고: 실제 스크린샷은 `frontend/src/assets/` 디렉토리에서 확인할 수 있습니다.

### 주요 화면

1. **인트로 화면**: 서비스 소개 및 시작
2. **업종 선택**: 14개 외식업 카테고리 선택
3. **지역 선택**: 서울시 동 단위 지역 선택 (상권 정보 표시)
4. **개인 정보 입력**: MBTI, 경력, 예산 등 입력
5. **분석 중**: AI 에이전트 실행 진행 상황 표시
6. **결과 화면**: 추천 아이템 및 로드맵 시각화

---

## 👥 팀 소개

**Team 1st** - 외식업 창업자를 위한 첫 번째 파트너

이 프로젝트는 해커톤을 위해 개발되었으며, AI 기술을 활용하여 실질적인 사회 문제를 해결하는 것을 목표로 합니다.

### 기술 스택별 기여

- **AI/Backend**: 멀티 에이전트 시스템, RAG 구현, FastAPI 개발
- **Frontend**: React/TypeScript UI, 사용자 경험 설계
- **Data**: 상권 데이터 수집 및 분석, 벡터 DB 구축
- **Documentation**: 기술 문서 작성 및 프로젝트 관리

---

## 🚧 개발 로드맵

### ✅ 완료된 기능

- [x] AI 멀티 에이전트 시스템 구현
- [x] FastAPI 백엔드 서버
- [x] React 프론트엔드 UI
- [x] 프론트엔드-백엔드 API 연동
- [x] 업종/지역 선택 기능
- [x] 개인 정보 수집 폼
- [x] RAG 시스템 (법률 데이터베이스)
- [x] 6단계 로드맵 생성 로직

### 🔄 진행 중

- [ ] 결과 페이지 UI 완성
- [ ] AI 생성 이미지 통합 (인테리어, 메뉴 등)
- [ ] 로딩 페이지 개선 (진행률 표시)

### 📅 향후 계획

- [ ] 정책자금 검색 API 통합
- [ ] 실시간 상권 데이터 API 연동
- [ ] 사용자 프로젝트 저장 기능
- [ ] PDF 보고서 다운로드 기능
- [ ] 모바일 반응형 최적화
- [ ] 사용자 피드백 시스템
- [ ] A/B 테스트 기반 추천 알고리즘 개선

---

## 📄 라이센스

이 프로젝트는 **Team 1st**의 해커톤 프로젝트로 개발되었습니다.

---

**프로젝트를 통해 더 많은 예비 창업자들이 성공적인 제2의 인생을 시작할 수 있기를 바랍니다! 🚀**

