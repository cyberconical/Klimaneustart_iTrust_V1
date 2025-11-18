import React from "react";
import { Box, Typography, TextField, Button, Paper, Chip } from "@mui/material";
import { AppProps } from "../../types";
import { useLanguage } from "../LanguageContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: ${COLORS.new_red};
  color: ${COLORS.white2};
  border: 2px solid ${COLORS.chlorophyll};
  text-align: center;
`;

const AudioPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-top: 24px;
  background-color: ${COLORS.white3};
  border-radius: 8px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
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

const Step1Core: React.FC<AppProps> = ({ data, updateData, onNext }) => {
  const MAX_CHARS = 2000;
  const { t } = useLanguage();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <StyledPaper elevation={0}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">{t("dialogue.headerSubtitle")}</Typography>
      </StyledPaper>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Notizen
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          placeholder={t("dialogue.notesPlaceholder")}
          value={data.notes}
          onChange={(e) => updateData({ notes: e.target.value })}
          inputProps={{ maxLength: MAX_CHARS }}
          helperText={`${data.notes.length}/${MAX_CHARS} max`}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper",
            },
          }}
        />

      </Box>

      <Footer>
        <StyledNextButton
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {t("dialogue.next")}
        </StyledNextButton>
      </Footer>
    </Box>
  );
};

export default Step1Core;
