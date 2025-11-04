/**
 * API client for F&B Startup Navigator backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://211.188.62.28:8080";

// ============================================================================
// Request Types
// ============================================================================

export interface PersonalInfoRequest {
  name: string;
  gender: "m" | "f";
  age: number;
  mbti: string;
  previous_job: string;
  self_employed_experience: boolean;
}

export interface ProjectInfoRequest {
  foodSector: string;
  region: string;
  capital: number;
}

export interface SubmitStartupPlanRequest {
  personalInfo: PersonalInfoRequest;
  projectInfo: ProjectInfoRequest;
}

// ============================================================================
// Response Types
// ============================================================================

export interface PersonaProfile {
  persona_summary: string;
  recommended_style: string[];
  risk_tolerance: "Low" | "Medium" | "High";
  strengths: string[];
  weaknesses: string[];
  suitable_business_types: string[];
}

export interface MarketAnalysis {
  dong: string;
  demographics: string;
  avg_rent: string;
  foot_traffic: string;
  emerging_trends: string[];
  market_opportunities: string[];
}

export interface LocationStrategy {
  recommended_areas: string[];
  location_criteria: string[];
  accessibility_notes: string;
}

export interface RecommendedItem {
  item: string;
  concept: string;
  reason: string;
  location_strategy: LocationStrategy;
  market_fit_score: number;
  persona_fit_score: number;
  profitability_score: number;
}

export interface SpacePlanning {
  interior_concept: string;
  signage_ideas: string[];
  estimated_space: string;
}

export interface OperationPreparation {
  suppliers: string[];
  equipment_list: string[];
  packaging_ideas: string[];
  staffing_plan: string;
}

export interface PolicyFund {
  name: string;
  details: string;
}

export interface FinancialPlan {
  initial_investment: number;
  monthly_fixed_costs: number;
  break_even_point: string;
  funding_sources: string[];
  policy_funds: PolicyFund[];
}

export interface AdministrativeTasks {
  required_licenses: string[];
  registration_steps: string[];
  required_education: string[];
  estimated_timeline: string;
}

export interface SignatureMenuItem {
  name: string;
  price: number;
  description: string;
}

export interface MenuDevelopment {
  signature_menu: SignatureMenuItem[];
  pricing_strategy: string;
  menu_diversity: string;
  seasonal_items: string[];
}

export interface Roadmap {
  item: string;
  space_planning: SpacePlanning;
  operation_prep: OperationPreparation;
  financial_plan: FinancialPlan;
  administrative_tasks: AdministrativeTasks;
  menu_development: MenuDevelopment;
}

export interface FinalReport {
  executive_summary: string;
  persona_profile: PersonaProfile;
  market_analysis_list: MarketAnalysis[];
  recommended_items: RecommendedItem[];
  roadmaps: Roadmap[];
}

// ============================================================================
// API Client
// ============================================================================

class StartupAPIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Check if the API server is healthy
   */
  async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${this.baseURL}/health`);
    if (!response.ok) {
      throw new Error("Health check failed");
    }
    return await response.json();
  }

  /**
   * Submit startup plan and get analysis
   * Timeout: 10 minutes (600,000ms)
   */
  async submitStartupPlan(data: SubmitStartupPlanRequest): Promise<FinalReport> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minutes

    try {
      const response = await fetch(`${this.baseURL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('요청 시간이 초과되었습니다 (10분). 다시 시도해주세요.');
      }
      throw error;
    }
  }
}

// Export singleton instance
export const startupAPI = new StartupAPIClient();

// Export class for custom instances
export { StartupAPIClient };

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Transform frontend form data to API request format
 * 
 * Usage:
 * ```typescript
 * const requestData = transformFormDataToRequest(formData);
 * const result = await startupAPI.submitStartupPlan(requestData);
 * ```
 */
export function transformFormDataToRequest(formData: any): SubmitStartupPlanRequest {
  return {
    personalInfo: {
      name: formData.name || "사용자",
      gender: formData.gender === "M" ? "m" : formData.gender === "F" ? "f" : "m",
      age: parseInt(formData.age) || 30,
      mbti: formData.mbti && formData.mbti !== "none" ? formData.mbti : "ISTJ",
      previous_job: formData.previousOccupationDetail || "직장인",
      self_employed_experience: formData.hasStartupExperience === "경험 있음"
    },
    projectInfo: {
      foodSector: formData.industry || formData.industryCategory || "한식",
      region: formData.selectedDistricts?.[0] || "강남구",
      capital: parseInt(formData.budgetAmount) || 50000000
    }
  };
}

