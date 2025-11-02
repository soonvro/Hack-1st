import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { StepProgress } from "@/components/StepProgress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Flame, Soup, Croissant, UtensilsCrossed, Fish, Globe, Beer, ChefHat, Coffee, Drumstick, Pizza, Sandwich, CookingPot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ConceptData {
  name: string;
  tags: string[];
}

const industryData: Record<string, ConceptData[]> = {
  "고기구이": [
    { name: "돼지고기 구이 전문점 (삼겹살, 목살 등)", tags: ["가성비", "회식"] },
    { name: "소고기 구이 전문점 (한우, 갈비 등)", tags: ["고급", "특별한날"] },
    { name: "닭갈비 전문점", tags: ["매콤", "젊은층"] },
    { name: "오리고기 전문점", tags: ["건강", "보양"] },
    { name: "양고기 전문점 (양꼬치, 양갈비)", tags: ["이색", "트렌디"] },
    { name: "곱창/막창/대창 전문점", tags: ["술안주", "야식"] }
  ],
  "국물요리": [
    { name: "국밥 전문점 (순대국, 돼지국밥, 소머리국밥 등)", tags: ["한끼식사", "든든"] },
    { name: "찌개 전문점 (김치찌개, 된장찌개, 부대찌개 등)", tags: ["가정식", "따뜻"] },
    { name: "전골 전문점 (버섯전골, 곱창전골, 만두전골 등)", tags: ["공유", "겨울"] },
    { name: "탕 전문점 (갈비탕, 설렁탕, 감자탕 등)", tags: ["보양", "해장"] },
    { name: "삼계탕/닭한마리 전문점", tags: ["건강", "여름"] }
  ],
  "베이커리": [
    { name: "동네 빵집/프랜차이즈 베이커리", tags: ["일상", "아침"] },
    { name: "케이크/타르트 전문점", tags: ["디저트", "선물용"] },
    { name: "건강빵/자연발효빵 전문점", tags: ["웰빙", "프리미엄"] },
    { name: "샌드위치/샐러드 전문점", tags: ["간편", "건강"] },
    { name: "도넛/꽈배기 전문점", tags: ["달콤", "간식"] },
    { name: "베이글 전문점", tags: ["트렌디", "브런치"] },
    { name: "식빵 전문점", tags: ["고급", "선물용"] }
  ],
  "분식": [
    { name: "종합 분식점 (김밥, 떡볶이, 라면, 튀김 등)", tags: ["가성비", "학생"] },
    { name: "프리미엄 김밥 전문점", tags: ["고급화", "테이크아웃"] },
    { name: "떡볶이 전문점 (즉석떡볶이, 국물떡볶이 등)", tags: ["매콤", "간식"] },
    { name: "만두 전문점", tags: ["든든", "간편"] },
    { name: "핫도그/토스트 전문점", tags: ["간편", "테이크아웃"] }
  ],
  "수산물": [
    { name: "횟집/사시미 전문점", tags: ["신선", "특별한날"] },
    { name: "해물탕/해물찜 전문점", tags: ["푸짐", "회식"] },
    { name: "생선구이 전문점", tags: ["건강", "한식"] },
    { name: "조개구이/조개찜 전문점", tags: ["술안주", "캐주얼"] },
    { name: "장어 전문점", tags: ["보양", "고급"] },
    { name: "아귀찜 전문점", tags: ["매콤", "단체"] },
    { name: "게장/대게 요리 전문점", tags: ["고급", "특별한날"] },
    { name: "해산물 포차", tags: ["술안주", "분위기"] }
  ],
  "양식/기타세계요리": [
    { name: "이탈리안 레스토랑 (파스타, 리조또)", tags: ["데이트", "캐주얼"] },
    { name: "스테이크 하우스", tags: ["고급", "기념일"] },
    { name: "멕시칸 요리 전문점 (타코, 브리또)", tags: ["이색", "젊은층"] },
    { name: "동남아 요리 전문점 (베트남 쌀국수, 태국 음식 등)", tags: ["가성비", "건강"] },
    { name: "인도 요리 전문점 (커리)", tags: ["이색", "향신료"] },
    { name: "샐러드/포케 전문점", tags: ["건강", "다이어트"] },
    { name: "브런치 전문점", tags: ["여유", "주말"] }
  ],
  "일식": [
    { name: "스시/초밥 전문점 (오마카세, 회전초밥 포함)", tags: ["신선", "고급"] },
    { name: "돈까스 전문점", tags: ["가성비", "든든"] },
    { name: "라멘 전문점", tags: ["진한맛", "간편"] },
    { name: "일본식 덮밥(돈부리) 전문점", tags: ["빠른식사", "가성비"] },
    { name: "우동/소바 전문점", tags: ["담백", "간편"] },
    { name: "이자카야 (일본식 선술집)", tags: ["술안주", "분위기"] }
  ],
  "주점": [
    { name: "실내 포장마차", tags: ["분위기", "캐주얼"] },
    { name: "호프/수제맥주 전문점", tags: ["맥주", "젊은층"] },
    { name: "전통/민속 주점 (막걸리, 전 등)", tags: ["전통", "중장년"] },
    { name: "와인바", tags: ["고급", "데이트"] },
    { name: "칵테일바/라운지바", tags: ["분위기", "트렌디"] },
    { name: "위스키/몰트바", tags: ["프리미엄", "성숙"] }
  ],
  "중식": [
    { name: "일반 중식당 (짜장면, 짬뽕, 탕수육)", tags: ["가성비", "배달"] },
    { name: "마라탕/마라샹궈 전문점", tags: ["매콤", "트렌디"] },
    { name: "양꼬치 전문점", tags: ["이색", "술안주"] },
    { name: "훠궈 전문점", tags: ["공유", "겨울"] },
    { name: "딤섬 전문점", tags: ["브런치", "고급"] },
    { name: "정통 중화요리 전문점", tags: ["고급", "연회"] }
  ],
  "카페/디저트": [
    { name: "커피 전문점/로스터리 카페", tags: ["여유", "프리미엄"] },
    { name: "디저트 카페 (케이크, 마카롱, 구움과자 등)", tags: ["달콤", "인스타"] },
    { name: "테마 카페 (북카페, 보드게임, 펫카페 등)", tags: ["특색", "체험"] },
    { name: "전통 찻집/티 전문점", tags: ["전통", "힐링"] },
    { name: "빙수 전문점", tags: ["여름", "시원"] },
    { name: "생과일주스/요거트 전문점", tags: ["건강", "상쾌"] },
    { name: "아이스크림/젤라또 전문점", tags: ["디저트", "아이동반"] }
  ],
  "치킨/닭강정": [
    { name: "후라이드/양념치킨 전문점 (배달 중심)", tags: ["배달", "야식"] },
    { name: "오븐구이/바베큐치킨 전문점", tags: ["건강", "담백"] },
    { name: "닭강정 전문점", tags: ["달콤", "간식"] },
    { name: "찜닭 전문점", tags: ["매콤", "단체"] },
    { name: "닭발 전문점", tags: ["매콤", "술안주"] },
    { name: "옛날통닭 전문점", tags: ["추억", "가성비"] }
  ],
  "피자 전문점": [
    { name: "배달 전문 피자 (프랜차이즈형)", tags: ["배달", "가족"] },
    { name: "화덕피자 전문점", tags: ["고급", "이탈리안"] },
    { name: "미국식 피자 전문점 (시카고, 디트로이트 스타일 등)", tags: ["이색", "푸짐"] }
  ],
  "버거 전문점": [
    { name: "프랜차이즈 버거 전문점", tags: ["빠른식사", "가성비"] },
    { name: "수제버거 전문점", tags: ["프리미엄", "맛집"] }
  ],
  "한식": [
    { name: "백반/가정식 전문점", tags: ["한끼", "가정식"] },
    { name: "한정식 전문점", tags: ["고급", "전통"] },
    { name: "비빔밥 전문점", tags: ["건강", "한식"] },
    { name: "냉면 전문점", tags: ["시원", "여름"] },
    { name: "칼국수/수제비 전문점", tags: ["든든", "가성비"] },
    { name: "보쌈/족발 전문점", tags: ["회식", "술안주"] },
    { name: "찜/조림 전문점 (갈비찜, 생선조림 등)", tags: ["특별한날", "정성"] }
  ]
};

const industries = [
  { id: "고기구이", label: "고기구이", icon: Flame, color: "from-red-500 to-orange-500" },
  { id: "국물요리", label: "국물요리", icon: Soup, color: "from-amber-500 to-yellow-500" },
  { id: "베이커리", label: "베이커리", icon: Croissant, color: "from-amber-400 to-orange-400" },
  { id: "분식", label: "분식", icon: UtensilsCrossed, color: "from-pink-500 to-red-500" },
  { id: "수산물", label: "수산물", icon: Fish, color: "from-cyan-500 to-blue-500" },
  { id: "양식/기타세계요리", label: "양식/기타세계요리", icon: Globe, color: "from-green-500 to-emerald-500" },
  { id: "일식", label: "일식", icon: Fish, color: "from-rose-500 to-pink-500" },
  { id: "주점", label: "주점", icon: Beer, color: "from-yellow-600 to-amber-600" },
  { id: "중식", label: "중식", icon: ChefHat, color: "from-red-600 to-rose-600" },
  { id: "카페/디저트", label: "카페/디저트", icon: Coffee, color: "from-brown-500 to-orange-700" },
  { id: "치킨/닭강정", label: "치킨/닭강정", icon: Drumstick, color: "from-orange-500 to-red-500" },
  { id: "피자 전문점", label: "피자 전문점", icon: Pizza, color: "from-red-500 to-yellow-500" },
  { id: "버거 전문점", label: "버거 전문점", icon: Sandwich, color: "from-yellow-500 to-orange-500" },
  { id: "한식", label: "한식", icon: CookingPot, color: "from-green-600 to-teal-600" },
];

export default function IndustryCategorySelection() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<string>(formData.industryCategory);
  const [selectedDetail, setSelectedDetail] = useState<string>(formData.industry);

  const handleBack = () => {
    setCurrentStep(2);
    navigate("/project-type");
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedDetail("");
    updateFormData({ 
      industryCategory: categoryId,
      industry: ""
    });
  };

  const handleDetailSelect = (detail: string) => {
    setSelectedDetail(detail);
    updateFormData({ industry: detail });
  };

  const handleNext = () => {
    if (selectedCategory && selectedDetail) {
      setCurrentStep(4);
      navigate("/district-selection");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50/30 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <StepProgress currentStep={3} totalSteps={6} onBack={handleBack} />
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">업종 대분류를 선택하세요</h1>
          <p className="text-lg text-muted-foreground">
            운영하실 업종의 대분류를 선택해주세요
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedCategory === industry.id;
            return (
              <button
                key={industry.id}
                onClick={() => handleCategorySelect(industry.id)}
                className={`group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  isSelected
                    ? "border-primary bg-primary text-white shadow-lg scale-105"
                    : "border-primary/30 bg-white hover:border-primary hover:bg-primary/5"
                }`}
              >
                <Icon className={`h-14 w-14 md:h-16 md:w-16 mb-4 transition-all duration-300 ${
                  isSelected
                    ? "text-white scale-110"
                    : "text-primary group-hover:scale-110"
                }`} />
                <h3 className={`font-bold text-center text-sm md:text-base transition-colors ${
                  isSelected ? "text-white" : "text-primary"
                }`}>{industry.label}</h3>
                <p className={`text-xs mt-2 transition-colors ${
                  isSelected ? "text-white/80" : "text-primary/70"
                }`}>
                  {industryData[industry.id]?.length || 0}개 콘셉트
                </p>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Separator className="my-12" />
            
            <div className="mb-8 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">콘셉트를 선택하세요</h2>
              <p className="text-lg text-muted-foreground">
                {selectedCategory}의 콘셉트를 선택해주세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {industryData[selectedCategory]?.map((concept, index) => {
                const isSelected = selectedDetail === concept.name;
                return (
                  <button
                    key={index}
                    onClick={() => handleDetailSelect(concept.name)}
                    className={`group text-left p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isSelected
                        ? "border-primary bg-primary text-white shadow-lg"
                        : "border-border bg-white hover:border-primary/50"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 transition-colors ${
                          isSelected ? "bg-white" : "bg-primary"
                        }`} />
                        <h3 className={`text-base md:text-lg font-semibold leading-relaxed transition-colors ${
                          isSelected ? "text-white" : "text-foreground"
                        }`}>
                          {concept.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-5">
                        {concept.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant={isSelected ? "secondary" : "outline"}
                            className={`text-xs ${
                              isSelected 
                                ? "bg-white/20 text-white border-white/30" 
                                : "text-primary/80 border-primary/20 bg-primary/5"
                            }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-8">
              <Button 
                onClick={handleNext}
                disabled={!selectedDetail}
                size="lg"
                variant="blue"
                className="px-12 py-6 text-lg font-bold rounded-xl"
              >
                다음 단계로
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}