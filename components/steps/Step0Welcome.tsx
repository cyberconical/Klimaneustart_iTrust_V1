import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import SchoolIcon from "@mui/icons-material/School"; // Placeholder for 'brain' icon
import { useLanguage } from "../LanguageContext";

let logo = "/icons/logo_actual_square.png";

interface Step0WelcomeProps {
  onNext: () => void;
}

const Step0Welcome: React.FC<Step0WelcomeProps> = ({ onNext }) => {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 3,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: { xs: 200, sm: 250 },
          height: { xs: 200, sm: 250 },
          borderRadius: "16px",
          mb: 4,
        }}
      />

      <Typography variant="h3" component="h1" gutterBottom>
        {t('welcome.title')}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: "500px" }}
      >
        {t('welcome.subtitle')}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <SchoolIcon color="action" />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {t('welcome.caredBy')}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onNext}
        endIcon={<TrendingFlatIcon />}
      >
        {t('welcome.startButton')}
      </Button>
    </Box>
  );
};

export default Step0Welcome;
