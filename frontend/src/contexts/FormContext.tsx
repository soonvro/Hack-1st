import { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  // Step 1: Profile Info
  age: string;
  gender: "M" | "F" | "";
  previousOccupationCategory: string;
  previousOccupationDetail: string;
  mbti: string;
  hasStartupExperience: "처음 창업" | "경험 있음" | "";
  
  // Step 2: Project Type
  projectType: "new" | "existing" | null;
  
  // Step 3: Industry Category
  industryCategory: string;
  
  // Step 4: Industry Detail
  industry: string;
  
  // Business Options
  businessOptions: string[];
  
  // Step 5: Concept
  concepts: string[];
  
  // Step 6: Location (동 단위)
  selectedDistricts: string[];
  
  // Step 7: Budget
  budgetAmount: number;
  budgetRange: string;
  
  // Step 8: Vision & Values
  visionTags: string[];
  visionText: string;
  
  // Step 9: Business Goals
  businessGoals: string[];
}

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    previousOccupationCategory: "",
    previousOccupationDetail: "",
    mbti: "",
    hasStartupExperience: "",
    projectType: null,
    industryCategory: "",
    industry: "",
    businessOptions: [],
    concepts: [],
    selectedDistricts: [],
    budgetAmount: 0,
    budgetRange: "",
    visionTags: [],
    visionText: "",
    businessGoals: [],
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};
