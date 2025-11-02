import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { StepProgress } from "@/components/StepProgress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Target, TrendingUp, Users, DollarSign, Megaphone, Settings, X } from "lucide-react";

const goalOptions = [
  { 
    id: "sales", 
    label: "매출 증대", 
    icon: TrendingUp,
    description: "수익 극대화와 매출 성장"
  },
  { 
    id: "customers", 
    label: "신규 고객 확보", 
    icon: Users,
    description: "고객 기반 확대 및 인지도 향상"
  },
  { 
    id: "cost", 
    label: "비용 절감", 
    icon: DollarSign,
    description: "운영 효율화와 원가 절감"
  },
  { 
    id: "marketing", 
    label: "마케팅 강화", 
    icon: Megaphone,
    description: "브랜드 인지도와 홍보 활동"
  },
  { 
    id: "efficiency", 
    label: "운영 효율화", 
    icon: Settings,
    description: "업무 프로세스 개선 및 자동화"
  },
];

export default function BusinessGoals() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [businessGoals, setBusinessGoals] = useState<string[]>(formData.businessGoals || []);

  const toggleGoal = (goalId: string) => {
    if (businessGoals.includes(goalId)) {
      setBusinessGoals(businessGoals.filter((id) => id !== goalId));
    } else {
      setBusinessGoals([...businessGoals, goalId]);
    }
  };

  const handleNext = () => {
    if (businessGoals.length === 0) return;
    updateFormData({ businessGoals });
    setCurrentStep(10);
    navigate("/confirmation");
  };

  const handleBack = () => {
    setCurrentStep(8);
    navigate("/vision-values");
  };

  const getSelectedGoalLabels = () => {
    return businessGoals.map(id => goalOptions.find(g => g.id === id)?.label).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">새 프로젝트 설정</h1>
        <StepProgress currentStep={9} totalSteps={10} />

        <h2 className="text-3xl md:text-4xl font-bold mb-2 mt-8">주요 목표를 선택하세요</h2>
        <p className="text-muted-foreground mb-8">
          사업에서 우선적으로 달성하고 싶은 목표를 선택해주세요 (중복 선택 가능)
        </p>

        <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="text-xl font-bold">목표 기반 로드맵</h3>
              <p className="text-sm text-muted-foreground">
                선택한 목표에 따라 맞춤형 액션 플랜과 우선순위가 제공됩니다
              </p>
            </div>
          </div>
        </div>

        {businessGoals.length > 0 && (
          <div className="mb-6 p-4 bg-accent rounded-2xl">
            <p className="text-sm font-medium mb-3">선택한 목표 ({businessGoals.length}개)</p>
            <div className="flex flex-wrap gap-2">
              {getSelectedGoalLabels().map((label) => (
                <Badge key={label} variant="default" className="text-base">
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {goalOptions.map((goal) => {
            const isSelected = businessGoals.includes(goal.id);
            const Icon = goal.icon;
            
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-105 ${
                  isSelected
                    ? "border-[hsl(var(--pale-mint))] bg-[hsl(var(--pale-mint))]/10"
                    : "border-input bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    isSelected 
                      ? "bg-[hsl(var(--pale-mint))]/20" 
                      : "bg-accent"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{goal.label}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-[hsl(var(--pale-mint))] flex items-center justify-center">
                        <X className="h-4 w-4 text-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
          <h4 className="font-bold mb-3">💡 목표별 추천 사항</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• <strong>매출 증대</strong>: 메뉴 최적화, 가격 전략, 프로모션 강화</li>
            <li>• <strong>신규 고객 확보</strong>: SNS 마케팅, 지역 홍보, 리뷰 관리</li>
            <li>• <strong>비용 절감</strong>: 공급망 최적화, 재고 관리, 인건비 효율화</li>
            <li>• <strong>마케팅 강화</strong>: 브랜딩 전략, 온라인 마케팅, 이벤트 기획</li>
            <li>• <strong>운영 효율화</strong>: POS 시스템, 예약 관리, 배달 시스템</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
          <Button 
            onClick={handleNext}
            disabled={businessGoals.length === 0}
            className="gap-2"
            style={businessGoals.length > 0 ? { 
              backgroundColor: "hsl(var(--pale-mint))", 
              color: "hsl(var(--foreground))" 
            } : {}}
          >
            다음
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
