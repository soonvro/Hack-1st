import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/StepProgress";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Edit2, X, Check } from "lucide-react";
import jobCategories from "@/data/korean_job_categories_dataset.json";
import { useToast } from "@/hooks/use-toast";

const seoulDistricts = [
  "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
  "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
  "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
];

const mbtiOptions = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

const industryCategoryOptions = [
  "고기구이", "국물요리", "베이커리", "분식", "수산물", 
  "양식/기타세계요리", "일식", "주점", "중식", "카페/디저트", 
  "치킨/닭강정", "피자 전문점", "버거 전문점", "한식"
];

export default function SelectionSummary() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const { toast } = useToast();
  
  const [editMode, setEditMode] = useState<string | null>(null);
  const [tempData, setTempData] = useState(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // formData를 백엔드 요청 형식으로 변환
  const transformDataToRequest = () => {
    return {
      personalInfo: {
        name: "Gildong Hong", // 이름 필드가 없으므로 기본값 사용 (필요시 formData에서 가져오도록 수정 가능)
        gender: formData.gender === "M" ? "m" : formData.gender === "F" ? "f" : "m", // 기본값 "m"
        age: parseInt(formData.age) || 30, // string을 number로 변환
        mbti: formData.mbti && formData.mbti !== "none" ? formData.mbti : "ISTJ", // 기본값 "ISTJ"
        previous_job: formData.previousOccupationDetail || "Developer", // 기본값 "Developer"
        self_employed_experience: formData.hasStartupExperience === "경험 있음" // boolean 변환
      },
      projectInfo: {
        foodSector: formData.industry || formData.industryCategory || "한식", // 업종 상세 또는 대분류
        region: formData.selectedDistricts[0] || "강남구", // 선택된 구 (첫 번째 값)
        capital: formData.budgetAmount || 50000000 // 자본금 (기본값 5000만원)
      }
    };
  };

  // 백엔드로 데이터 전송
  const sendDataToBackend = async () => {
    try {
      setIsSubmitting(true);
      const requestData = transformDataToRequest();
      
      // 백엔드 API 엔드포인트 (환경에 맞게 수정 필요)
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api/submit";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "전송 완료",
        description: "정보가 성공적으로 전송되었습니다.",
      });
      
      return result;
    } catch (error) {
      console.error("Backend request failed:", error);
      toast({
        title: "전송 실패",
        description: error instanceof Error ? error.message : "데이터 전송 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    try {
      await sendDataToBackend();
      navigate("/roadmap-loading");
    } catch (error) {
      // 에러는 sendDataToBackend에서 이미 toast로 표시됨
      // 사용자가 재시도할 수 있도록 페이지에 머물도록 함
      console.error("Failed to submit data:", error);
    }
  };

  const handleEdit = (section: string) => {
    setEditMode(section);
    setTempData(formData);
  };

  const handleSave = () => {
    updateFormData(tempData);
    setEditMode(null);
  };

  const handleCancel = () => {
    setTempData(formData);
    setEditMode(null);
  };

  const handleBack = () => {
    setCurrentStep(5);
    navigate("/district-selection");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <StepProgress currentStep={6} totalSteps={6} onBack={handleBack} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">선택하신 정보를 확인해주세요</h1>
          <p className="text-muted-foreground">
            입력하신 정보가 맞는지 확인 후 다음 단계로 진행해주세요
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* 프로필 정보 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                프로필 정보
              </h2>
              {editMode !== "profile" ? (
                <Button variant="outline" size="sm" onClick={() => handleEdit("profile")} className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  수정
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" />
                    취소
                  </Button>
                  <Button size="sm" onClick={handleSave} className="gap-2">
                    <Check className="h-4 w-4" />
                    저장
                  </Button>
                </div>
              )}
            </div>
            
            {editMode === "profile" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">나이</label>
                  <Select value={tempData.age} onValueChange={(value) => setTempData({ ...tempData, age: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="나이를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {Array.from({ length: 61 }, (_, i) => i + 20).map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          만 {age}세
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">성별</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "M", label: "남" },
                      { value: "F", label: "여" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTempData({ ...tempData, gender: option.value as "M" | "F" })}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          tempData.gender === option.value
                            ? "bg-[hsl(var(--pale-mint))] text-foreground border-2 border-[hsl(var(--pale-mint))]"
                            : "bg-muted hover:bg-accent border-2 border-transparent"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">이전 직업 (선택사항)</label>
                  {tempData.previousOccupationDetail && (
                    <div className="bg-[hsl(var(--pale-mint))]/20 p-3 rounded-lg border-2 border-[hsl(var(--pale-mint))]">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">
                          {tempData.previousOccupationCategory} &gt; {tempData.previousOccupationDetail}
                        </p>
                        <button
                          onClick={() =>
                            setTempData({
                              ...tempData,
                              previousOccupationCategory: "",
                              previousOccupationDetail: "",
                            })
                          }
                          className="text-xs text-muted-foreground hover:text-foreground underline"
                        >
                          선택 취소
                        </button>
                      </div>
                    </div>
                  )}
                  <Accordion type="single" collapsible className="border rounded-lg">
                    {Object.entries(jobCategories).map(([category, jobs]) => (
                      <AccordionItem key={category} value={category} className="border-b last:border-b-0">
                        <AccordionTrigger className="px-3 text-sm font-semibold hover:bg-accent">
                          {category}
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3">
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            {jobs.map((job) => {
                              const isSelected = 
                                tempData.previousOccupationCategory === category &&
                                tempData.previousOccupationDetail === job;
                              
                              return (
                                <button
                                  key={job}
                                  onClick={() => {
                                    setTempData({
                                      ...tempData,
                                      previousOccupationCategory: category,
                                      previousOccupationDetail: job,
                                    });
                                  }}
                                  className={`p-2 rounded-lg text-xs text-left transition-all ${
                                    isSelected
                                      ? "bg-[hsl(var(--pale-mint))] text-foreground font-bold border-2 border-[hsl(var(--pale-mint))]"
                                      : "bg-muted hover:bg-accent border-2 border-transparent"
                                  }`}
                                >
                                  {job}
                                </button>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">MBTI (선택사항)</label>
                  <Select value={tempData.mbti} onValueChange={(value) => setTempData({ ...tempData, mbti: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="MBTI를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">모르겠어요 / 선택 안 함</SelectItem>
                      {mbtiOptions.map((mbti) => (
                        <SelectItem key={mbti} value={mbti}>
                          {mbti}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">창업 경험</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "처음 창업", label: "처음 창업" },
                      { value: "경험 있음", label: "경험 있음" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTempData({ ...tempData, hasStartupExperience: option.value as "처음 창업" | "경험 있음" })}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          tempData.hasStartupExperience === option.value
                            ? "bg-[hsl(var(--pale-mint))] text-foreground border-2 border-[hsl(var(--pale-mint))]"
                            : "bg-muted hover:bg-accent border-2 border-transparent"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">나이</span>
                  <span className="font-medium">{formData.age ? `만 ${formData.age}세` : "선택안함"}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">성별</span>
                  <span className="font-medium">
                    {formData.gender === "M" ? "남" : formData.gender === "F" ? "여" : "선택안함"}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg md:col-span-2">
                  <span className="text-muted-foreground">이전 직업</span>
                  <span className="font-medium">
                    {formData.previousOccupationDetail 
                      ? `${formData.previousOccupationCategory} > ${formData.previousOccupationDetail}` 
                      : "선택안함"}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">MBTI</span>
                  <span className="font-medium">
                    {formData.mbti && formData.mbti !== "none" ? formData.mbti : "선택안함"}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">창업 경험</span>
                  <span className="font-medium">{formData.hasStartupExperience || "선택안함"}</span>
                </div>
              </div>
            )}
          </Card>

          {/* 프로젝트 타입 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                프로젝트 타입
              </h2>
              {editMode !== "project" ? (
                <Button variant="outline" size="sm" onClick={() => handleEdit("project")} className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  수정
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" />
                    취소
                  </Button>
                  <Button size="sm" onClick={handleSave} className="gap-2">
                    <Check className="h-4 w-4" />
                    저장
                  </Button>
                </div>
              )}
            </div>
            
            {editMode === "project" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">프로젝트 타입</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "new", label: "신규 창업" },
                    { value: "existing", label: "기존 매장" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTempData({ ...tempData, projectType: option.value as "new" | "existing" })}
                      className={`p-4 rounded-lg text-sm font-medium transition-all ${
                        tempData.projectType === option.value
                          ? "bg-[hsl(var(--pale-mint))] text-foreground border-2 border-[hsl(var(--pale-mint))]"
                          : "bg-muted hover:bg-accent border-2 border-transparent"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-between p-3 bg-muted/30 rounded-lg text-sm">
                <span className="text-muted-foreground">타입</span>
                <span className="font-medium">
                  {formData.projectType === "new" ? "신규 창업" : formData.projectType === "existing" ? "기존 매장" : "선택안함"}
                </span>
              </div>
            )}
          </Card>

          {/* 업종 정보 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                업종 정보
              </h2>
              {editMode !== "industry" ? (
                <Button variant="outline" size="sm" onClick={() => handleEdit("industry")} className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  수정
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" />
                    취소
                  </Button>
                  <Button size="sm" onClick={handleSave} className="gap-2">
                    <Check className="h-4 w-4" />
                    저장
                  </Button>
                </div>
              )}
            </div>
            
            {editMode === "industry" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">업종 대분류</label>
                  <Select 
                    value={tempData.industryCategory} 
                    onValueChange={(value) => setTempData({ ...tempData, industryCategory: value, industry: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="업종 대분류를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryCategoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">업종 상세</label>
                  <input
                    type="text"
                    value={tempData.industry}
                    onChange={(e) => setTempData({ ...tempData, industry: e.target.value })}
                    placeholder="업종 상세를 입력하세요"
                    className="w-full p-3 rounded-lg border-2 border-input bg-background focus:border-[hsl(var(--pale-mint))] outline-none"
                  />
                  <p className="text-xs text-muted-foreground">업종 대분류를 선택한 후 구체적인 업종을 입력해주세요</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">지역</label>
                  <Select 
                    value={tempData.selectedDistricts[0] || ""} 
                    onValueChange={(value) => setTempData({ ...tempData, selectedDistricts: [value] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="구를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {seoulDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          서울시 {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">업종 대분류</span>
                  <span className="font-medium">{formData.industryCategory || "선택안함"}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">업종 상세</span>
                  <span className="font-medium">{formData.industry || "선택안함"}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">지역</span>
                  <span className="font-medium">
                    {formData.selectedDistricts[0] ? `서울시 ${formData.selectedDistricts[0]}` : "선택안함"}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8">
          <Button 
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full h-16 text-lg font-bold gap-3 bg-[hsl(var(--pale-mint))] hover:bg-[hsl(var(--pale-mint))]/90 text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                전송 중...
              </>
            ) : (
              <>
                로드맵 생성
                <CheckCircle2 className="h-6 w-6" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
