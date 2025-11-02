import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  TrendingUp, 
  Utensils, 
  Brain, 
  Rocket, 
  Star, 
  Palette, 
  Globe,
  Grid3x3,
  List,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Content {
  id: string;
  icon: any;
  title: string;
  description: string;
  date: string;
  views: number;
  tags: string[];
  category: "전체" | "추천 콘텐츠" | "창업 리포트";
}

const contents: Content[] = [
  {
    id: "1",
    icon: Lightbulb,
    title: "AI 기반 레스토랑 창업 트렌드 리포트",
    description: "AI 기술을 활용한 최신 외식 산업 동향과 비즈니스 모델을 살펴봅니다.",
    date: "2024.10.26",
    views: 1204,
    tags: ["#AI", "#트렌드"],
    category: "창업 리포트"
  },
  {
    id: "2",
    icon: TrendingUp,
    title: "MZ세대를 겨냥한 소셜미디어 마케팅 전략",
    description: "인스타그램, 틱톡 등 주요 플랫폼별 맞춤형 콘텐츠 전략과 성공 사례를 확인하세요.",
    date: "2024.10.25",
    views: 2580,
    tags: ["#마케팅", "#SNS"],
    category: "추천 콘텐츠"
  },
  {
    id: "3",
    icon: Utensils,
    title: "성공적인 프랜차이즈화를 위한 5가지 단계",
    description: "브랜드 아이덴티티 구축부터 법률, 프랜차이즈의 핵심 단계를 안내합니다.",
    date: "2024.10.24",
    views: 980,
    tags: ["#프랜차이즈", "#사업"],
    category: "창업 리포트"
  },
  {
    id: "4",
    icon: Brain,
    title: "데이터로 보는 2024년 외식업계 전망",
    description: "빅데이터 분석을 통해 예측하는 올해의 외식업계 주요 키워드와 성장 동력.",
    date: "2024.10.23",
    views: 1750,
    tags: ["#데이터분석"],
    category: "창업 리포트"
  },
  {
    id: "5",
    icon: Rocket,
    title: "푸드테크 스타트업 성공 사례 분석",
    description: "혁신적인 아이디어로 시장을 선도하는 국내외 푸드테크 기업들의 성공 비결.",
    date: "2024.10.22",
    views: 2130,
    tags: ["#푸드테크", "#사례"],
    category: "추천 콘텐츠"
  },
  {
    id: "6",
    icon: Star,
    title: "레스토랑 운영 자동화를 위한 기술 도입 가이드",
    description: "주문, 결제, 재고 관리를 자동화하여 운영 효율을 극대화하는 방법을 제공합니다.",
    date: "2024.10.21",
    views: 890,
    tags: ["#자동화", "#운영"],
    category: "추천 콘텐츠"
  },
  {
    id: "7",
    icon: Palette,
    title: "고객 만족도를 높이는 메뉴 디자인 심리학",
    description: "고객의 선택을 유도하고 매출을 증대시키는 메뉴 디자인의 비밀을 파헤칩니다.",
    date: "2024.10.20",
    views: 1940,
    tags: ["#메뉴", "#디자인"],
    category: "전체"
  },
  {
    id: "8",
    icon: Globe,
    title: "지속가능한 레스토랑 경영을 위한 ESG 전략",
    description: "친환경 식재료 사용부터 사회적 책임까지, 레스토랑의 가치를 높이는 ESG 경영.",
    date: "2024.10.19",
    views: 760,
    tags: ["#ESG", "#경영"],
    category: "전체"
  }
];

export default function ContentsList() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<"전체" | "추천 콘텐츠" | "창업 리포트">("전체");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"최신순" | "조회순">("최신순");

  const filteredContents = selectedCategory === "전체" 
    ? contents 
    : contents.filter(c => c.category === selectedCategory);

  const sortedContents = [...filteredContents].sort((a, b) => {
    if (sortOrder === "조회순") {
      return b.views - a.views;
    }
    return 0; // 최신순은 이미 정렬되어 있음
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Utensils className="w-6 h-6" />
              <h1 className="text-xl font-bold">RestaurantLM</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setSelectedCategory("전체")}
                className={`text-sm transition-colors ${
                  selectedCategory === "전체" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory("추천 콘텐츠")}
                className={`text-sm transition-colors ${
                  selectedCategory === "추천 콘텐츠" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                추천 콘텐츠
              </button>
              <button
                onClick={() => setSelectedCategory("창업 리포트")}
                className={`text-sm transition-colors ${
                  selectedCategory === "창업 리포트" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                창업 리포트
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {sortOrder}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("최신순")}>
                  최신순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("조회순")}>
                  조회순
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid" 
                    ? "bg-secondary" 
                    : "hover:bg-secondary/50"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list" 
                    ? "bg-secondary" 
                    : "hover:bg-secondary/50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Button onClick={() => navigate("/project-type")} className="gap-2">
              + 새 콘텐츠 만들기
            </Button>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
          : "flex flex-col gap-4"
        }>
          {sortedContents.map((content) => {
            const Icon = content.icon;
            return (
              <div
                key={content.id}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {content.description}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>작성일: {content.date} / 조회수: {content.views.toLocaleString()} / {content.tags.join(" ")}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
