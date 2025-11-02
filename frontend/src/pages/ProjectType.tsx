import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { StepProgress } from "@/components/StepProgress";
import { Rocket, Briefcase } from "lucide-react";

export default function ProjectType() {
  const navigate = useNavigate();
  const { updateFormData, setCurrentStep } = useFormContext();

  const handleSelect = (type: "new" | "existing") => {
    updateFormData({ projectType: type });
    setCurrentStep(3);
    navigate("/industry-category-selection");
  };

  const handleBack = () => {
    setCurrentStep(1);
    navigate("/profile-info");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <StepProgress currentStep={2} totalSteps={6} onBack={handleBack} />
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">프로젝트 유형을 선택하세요</h1>
          <p className="text-muted-foreground text-lg">당신의 상황에 맞는 프로젝트 유형을 선택해주세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => handleSelect("new")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-12 text-left transition-transform hover:scale-105"
          >
            <div className="relative z-10">
              <div className="mb-6 inline-block rounded-full bg-white/20 p-4">
                <Rocket className="h-12 w-12 text-white" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">새로운 창업</h2>
              <p className="mb-6 text-white/90">처음 사업을 시작하시는 분들을 위한 완벽한 가이드</p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 시장 조사 및 분석
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 사업 계획서 작성
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 자금 조달 계획
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 입지 선정 지원
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 단계별 실행 가이드
                </li>
              </ul>
            </div>
          </button>

          <button
            onClick={() => handleSelect("existing")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 p-12 text-left transition-transform hover:scale-105"
          >
            <div className="relative z-10">
              <div className="mb-6 inline-block rounded-full bg-white/20 p-4">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">기존 창업 컨설팅</h2>
              <p className="mb-6 text-white/90">이미 운영 중인 사업의 성장과 개선을 위한 전문 컨설팅</p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 현황 진단 및 분석
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 개선 방안 제시
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 매출 증대 전략
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 비용 절감 방안
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 재창업 지원
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
