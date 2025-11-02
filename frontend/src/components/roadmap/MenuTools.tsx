import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Utensils, Calculator, TrendingUp, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  name: string;
  cost: number;
  price: number;
}

export function MenuTools() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "", cost: 0, price: 0 },
  ]);

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: "", cost: 0, price: 0 }]);
  };

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string | number) => {
    const updated = [...menuItems];
    updated[index] = { ...updated[index], [field]: value };
    setMenuItems(updated);
  };

  const calculateMargin = (item: MenuItem) => {
    if (item.price === 0) return 0;
    return Math.round(((item.price - item.cost) / item.price) * 100);
  };

  const calculateProfit = (item: MenuItem) => {
    return item.price - item.cost;
  };

  const avgMargin = menuItems.length > 0
    ? Math.round(menuItems.reduce((sum, item) => sum + calculateMargin(item), 0) / menuItems.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* 원가/판매가 계산기 */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Calculator className="h-6 w-6" />
            메뉴별 원가 계산 & 마진 분석
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {menuItems.map((item, index) => {
            const margin = calculateMargin(item);
            const profit = calculateProfit(item);
            const marginColor = margin >= 60 ? "text-green-600" : margin >= 40 ? "text-blue-600" : "text-red-600";

            return (
              <div key={index} className="bg-white p-5 rounded-lg border-2 border-orange-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">메뉴 {index + 1}</h4>
                  {menuItems.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMenuItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      삭제
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>메뉴명</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateMenuItem(index, "name", e.target.value)}
                      placeholder="예: 김치찌개"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>원가 (원)</Label>
                    <Input
                      type="number"
                      value={item.cost || ""}
                      onChange={(e) => updateMenuItem(index, "cost", Number(e.target.value))}
                      placeholder="예: 3000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>판매가 (원)</Label>
                    <Input
                      type="number"
                      value={item.price || ""}
                      onChange={(e) => updateMenuItem(index, "price", Number(e.target.value))}
                      placeholder="예: 8000"
                    />
                  </div>
                </div>

                {item.name && item.cost > 0 && item.price > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">메뉴 마진율</p>
                        <p className={`text-2xl font-bold ${marginColor}`}>{margin}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">개당 이익</p>
                        <p className="text-2xl font-bold text-green-600">{profit.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">평가</p>
                        <Badge className={margin >= 60 ? "bg-green-500" : margin >= 40 ? "bg-blue-500" : "bg-red-500"}>
                          {margin >= 60 ? "우수" : margin >= 40 ? "적정" : "낮음"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Button
            onClick={addMenuItem}
            variant="outline"
            className="w-full border-2 border-orange-300 hover:bg-orange-50"
          >
            + 메뉴 추가
          </Button>

          {menuItems.some(item => item.price > 0) && (
            <div className="bg-white rounded-lg p-4 border-2 border-orange-400">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">전체 평균 마진율</span>
                <span className="text-2xl font-bold text-orange-700">{avgMargin}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 메뉴 가격 책정 가이드 */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="h-6 w-6" />
            메뉴 가격 책정 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <h4 className="font-bold text-lg mb-3">업종별 권장 마진율</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>• 한식/분식</span>
                  <span className="font-semibold text-blue-600">60-70%</span>
                </div>
                <div className="flex justify-between">
                  <span>• 카페/디저트</span>
                  <span className="font-semibold text-blue-600">70-80%</span>
                </div>
                <div className="flex justify-between">
                  <span>• 치킨/피자</span>
                  <span className="font-semibold text-blue-600">50-60%</span>
                </div>
                <div className="flex justify-between">
                  <span>• 일식/양식</span>
                  <span className="font-semibold text-blue-600">55-65%</span>
                </div>
                <div className="flex justify-between">
                  <span>• 주점</span>
                  <span className="font-semibold text-blue-600">65-75%</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <p className="text-sm text-yellow-900 leading-relaxed">
                <span className="font-semibold">💡 가격 책정 공식:</span><br />
                판매가 = 원가 ÷ (1 - 목표마진율)<br />
                예) 원가 3,000원, 목표 마진 60% → 3,000 ÷ 0.4 = 7,500원
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 메뉴 개발 체크리스트 */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Lightbulb className="h-6 w-6" />
            메뉴 개발 핵심 포인트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: "🎯", title: "시그니처 메뉴 개발", desc: "경쟁력 있는 대표 메뉴 1-2개 집중 개발" },
              { icon: "📊", title: "메뉴 구성 밸런스", desc: "고마진 메뉴 + 인기 메뉴 적절히 배치" },
              { icon: "💰", title: "가격대 다양화", desc: "저가/중가/고가 메뉴를 골고루 구성" },
              { icon: "🔄", title: "계절 메뉴 기획", desc: "계절별 한정 메뉴로 신선함 유지" },
              { icon: "📸", title: "비주얼 최적화", desc: "SNS 업로드용 포토제닉 메뉴 개발" },
              { icon: "⚡", title: "조리 시간 고려", desc: "피크타임 대응 가능한 조리 시간 설계" },
              { icon: "🧪", title: "테스트 마케팅", desc: "지인 시식, 팝업스토어로 사전 검증" },
              { icon: "📋", title: "레시피 표준화", desc: "맛 일관성 위한 정확한 레시피 문서화" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 추천 메뉴 구성 전략 */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Utensils className="h-6 w-6" />
            추천 메뉴 구성 전략
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-lg mb-2 text-green-700">⭐ Star (인기+고수익)</h4>
              <p className="text-sm text-muted-foreground">
                판매량 많고 마진 높은 메뉴<br />
                → 적극적으로 홍보하고 눈에 띄게 배치
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-lg mb-2 text-blue-700">🐴 Work Horse (인기+저수익)</h4>
              <p className="text-sm text-muted-foreground">
                판매량 많지만 마진 낮은 메뉴<br />
                → 가격 조정 또는 원가 절감 고려
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-lg mb-2 text-purple-700">🎁 Puzzle (비인기+고수익)</h4>
              <p className="text-sm text-muted-foreground">
                판매량 적지만 마진 높은 메뉴<br />
                → 프로모션으로 판매량 증대 시도
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-lg mb-2 text-red-700">⚠️ Dog (비인기+저수익)</h4>
              <p className="text-sm text-muted-foreground">
                판매량 적고 마진도 낮은 메뉴<br />
                → 메뉴판에서 과감히 제거 검토
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
