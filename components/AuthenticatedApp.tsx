import React from "react";
import { Box, Container } from "@mui/material";
import MainApp from "./MainApp";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";
import BottomNavigationBar from "./ui/BottomNavigationBar";
import { useStepNavigation } from "../hooks/hooks";
import { StepId, STEPS } from "../constants";
import MyDialogues from "./pages/MyDialogues.tsx";
import AdminUsers from "./pages/AdminUsers.tsx";
import { AppView, useViewStore } from "./viewStore.tsx";

const AuthenticatedApp: React.FC = () => {
  const view = useViewStore((state) => state.view);
  const setView = useViewStore((state) => state.setView);
  const { restart, currentStep } = useStepNavigation();

  const handleViewChange = (newView: AppView) => {
    if (newView === "dialogue" && (view === "dashboard" || view === "myDialogues")) {
      // When switching from dashboard to start a new dialogue, reset the survey state
      restart();
    }
    setView(newView);
  };

  const currentStepId = STEPS[currentStep]?.id;
  const shouldShowBottomNavigationBar =
    currentStepId === StepId.Welcome || currentStepId === StepId.Summary;

  return (
    <Box sx={{ pb: "56px" }}>
      {/* Padding at the bottom to avoid content being hidden by the nav bar */}
      <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
        {view === "dialogue" && <MainApp />}
        {view === "dashboard" && <AnalyticsDashboard />}
        {view === "myDialogues" && <MyDialogues />}
        {view === "adminUsers" && <AdminUsers onBack={() => handleViewChange("dialogue")} />}
      </Container>
      {shouldShowBottomNavigationBar && (
        <BottomNavigationBar
          currentView={view}
          onTabChange={handleViewChange}
        />
      )}
    </Box>
  );
};

export default AuthenticatedApp;
