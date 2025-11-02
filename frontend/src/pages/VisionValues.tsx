import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { StepProgress } from "@/components/StepProgress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Lightbulb, X } from "lucide-react";

const recommendedTags = [
  { id: "warm", label: "#따뜻한", icon: "☕" },
  { id: "value", label: "#가성비", icon: "💰" },
  { id: "premium", label: "#프리미엄", icon: "👑" },
  { id: "eco", label: "#친환경", icon: "🌱" },
  { id: "trendy", label: "#트렌디", icon: "✨" },
  { id: "traditional", label: "#전통적인", icon: "🏮" },
  { id: "modern", label: "#모던한", icon: "🎨" },
  { id: "cozy", label: "#아늑한", icon: "🏡" },
  { id: "luxury", label: "#럭셔리", icon: "💎" },
  { id: "casual", label: "#캐주얼", icon: "👕" },
  { id: "healthy", label: "#건강한", icon: "🥗" },
  { id: "fun", label: "#재미있는", icon: "🎉" },
];

export default function VisionValues() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [visionTags, setVisionTags] = useState<string[]>(formData.visionTags || []);
  const [visionText, setVisionText] = useState(formData.visionText || "");

  const toggleTag = (tagLabel: string) => {
    if (visionTags.includes(tagLabel)) {
      setVisionTags(visionTags.filter((tag) => tag !== tagLabel));
    } else {
      setVisionTags([...visionTags, tagLabel]);
    }
  };

  const handleNext = () => {
    updateFormData({ visionTags, visionText });
    setCurrentStep(9);
    navigate("/business-goals");
  };

  const handleBack = () => {
    setCurrentStep(7);
    navigate("/budget-input");
  };

  const handleSkip = () => {
    updateFormData({ visionTags: [], visionText: "" });
    setCurrentStep(9);
    navigate("/business-goals");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">새 프로젝트 설정</h1>
        <StepProgress currentStep={8} totalSteps={10} />

        <h2 className="text-3xl md:text-4xl font-bold mb-2 mt-8">비전과 가치를 설정하세요</h2>
        <p className="text-muted-foreground mb-2">
          추구하는 사업의 방향성과 가치를 선택하거나 입력해주세요
        </p>
        <p className="text-sm text-muted-foreground mb-8">(선택사항)</p>

        <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="text-xl font-bold">왜 중요한가요?</h3>
              <p className="text-sm text-muted-foreground">
                비전과 가치는 브랜드 정체성과 마케팅 전략의 핵심이 됩니다
              </p>
            </div>
          </div>
        </div>

        {visionTags.length > 0 && (
          <div className="mb-6 p-4 bg-accent rounded-2xl">
            <p className="text-sm font-medium mb-3">선택한 태그</p>
            <div className="flex flex-wrap gap-2">
              {visionTags.map((tag) => (
                <Badge key={tag} variant="default" className="gap-1 pr-1 text-base">
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 rounded-full hover:bg-background/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">추천 키워드 태그</h3>
          <p className="text-sm text-muted-foreground mb-4">
            해당하는 키워드를 선택해주세요 (중복 선택 가능)
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recommendedTags.map((tag) => {
              const isSelected = visionTags.includes(tag.label);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.label)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    isSelected
                      ? "border-[hsl(var(--pale-mint))] bg-[hsl(var(--pale-mint))]/10"
                      : "border-input bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{tag.icon}</div>
                  <p className="text-sm font-semibold">{tag.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8 p-6 bg-card rounded-3xl border">
          <h3 className="text-xl font-bold mb-4">자유 텍스트 입력</h3>
          <p className="text-sm text-muted-foreground mb-4">
            더 구체적인 비전이나 가치를 직접 작성해주세요
          </p>
          
          <Textarea
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
            placeholder="예: 건강한 재료로 만든 음식을 제공하여 고객의 삶에 활력을 더하고 싶습니다. 지역 사회와 함께 성장하는 가게를 만들겠습니다."
            className="min-h-32 text-base"
          />
          
          <p className="text-xs text-muted-foreground mt-2">
            {visionText.length} / 500자
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleSkip}>
              건너뛰기
            </Button>
            <Button 
              onClick={handleNext}
              className="gap-2"
              style={{ 
                backgroundColor: "hsl(var(--pale-mint))", 
                color: "hsl(var(--foreground))" 
              }}
            >
              다음
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
