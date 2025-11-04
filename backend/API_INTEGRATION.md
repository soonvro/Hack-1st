# API Integration Guide

## Backend API 연동 가이드

### 서버 실행

```bash
cd backend
python run_server.py
```

서버가 `http://localhost:8080`에서 실행됩니다.

---

## Frontend Integration

### 1. API Endpoint

**URL:** `POST http://localhost:8080/api/submit`

**Content-Type:** `application/json`

### 2. Request Format

프론트엔드에서 보내야 하는 데이터 형식:

```typescript
interface SubmitRequest {
  personalInfo: {
    name: string;           // 이름 (현재 백엔드에서 사용하지 않음, 추후 확장 가능)
    gender: "m" | "f";      // 성별
    age: number;            // 나이
    mbti: string;           // MBTI (예: "ENTJ", "ISTJ")
    previous_job: string;   // 이전 직무
    self_employed_experience: boolean;  // 자영업 경험 여부
  };
  projectInfo: {
    foodSector: string;     // 업종 (예: "카페", "한식", "베이커리")
    region: string;         // 지역 (구 단위, 예: "강남구")
    capital: number;        // 자본금 (숫자, 예: 50000000)
  };
}
```

### 3. Response Format

백엔드에서 반환하는 데이터 형식:

```typescript
interface FinalReport {
  executive_summary: string;
  persona_profile: PersonaProfile;
  market_analysis_list: MarketAnalysis[];
  recommended_items: RecommendedItem[];
  roadmaps: Roadmap[];
}

interface PersonaProfile {
  persona_summary: string;
  recommended_style: string[];
  risk_tolerance: "Low" | "Medium" | "High";
  strengths: string[];
  weaknesses: string[];
  suitable_business_types: string[];
}

interface MarketAnalysis {
  dong: string;
  demographics: string;
  avg_rent: string;
  foot_traffic: string;
  emerging_trends: string[];
  market_opportunities: string[];
}

interface RecommendedItem {
  item: string;
  concept: string;
  reason: string;
  location_strategy: LocationStrategy;
  market_fit_score: number;
  persona_fit_score: number;
  profitability_score: number;
}

interface LocationStrategy {
  recommended_areas: string[];
  location_criteria: string[];
  accessibility_notes: string;
}

interface Roadmap {
  item: string;
  space_planning: SpacePlanning;
  operation_prep: OperationPreparation;
  financial_plan: FinancialPlan;
  administrative_tasks: AdministrativeTasks;
  menu_development: MenuDevelopment;
}

// ... (상세 타입은 schemas.py 참조)
```

### 4. 프론트엔드 구현 예시

#### React + TypeScript

```typescript
// src/api/startup.ts
const API_BASE_URL = "http://localhost:8080";

export interface SubmitStartupPlanRequest {
  personalInfo: {
    name: string;
    gender: "m" | "f";
    age: number;
    mbti: string;
    previous_job: string;
    self_employed_experience: boolean;
  };
  projectInfo: {
    foodSector: string;
    region: string;
    capital: number;
  };
}

export async function submitStartupPlan(data: SubmitStartupPlanRequest) {
  const response = await fetch(`${API_BASE_URL}/api/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "API 요청 실패");
  }

  return await response.json();
}
```

#### 사용 예시

```typescript
// src/pages/SelectionSummary.tsx
import { submitStartupPlan } from "@/api/startup";

const transformDataToRequest = () => {
  return {
    personalInfo: {
      name: formData.name || "홍길동",
      gender: formData.gender === "M" ? "m" : formData.gender === "F" ? "f" : "m",
      age: parseInt(formData.age) || 30,
      mbti: formData.mbti && formData.mbti !== "none" ? formData.mbti : "ISTJ",
      previous_job: formData.previousOccupationDetail || "Developer",
      self_employed_experience: formData.hasStartupExperience === "경험 있음"
    },
    projectInfo: {
      foodSector: formData.industry || formData.industryCategory || "한식",
      region: formData.selectedDistricts[0] || "강남구",
      capital: parseInt(formData.budgetAmount) || 50000000
    }
  };
};

const handleSubmit = async () => {
  try {
    setLoading(true);
    const requestData = transformDataToRequest();
    
    console.log("Submitting data:", requestData);
    
    const result = await submitStartupPlan(requestData);
    
    console.log("Success:", result);
    
    // 결과 페이지로 이동
    navigate("/roadmap", { state: { report: result } });
    
  } catch (error) {
    console.error("Error submitting plan:", error);
    alert("제출 중 오류가 발생했습니다: " + error.message);
  } finally {
    setLoading(false);
  }
};
```

### 5. 에러 처리

백엔드는 다음과 같은 HTTP 상태 코드를 반환합니다:

- **200**: 성공
- **400**: 잘못된 요청 (데이터 형식 오류)
- **500**: 서버 내부 오류 (워크플로우 실행 실패)

에러 응답 형식:

```json
{
  "detail": "에러 메시지"
}
```

### 6. 로딩 상태 관리

워크플로우 실행에는 시간이 걸립니다 (약 30초 ~ 2분). 적절한 로딩 UI를 표시하세요:

```typescript
const [loading, setLoading] = useState(false);
const [progress, setProgress] = useState(0);

const handleSubmit = async () => {
  setLoading(true);
  setProgress(0);
  
  // 진행률 시뮬레이션 (실제 진행률이 아님)
  const interval = setInterval(() => {
    setProgress(prev => Math.min(prev + 10, 90));
  }, 3000);
  
  try {
    const result = await submitStartupPlan(requestData);
    setProgress(100);
    // 결과 처리
  } finally {
    clearInterval(interval);
    setLoading(false);
  }
};
```

### 7. CORS 설정

백엔드는 이미 다음 origin에서의 요청을 허용합니다:
- `http://localhost:5173` (Vite 기본 포트)
- `http://localhost:3000` (React 기본 포트)

다른 포트를 사용하는 경우 `backend/src/backend/main.py`의 CORS 설정을 수정하세요.

---

## Testing

### 1. 헬스 체크

```bash
curl http://localhost:8080/health
```

### 2. API 테스트

제공된 테스트 스크립트 사용:

```bash
cd backend
pip install requests  # 필요한 경우
python test_api.py
```

### 3. 수동 테스트

```bash
curl -X POST http://localhost:8080/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "name": "테스트",
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

## API 문서

FastAPI는 자동으로 OpenAPI 문서를 생성합니다:

- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc

서버 실행 후 브라우저에서 위 주소로 접속하여 인터랙티브한 API 문서를 확인할 수 있습니다.

---

## 트러블슈팅

### 서버가 시작되지 않음

1. 의존성 설치 확인:
   ```bash
   cd backend
   pip install -e .
   ```

2. 환경 변수 확인:
   ```bash
   # .env 파일에 GOOGLE_API_KEY가 설정되어 있는지 확인
   cat .env
   ```

### CORS 에러

프론트엔드 주소가 CORS 허용 목록에 있는지 확인하세요. `main.py`의 `allow_origins` 리스트에 추가:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://your-frontend-url"],
    # ...
)
```

### 응답이 너무 느림

- 워크플로우는 여러 AI 에이전트를 순차적으로 실행하므로 시간이 걸립니다.
- 네트워크 상태와 Google AI API 응답 속도에 따라 다릅니다.
- 적절한 로딩 UI와 타임아웃 설정을 권장합니다.

---

## 문의

문제가 있거나 질문이 있으면 백엔드 팀에 문의하세요.

