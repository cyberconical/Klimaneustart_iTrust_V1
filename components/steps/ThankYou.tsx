import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { AppProps } from "../../types";
import { COLORS } from "../../constants";
import { useLanguage } from "../LanguageContext";

const ThankYou: React.FC<AppProps> = ({ onRestart }) => {
  const { t } = useLanguage();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: { xs: 2, sm: 4 },
        height: "100%",
        gap: 3,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 2 }}>
        <img
          src="/icons/logo_actual_square.png"
          alt="Klimaneustart Berlin Logo"
          style={{ width: "120px", height: "120px" }}
        />
      </Box>
      <Paper
        elevation={0}
        sx={{
          bgcolor: COLORS.chlorophyll,
          color: COLORS.primary_background,
          p: { xs: 3, sm: 4 },
          width: "100%",
          border: "2px solid #18181B", // Dark border as in sketch
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {t("thankYou.thankYou")}
        </Typography>
        <Typography variant="h6" component="p">
          {t("thankYou.responseRecorded")}
        </Typography>
      </Paper>
      {/* <Box sx={{ flexGrow: 1 }} /> */}
      {/* Spacer to push button to the bottom */}
      {/* Deep Dive Button */}
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{
          width: "100%",
          // maxWidth: { xs: "100%", sm: 400 },
          mb: 2,
          border: `2px solid ${COLORS.new_red}`,
          color: `${COLORS.red2}`,
          "&:hover": {
            bgcolor: `${COLORS.primary}`,
            color: `${COLORS.white2}`,
          },
        }}
        onClick={() => alert("Deep Dive functionality coming soon!")}
      >
        Deep Dive in Initiative
      </Button>

      <Button
        onClick={onRestart}
        variant="contained"
        color="primary"
        size="large"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 400 },
          border: "1.5px solid #18181B",
          backgroundColor: COLORS.chlorophyll,
          color: COLORS.primary_background,
        }}
      >
        {t("thankYou.nextDialogue")}
      </Button>
    </Box>
  );
};

export default ThankYou;
