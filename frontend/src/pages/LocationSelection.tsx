import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Search, X, ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, TrendingDown, Minus, Edit2 } from "lucide-react";

// 서울시 동 단위 지역 데이터 (상권 분석 포함)
const seoulDongs = [
  { name: "강남구 역삼동", avgRent: 95000, footTraffic: "높음", competition: "높음", status: "유리" },
  { name: "강남구 삼성동", avgRent: 92000, footTraffic: "높음", competition: "중간", status: "유리" },
  { name: "강남구 청담동", avgRent: 98000, footTraffic: "중간", competition: "높음", status: "보통" },
  { name: "서초구 서초동", avgRent: 82000, footTraffic: "높음", competition: "중간", status: "유리" },
  { name: "서초구 반포동", avgRent: 85000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "송파구 잠실동", avgRent: 88000, footTraffic: "높음", competition: "높음", status: "유리" },
  { name: "송파구 방이동", avgRent: 72000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "강동구 천호동", avgRent: 65000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "강동구 명일동", avgRent: 58000, footTraffic: "낮음", competition: "낮음", status: "보통" },
  { name: "마포구 서교동", avgRent: 91000, footTraffic: "높음", competition: "높음", status: "유리" },
  { name: "마포구 합정동", avgRent: 85000, footTraffic: "높음", competition: "중간", status: "유리" },
  { name: "마포구 연남동", avgRent: 78000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "용산구 이태원동", avgRent: 72000, footTraffic: "높음", competition: "높음", status: "보통" },
  { name: "용산구 한남동", avgRent: 88000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "성동구 성수동", avgRent: 68000, footTraffic: "높음", competition: "중간", status: "유리" },
  { name: "성동구 왕십리동", avgRent: 62000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "광진구 건대입구", avgRent: 71000, footTraffic: "높음", competition: "높음", status: "유리" },
  { name: "광진구 자양동", avgRent: 58000, footTraffic: "중간", competition: "낮음", status: "보통" },
  { name: "중구 명동", avgRent: 98000, footTraffic: "높음", competition: "높음", status: "불리" },
  { name: "중구 충무로", avgRent: 75000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "종로구 종로3가", avgRent: 89000, footTraffic: "높음", competition: "높음", status: "보통" },
  { name: "종로구 삼청동", avgRent: 85000, footTraffic: "중간", competition: "높음", status: "보통" },
  { name: "영등포구 여의도동", avgRent: 87000, footTraffic: "높음", competition: "중간", status: "유리" },
  { name: "영등포구 문래동", avgRent: 65000, footTraffic: "중간", competition: "낮음", status: "보통" },
  { name: "구로구 구로동", avgRent: 69000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "구로구 신도림동", avgRent: 72000, footTraffic: "높음", competition: "높음", status: "보통" },
  { name: "금천구 가산동", avgRent: 58000, footTraffic: "중간", competition: "낮음", status: "유리" },
  { name: "동작구 노량진동", avgRent: 62000, footTraffic: "높음", competition: "중간", status: "유리" },
  { name: "동작구 사당동", avgRent: 60000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "관악구 신림동", avgRent: 55000, footTraffic: "높음", competition: "높음", status: "보통" },
  { name: "관악구 봉천동", avgRent: 52000, footTraffic: "중간", competition: "중간", status: "보통" },
  { name: "강북구 미아동", avgRent: 48000, footTraffic: "중간", competition: "낮음", status: "보통" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "유리":
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case "불리":
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    default:
      return <Minus className="h-4 w-4 text-yellow-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "유리":
      return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300";
    case "불리":
      return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300";
    default:
      return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300";
  }
};

export default function LocationSelection() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(formData.selectedDistricts);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDongs = seoulDongs.filter((dong) =>
    dong.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDistrict = (dongName: string) => {
    if (selectedDistricts.includes(dongName)) {
      setSelectedDistricts([]);
    } else {
      setSelectedDistricts([dongName]);
    }
  };

  const handleNext = () => {
    if (selectedDistricts.length === 0) return;
    updateFormData({ selectedDistricts });
    setCurrentStep(7);
    navigate("/budget-input");
  };

  const handleBack = () => {
    setCurrentStep(5);
    navigate("/concept-selection");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* 이전 선택 정보 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">선택하신 정보</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* 프로필 정보 */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">프로필 정보</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => navigate("/profile-info")}
                >
                  <Edit2 className="h-3 w-3" />
                  수정
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">나이:</span>
                  <span className="font-medium">{formData.age ? `만 ${formData.age}세` : "선택안함"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">성별:</span>
                  <span className="font-medium">
                    {formData.gender === "M" ? "남" : formData.gender === "F" ? "여" : "선택안함"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">창업 경험:</span>
                  <span className="font-medium">{formData.hasStartupExperience || "선택안함"}</span>
                </div>
              </div>
            </Card>

            {/* 프로젝트 타입 */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">프로젝트 타입</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => navigate("/project-type")}
                >
                  <Edit2 className="h-3 w-3" />
                  수정
                </Button>
              </div>
              <div className="text-sm">
                <span className="font-medium">
                  {formData.projectType === "new" ? "신규 창업" : formData.projectType === "existing" ? "기존 매장" : "선택안함"}
                </span>
              </div>
            </Card>

            {/* 업종 정보 */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">업종 정보</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => navigate("/industry-category-selection")}
                >
                  <Edit2 className="h-3 w-3" />
                  수정
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">업종 대분류:</span>
                  <span className="font-medium">{formData.industryCategory || "선택안함"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">업종 상세:</span>
                  <span className="font-medium">{formData.industry || "선택안함"}</span>
                </div>
              </div>
            </Card>

            {/* 콘셉트 정보는 일단 비워둠 (향후 추가 가능) */}
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2">지역을 선택하세요</h2>
        <p className="text-muted-foreground mb-8">
          희망하는 서울시 동 단위 지역을 선택할 수 있습니다
        </p>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="지역명 검색 (예: 역삼동, 홍대)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14"
          />
        </div>

        {selectedDistricts.length > 0 && (
          <div className="mb-6 p-4 bg-accent rounded-2xl">
            <p className="text-sm font-medium mb-3">선택한 지역</p>
            <div className="flex flex-wrap gap-2">
              {selectedDistricts.map((district) => (
                <Badge key={district} variant="default" className="gap-1 pr-1">
                  {district}
                  <button
                    onClick={() => toggleDistrict(district)}
                    className="ml-1 rounded-full hover:bg-background/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">서울시 동 단위 선택</h3>
              <p className="text-sm text-muted-foreground">상권 유불리 정보와 함께 제공됩니다</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-muted-foreground">유리: 진입 유망</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Minus className="h-4 w-4 text-yellow-600" />
              <span className="text-muted-foreground">보통: 신중 검토</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-muted-foreground">불리: 경쟁 과열</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredDongs.map((dong) => {
            const isSelected = selectedDistricts.includes(dong.name);
            return (
              <button
                key={dong.name}
                onClick={() => toggleDistrict(dong.name)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-[hsl(var(--pale-mint))] bg-[hsl(var(--pale-mint))]/10"
                    : "border-input bg-card hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-[hsl(var(--pale-mint))]" />
                )}
                <h3 className="font-semibold mb-2 pr-6">{dong.name}</h3>
                
                <div className="space-y-1.5 mb-3">
                  <p className="text-xs text-muted-foreground">
                    평균 유동인구: <span className="font-medium">{dong.avgRent.toLocaleString()}명/월</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    경쟁 강도: <span className="font-medium">{dong.competition}</span>
                  </p>
                </div>
                
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${getStatusColor(dong.status)}`}>
                  {getStatusIcon(dong.status)}
                  <span className="text-xs font-semibold">{dong.status}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={selectedDistricts.length === 0} 
            className="gap-2 px-8"
            style={selectedDistricts.length > 0 ? { 
              backgroundColor: "hsl(var(--pale-mint))", 
              color: "hsl(var(--foreground))" 
            } : {}}
          >
            로드맵 생성
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
