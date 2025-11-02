import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* Decorative blob */}
        <div className="relative mb-12 flex justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-80 blur-3xl absolute animate-pulse"></div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 relative flex items-center justify-center shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 absolute -top-4 -right-4"></div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
          안녕하세요, 사장님!
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed px-4">
          성공적인 창업을 위한 첫걸음, Pathfinder가 함께합니다. 몇<br />
          가지 질문에 답변해주시면 사장님께 꼭 맞는 맞춤형 정보를 제<br />
          공해 드릴게요.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/intro")}
          size="lg"
          className="h-16 px-12 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          시작하기
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
