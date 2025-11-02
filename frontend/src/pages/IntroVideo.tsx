import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const IntroVideo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* Play button icon */}
        <div className="relative mb-12 flex justify-center">
          <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 blur-3xl absolute animate-pulse"></div>
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 relative flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer group">
            <Play className="h-16 w-16 text-white ml-2 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
          Pathfinder가 당신의 여정을 안내합<br />니다
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed px-4">
          몇 가지 질문에 답하고, 성공적인 창업을 위한 맞춤형 경로를<br />
          설계해보세요.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/profile-info")}
          size="lg"
          className="h-16 px-12 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default IntroVideo;
