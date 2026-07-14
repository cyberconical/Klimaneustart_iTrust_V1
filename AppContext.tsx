import React, { createContext, useState, useCallback, useContext } from "react";
import { ConversationData, DeineReflection } from "./types";
import {
  INITIAL_CONVERSATION_DATA,
  DEINE_REFLECTION,
  STEPS,
} from "./constants";

interface AppContextType {
  // State
  conversation: ConversationData;
  reflection: DeineReflection;
  currentStep: number;
  step2View: "district" | "topics";

  // Updaters
  updateConversation: (data: Partial<ConversationData>) => void;
  updateReflection: (data: Partial<DeineReflection>) => void;

  // Navigation
  goToNext: () => void;
  goToPrevious: () => void;
  setStep2View: (view: "district" | "topics") => void;
  restart: () => void;
  setCurrentStep: (step: number) => void; // Add this line
  updateCurrentStep: (step: number) => void; // Add the new function to the interface
}

// ✅ Correctly typed context
const AppContext = createContext<AppContextType | undefined>(undefined);

// ✅ Custom hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// ✅ Provider component with all values passed correctly
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversation, setConversation] = useState<ConversationData>(
    INITIAL_CONVERSATION_DATA
  );
  const [reflection, setReflection] =
    useState<DeineReflection>(DEINE_REFLECTION);

  const [currentStep, setCurrentStep] = useState(0);
  const [step2View, setStep2View] = useState<"district" | "topics">("district");

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1)); // Ensure it doesn't exceed the last step
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Ensure it doesn't go below the first step
  }, []);

  const updateConversation = useCallback(
    (newData: Partial<ConversationData>) => {
      setConversation((prev) => ({ ...prev, ...newData }));
    },
    []
  );

  const updateReflection = useCallback((newData: Partial<DeineReflection>) => {
    setReflection((prev) => ({ ...prev, ...newData }));
  }, []);

  const restart = useCallback(() => {
    setConversation(INITIAL_CONVERSATION_DATA);
    setReflection(DEINE_REFLECTION);
    setStep2View("district");
    setCurrentStep(0);
  }, []);

  // Add a function to update the current step
  const updateCurrentStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  // const values = 

  const contextValue: AppContextType = {
    conversation,
    reflection,
    currentStep,
    step2View,
    updateConversation,
    updateReflection,
    setStep2View,
    restart,
    setCurrentStep, // Add this to the context
    updateCurrentStep, // Add this to the context
    goToNext,
    goToPrevious
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
