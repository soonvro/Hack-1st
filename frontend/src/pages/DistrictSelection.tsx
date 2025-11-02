import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepProgress } from "@/components/StepProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
const seoulDistricts = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];
const budgetRanges = [{
  id: "under_10",
  label: "1천만원 미만",
  value: 5000000
}, {
  id: "10_50",
  label: "1천만원 - 5천만원",
  value: 30000000
}, {
  id: "50_100",
  label: "5천만원 - 1억",
  value: 75000000
}, {
  id: "over_100",
  label: "1억 이상",
  value: 150000000
}, {
  id: "custom",
  label: "기타",
  value: 0
}];
export default function DistrictSelection() {
  const navigate = useNavigate();
  const {
    formData,
    updateFormData,
    setCurrentStep
  } = useFormContext();
  const [selectedDistrict, setSelectedDistrict] = useState<string>(formData.selectedDistricts[0] || "");
  const [customInput, setCustomInput] = useState("");
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
  };
  const handleCustomInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const numValue = parseInt(numericValue);
    
    if (!isNaN(numValue) && numValue > 5000000000) {
      toast.error("50억원 이하로 입력해주세요");
      return;
    }
    
    setCustomInput(numericValue);
  };

  const formatNumberWithCommas = (value: string) => {
    if (!value) return '';
    return parseInt(value).toLocaleString();
  };
  const getBudgetAmount = () => {
    return parseInt(customInput) || 0;
  };
  const handleNext = () => {
    if (!selectedDistrict) {
      toast.error("지역을 선택해주세요");
      return;
    }
    const budgetAmount = getBudgetAmount();
    if (budgetAmount === 0) {
      toast.error("자본금을 선택하거나 입력해주세요");
      return;
    }
    updateFormData({
      selectedDistricts: [selectedDistrict],
      budgetAmount
    });
    setCurrentStep(6);
    navigate("/selection-summary");
  };
  const handleBack = () => {
    setCurrentStep(4);
    navigate("/industry-detail-selection");
  };
  return <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm">
          <StepProgress currentStep={5} totalSteps={6} onBack={handleBack} />
          
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                지역을 선택하세요
              </h1>
              <p className="text-muted-foreground text-lg">
                창업을 계획하고 있는 지역을 선택해주세요 <span className="text-destructive">*</span>
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Select value={selectedDistrict} onValueChange={handleDistrictSelect}>
                <SelectTrigger className="h-16 text-lg border-2 focus:border-primary">
                  <SelectValue placeholder="구를 선택하세요" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {seoulDistricts.map(district => <SelectItem key={district} value={district} className="text-lg">
                      {district}
                    </SelectItem>)}
                </SelectContent>
              </Select>

              {selectedDistrict && <div className="bg-primary/10 p-4 rounded-xl border-2 border-primary text-center animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-1">선택하신 지역</p>
                  <p className="text-2xl font-bold">서울시 {selectedDistrict}</p>
                </div>}
            </div>

            {/* 자본금 섹션 - 지역 선택 후 표시 */}
            {selectedDistrict && <>
                <Separator className="my-8" />
                
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">초기 자본금을 입력하세요</h2>
                    <p className="text-muted-foreground text-base">
                      보유하고 계신 창업 자본금을 선택하거나 입력해주세요 <span className="text-destructive">*</span>
                    </p>
                  </div>

                  <div className="max-w-xl mx-auto">
                    <div className="space-y-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formatNumberWithCommas(customInput)}
                          onChange={e => handleCustomInput(e.target.value)}
                          placeholder="금액을 입력하세요"
                          className="h-14 text-lg pr-12 border-2"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                          원
                        </span>
                      </div>
                      
                      {customInput && (
                        <p className="text-base text-muted-foreground text-center">
                          자본금: <span className="font-bold text-foreground text-lg">{formatNumberWithCommas(customInput)}원</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>}

            {/* 다음 버튼 */}
            {selectedDistrict && <div className="flex justify-center pt-4">
                <Button onClick={handleNext} disabled={!selectedDistrict || getBudgetAmount() === 0} size="lg" className="w-full max-w-md h-14 text-lg font-bold">
                  다음
                </Button>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}