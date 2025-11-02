import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { StepProgress } from "@/components/StepProgress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Edit, MapPin, Wallet, Lightbulb, Target, User } from "lucide-react";

export default function Confirmation() {
  const navigate = useNavigate();
  const { formData, setCurrentStep } = useFormContext();

  const handleStart = () => {
    console.log("Starting analysis with data:", formData);
    // TODO: 로드맵 생성 페이지로 이동
  };

  const handleEdit = (step: number, path: string) => {
    setCurrentStep(step);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">새 프로젝트 설정</h1>
        <StepProgress currentStep={10} totalSteps={10} />

        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">모든 준비가 완료되었습니다!</h2>
          <p className="text-muted-foreground">
            입력하신 정보를 확인하시고 로드맵 생성을 시작하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold">프로필 정보</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(1, "/profile-info")}
                  className="h-8"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">나이:</span>
                  <span className="font-medium">만 {formData.age}세</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">성별:</span>
                  <span className="font-medium">{formData.gender === "M" ? "남" : "여"}</span>
                </div>
                {formData.previousOccupationDetail && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">전 직업:</span>
                    <span className="font-medium text-right">{formData.previousOccupationDetail}</span>
                  </div>
                )}
                {formData.mbti && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MBTI:</span>
                    <span className="font-medium">{formData.mbti}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">창업 경험:</span>
                  <span className="font-medium">{formData.hasStartupExperience}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold">업종 정보</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(3, "/industry-category-selection")}
                  className="h-8"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">대분류</p>
                  <Badge variant="default">{formData.industryCategory}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">세부 업종</p>
                  <Badge variant="secondary">{formData.industry}</Badge>
                </div>
                {formData.businessOptions.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">운영 옵션</p>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.businessOptions.map((option) => (
                        <Badge key={option} variant="outline" className="text-xs">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold">희망 지역</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(6, "/location-selection")}
                  className="h-8"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.selectedDistricts.map((district) => (
                  <Badge key={district} variant="outline">
                    {district}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold">자본금</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(7, "/budget-input")}
                  className="h-8"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
              </div>
              <p className="text-2xl font-bold">{formData.budgetAmount.toLocaleString()}원</p>
              {formData.budgetRange && (
                <p className="text-sm text-muted-foreground mt-1">
                  범위: {formData.budgetRange}
                </p>
              )}
            </CardContent>
          </Card>

          {(formData.visionTags.length > 0 || formData.visionText) && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold">비전 & 가치</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(8, "/vision-values")}
                    className="h-8"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    수정
                  </Button>
                </div>
                {formData.visionTags.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {formData.visionTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {formData.visionText && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {formData.visionText}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {formData.businessGoals.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold">비즈니스 목표</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(9, "/business-goals")}
                    className="h-8"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    수정
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.businessGoals.map((goal) => (
                    <Badge key={goal} variant="default">
                      {goal === "sales" && "매출 증대"}
                      {goal === "customers" && "신규 고객 확보"}
                      {goal === "cost" && "비용 절감"}
                      {goal === "marketing" && "마케팅 강화"}
                      {goal === "efficiency" && "운영 효율화"}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mb-8 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4">📊 생성될 분석 항목</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>선택 지역 상권 분석 및 유동인구 데이터</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>경쟁 업체 현황 및 시장 포화도 분석</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>예상 매출 및 손익분기점 계산</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>최적 입지 및 임대료 추천</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>맞춤형 창업 로드맵 및 일정</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>정책자금 및 지원사업 매칭</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * 분석은 약 10~15초 정도 소요되며, 입력하신 정보를 기반으로 생성됩니다
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => handleEdit(9, "/business-goals")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
          <Button 
            onClick={handleStart} 
            size="lg"
            className="gap-2 px-12 py-6 text-lg font-bold bg-[#1d21f5] hover:bg-[#1418d0] text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Sparkles className="h-5 w-5" />
            로드맵 생성 시작
          </Button>
        </div>
      </div>
    </div>
  );
}
