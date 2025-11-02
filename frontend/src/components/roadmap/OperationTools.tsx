import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Megaphone, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function OperationTools() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openingChecklist = {
    "인력 관리": [
      { id: "hr-1", title: "직원 채용 공고 및 면접", desc: "알바천국, 사장님 앱 활용" },
      { id: "hr-2", title: "4대보험 가입 신고", desc: "고용/산재/국민연금/건강보험" },
      { id: "hr-3", title: "업무 매뉴얼 작성", desc: "포지션별 업무 프로세스 문서화" },
      { id: "hr-4", title: "직원 교육 실시", desc: "서비스, 조리, 위생 교육" },
    ],
    "시설 및 설비": [
      { id: "facility-1", title: "인테리어 공사 완료", desc: "소방, 전기, 설비 점검" },
      { id: "facility-2", title: "주방 기기 설치", desc: "냉장고, 조리대, 가스레인지 등" },
      { id: "facility-3", title: "POS 시스템 설치", desc: "매출 관리 및 결제 시스템" },
      { id: "facility-4", title: "집기류 구매", desc: "테이블, 의자, 식기, 집기" },
      { id: "facility-5", title: "위생용품 준비", desc: "소독제, 마스크, 장갑 등" },
    ],
    "마케팅 준비": [
      { id: "marketing-1", title: "SNS 계정 개설", desc: "인스타그램, 네이버 플레이스" },
      { id: "marketing-2", title: "간판 및 현수막 제작", desc: "시선 끄는 디자인" },
      { id: "marketing-3", title: "전단지 제작 배포", desc: "반경 500m 집중 배포" },
      { id: "marketing-4", title: "오픈 이벤트 기획", desc: "할인, 증정 등 프로모션" },
      { id: "marketing-5", title: "배달앱 입점", desc: "배달의민족, 쿠팡이츠 등" },
    ],
    "최종 점검": [
      { id: "final-1", title: "메뉴 최종 확정", desc: "가격, 레시피, 플레이팅" },
      { id: "final-2", title: "재료 발주처 확보", desc: "거래처 계약 및 납품 테스트" },
      { id: "final-3", title: "프리 오픈 실시", desc: "지인 초대 리허설" },
      { id: "final-4", title: "비상 연락망 구축", desc: "수리/배달/폐기물 등" },
      { id: "final-5", title: "현금/카드 준비", desc: "거스름돈, 카드단말기 점검" },
    ],
  };

  const totalItems = Object.values(openingChecklist).flat().length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* 오픈 준비 진행률 */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-bold text-xl">오픈 준비 완료율</h3>
                <p className="text-sm text-muted-foreground">
                  {checkedCount} / {totalItems} 항목 완료
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{progress}%</p>
              <Badge className={progress >= 80 ? "bg-green-500" : progress >= 50 ? "bg-blue-500" : "bg-orange-500"}>
                {progress >= 80 ? "거의 완료" : progress >= 50 ? "진행 중" : "시작 단계"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 카테고리별 체크리스트 */}
      {Object.entries(openingChecklist).map(([category, items]) => {
        const categoryIcon =
          category === "인력 관리" ? Users :
          category === "시설 및 설비" ? Package :
          category === "마케팅 준비" ? Megaphone :
          Calendar;

        const Icon = categoryIcon;
        const categoryProgress = Math.round(
          (items.filter(item => checkedItems[item.id]).length / items.length) * 100
        );

        return (
          <Card key={category} className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-800">
                  <Icon className="h-6 w-6" />
                  {category}
                </div>
                <Badge variant="outline" className="text-purple-700 border-purple-400">
                  {categoryProgress}% 완료
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => toggleCheck(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={item.id}
                          className="font-semibold text-base cursor-pointer block mb-1"
                        >
                          {item.title}
                        </label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* 오픈 D-day 타임라인 */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Calendar className="h-6 w-6" />
            오픈 전 타임라인 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { period: "D-60", title: "인허가 및 자금 확보", color: "bg-blue-100 border-blue-300 text-blue-800" },
              { period: "D-45", title: "입지 확정 및 계약", color: "bg-purple-100 border-purple-300 text-purple-800" },
              { period: "D-30", title: "인테리어 착공 및 집기 발주", color: "bg-orange-100 border-orange-300 text-orange-800" },
              { period: "D-20", title: "메뉴 개발 및 레시피 확정", color: "bg-pink-100 border-pink-300 text-pink-800" },
              { period: "D-15", title: "직원 채용 및 교육 시작", color: "bg-cyan-100 border-cyan-300 text-cyan-800" },
              { period: "D-10", title: "SNS 마케팅 시작", color: "bg-indigo-100 border-indigo-300 text-indigo-800" },
              { period: "D-7", title: "프리 오픈 (지인 초대)", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
              { period: "D-3", title: "최종 점검 및 재료 준비", color: "bg-red-100 border-red-300 text-red-800" },
              { period: "D-DAY", title: "그랜드 오픈! 🎉", color: "bg-green-100 border-green-300 text-green-800 font-bold text-lg" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${item.color} flex items-center gap-4`}
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <p className="font-bold">{item.period}</p>
                </div>
                <div className="flex-1">
                  <p className={item.period === "D-DAY" ? "font-bold text-lg" : "font-semibold"}>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 마케팅 채널 추천 */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Megaphone className="h-6 w-6" />
            추천 마케팅 채널 & 전략
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: "📱",
                title: "인스타그램",
                desc: "사진/릴스로 메뉴 홍보, 해시태그 활용",
                priority: "필수",
                color: "bg-pink-500"
              },
              {
                icon: "🗺️",
                title: "네이버 플레이스",
                desc: "리뷰 관리, 위치 노출, 예약 연동",
                priority: "필수",
                color: "bg-green-500"
              },
              {
                icon: "🚚",
                title: "배달앱",
                desc: "배민/쿠팡이츠 입점, 프로모션 활용",
                priority: "권장",
                color: "bg-blue-500"
              },
              {
                icon: "📢",
                title: "전단지/현수막",
                desc: "반경 500m 집중 배포, 오픈 할인",
                priority: "권장",
                color: "bg-orange-500"
              },
              {
                icon: "🎁",
                title: "오픈 이벤트",
                desc: "50% 할인, 1+1, 쿠폰 증정 등",
                priority: "필수",
                color: "bg-purple-500"
              },
              {
                icon: "👥",
                title: "인플루언서 협업",
                desc: "지역 인플루언서 초대 리뷰",
                priority: "선택",
                color: "bg-cyan-500"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-base">{item.title}</h4>
                      <Badge className={`${item.color} text-white`}>{item.priority}</Badge>
                    </div>
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
