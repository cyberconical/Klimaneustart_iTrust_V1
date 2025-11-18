import React from "react";
import { Box, Typography, TextField, Button, Paper, Chip } from "@mui/material";
import { AppProps } from "../../types";
import MicIcon from "@mui/icons-material/Mic";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "../LanguageContext";
import styled from "styled-components";
import { COLORS } from "../../constants";

const StyledButton = styled(Button)`
  background-color: ${COLORS.primary_background};
  color: ${COLORS.heading};
  &:hover {
    background-color: ${COLORS.button_background_green};
  }
`;

const StyledNextButton = styled(Button)`
  background-color: ${COLORS.chlorophyll};
  color: ${COLORS.white2};
  &:hover {
    background-color: ${COLORS.chlorophyll};
    color: ${COLORS.white2};
    opacity: 0.7;
  }
  ,
  &:focus {
    background-color: ${COLORS.chlorophyll};
    color: ${COLORS.brown2};
    opacity: 0.7;
  }
`;

const StyledBackButton = styled(Button)`
  background-color: ${COLORS.feuerrot};
  color: ${COLORS.white2};
  &:hover {
    background-color: ${COLORS.feuerrot};
    color: ${COLORS.white2};
    opacity: 0.7;
  }
  ,
  &:focus {
    background-color: ${COLORS.feuerrot};
    color: ${COLORS.white2};
    opacity: 0.7;
  }
`;

const Step5Reflection: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const { t } = useLanguage();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: COLORS.blue1,
          color: COLORS.white2,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          {t("reflection.yourReflection")}
        </Typography>
        <Typography variant="h6">{t("reflection.whatElseShowed")}</Typography>
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {t("reflection.shareThoughts")}
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          placeholder={t("reflection.resonanceEssence")}
          value={data.observerReflection}
          onChange={(e) => updateData({ observerReflection: e.target.value })}
          sx={{
            backgroundColor: "background.paper",
            mt: 1,
            mb: 3,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          mt: "auto",
        }}
      >
        <StyledBackButton variant="contained" onClick={onBack}>
          {t("dialogue.back")}
        </StyledBackButton>
        <StyledNextButton
          // variant="outlined"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {t("dialogue.next")}
        </StyledNextButton>
      </Box>
    </Box>
  );
};

export default Step5Reflection;
