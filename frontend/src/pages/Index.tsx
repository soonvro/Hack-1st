import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            창업 지원 플랫폼에 오신 것을 환영합니다!
          </h1>
          <p className="text-xl text-muted-foreground">
            당신의 창업 여정을 함께 하겠습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
            <div className="inline-block p-4 bg-blue-500 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-blue-600">AI 기반 시장 분석</h3>
            <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-80">
              업종과 지역에 맞는 맞춤형 시장 분석을 제공합니다
            </p>
          </div>

          <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
            <div className="inline-block p-4 bg-green-500 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-green-600">데이터 기반 의사결정</h3>
            <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-80">
              유동인구, 경쟁 현황 등 실질적인 데이터로 판단하세요
            </p>
          </div>

          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
            <div className="inline-block p-4 bg-purple-500 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Target className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-purple-600">단계별 프로젝트 관리</h3>
            <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-80">
              창업 준비부터 실행까지 체계적으로 관리할 수 있습니다
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate("/profile-info")} 
            size="lg" 
            className="h-16 px-12 text-lg rounded-full"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
