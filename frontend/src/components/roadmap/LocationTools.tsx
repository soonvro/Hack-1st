import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, TrendingUp, Users, Store, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export function LocationTools() {
  const [locationScore, setLocationScore] = useState({
    footTraffic: 50,
    competition: 50,
    accessibility: 50,
    rent: 50,
  });

  const [rentCalculator, setRentCalculator] = useState({
    monthlyRent: 0,
    deposit: 0,
    managementFee: 0,
  });

  const calculateLocationScore = () => {
    const weights = {
      footTraffic: 0.35,
      competition: 0.25,
      accessibility: 0.25,
      rent: 0.15,
    };

    const score = Math.round(
      locationScore.footTraffic * weights.footTraffic +
      (100 - locationScore.competition) * weights.competition + // 경쟁이 적을수록 높은 점수
      locationScore.accessibility * weights.accessibility +
      (100 - locationScore.rent) * weights.rent // 임대료가 낮을수록 높은 점수
    );

    return score;
  };

  const totalScore = calculateLocationScore();
  const scoreGrade = totalScore >= 80 ? "우수" : totalScore >= 60 ? "양호" : totalScore >= 40 ? "보통" : "주의";
  const scoreColor = totalScore >= 80 ? "bg-green-500" : totalScore >= 60 ? "bg-blue-500" : totalScore >= 40 ? "bg-yellow-500" : "bg-red-500";

  const totalMonthlyPayment = rentCalculator.monthlyRent + rentCalculator.managementFee;
  const depositInterestLoss = Math.round(rentCalculator.deposit * 0.04 / 12); // 연 4% 가정

  return (
    <div className="space-y-6">
      {/* 입지 점수 계산기 */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <MapPin className="h-6 w-6" />
            입지 적합도 분석
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  유동인구
                </Label>
                <span className="text-sm font-semibold">{locationScore.footTraffic}점</span>
              </div>
              <Slider
                value={[locationScore.footTraffic]}
                onValueChange={(val) => setLocationScore({ ...locationScore, footTraffic: val[0] })}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                평일/주말 유동인구, 주요 시간대 인구 밀집도
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-orange-600" />
                  경쟁 강도
                </Label>
                <span className="text-sm font-semibold">{locationScore.competition}점</span>
              </div>
              <Slider
                value={[locationScore.competition]}
                onValueChange={(val) => setLocationScore({ ...locationScore, competition: val[0] })}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                반경 500m 내 유사 업종 수, 시장 포화도
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  접근성
                </Label>
                <span className="text-sm font-semibold">{locationScore.accessibility}점</span>
              </div>
              <Slider
                value={[locationScore.accessibility]}
                onValueChange={(val) => setLocationScore({ ...locationScore, accessibility: val[0] })}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                대중교통 접근성, 주차 편의성, 가시성
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  임대료 수준
                </Label>
                <span className="text-sm font-semibold">{locationScore.rent}점</span>
              </div>
              <Slider
                value={[locationScore.rent]}
                onValueChange={(val) => setLocationScore({ ...locationScore, rent: val[0] })}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                주변 시세 대비 임대료 수준 (높을수록 부담)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">종합 입지 점수</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">{totalScore}점</span>
                <Badge className={`${scoreColor} text-white font-bold`}>{scoreGrade}</Badge>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 80점 이상: 매우 우수한 입지</p>
              <p>• 60-79점: 양호한 입지</p>
              <p>• 40-59점: 보통 수준, 보완 필요</p>
              <p>• 40점 미만: 재검토 권장</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 임대료 계산기 */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <DollarSign className="h-6 w-6" />
            임대료 부담 계산기
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyRent">월세 (만원)</Label>
              <Input
                id="monthlyRent"
                type="number"
                value={rentCalculator.monthlyRent || ""}
                onChange={(e) => setRentCalculator({ ...rentCalculator, monthlyRent: Number(e.target.value) })}
                placeholder="예: 200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">보증금 (만원)</Label>
              <Input
                id="deposit"
                type="number"
                value={rentCalculator.deposit || ""}
                onChange={(e) => setRentCalculator({ ...rentCalculator, deposit: Number(e.target.value) })}
                placeholder="예: 5000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managementFee">관리비 (만원)</Label>
              <Input
                id="managementFee"
                type="number"
                value={rentCalculator.managementFee || ""}
                onChange={(e) => setRentCalculator({ ...rentCalculator, managementFee: Number(e.target.value) })}
                placeholder="예: 30"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">월 총 부담액</span>
                  <span className="text-xl font-bold text-green-700">
                    {totalMonthlyPayment.toLocaleString()}만원
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">보증금 기회비용 (월)</span>
                  <span className="text-lg font-semibold text-orange-600">
                    {depositInterestLoss.toLocaleString()}만원
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2">
                  <span className="text-lg font-semibold">실질 월 부담액</span>
                  <span className="text-2xl font-bold text-primary">
                    {(totalMonthlyPayment + depositInterestLoss).toLocaleString()}만원
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">💡 Tip:</span> 임대료는 예상 매출의 10% 이내가 적정합니다.
                15%를 초과할 경우 수익성에 부담이 될 수 있습니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 상권 분석 체크리스트 */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Store className="h-6 w-6" />
            상권 분석 필수 체크 포인트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: "👥", title: "타겟 고객층 분포", desc: "주거/직장/유동 인구 비율 확인" },
              { icon: "🏢", title: "주변 시설 분석", desc: "오피스, 학교, 아파트, 상업시설 파악" },
              { icon: "🚇", title: "교통 접근성", desc: "지하철역, 버스정류장 도보 거리" },
              { icon: "🅿️", title: "주차 가능 여부", desc: "인근 공영주차장 또는 건물 주차장" },
              { icon: "⏰", title: "유동인구 시간대", desc: "점심/저녁/야간 시간대별 인구 흐름" },
              { icon: "🏪", title: "경쟁업체 현황", desc: "유사 업종 수, 성업 여부, 가격대" },
              { icon: "🚧", title: "개발 계획", desc: "재개발, 신규 건물, 도로 공사 여부" },
              { icon: "💰", title: "권리금 적정성", desc: "시세 대비 권리금 수준, 영업 실적" },
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
    </div>
  );
}
