import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Flag, Lightbulb, MapPin, Utensils, Package, ExternalLink, TrendingUp, Users, Star, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useFormContext } from "@/contexts/FormContext";
import { FundingTools } from "@/components/roadmap/FundingTools";
import { LocationTools } from "@/components/roadmap/LocationTools";
import { MenuTools } from "@/components/roadmap/MenuTools";
import { OperationTools } from "@/components/roadmap/OperationTools";
import type { Roadmap as RoadmapType } from "@/api/startup";

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  details?: {
    content: string;
    items?: string[];
  };
}

export default function Roadmap() {
  const navigate = useNavigate();
  const { formData, reportData } = useFormContext();
  const [activeTab, setActiveTab] = useState("admin");
  const [checklistStates, setChecklistStates] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [selectedRoadmapIndex, setSelectedRoadmapIndex] = useState(0);
  const [showAgentModal, setShowAgentModal] = useState(false);

  // Check if reportData exists, if not redirect
  useEffect(() => {
    if (!reportData || !reportData.roadmaps || reportData.roadmaps.length === 0) {
      console.warn("No report data available, redirecting...");
      // navigate("/"); // Uncomment to redirect when no data
    }
  }, [reportData, navigate]);

  if (!reportData || !reportData.roadmaps || reportData.roadmaps.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-background py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="pt-8 pb-8">
              <p className="text-center text-muted-foreground">
                로드맵 데이터를 불러오는 중입니다...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentRoadmap: RoadmapType = reportData.roadmaps[selectedRoadmapIndex];

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

  // Generate checklists from API data
  const generateChecklists = (roadmap: RoadmapType) => {
    return {
      admin: {
        title: "행정 및 인허가",
        icon: Flag,
        emoji: "📋",
        checklist: [
          ...roadmap.administrative_tasks.required_licenses.map((license, idx) => ({
            id: `admin-license-${idx}`,
            title: license,
            completed: false,
            details: {
              content: roadmap.administrative_tasks.registration_steps[idx] || "",
              items: []
            }
          })),
          ...roadmap.administrative_tasks.required_education.map((edu, idx) => ({
            id: `admin-edu-${idx}`,
            title: edu,
            completed: false,
            details: {
              content: `예상 소요 시간: ${roadmap.administrative_tasks.estimated_timeline}`,
              items: []
            }
          }))
        ] as ChecklistItem[]
      },
      funding: {
        title: "자금 계획",
        icon: Lightbulb,
        emoji: "💰",
        checklist: [
          {
            id: "funding-initial",
            title: `초기 투자 비용: ${(roadmap.financial_plan.initial_investment / 10000).toFixed(0)}만원`,
            completed: false,
            details: {
              content: roadmap.financial_plan.break_even_point,
              items: roadmap.financial_plan.funding_sources
            }
          },
          {
            id: "funding-monthly",
            title: `월 고정비용: ${(roadmap.financial_plan.monthly_fixed_costs / 10000).toFixed(0)}만원`,
            completed: false,
            details: {
              content: "월별 지출 계획을 수립하고 관리합니다.",
              items: []
            }
          },
          ...roadmap.financial_plan.policy_funds.map((fund, idx) => ({
            id: `funding-policy-${idx}`,
            title: fund.name,
            completed: false,
            details: {
              content: fund.details,
              items: []
            }
          }))
        ] as ChecklistItem[]
      },
      location: {
        title: "입지 및 공간",
        icon: MapPin,
        emoji: "📍",
        checklist: [
          {
            id: "location-space",
            title: `매장 규모: ${roadmap.space_planning.estimated_space}`,
            completed: false,
            details: {
              content: roadmap.space_planning.interior_concept,
              items: []
            }
          },
          ...roadmap.space_planning.signage_ideas.map((idea, idx) => ({
            id: `location-signage-${idx}`,
            title: idea,
            completed: false,
            details: {
              content: "간판 및 사이니지 설치 계획",
              items: []
            }
          }))
        ] as ChecklistItem[]
      },
      menu: {
        title: "메뉴 개발",
        icon: Utensils,
        emoji: "🍽️",
        checklist: [
          ...roadmap.menu_development.signature_menu.map((menu, idx) => ({
            id: `menu-signature-${idx}`,
            title: `${menu.name} (${menu.price.toLocaleString()}원)`,
            completed: false,
            details: {
              content: menu.description,
              items: []
            }
          })),
          {
            id: "menu-pricing",
            title: "가격 전략 수립",
            completed: false,
            details: {
              content: roadmap.menu_development.pricing_strategy,
              items: []
            }
          },
          {
            id: "menu-diversity",
            title: "메뉴 다양성 확보",
            completed: false,
            details: {
              content: roadmap.menu_development.menu_diversity,
              items: roadmap.menu_development.seasonal_items
            }
          }
        ] as ChecklistItem[]
      },
      operation: {
        title: "운영 준비",
        icon: Package,
        emoji: "📦",
        checklist: [
          {
            id: "operation-staffing",
            title: "직원 채용 계획",
            completed: false,
            details: {
              content: roadmap.operation_prep.staffing_plan,
              items: []
            }
          },
          {
            id: "operation-equipment",
            title: "설비 및 장비 구매",
            completed: false,
            details: {
              content: "필수 장비 목록",
              items: roadmap.operation_prep.equipment_list
            }
          },
          {
            id: "operation-suppliers",
            title: "공급업체 확보",
            completed: false,
            details: {
              content: "신뢰할 수 있는 공급업체 리스트",
              items: roadmap.operation_prep.suppliers
            }
          },
          {
            id: "operation-packaging",
            title: "포장 및 브랜딩",
            completed: false,
            details: {
              content: "포장 아이디어",
              items: roadmap.operation_prep.packaging_ideas
            }
          }
        ] as ChecklistItem[]
      }
    };
  };

  const milestones = generateChecklists(currentRoadmap);

  const calculateTotalProgress = () => {
    const allItems = Object.values(milestones).flatMap(m => m.checklist);
    const completedItems = allItems.filter(item => checklistStates[item.id]);
    return Math.round((completedItems.length / allItems.length) * 100);
  };

  const calculateMilestoneProgress = (milestoneKey: string) => {
    const milestone = milestones[milestoneKey as keyof typeof milestones];
    const allItems = milestone.checklist;
    const completedItems = allItems.filter(item => checklistStates[item.id]);
    return Math.round((completedItems.length / allItems.length) * 100);
  };

  const totalProgress = calculateTotalProgress();
  const currentMilestone = milestones[activeTab as keyof typeof milestones];
  const currentProgress = calculateMilestoneProgress(activeTab);
  const nextItem = currentMilestone.checklist.find(item => !checklistStates[item.id]);

  // Get recommended item for current roadmap
  const currentRecommendedItem = reportData.recommended_items[selectedRoadmapIndex];

  const agentSections = [
    {
      key: "profiler",
      title: "Profiler Agent",
      data: reportData?.persona_profile
    },
    {
      key: "market",
      title: "Market Analyst Agent",
      data: reportData?.market_analysis_list
    },
    {
      key: "validator",
      title: "Idea Validator Agent",
      data: reportData?.recommended_items
    },
    {
      key: "architect",
      title: "Roadmap Architect Agent",
      data: reportData?.roadmaps
    }
  ];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      // noop
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-background py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-5xl md:text-6xl font-bold">나의 창업 로드맵</h1>
            <Button variant="outline" onClick={() => setShowAgentModal(true)} className="mt-1">
              에이전트 활동 보기
            </Button>
          </div>
        </div>

        {/* 페르소나 프로필 */}
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-7 w-7 text-green-600" />
                <h3 className="font-bold text-2xl md:text-3xl text-green-900">창업자 프로필</h3>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {reportData.persona_profile.persona_summary}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-base md:text-lg font-semibold text-green-700 mb-2">강점</p>
                  <div className="flex flex-wrap gap-2">
                    {reportData.persona_profile.strengths.map((strength, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-800 border-green-300 text-sm md:text-base py-1">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-orange-700 mb-2">개선 포인트</p>
                  <div className="flex flex-wrap gap-2">
                    {reportData.persona_profile.weaknesses.map((weakness, idx) => (
                      <Badge key={idx} className="bg-orange-100 text-orange-800 border-orange-300 text-sm md:text-base py-1">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-base md:text-lg font-semibold text-green-700 mb-2">리스크 수용도</p>
                <Badge variant="outline" className="text-lg md:text-xl py-1">
                  {reportData.persona_profile.risk_tolerance}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 추천 아이템 선택 */}
        {reportData.roadmaps.length > 1 && (
          <Card className="border-2">
            <CardContent className="pt-6 pb-6">
              <h3 className="font-bold text-xl md:text-2xl mb-4">추천 창업 아이템</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {reportData.roadmaps.map((roadmap, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRoadmapIndex(idx)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedRoadmapIndex === idx
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <h4 className="font-bold text-lg mb-2">{roadmap.item}</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-sm">
                        <Star className="h-3 w-3 mr-1" />
                        시장 적합도 {reportData.recommended_items[idx]?.market_fit_score || 0}점
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        페르소나 {reportData.recommended_items[idx]?.persona_fit_score || 0}점
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 전체 로드맵 진행률 */}
        <Card className="border-2">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Flag className="h-7 w-7 text-primary" />
                  <span className="text-xl md:text-2xl font-bold">전체 로드맵 진행률</span>
                </div>
                <span className="text-3xl md:text-4xl font-bold text-primary">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-5" />
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-4xl md:text-5xl">{currentMilestone.emoji}</span>
                    <div>
                      <p className="text-base md:text-lg text-muted-foreground">현재 진행 단계</p>
                      <p className="font-semibold text-xl md:text-2xl">{currentMilestone.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-7 w-7 text-yellow-500" />
                    <div>
                      <p className="text-base md:text-lg text-muted-foreground">다음 할 일</p>
                      <p className="font-semibold text-xl md:text-2xl">{nextItem?.title || "모든 항목 완료!"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 추천 입지 정보 */}
        {currentRecommendedItem && currentRecommendedItem.location_strategy && (
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 border-2">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-7 w-7 text-purple-600" />
                  <h3 className="font-bold text-2xl md:text-3xl text-purple-900">
                    추천 입지 전략
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-base md:text-lg font-semibold text-purple-700 mb-2">추천 지역</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {currentRecommendedItem.location_strategy.recommended_areas.map((area, idx) => (
                        <div key={idx} className="bg-white/80 rounded-lg p-3 border border-purple-200">
                          <p className="text-base md:text-lg font-medium">{area}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-base md:text-lg font-semibold text-purple-700 mb-2">입지 선정 기준</p>
                    <div className="space-y-1">
                      {currentRecommendedItem.location_strategy.location_criteria.map((criteria, idx) => (
                        <p key={idx} className="text-base md:text-lg text-muted-foreground flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          {criteria}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-base md:text-lg font-semibold text-purple-700 mb-1">접근성</p>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {currentRecommendedItem.location_strategy.accessibility_notes}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-100/50 rounded-lg p-3 text-sm md:text-base text-purple-800">
                  <p className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    <span>이유: {currentRecommendedItem.reason}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 탭 섹션 */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="w-full max-w-4xl grid grid-cols-5 h-auto p-2 bg-muted/50 rounded-2xl shadow-md">
                <TabsTrigger value="admin" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Flag className="h-6 w-6" />
                  <span className="text-sm md:text-base font-medium">행정 및 인허가</span>
                </TabsTrigger>
                <TabsTrigger value="funding" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Lightbulb className="h-6 w-6" />
                  <span className="text-sm md:text-base font-medium">자금 계획</span>
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <MapPin className="h-6 w-6" />
                  <span className="text-sm md:text-base font-medium">입지 및 공간</span>
                </TabsTrigger>
                <TabsTrigger value="menu" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Utensils className="h-6 w-6" />
                  <span className="text-sm md:text-base font-medium">메뉴 개발</span>
                </TabsTrigger>
                <TabsTrigger value="operation" className="flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-[#1d21f5] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200">
                  <Package className="h-6 w-6" />
                  <span className="text-sm md:text-base font-medium">운영 준비</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(milestones).map(([key, milestone]) => {
              const milestoneProgress = calculateMilestoneProgress(key);
              const milestoneNextItem = milestone.checklist.find(item => !checklistStates[item.id]);
              
              return (
                <TabsContent key={key} value={key} className="space-y-8 mt-0">
                  {/* 현재 진행 상태 카드 */}
                  <Card className="bg-gradient-to-br from-[#1d21f5] to-[#4a4ef7] text-white border-0 shadow-xl">
                    <CardContent className="pt-8 pb-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="text-6xl md:text-7xl">{milestone.emoji}</span>
                          <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                              사장님! {milestone.title}를{" "}
                              <span className="text-yellow-300">{milestoneProgress}%</span>나 달성했어요!
                            </h2>
                            <p className="text-lg md:text-xl text-blue-100">
                              다음은 <span className="font-semibold text-white">{milestoneNextItem?.title || "모든 항목 완료"}</span> 할 차례에요!
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    {/* 챕터 헤더 */}
                    <div className="space-y-3">
                      <p className="text-primary text-base md:text-lg font-bold tracking-wider uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {milestone.title}
                      </p>
                      <h3 className="text-4xl md:text-5xl font-bold">{currentRoadmap.item}</h3>
                      {currentRecommendedItem && (
                        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
                          {currentRecommendedItem.concept}
                        </p>
                      )}
                    </div>
                    
                    <Separator className="my-8" />

                  {/* 필수 점검 체크리스트 */}
                  <Card className="border-2 shadow-lg">
                    <CardContent className="pt-6 pb-6">
                      <h3 className="font-bold text-2xl md:text-3xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-10 bg-gradient-to-b from-primary to-blue-600 rounded-full" />
                        필수 절차 체크리스트
                      </h3>
                      <div className="space-y-6">
                        {milestone.checklist.map((item) => (
                          <div key={item.id} className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors">
                              <Checkbox 
                                id={item.id}
                                checked={checklistStates[item.id] || false}
                                onCheckedChange={() => handleChecklistToggle(item.id)}
                                className="mt-1.5 h-5 w-5"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                  <label 
                                    htmlFor={item.id} 
                                    className="font-semibold text-xl md:text-2xl cursor-pointer"
                                  >
                                    {item.title}
                                  </label>
                                  {item.details && (
                                    <button
                                      onClick={() => toggleItemExpansion(item.id)}
                                      className="text-sm md:text-base text-primary hover:underline font-medium"
                                    >
                                      {expandedItems[item.id] ? "접기" : "자세히 보기"}
                                    </button>
                                  )}
                                </div>
                                
                                {expandedItems[item.id] && item.details && (
                                  <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-3 text-base md:text-lg">
                                    {item.details.content && (
                                      <div>
                                        <p className="text-muted-foreground leading-relaxed">
                                          {item.details.content}
                                        </p>
                                      </div>
                                    )}
                                    {item.details.items && item.details.items.length > 0 && (
                                      <div>
                                        <p className="font-semibold text-primary mb-2 text-lg">📋 세부 내역</p>
                                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                          {item.details.items.map((subItem, idx) => (
                                            <li key={idx}>{subItem}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

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
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      <Dialog open={showAgentModal} onOpenChange={setShowAgentModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>에이전트 활동 결과 (FinalReport)</DialogTitle>
            <DialogDescription>
              각 에이전트의 결과를 JSON 형식으로 확인할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              {agentSections.map(section => {
                const jsonText = JSON.stringify(section.data ?? {}, null, 2);
                return (
                  <AccordionItem key={section.key} value={section.key}>
                    <AccordionTrigger className="text-left text-lg font-semibold">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-2 flex justify-end">
                        <Button variant="secondary" size="sm" onClick={() => handleCopy(jsonText)}>
                          복사하기
                        </Button>
                      </div>
                      <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
{jsonText}
                      </pre>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
