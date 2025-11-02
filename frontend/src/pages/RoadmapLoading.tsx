import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

export default function RoadmapLoading() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/roadmap"), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-2xl space-y-12">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground animate-pulse">
            이것은 더 확실하고 잘 높은 결과물을 제공하기 위함입니다.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-80 h-80">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-cyan-500 rounded-full blur-3xl opacity-40 animate-pulse" />
            
            {/* Center circle with brain wave animation */}
            <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Animated brain wave bars */}
                <div className="flex items-center justify-center gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 80 + 40}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.8 + Math.random() * 0.4}s`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Sparkle effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-blue-500 animate-spin" style={{ animationDuration: "3s" }} />
                </div>
              </div>
            </div>
            
            {/* Rotating ring */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            AI가 대표님만의 맞춤 로드맵을 생성 중입니다
          </h1>
          <p className="text-lg text-muted-foreground">
            성공적인 여정을 함께 만들어나가요!
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-end">
            <span className="text-3xl font-bold text-primary animate-pulse">{progress}%</span>
          </div>
          <Progress value={progress} className="h-4" />
        </div>
      </div>
    </div>
  );
}
