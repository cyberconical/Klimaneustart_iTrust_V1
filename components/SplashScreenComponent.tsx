import React, { useState, useEffect } from "react";
import { Box, Typography, Fade, keyframes } from "@mui/material";
import { COLORS } from "../constants";

let logo = "/icons/logo_actual_square.png";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreenComponent: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  const scaleDown = keyframes`
        from { transform: scale(5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    `;

  const fadeIn = keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
    `;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setTextVisible(true);
    }, 1200);

    const timer2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 500);
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <Fade in={visible} timeout={500}>
      <Box
        sx={{
          display: "flex",
          gap: "5%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "background.paper",
          zIndex: 9999,
        }}
      >
        <Fade in={textVisible} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h1" fontWeight="bold" color={COLORS.red2}>
              Sag doch mal, Berlin!
            </Typography>
          </Box>
        </Fade>
        <Box
          component="img"
          src={logo}
          alt="Berlin Climate Dialogue Logo"
          sx={{
            width: 200,
            height: 200,
            borderRadius: 2,
            mb: 4,
            animation: `${scaleDown} 1200ms ease-out forwards`,
          }}
        />
        <Fade in={textVisible} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" color={COLORS.green2}>
              Zuhören. Reden. Mitgestalten
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Fade>
  );
};

export default SplashScreenComponent;
