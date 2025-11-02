import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FundingTools() {
  const [initialCost, setInitialCost] = useState({
    deposit: 0,
    interior: 0,
    equipment: 0,
    other: 0,
  });

  const [monthlyCost, setMonthlyCost] = useState({
    rent: 0,
    labor: 0,
    materials: 0,
    utilities: 0,
    other: 0,
  });

  const [revenue, setRevenue] = useState({
    avgPrice: 0,
    dailyCustomers: 0,
    operatingDays: 25,
  });

  const calculateTotal = (costs: Record<string, number>) => {
    return Object.values(costs).reduce((sum, val) => sum + val, 0);
  };

  const totalInitial = calculateTotal(initialCost);
  const totalMonthly = calculateTotal(monthlyCost);
  const monthlyRevenue = revenue.avgPrice * revenue.dailyCustomers * revenue.operatingDays;
  const monthlyProfit = monthlyRevenue - totalMonthly;
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(totalInitial / monthlyProfit) : 0;

  return (
    <div className="space-y-6">
      {/* 초기 투자 비용 계산기 */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <PiggyBank className="h-6 w-6" />
            초기 투자 비용 계산기
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deposit">보증금 (만원)</Label>
              <Input
                id="deposit"
                type="number"
                value={initialCost.deposit || ""}
                onChange={(e) => setInitialCost({ ...initialCost, deposit: Number(e.target.value) })}
                placeholder="예: 5000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interior">인테리어 (만원)</Label>
              <Input
                id="interior"
                type="number"
                value={initialCost.interior || ""}
                onChange={(e) => setInitialCost({ ...initialCost, interior: Number(e.target.value) })}
                placeholder="예: 3000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipment">집기/설비 (만원)</Label>
              <Input
                id="equipment"
                type="number"
                value={initialCost.equipment || ""}
                onChange={(e) => setInitialCost({ ...initialCost, equipment: Number(e.target.value) })}
                placeholder="예: 2000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-initial">기타 비용 (만원)</Label>
              <Input
                id="other-initial"
                type="number"
                value={initialCost.other || ""}
                onChange={(e) => setInitialCost({ ...initialCost, other: Number(e.target.value) })}
                placeholder="예: 500"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">총 초기 투자 비용</span>
              <span className="text-2xl font-bold text-green-700">{totalInitial.toLocaleString()}만원</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 월 운영 비용 계산기 */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <DollarSign className="h-6 w-6" />
            월 운영 비용 계산기
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rent">월세 (만원)</Label>
              <Input
                id="rent"
                type="number"
                value={monthlyCost.rent || ""}
                onChange={(e) => setMonthlyCost({ ...monthlyCost, rent: Number(e.target.value) })}
                placeholder="예: 200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labor">인건비 (만원)</Label>
              <Input
                id="labor"
                type="number"
                value={monthlyCost.labor || ""}
                onChange={(e) => setMonthlyCost({ ...monthlyCost, labor: Number(e.target.value) })}
                placeholder="예: 300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">재료비 (만원)</Label>
              <Input
                id="materials"
                type="number"
                value={monthlyCost.materials || ""}
                onChange={(e) => setMonthlyCost({ ...monthlyCost, materials: Number(e.target.value) })}
                placeholder="예: 400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="utilities">공과금 (만원)</Label>
              <Input
                id="utilities"
                type="number"
                value={monthlyCost.utilities || ""}
                onChange={(e) => setMonthlyCost({ ...monthlyCost, utilities: Number(e.target.value) })}
                placeholder="예: 50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-monthly">기타 비용 (만원)</Label>
              <Input
                id="other-monthly"
                type="number"
                value={monthlyCost.other || ""}
                onChange={(e) => setMonthlyCost({ ...monthlyCost, other: Number(e.target.value) })}
                placeholder="예: 100"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">월 총 운영 비용</span>
              <span className="text-2xl font-bold text-blue-700">{totalMonthly.toLocaleString()}만원</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 손익분기점 분석 */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <TrendingUp className="h-6 w-6" />
            손익분기점 분석
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="avgPrice">객단가 (원)</Label>
              <Input
                id="avgPrice"
                type="number"
                value={revenue.avgPrice || ""}
                onChange={(e) => setRevenue({ ...revenue, avgPrice: Number(e.target.value) })}
                placeholder="예: 15000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyCustomers">일 평균 손님 수 (명)</Label>
              <Input
                id="dailyCustomers"
                type="number"
                value={revenue.dailyCustomers || ""}
                onChange={(e) => setRevenue({ ...revenue, dailyCustomers: Number(e.target.value) })}
                placeholder="예: 50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingDays">월 운영일수 (일)</Label>
              <Input
                id="operatingDays"
                type="number"
                value={revenue.operatingDays || ""}
                onChange={(e) => setRevenue({ ...revenue, operatingDays: Number(e.target.value) })}
                placeholder="예: 25"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">예상 월 매출</span>
                  <span className="text-xl font-bold text-purple-700">
                    {monthlyRevenue.toLocaleString()}만원
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">월 순이익</span>
                  <span className={`text-xl font-bold ${monthlyProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                    {monthlyProfit.toLocaleString()}만원
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2">
                  <span className="text-lg font-semibold">손익분기점 도달</span>
                  <div className="flex items-center gap-2">
                    {breakEvenMonths > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-primary">{breakEvenMonths}개월</span>
                        <Badge className="bg-green-500">
                          {breakEvenMonths <= 12 ? "양호" : breakEvenMonths <= 24 ? "보통" : "주의"}
                        </Badge>
                      </>
                    ) : (
                      <Badge variant="destructive">재계산 필요</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">💡 Tip:</span> 일반적으로 외식업의 손익분기점은 12~18개월이 적정합니다.
                24개월을 초과할 경우 비용 구조 재검토가 필요합니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 추천 자금 조달 방안 */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Calculator className="h-6 w-6" />
            추천 자금 조달 방안
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all">
                <h4 className="font-bold text-lg mb-2">🏦 소상공인 정책자금</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  최대 7천만원, 금리 2~3%대
                </p>
                <Badge className="bg-orange-500">정부지원</Badge>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all">
                <h4 className="font-bold text-lg mb-2">💳 신용보증기금</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  보증서 발급으로 대출 용이
                </p>
                <Badge className="bg-blue-500">보증지원</Badge>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all">
                <h4 className="font-bold text-lg mb-2">🎯 청년창업 지원금</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  39세 이하, 최대 1억원 (조건부)
                </p>
                <Badge className="bg-green-500">청년특화</Badge>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all">
                <h4 className="font-bold text-lg mb-2">👥 엔젤투자/크라우드펀딩</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  차별화된 콘셉트 시 유리
                </p>
                <Badge className="bg-purple-500">민간투자</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
