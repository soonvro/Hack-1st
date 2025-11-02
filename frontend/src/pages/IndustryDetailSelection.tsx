import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Badge } from "@/components/ui/badge";
import { StepProgress } from "@/components/StepProgress";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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

interface IndustryDetail {
  name: string;
  tags: string[];
}

const industryData: Record<string, IndustryDetail[]> = {
  "고기구이": [
    { name: "돼지고기 구이 전문점 (삼겹살, 목살 등)", tags: ["#삼겹살", "#구이", "#소주"] },
    { name: "소고기 구이 전문점 (한우, 갈비 등)", tags: ["#한우", "#고급", "#회식"] },
    { name: "닭갈비 전문점", tags: ["#매콤", "#볶음", "#철판"] },
    { name: "오리고기 전문점", tags: ["#건강", "#훈제", "#보양"] },
    { name: "양고기 전문점 (양꼬치, 양갈비)", tags: ["#이국적", "#양꼬치", "#맥주"] },
    { name: "곱창/막창/대창 전문점", tags: ["#내장", "#술안주", "#구이"] }
  ],
  "국물요리": [
    { name: "국밥 전문점 (순대국, 돼지국밥, 소머리국밥 등)", tags: ["#해장", "#따뜻함", "#든든함"] },
    { name: "찌개 전문점 (김치찌개, 된장찌개, 부대찌개 등)", tags: ["#뜨끈", "#가정식", "#밥도둑"] },
    { name: "전골 전문점 (버섯전골, 곱창전골, 만두전골 등)", tags: ["#푸짐", "#공유", "#냄비"] },
    { name: "탕 전문점 (갈비탕, 설렁탕, 감자탕 등)", tags: ["#진한국물", "#보양", "#사골"] },
    { name: "삼계탕/닭한마리 전문점", tags: ["#보양식", "#여름", "#건강"] }
  ],
  "베이커리": [
    { name: "동네 빵집/프랜차이즈 베이커리", tags: ["#빵", "#간식", "#동네"] },
    { name: "케이크/타르트 전문점", tags: ["#디저트", "#축하", "#달콤"] },
    { name: "건강빵/자연발효빵 전문점", tags: ["#천연", "#건강", "#수제"] },
    { name: "샌드위치/샐러드 전문점", tags: ["#간편식", "#신선", "#점심"] },
    { name: "도넛/꽈배기 전문점", tags: ["#달콤", "#튀김", "#간식"] },
    { name: "베이글 전문점", tags: ["#쫄깃", "#브런치", "#수제"] },
    { name: "식빵 전문점", tags: ["#부드러움", "#토스트", "#홈메이드"] }
  ],
  "분식": [
    { name: "종합 분식점 (김밥, 떡볶이, 라면, 튀김 등)", tags: ["#분식", "#저렴", "#간편"] },
    { name: "프리미엄 김밥 전문점", tags: ["#김밥", "#신선", "#다양"] },
    { name: "떡볶이 전문점 (즉석떡볶이, 국물떡볶이 등)", tags: ["#매콤", "#떡볶이", "#간식"] },
    { name: "만두 전문점", tags: ["#수제", "#찐만두", "#군만두"] },
    { name: "핫도그/토스트 전문점", tags: ["#간식", "#길거리", "#빠름"] }
  ],
  "수산물": [
    { name: "횟집/사시미 전문점", tags: ["#신선", "#회", "#고급"] },
    { name: "해물탕/해물찜 전문점", tags: ["#매콤", "#푸짐", "#해산물"] },
    { name: "생선구이 전문점", tags: ["#구이", "#건강", "#담백"] },
    { name: "조개구이/조개찜 전문점", tags: ["#조개", "#술안주", "#바다"] },
    { name: "장어 전문점", tags: ["#보양", "#구이", "#고급"] },
    { name: "아귀찜 전문점", tags: ["#매콤", "#찜", "#콩나물"] },
    { name: "게장/대게 요리 전문점", tags: ["#게", "#간장", "#고급"] },
    { name: "해산물 포차", tags: ["#술안주", "#분위기", "#바다"] }
  ],
  "양식/기타세계요리": [
    { name: "이탈리안 레스토랑 (파스타, 리조또)", tags: ["#파스타", "#이탈리아", "#와인"] },
    { name: "스테이크 하우스", tags: ["#스테이크", "#고급", "#데이트"] },
    { name: "멕시칸 요리 전문점 (타코, 브리또)", tags: ["#타코", "#맥주", "#캐주얼"] },
    { name: "동남아 요리 전문점 (베트남 쌀국수, 태국 음식 등)", tags: ["#쌀국수", "#향신료", "#이국적"] },
    { name: "인도 요리 전문점 (커리)", tags: ["#커리", "#난", "#향신료"] },
    { name: "샐러드/포케 전문점", tags: ["#건강", "#신선", "#다이어트"] },
    { name: "브런치 전문점", tags: ["#브런치", "#여유", "#커피"] }
  ],
  "일식": [
    { name: "스시/초밥 전문점 (오마카세, 회전초밥 포함)", tags: ["#초밥", "#고급", "#신선"] },
    { name: "돈까스 전문점", tags: ["#돈까스", "#바삭", "#일본"] },
    { name: "라멘 전문점", tags: ["#라멘", "#국물", "#면"] },
    { name: "일본식 덮밥(돈부리) 전문점", tags: ["#덮밥", "#간편", "#일본"] },
    { name: "우동/소바 전문점", tags: ["#면", "#담백", "#따뜻"] },
    { name: "이자카야 (일본식 선술집)", tags: ["#술집", "#안주", "#분위기"] }
  ],
  "주점": [
    { name: "실내 포장마차", tags: ["#포장마차", "#분위기", "#소주"] },
    { name: "호프/수제맥주 전문점", tags: ["#맥주", "#치킨", "#캐주얼"] },
    { name: "전통/민속 주점 (막걸리, 전 등)", tags: ["#막걸리", "#전통", "#전"] },
    { name: "와인바", tags: ["#와인", "#고급", "#데이트"] },
    { name: "칵테일바/라운지바", tags: ["#칵테일", "#분위기", "#야경"] },
    { name: "위스키/몰트바", tags: ["#위스키", "#프리미엄", "#조용"] }
  ],
  "중식": [
    { name: "일반 중식당 (짜장면, 짬뽕, 탕수육)", tags: ["#짜장면", "#배달", "#중국"] },
    { name: "마라탕/마라샹궈 전문점", tags: ["#마라", "#매운맛", "#중독성"] },
    { name: "양꼬치 전문점", tags: ["#양꼬치", "#맥주", "#꼬치"] },
    { name: "훠궈 전문점", tags: ["#훠궈", "#공유", "#중국"] },
    { name: "딤섬 전문점", tags: ["#딤섬", "#중국", "#브런치"] },
    { name: "정통 중화요리 전문점", tags: ["#고급", "#코스", "#중화"] }
  ],
  "카페/디저트": [
    { name: "커피 전문점/로스터리 카페", tags: ["#커피", "#원두", "#분위기"] },
    { name: "디저트 카페 (케이크, 마카롱, 구움과자 등)", tags: ["#디저트", "#달콤", "#예쁨"] },
    { name: "테마 카페 (북카페, 보드게임, 펫카페 등)", tags: ["#테마", "#여유", "#특별"] },
    { name: "전통 찻집/티 전문점", tags: ["#차", "#전통", "#조용"] },
    { name: "빙수 전문점", tags: ["#빙수", "#여름", "#시원"] },
    { name: "생과일주스/요거트 전문점", tags: ["#건강", "#신선", "#과일"] },
    { name: "아이스크림/젤라또 전문점", tags: ["#아이스크림", "#달콤", "#디저트"] }
  ],
  "치킨/닭강정": [
    { name: "후라이드/양념치킨 전문점 (배달 중심)", tags: ["#치킨", "#배달", "#맥주"] },
    { name: "오븐구이/바베큐치킨 전문점", tags: ["#건강", "#바베큐", "#구이"] },
    { name: "닭강정 전문점", tags: ["#달콤", "#매콤", "#간식"] },
    { name: "찜닭 전문점", tags: ["#찜닭", "#매콤", "#푸짐"] },
    { name: "닭발 전문점", tags: ["#매운맛", "#콜라겐", "#술안주"] },
    { name: "옛날통닭 전문점", tags: ["#통닭", "#옛날", "#추억"] }
  ],
  "피자 전문점": [
    { name: "배달 전문 피자 (프랜차이즈형)", tags: ["#피자", "#배달", "#간편"] },
    { name: "화덕피자 전문점", tags: ["#화덕", "#수제", "#이탈리안"] },
    { name: "미국식 피자 전문점 (시카고, 디트로이트 스타일 등)", tags: ["#두툼", "#치즈", "#미국"] }
  ],
  "버거 전문점": [
    { name: "프랜차이즈 버거 전문점", tags: ["#햄버거", "#빠름", "#간편"] },
    { name: "수제버거 전문점", tags: ["#수제", "#프리미엄", "#패티"] }
  ],
  "한식": [
    { name: "백반/가정식 전문점", tags: ["#백반", "#가정식", "#반찬"] },
    { name: "한정식 전문점", tags: ["#고급", "#코스", "#전통"] },
    { name: "비빔밥 전문점", tags: ["#비빔밥", "#건강", "#다양"] },
    { name: "냉면 전문점", tags: ["#냉면", "#시원", "#여름"] },
    { name: "칼국수/수제비 전문점", tags: ["#칼국수", "#얼큰", "#따뜻"] },
    { name: "보쌈/족발 전문점", tags: ["#보쌈", "#쌈", "#족발"] },
    { name: "찜/조림 전문점 (갈비찜, 생선조림 등)", tags: ["#찜", "#조림", "#푸짐"] }
  ]
};

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
  "한식": koreanImg,
};

export default function IndustryDetailSelection() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [selectedDetail, setSelectedDetail] = useState<string>(formData.industry);

  useEffect(() => {
    if (!formData.industryCategory) {
      navigate("/industry-category-selection");
    }
  }, [formData.industryCategory, navigate]);

  const handleDetailSelect = (detail: string) => {
    setSelectedDetail(detail);
    updateFormData({ industry: detail });
    setTimeout(() => {
      setCurrentStep(5);
      navigate("/district-selection");
    }, 300);
  };

  const handleBack = () => {
    setCurrentStep(3);
    navigate("/industry-category-selection");
  };

  const categoryImage = industryImages[formData.industryCategory] || meatGrillingImg;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <StepProgress currentStep={4} totalSteps={6} onBack={handleBack} />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">콘셉트를 선택하세요</h1>
        <p className="text-muted-foreground mb-8">
          {formData.industryCategory}의 콘셉트를 선택해주세요
        </p>

        <div className="mb-6 flex items-center gap-2">
          <Badge variant="outline" className="text-base py-2 px-4">
            {formData.industryCategory}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">세부 업종 선택</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {industryData[formData.industryCategory]?.map((detail, index) => (
            <button
              key={index}
              onClick={() => handleDetailSelect(detail.name)}
              className={`group text-left rounded-3xl border-2 transition-all overflow-hidden ${
                selectedDetail === detail.name
                  ? "border-primary bg-accent"
                  : "border-input bg-card hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={categoryImage} 
                  alt={detail.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{detail.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {detail.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </button>
            ))}
        </div>
      </div>
    </div>
  );
}
