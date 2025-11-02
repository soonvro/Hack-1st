import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { StepProgress } from "@/components/StepProgress";
import { Button } from "@/components/ui/button";
import { Coffee, UtensilsCrossed, Pizza, Fish, Wine, Cake, Beer, Soup, Cookie, Flame, ChefHat, Drumstick } from "lucide-react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import meatGrillingImg from "@/assets/industry/meat-grilling.jpg";
import soupRestaurantImg from "@/assets/industry/soup-restaurant.jpg";
import bakeryImg from "@/assets/industry/bakery.jpg";
import bunsikImg from "@/assets/industry/bunsik.jpg";
import seafoodImg from "@/assets/industry/seafood.jpg";
import westernImg from "@/assets/industry/western.jpg";
import japaneseImg from "@/assets/industry/japanese.jpg";
import pubImg from "@/assets/industry/pub.jpg";
import chineseImg from "@/assets/industry/chinese.jpg";
import cafeImg from "@/assets/industry/cafe.jpg";
import chickenImg from "@/assets/industry/chicken.jpg";
import pizzaImg from "@/assets/industry/pizza.jpg";
import burgerImg from "@/assets/industry/burger.jpg";
import koreanImg from "@/assets/industry/korean.jpg";
const industryImages: Record<string, string> = {
  "고기구이": meatGrillingImg,
  "국물요리": soupRestaurantImg,
  "베이커리": bakeryImg,
  "분식": bunsikImg,
  "수산물": seafoodImg,
  "양식/기타세계요리": westernImg,
  "일식": japaneseImg,
  "주점": pubImg,
  "중식": chineseImg,
  "카페/디저트": cafeImg,
  "치킨/닭강정": chickenImg,
  "피자 전문점": pizzaImg,
  "버거 전문점": burgerImg,
  "한식": koreanImg
};
const industryData: Record<string, string[]> = {
  "고기구이": ["돼지고기 구이 전문점 (삼겹살, 목살 등)", "소고기 구이 전문점 (한우, 갈비 등)", "닭갈비 전문점", "오리고기 전문점", "양고기 전문점 (양꼬치, 양갈비)", "곱창/막창/대창 전문점"],
  "국물요리": ["국밥 전문점 (순대국, 돼지국밥, 소머리국밥 등)", "찌개 전문점 (김치찌개, 된장찌개, 부대찌개 등)", "전골 전문점 (버섯전골, 곱창전골, 만두전골 등)", "탕 전문점 (갈비탕, 설렁탕, 감자탕 등)", "삼계탕/닭한마리 전문점"],
  "베이커리": ["동네 빵집/프랜차이즈 베이커리", "케이크/타르트 전문점", "건강빵/자연발효빵 전문점", "샌드위치/샐러드 전문점", "도넛/꽈배기 전문점", "베이글 전문점", "식빵 전문점"],
  "분식": ["종합 분식점 (김밥, 떡볶이, 라면, 튀김 등)", "프리미엄 김밥 전문점", "떡볶이 전문점 (즉석떡볶이, 국물떡볶이 등)", "만두 전문점", "핫도그/토스트 전문점"],
  "수산물": ["횟집/사시미 전문점", "해물탕/해물찜 전문점", "생선구이 전문점", "조개구이/조개찜 전문점", "장어 전문점", "아귀찜 전문점", "게장/대게 요리 전문점", "해산물 포차"],
  "양식/기타세계요리": ["이탈리안 레스토랑 (파스타, 리조또)", "스테이크 하우스", "멕시칸 요리 전문점 (타코, 브리또)", "동남아 요리 전문점 (베트남 쌀국수, 태국 음식 등)", "인도 요리 전문점 (커리)", "샐러드/포케 전문점", "브런치 전문점"],
  "일식": ["스시/초밥 전문점 (오마카세, 회전초밥 포함)", "돈까스 전문점", "라멘 전문점", "일본식 덮밥(돈부리) 전문점", "우동/소바 전문점", "이자카야 (일본식 선술집)"],
  "주점": ["실내 포장마차", "호프/수제맥주 전문점", "전통/민속 주점 (막걸리, 전 등)", "와인바", "칵테일바/라운지바", "위스키/몰트바"],
  "중식": ["일반 중식당 (짜장면, 짬뽕, 탕수육)", "마라탕/마라샹궈 전문점", "양꼬치 전문점", "훠궈 전문점", "딤섬 전문점", "정통 중화요리 전문점"],
  "카페/디저트": ["커피 전문점/로스터리 카페", "디저트 카페 (케이크, 마카롱, 구움과자 등)", "테마 카페 (북카페, 보드게임, 펫카페 등)", "전통 찻집/티 전문점", "빙수 전문점", "생과일주스/요거트 전문점", "아이스크림/젤라또 전문점"],
  "치킨/닭강정": ["후라이드/양념치킨 전문점 (배달 중심)", "오븐구이/바베큐치킨 전문점", "닭강정 전문점", "찜닭 전문점", "닭발 전문점", "옛날통닭 전문점"],
  "피자 전문점": ["배달 전문 피자 (프랜차이즈형)", "화덕피자 전문점", "미국식 피자 전문점 (시카고, 디트로이트 스타일 등)"],
  "버거 전문점": ["프랜차이즈 버거 전문점", "수제버거 전문점"],
  "한식": ["백반/가정식 전문점", "한정식 전문점", "비빔밥 전문점", "냉면 전문점", "칼국수/수제비 전문점", "보쌈/족발 전문점", "찜/조림 전문점 (갈비찜, 생선조림 등)"]
};
const industries = [{
  id: "고기구이",
  label: "고기구이",
  icon: Flame
}, {
  id: "국물요리",
  label: "국물요리",
  icon: Soup
}, {
  id: "베이커리",
  label: "베이커리",
  icon: Cake
}, {
  id: "분식",
  label: "분식",
  icon: Cookie
}, {
  id: "수산물",
  label: "수산물",
  icon: Fish
}, {
  id: "양식/기타세계요리",
  label: "양식/기타세계요리",
  icon: ChefHat
}, {
  id: "일식",
  label: "일식",
  icon: UtensilsCrossed
}, {
  id: "주점",
  label: "주점",
  icon: Wine
}, {
  id: "중식",
  label: "중식",
  icon: Beer
}, {
  id: "카페/디저트",
  label: "카페/디저트",
  icon: Coffee
}, {
  id: "치킨/닭강정",
  label: "치킨/닭강정",
  icon: Drumstick
}, {
  id: "피자 전문점",
  label: "피자 전문점",
  icon: Pizza
}, {
  id: "버거 전문점",
  label: "버거 전문점",
  icon: UtensilsCrossed
}, {
  id: "한식",
  label: "한식",
  icon: Soup
}];
export default function IndustrySelection() {
  const navigate = useNavigate();
  const {
    formData,
    updateFormData,
    setCurrentStep
  } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDetail, setSelectedDetail] = useState<string>(formData.industry);
  const handleNext = () => {
    if (!selectedDetail) return;
    updateFormData({
      industry: selectedDetail
    });
    setCurrentStep(4);
    navigate("/concept-selection");
  };
  const handleBack = () => {
    if (selectedCategory && !selectedDetail) {
      setSelectedCategory("");
    } else {
      setCurrentStep(2);
      navigate("/project-type");
    }
  };
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedDetail("");
  };
  const handleDetailSelect = (detail: string) => {
    setSelectedDetail(detail);
  };
  return <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">새 프로젝트 설정</h1>
        <StepProgress currentStep={1} totalSteps={6} />

        <h2 className="text-3xl md:text-4xl font-bold mb-2 mt-8">업종 컨셉을 선택하세요</h2>
        <p className="text-muted-foreground mb-8">
          {!selectedCategory ? "창업하고자 하는 요식업 업종을 선택해주세요" : "세부 업종을 선택해주세요"}
        </p>

        {selectedCategory && <div className="mb-6 flex items-center gap-2">
            <Badge variant="outline" className="text-base py-2 px-4">
              {selectedCategory}
            </Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">세부 업종 선택</span>
          </div>}

        {!selectedCategory ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {industries.map(industry => {
          const Icon = industry.icon;
          return <button key={industry.id} onClick={() => handleCategorySelect(industry.id)} className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all hover:border-primary hover:bg-accent hover:shadow-lg hover:-translate-y-1 border-input bg-card">
                  <Icon className="h-12 w-12 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h3 className="font-semibold text-center">{industry.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {industryData[industry.id]?.length || 0}개 업종
                  </p>
                </button>;
        })}
          </div> : <div className="grid md:grid-cols-2 gap-6 mb-8">
            {industryData[selectedCategory]?.map((detail, index) => <button key={index} onClick={() => handleDetailSelect(detail)} className={`group text-left rounded-3xl border-2 transition-all hover:shadow-lg overflow-hidden ${selectedDetail === detail ? "border-primary bg-accent" : "border-input bg-card hover:border-primary/50"}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={industryImages[selectedCategory]} alt={detail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {selectedDetail === detail && <Badge className="absolute top-4 right-4">선택됨</Badge>}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{detail}</h3>
                </div>
              </button>)}
          </div>}

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
          <Button onClick={handleNext} disabled={!selectedDetail} className="gap-2">
            다음
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>;
}