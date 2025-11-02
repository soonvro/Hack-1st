import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./contexts/FormContext";
import Welcome from "./pages/Welcome";
import IntroVideo from "./pages/IntroVideo";
import Index from "./pages/Index";
import ContentsList from "./pages/ContentsList";
import ProfileInfo from "./pages/ProfileInfo";
import ProjectType from "./pages/ProjectType";
import IndustryCategorySelection from "./pages/IndustryCategorySelection";
import IndustryDetailSelection from "./pages/IndustryDetailSelection";
import DistrictSelection from "./pages/DistrictSelection";
import SelectionSummary from "./pages/SelectionSummary";
import LocationSelection from "./pages/LocationSelection";
import VisionValues from "./pages/VisionValues";
import BusinessGoals from "./pages/BusinessGoals";
import Confirmation from "./pages/Confirmation";
import RoadmapLoading from "./pages/RoadmapLoading";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FormProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/intro" element={<IntroVideo />} />
            <Route path="/home" element={<Index />} />
            <Route path="/contents-list" element={<ContentsList />} />
            <Route path="/profile-info" element={<ProfileInfo />} />
            <Route path="/project-type" element={<ProjectType />} />
            <Route path="/industry-category-selection" element={<IndustryCategorySelection />} />
            <Route path="/industry-detail-selection" element={<IndustryDetailSelection />} />
            <Route path="/district-selection" element={<DistrictSelection />} />
            <Route path="/selection-summary" element={<SelectionSummary />} />
            <Route path="/location-selection" element={<LocationSelection />} />
            <Route path="/vision-values" element={<VisionValues />} />
            <Route path="/business-goals" element={<BusinessGoals />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/roadmap-loading" element={<RoadmapLoading />} />
            <Route path="/roadmap" element={<Roadmap />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
