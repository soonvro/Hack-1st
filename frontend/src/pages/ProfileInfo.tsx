import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepProgress } from "@/components/StepProgress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import jobCategories from "@/data/korean_job_categories_dataset.json";

export default function ProfileInfo() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  
  const [currentSubStep, setCurrentSubStep] = useState<number>(0);
  const [localData, setLocalData] = useState({
    age: formData.age,
    gender: formData.gender,
    previousOccupationCategory: formData.previousOccupationCategory,
    previousOccupationDetail: formData.previousOccupationDetail,
    mbti: formData.mbti,
    hasStartupExperience: formData.hasStartupExperience,
  });

  const isStepValid = () => {
    switch (currentSubStep) {
      case 0:
        return localData.age !== "";
      case 1:
        return localData.gender !== "";
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return localData.hasStartupExperience !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentSubStep === 4) {
      updateFormData(localData);
      setCurrentStep(2);
      navigate("/project-type");
    } else {
      setCurrentSubStep(currentSubStep + 1);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  const mbtiOptions = [
    "ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50">
          <StepProgress currentStep={1} totalSteps={6} onBack={currentSubStep > 0 ? handleBack : undefined} />
          
          {/* 상단 타이틀 - 고정 */}
          <div className="text-center mb-8 mt-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              창업 여정의 첫걸음, AI가 같이 걸을 수 있게<br />당신에 대해 알려주세요 🚀
            </h2>
          </div>

          {/* Step 0 - 나이 입력 */}
          {currentSubStep === 0 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  사장님의 나이를 알려주세요! 🎂 <span className="text-red-500">*(필수)</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  만 나이를 선택해주세요
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <Select
                  value={localData.age}
                  onValueChange={(value) => {
                    setLocalData({ ...localData, age: value });
                  }}
                >
                  <SelectTrigger className="h-16 text-lg border-2 rounded-2xl focus:border-primary transition-all duration-300 hover:shadow-lg">
                    <SelectValue placeholder="나이를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] rounded-2xl">
                    {Array.from({ length: 61 }, (_, i) => i + 20).map((age) => (
                      <SelectItem key={age} value={age.toString()} className="text-lg rounded-xl">
                        만 {age}세
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {localData.age && (
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-2xl border-2 border-blue-300 dark:border-blue-700 text-center animate-bounce-in">
                    <p className="text-sm text-muted-foreground mb-1">선택하신 나이</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">만 {localData.age}세</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 1 - 성별 선택 */}
          {currentSubStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  사장님의 성별을 선택해주세요! 👤 <span className="text-red-500">*(필수)</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  해당하는 성별을 선택해주세요
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "M", label: "남성", emoji: "👨" },
                    { value: "F", label: "여성", emoji: "👩" },
                  ].map((option) => {
                    const isSelected = localData.gender === option.value;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setLocalData({ ...localData, gender: option.value as "M" | "F" });
                        }}
                        className={`h-32 rounded-2xl text-2xl font-bold transition-all duration-500 transform ${
                          isSelected
                            ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white border-4 border-blue-500 scale-110 shadow-2xl"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-foreground border-2 border-border hover:scale-105 hover:shadow-xl"
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div>{option.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - 전직업 선택 */}
          {currentSubStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  사장님의 이전 직업이 있으신가요? 💼
                </h1>
                <p className="text-muted-foreground text-lg">
                  선택사항입니다. 건너뛰셔도 됩니다.
                </p>
              </div>

              {localData.previousOccupationDetail && (
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-5 rounded-2xl border-2 border-indigo-300 dark:border-indigo-700 animate-bounce-in">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">✅ 선택된 직업</p>
                      <p className="font-bold text-lg">
                        {localData.previousOccupationCategory} &gt; {localData.previousOccupationDetail}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setLocalData({
                          ...localData,
                          previousOccupationCategory: "",
                          previousOccupationDetail: "",
                        })
                      }
                      className="text-sm text-muted-foreground hover:text-foreground underline whitespace-nowrap transition-colors"
                    >
                      선택 취소
                    </button>
                  </div>
                </div>
              )}

              <Accordion type="single" collapsible className="w-full border-2 rounded-2xl overflow-hidden">
                {Object.entries(jobCategories).map(([category, jobs]) => (
                  <AccordionItem key={category} value={category} className="border-b-2 last:border-b-0">
                    <AccordionTrigger className="px-6 text-lg font-bold hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
                        {jobs.map((job) => {
                          const isSelected = 
                            localData.previousOccupationCategory === category &&
                            localData.previousOccupationDetail === job;
                          
                          return (
                            <button
                              key={job}
                              onClick={() => {
                                setLocalData({
                                  ...localData,
                                  previousOccupationCategory: category,
                                  previousOccupationDetail: job,
                                });
                                setTimeout(() => setCurrentSubStep(currentSubStep + 1), 1000);
                              }}
                              className={`p-4 rounded-2xl text-sm font-semibold text-center transition-all duration-500 transform ${
                                isSelected
                                  ? "bg-gradient-to-br from-indigo-400 to-purple-500 text-white border-2 border-indigo-500 scale-110 shadow-xl"
                                  : "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-foreground border-2 border-indigo-200 dark:border-indigo-800 hover:scale-105 hover:shadow-lg"
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

              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setLocalData({
                      ...localData,
                      previousOccupationCategory: "",
                      previousOccupationDetail: "",
                    });
                    setTimeout(() => setCurrentSubStep(currentSubStep + 1), 300);
                  }}
                  className="text-base text-muted-foreground hover:text-foreground underline font-semibold transition-colors"
                >
                  건너뛰기 →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - MBTI 선택 */}
          {currentSubStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  사장님의 MBTI를 알려주세요! 🎭
                </h1>
                <p className="text-muted-foreground text-lg">
                  선택사항입니다. 모르시거나 건너뛰셔도 됩니다.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <Select
                  value={localData.mbti}
                  onValueChange={(value) => {
                    setLocalData({ ...localData, mbti: value });
                    setTimeout(() => setCurrentSubStep(currentSubStep + 1), 1000);
                  }}
                >
                  <SelectTrigger className="h-16 text-lg border-2 rounded-2xl focus:border-primary transition-all duration-300 hover:shadow-lg">
                    <SelectValue placeholder="MBTI를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] rounded-2xl">
                    <SelectItem value="none" className="text-muted-foreground rounded-xl">
                      모르겠어요 / 건너뛰기
                    </SelectItem>
                    {mbtiOptions.map((mbti) => (
                      <SelectItem key={mbti} value={mbti} className="text-lg rounded-xl">
                        {mbti}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {localData.mbti && localData.mbti !== "none" && (
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 p-6 rounded-2xl border-2 border-pink-300 dark:border-pink-700 text-center animate-bounce-in">
                    <p className="text-sm text-muted-foreground mb-1">선택하신 MBTI</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{localData.mbti}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4 - 창업 경험 여부 */}
          {currentSubStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  창업 경험이 있으신가요? 🚀 <span className="text-red-500">*(필수)</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  해당하는 항목을 선택해주세요
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "처음 창업", label: "처음 창업", description: "첫 도전입니다", emoji: "🌱" },
                    { value: "경험 있음", label: "경험 있음", description: "이전에 경험이 있습니다", emoji: "⭐" },
                  ].map((option) => {
                    const isSelected = localData.hasStartupExperience === option.value;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          const updatedData = {
                            ...localData,
                            hasStartupExperience: option.value as "처음 창업" | "경험 있음",
                          };
                          setLocalData(updatedData);
                        }}
                        className={`p-6 rounded-2xl text-lg font-bold transition-all duration-500 transform ${
                          isSelected
                            ? "bg-gradient-to-br from-green-400 to-blue-500 text-white border-4 border-green-500 scale-110 shadow-2xl"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-foreground border-2 border-border hover:scale-105 hover:shadow-xl"
                        }`}
                      >
                        <div className="text-4xl mb-3">{option.emoji}</div>
                        <div className="mb-2">{option.label}</div>
                        <div className="text-xs font-normal text-muted-foreground">{option.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 선택한 내용 요약 - 하단에 배치 */}
          {currentSubStep > 0 && (
            <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-200 dark:from-blue-900/20 dark:to-blue-900/20 dark:border-blue-800 rounded-2xl shadow-lg animate-fade-in">
              <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">📋</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  선택한 내용
                </span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-blue-900 hover:shadow-md transition-shadow">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <span className="text-lg">🎂</span>
                    나이
                  </span>
                  <span className="font-bold text-primary">{localData.age ? `만 ${localData.age}세` : "선택안함"}</span>
                </div>
                {currentSubStep > 1 && (
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-blue-900 hover:shadow-md transition-shadow">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <span className="text-lg">👤</span>
                      성별
                    </span>
                    <span className="font-bold text-primary">{localData.gender === "M" ? "남성 👨" : localData.gender === "F" ? "여성 👩" : "선택안함"}</span>
                  </div>
                )}
                {currentSubStep > 2 && (
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-blue-900 hover:shadow-md transition-shadow md:col-span-2">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <span className="text-lg">💼</span>
                      전직업
                    </span>
                    <span className="font-bold text-primary text-right">
                      {localData.previousOccupationDetail 
                        ? `${localData.previousOccupationCategory} > ${localData.previousOccupationDetail}` 
                        : "선택안함"}
                    </span>
                  </div>
                )}
                {currentSubStep > 3 && (
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-blue-900 hover:shadow-md transition-shadow md:col-span-2">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <span className="text-lg">🎭</span>
                      MBTI
                    </span>
                    <span className="font-bold text-primary">{localData.mbti && localData.mbti !== "none" ? localData.mbti : "선택안함"}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 네비게이션 버튼 - 폼 외부 */}
          <div className="flex gap-4 mt-10">
            {currentSubStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="h-14 text-base px-10 border-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:border-primary"
                size="lg"
              >
                ← 이전
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              variant={isStepValid() ? "blue" : "ghost"}
              className={`h-14 text-base flex-1 font-bold rounded-xl transition-all duration-300 ${
                isStepValid()
                  ? "hover:scale-105 shadow-lg hover:shadow-xl"
                  : "cursor-not-allowed opacity-50"
              }`}
              size="lg"
            >
              {currentSubStep === 4 ? "완료 →" : "다음 →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
