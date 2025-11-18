import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AppProps } from "../../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { COLORS } from "../../constants";
import styled from "styled-components";
import { useLanguage } from "../LanguageContext";

type ParticipantType = "single" | "family" | "couple";

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

const Step5Metrics: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const { t } = useLanguage();
  const handleParticipantTypeChange = (type: ParticipantType) => {
    // Enforce single selection like a radio group
    updateData({ participantType: type });
  };

  const [numPeopleValue, setNumPeopleValue] = useState(
    data.numPeople?.toString() || "1"
  );
  const [durationValue, setDurationValue] = useState(
    data.duration?.toString() || "10"
  );

  useEffect(() => {
    if (!data.numPeople) {
      updateData({ numPeople: 1 });
    }
    if (!data.duration) {
      updateData({ duration: 10 });
    }
  }, []);

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
          {t("metrics.dialogue")}
        </Typography>
        <Typography variant="h6">{t("metrics.generalInformation")}</Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            {t("metrics.dialoguePartners")}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={numPeopleValue}
            onChange={(e) => {
              const value = e.target.value;
              // Allow the input to be empty, but don't allow non-numeric characters
              if (/^\d*$/.test(value)) {
                setNumPeopleValue(value); // Update the local string value
                updateData({ numPeople: parseInt(value, 10) || 0 }); // Update the main data
              }
            }}
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              min: 1,
            }}
            variant="filled"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              },

              "& .MuiFilledInput-root": {
                backgroundColor: COLORS.white2,
                "&:hover": {
                  backgroundColor: COLORS.white3,
                },
                "&.Mui-focused": {
                  backgroundColor: COLORS.white2,
                  borderColor: COLORS.brown2,
                  boxShadow: `0 0 0 2px ${COLORS.brown2}`,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.brown2,
              },
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            {t("metrics.duration")}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={durationValue}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setDurationValue(value); // Update the local string value
                updateData({ duration: parseInt(value, 10) || 0 }); // Update the main data
              }
            }}
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              min: 1,
            }}
            variant="filled"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              },

              "& .MuiFilledInput-root": {
                backgroundColor: COLORS.white2,
                "&:hover": {
                  backgroundColor: COLORS.white3,
                },
                "&.Mui-focused": {
                  backgroundColor: COLORS.white2,
                  borderColor: COLORS.brown2,
                  boxShadow: `0 0 0 2px ${COLORS.brown2}`,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.brown2,
              },
            }}
          />
        </Grid>
      </Grid>

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

export default Step5Metrics;
