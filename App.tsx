import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./AppContext";
import { LanguageProvider } from "./components/LanguageContext"; 
import { CssBaseline, Container } from "@mui/material";
import { theme } from "./theme";
import SplashScreenComponent from "./components/SplashScreenComponent";
import Login from "./components/Login";
import AuthenticatedApp from "./components/AuthenticatedApp";
import DialogueQR from "./components/pages/DialogueQR";
import LanguageToggle from "./components/ui/LanguageToggle";
import AppMenu from "./components/ui/AppMenu.tsx";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Public route: /dialogue/:id renders share page without auth
  const dialogueMatch = typeof window !== 'undefined'
    ? window.location.pathname.match(/^\/dialogue\/([^/]+)$/)
    : null;
  if (dialogueMatch) {
    const dialogueId = dialogueMatch[1];
    return (
    <LanguageProvider>
        <AppProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LanguageToggle /> 
            <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
              <DialogueQR dialogueId={dialogueId} />
            </Container>
          </ThemeProvider>
        </AppProvider>
      </LanguageProvider> 
    );
  }

  return (
    <LanguageProvider> 
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppMenu />
          {/* {showSplash ? (
                  <SplashScreenComponent onFinish={() => setShowSplash(false)} />
              ) : !isLoggedIn ? (
                  <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                  <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
                      <MainApp />
                  </Container>
              )} */}
          {showSplash ? (
            <SplashScreenComponent onFinish={() => setShowSplash(false)} />
          ) : !isLoggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <AuthenticatedApp />
          )}
        </ThemeProvider>
      </AppProvider>
    </LanguageProvider> 
  );
}