import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Flag, Lightbulb, MapPin, Utensils, Package, ExternalLink, TrendingUp, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useFormContext } from "@/contexts/FormContext";
import { FundingTools } from "@/components/roadmap/FundingTools";
import { LocationTools } from "@/components/roadmap/LocationTools";
import { MenuTools } from "@/components/roadmap/MenuTools";
import { OperationTools } from "@/components/roadmap/OperationTools";

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  badge?: string;
  badgeColor?: string;
  details?: {
    materials: string[];
    method: string;
    duration: string;
  };
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  checklist: ChecklistItem[];
}

interface RelatedOrganization {
  name: string;
  description: string;
  link: string;
}

export default function Roadmap() {
  const { formData } = useFormContext();
  
  // 선택된 구를 기반으로 추천 동 생성 (실제로는 API에서 가져와야 함)
  const getRecommendedDongs = () => {
    const selectedDistrict = formData.selectedDistricts[0] || "강남구";
    const industryCategory = formData.industryCategory || "한식";
    
    // 간단한 추천 로직 (실제로는 더 복잡한 데이터 분석 필요)
    const dongRecommendations: Record<string, Array<{name: string; reason: string; score: number}>> = {
      "강남구": [
        { name: "역삼동", reason: "유동인구 多, 직장인 밀집", score: 92 },
        { name: "논현동", reason: "상권 성숙도 높음", score: 88 },
        { name: "청담동", reason: "고소득층 타겟 유리", score: 85 }
      ],
      "서초구": [
        { name: "서초동", reason: "법원·검찰청 인근, 직장인 수요", score: 90 },
        { name: "잠원동", reason: "주거지역, 안정적 수요", score: 86 },
        { name: "반포동", reason: "고급 주거지, 구매력 우수", score: 84 }
      ],
      "송파구": [
        { name: "잠실동", reason: "롯데월드 인근, 관광객 多", score: 91 },
        { name: "문정동", reason: "법조타운, 안정적 수요", score: 87 },
        { name: "가락동", reason: "도매시장 인근, 접근성 양호", score: 83 }
      ]
    };
    
    return dongRecommendations[selectedDistrict] || dongRecommendations["강남구"];
  };
  
  const recommendedDongs = getRecommendedDongs();
  const [milestones] = useState({
    admin: {
      title: "행정 및 인허가",
      icon: Flag,
      emoji: "📋",
      chapters: [
        {
          id: "chapter1",
          title: "창업의 첫 단추, 정확하게 꿰기",
          description: "복잡하고 어렵게 느껴지는 행정 절차, Pathfinder가 차근차근 안내해 드립니다. 필수 서류부터 관련 기관 정보까지 꼼꼼하게 정리 성공적인 시작을 준비하세요.",
          checklist: [
            { 
              id: "admin-1", 
              title: "사업자 등록", 
              completed: false, 
              badge: "진행 중",
              badgeColor: "bg-yellow-500",
              details: {
                materials: ["신분증", "임대차 계약서 (사업장 임차 시)", "허가/등록 신고 서류 (해당 시)"],
                method: "구청/시 홈페이지 온라인 신청 또는 세무서 방문",
                duration: "온라인 신청 시 당일, 방문 신청 시 3일 이내"
              }
            },
            { id: "admin-2", title: "영업 신고 / 허가", completed: false, badge: "미완료", badgeColor: "bg-gray-400" },
            { id: "admin-3", title: "세금 관련 신고", completed: false, badge: "미완료", badgeColor: "bg-gray-400" },
            { id: "admin-4", title: "고용/산재 보험 가입 (직원 채용 시)", completed: false, badge: "완료", badgeColor: "bg-green-500" },
          ],
          organizations: [
            {
              name: "국세청 홈택스",
              description: "사업자 등록, 세금 신고 등 온라인 처리",
              link: "https://www.hometax.go.kr"
            },
            {
              name: "시/군/구청 위생과",
              description: "영업 신고 및 허가 관련 문의 및 접수",
              link: "#"
            },
            {
              name: "소방서",
              description: "소방시설 설치 및 점검 (다중이용업소)",
              link: "#"
            }
          ]
        }
      ]
    },
    funding: {
      title: "자금 계획",
      icon: Lightbulb,
      emoji: "💰",
      chapters: [
        {
          id: "chapter1",
          title: "스마트한 자금 계획 세우기",
          description: "창업 자금부터 운영 자금까지, 체계적인 자금 계획을 수립하세요. 안정적인 자금 흐름이 성공의 열쇠입니다.",
          checklist: [
            { id: "funding-1", title: "초기 투자 비용 산정", completed: false },
            { id: "funding-2", title: "운영 자금 계획", completed: false },
            { id: "funding-3", title: "자금 조달 방안 마련", completed: false },
            { id: "funding-4", title: "손익분기점 분석", completed: false },
          ],
          organizations: [
            {
              name: "소상공인시장진흥공단",
              description: "창업 지원금 및 대출 상담",
              link: "https://www.semas.or.kr"
            },
            {
              name: "신용보증기금",
              description: "소상공인 대출 보증 지원",
              link: "https://www.kodit.co.kr"
            }
          ]
        }
      ]
    },
    location: {
      title: "입지 선정",
      icon: MapPin,
      emoji: "📍",
      chapters: [
        {
          id: "chapter1",
          title: "최적의 입지 찾기",
          description: "성공적인 창업을 위한 입지 분석과 선정 가이드입니다. 좋은 위치는 성공의 절반입니다.",
          checklist: [
            { id: "location-1", title: "상권 분석", completed: false },
            { id: "location-2", title: "유동 인구 조사", completed: false },
            { id: "location-3", title: "경쟁 업체 분석", completed: false },
            { id: "location-4", title: "임대료 협상", completed: false },
          ],
          organizations: [
            {
              name: "상가정보연구소",
              description: "상권 분석 및 임대료 정보",
              link: "#"
            }
          ]
        }
      ]
    },
    menu: {
      title: "메뉴 개발",
      icon: Utensils,
      emoji: "🍽️",
      chapters: [
        {
          id: "chapter1",
          title: "경쟁력 있는 메뉴 개발",
          description: "고객을 사로잡을 메뉴 개발 전략을 수립하세요. 차별화된 메뉴가 경쟁력입니다.",
          checklist: [
            { id: "menu-1", title: "시그니처 메뉴 개발", completed: false },
            { id: "menu-2", title: "원가 계산 및 가격 책정", completed: false },
            { id: "menu-3", title: "메뉴판 디자인", completed: false },
            { id: "menu-4", title: "시식 및 피드백", completed: false },
          ],
          organizations: []
        }
      ]
    },
    operation: {
      title: "운영 준비",
      icon: Package,
      emoji: "📦",
      chapters: [
        {
          id: "chapter1",
          title: "오픈 준비 완벽하게",
          description: "성공적인 오픈을 위한 운영 준비 사항을 체크하세요. 완벽한 준비가 성공을 만듭니다.",
          checklist: [
            { id: "operation-1", title: "직원 채용 및 교육", completed: false },
            { id: "operation-2", title: "집기 및 설비 구매", completed: false },
            { id: "operation-3", title: "마케팅 계획 수립", completed: false },
            { id: "operation-4", title: "SNS 계정 개설", completed: false },
          ],
          organizations: []
        }
      ]
    }
  });

  const [activeTab, setActiveTab] = useState("admin");
  const [checklistStates, setChecklistStates] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const handleChecklistToggle = (itemId: string) => {
    setChecklistStates(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const calculateTotalProgress = () => {
    const allItems = Object.values(milestones).flatMap(m => 
      m.chapters.flatMap(c => c.checklist)
    );
    const completedItems = allItems.filter(item => checklistStates[item.id]);
    return Math.round((completedItems.length / allItems.length) * 100);
  };

  const calculateMilestoneProgress = (milestoneKey: string) => {
    const milestone = milestones[milestoneKey as keyof typeof milestones];
    const allItems = milestone.chapters.flatMap(c => c.checklist);
    const completedItems = allItems.filter(item => checklistStates[item.id]);
    return Math.round((completedItems.length / allItems.length) * 100);
  };

  const totalProgress = calculateTotalProgress();
  const currentMilestone = milestones[activeTab as keyof typeof milestones];
  const currentProgress = calculateMilestoneProgress(activeTab);
  const currentChapter = currentMilestone.chapters[0];
  const nextItem = currentChapter.checklist.find(item => !checklistStates[item.id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-background py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">나의 창업 로드맵</h1>
          <p className="text-lg text-muted-foreground">체계적인 준비로 성공 창업을 향해 나아가세요</p>
        </div>

        {/* 현재 진행 상태 카드 */}
        <Card className="bg-gradient-to-br from-[#1d21f5] to-[#4a4ef7] text-white border-0 shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{currentMilestone.emoji}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">
                    사장님! {currentMilestone.title}를{" "}
                    <span className="text-yellow-300">{currentProgress}%</span>나 달성했어요!
                  </h2>
                  <p className="text-blue-100">
                    다음은 <span className="font-semibold text-white">{nextItem?.title || "모든 항목 완료"}</span> 할 차례에요!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 전체 로드맵 진행률 */}
        <Card className="border-2">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Flag className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">전체 로드맵 진행률</span>
                </div>
                <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-4" />
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{currentMilestone.emoji}</span>
                    <div>
                      <p className="text-sm text-muted-foreground">현재 진행 단계</p>
                      <p className="font-semibold text-lg">{currentMilestone.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">다음 할 일</p>
                      <p className="font-semibold text-lg">{nextItem?.title || "모든 항목 완료!"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI 코칭 브리핑 */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 border-2">
          <CardContent className="pt-6 pb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-primary">AI 코칭 브리핑</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  사업자 등록을 위한 필수 서류 준비가 필요합니다. 국세청 홈택스를 통해 온라인 신청 방법을 확인하세요!
                  평균적으로 온라인 신청 시 당일, 방문 신청 시 3일 이내에 처리됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 추천 입지 정보 */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 border-2">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-purple-600" />
                <h3 className="font-bold text-xl text-purple-900">
                  {formData.selectedDistricts[0] || "선택한 구"} 추천 입지 TOP 3
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {formData.industryCategory || "선택한 업종"}에 최적화된 {formData.selectedDistricts[0] || "해당 구"} 내 추천 동네입니다
              </p>
              
              <Separator className="bg-purple-200" />
              
              <div className="grid md:grid-cols-3 gap-4">
                {recommendedDongs.map((dong, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          idx === 0 ? "bg-yellow-500" : idx === 1 ? "bg-gray-400" : "bg-orange-500"
                        }`}>
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-lg">{dong.name}</h4>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-300">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {dong.score}점
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      {dong.reason}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="bg-purple-100/50 rounded-lg p-3 text-xs text-purple-800">
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>실제 상권 데이터와 유동인구 분석을 기반으로 추천되었습니다</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 섹션 */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="w-full max-w-4xl grid grid-cols-5 h-auto p-2 bg-muted/50 rounded-2xl shadow-md">
                <TabsTrigger value="admin" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Flag className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">행정 및 인허가</span>
                </TabsTrigger>
                <TabsTrigger value="funding" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Lightbulb className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">자금 계획</span>
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <MapPin className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">입지 선정</span>
                </TabsTrigger>
                <TabsTrigger value="menu" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Utensils className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">메뉴 개발</span>
                </TabsTrigger>
                <TabsTrigger value="operation" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Package className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">운영 준비</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(milestones).map(([key, milestone]) => (
              <TabsContent key={key} value={key} className="space-y-8 mt-0">
                {milestone.chapters.map((chapter) => (
                  <div key={chapter.id} className="space-y-6">
                    {/* 챕터 헤더 */}
                    <div className="space-y-3">
                      <p className="text-primary text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Chapter 1. {milestone.title}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold">{chapter.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>
                    
                    <Separator className="my-8" />

                    {/* 메인 컨텐츠 영역 */}
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* 필수 점검 체크리스트 (메인) */}
                      <div className="flex-1">
                        <Card className="border-2 shadow-lg">
                          <CardContent className="pt-6 pb-6">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                              <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full" />
                              필수 절차 체크리스트
                            </h3>
                            <div className="space-y-6">
                              {chapter.checklist.map((item) => (
                                <div key={item.id} className="space-y-4">
                                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors">
                                    <Checkbox 
                                      id={item.id}
                                      checked={checklistStates[item.id] || false}
                                      onCheckedChange={() => handleChecklistToggle(item.id)}
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between gap-3 flex-wrap">
                                        <label 
                                          htmlFor={item.id} 
                                          className="font-semibold text-lg cursor-pointer"
                                        >
                                          {item.title}
                                        </label>
                                         <div className="flex items-center gap-2">
                                           {item.badge && (
                                             <Badge 
                                               className={`font-medium text-white ${item.badgeColor || "bg-blue-500"}`}
                                             >
                                               {item.badge}
                                             </Badge>
                                           )}
                                           {item.details && (
                                            <button
                                              onClick={() => toggleItemExpansion(item.id)}
                                              className="text-xs text-primary hover:underline font-medium"
                                            >
                                              {expandedItems[item.id] ? "접기" : "자세히 보기"}
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {expandedItems[item.id] && item.details && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-3 text-sm">
                                          <div>
                                            <p className="font-semibold text-primary mb-2">📋 준비물</p>
                                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                              {item.details.materials.map((material, idx) => (
                                                <li key={idx}>{material}</li>
                                              ))}
                                            </ul>
                                          </div>
                                          <div>
                                            <p className="font-semibold text-primary mb-2">✅ 신청 방법</p>
                                            <p className="text-muted-foreground">{item.details.method}</p>
                                          </div>
                                          <div>
                                            <p className="font-semibold text-primary mb-2">⏱️ 예상 소요 시간</p>
                                            <p className="text-muted-foreground">{item.details.duration}</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* 관련 기관 정보 (사이드) */}
                      {chapter.organizations && chapter.organizations.length > 0 && (
                        <div className="lg:w-80 space-y-4">
                          <h3 className="font-bold text-xl flex items-center gap-2">
                            <ExternalLink className="h-5 w-5 text-primary" />
                            관련 기관 정보
                          </h3>
                          {chapter.organizations.map((org, idx) => (
                            <Card key={idx} className="border-2 hover:border-primary hover:shadow-xl transition-all duration-200">
                              <CardContent className="pt-5 pb-5">
                                <h4 className="font-bold text-lg mb-2">{org.name}</h4>
                                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                  {org.description}
                                </p>
                                <a 
                                  href={org.link} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline font-medium flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                  웹사이트 바로가기
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 각 탭별 상세 도구 및 기능 */}
                    {key === "funding" && (
                      <div className="mt-8">
                        <FundingTools />
                      </div>
                    )}
                    
                    {key === "location" && (
                      <div className="mt-8">
                        <LocationTools />
                      </div>
                    )}
                    
                    {key === "menu" && (
                      <div className="mt-8">
                        <MenuTools />
                      </div>
                    )}
                    
                    {key === "operation" && (
                      <div className="mt-8">
                        <OperationTools />
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
