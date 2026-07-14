import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  Modal,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { QRCodeCanvas } from "qrcode.react";
import { AppProps } from "../../types";
import { INTEREST_AREAS2, INITIATIVES, COLORS } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { saveConversation } from "../../services/conversationService";
import { useLanguage } from "../LanguageContext";
import styled from "styled-components";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

// Frontend route base for the public QR page
const PUBLIC_QR_BASE =
  typeof window !== "undefined" ? window.location.origin : "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: ${COLORS.chlorophyll};
  color: ${COLORS.primary_background};
  border: 2px solid ${COLORS.chlorophyll};
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: ${COLORS.blue1};
  color: ${COLORS.primary_background};
  &:hover {
    background-color: ${COLORS.blue1};
    opacity: 0.7;
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

const Step3Initiatives: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [showInitiatives, setShowInitiatives] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const { t } = useLanguage();

  const handleLocalBack = () => {
    if (showInitiatives) setShowInitiatives(false);
    else onBack();
  };

  const handleInterestToggle = (interestId: string) => {
    const newInterests = data.interestAreas.includes(interestId)
      ? data.interestAreas.filter((i) => i !== interestId)
      : [...data.interestAreas, interestId];
    updateData({ interestAreas: newInterests });
  };

  const handleInitiativeToggle = (initiativeId: string) => {
    const newInitiatives = data.selectedInitiatives.includes(initiativeId)
      ? data.selectedInitiatives.filter((i) => i !== initiativeId)
      : [...data.selectedInitiatives, initiativeId];
    updateData({ selectedInitiatives: newInitiatives });
  };

  const handleSkip = () => {
    // Clear any selected interests/initiatives and move to next step
    updateData({
      interestAreas: [],
      selectedInitiatives: [],
    });
    onNext();
  };

  const filteredInitiatives = useMemo(() => {
    if (!showInitiatives) return [];
    return INITIATIVES.filter((initiative) => {
      const districtMatch =
        data.districts.length === 0 ||
        initiative.district.some((d) => data.districts.includes(d));
      const interestMatch =
        data.interestAreas.length === 0 ||
        initiative.themes.some((theme) => data.interestAreas.includes(theme));
      return districtMatch && interestMatch;
    });
  }, [data.districts, data.interestAreas, showInitiatives]);

  const renderInterestSelection = () => (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <StyledPaper elevation={0}>
        <Typography variant="h4" component="h1">
          {t("initiatives.initiativeMatching")}
        </Typography>
        <Typography variant="h6">
          {t("initiatives.selectInterestAreas")}
        </Typography>
      </StyledPaper>
      <Grid container spacing={2}>
        {INTEREST_AREAS2.map((interest) => {
          const Icon = interest.icon;
          const isSelected = data.interestAreas.includes(interest.id);
          return (
            <Grid xs={12} sm={6} md={4} key={interest.id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderColor: isSelected ? COLORS.chlorophyll : COLORS.grey2,
                  borderWidth: 2,
                }}
              >
                <CardActionArea
                  onClick={() => handleInterestToggle(interest.id)}
                  sx={{ p: 2, textAlign: "center", height: "100%" }}
                >
                  <Icon
                    sx={{
                      fontSize: 40,
                      mb: 1,
                      color: isSelected ? COLORS.chlorophyll : "action",
                    }}
                  />
                  <Typography variant="h6">{t(interest.nameKey)}</Typography>
                  <Typography variant="body2" color={COLORS.heading}>
                    {t(interest.descriptionKey)}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
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
        <Box>
          <StyledButton variant="contained" onClick={handleSkip} sx={{ mr: 2 }}>
            {t("dialogue.skip")}
          </StyledButton>
          <StyledNextButton
            variant="contained"
            onClick={() => setShowInitiatives(true)}
            disabled={data.interestAreas.length === 0}
          >
            {t("initiatives.findInitiatives")}
          </StyledNextButton>
        </Box>
      </Box>
    </Box>
  );

  const renderInitiativeList = () => (
    <Box>
      <StyledBackButton
        onClick={handleLocalBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        {t("initiatives.changeInterests")}
      </StyledBackButton>
      <Typography variant="h4" gutterBottom>
        {t("initiatives.relevantInitiatives")}
        {data.districts.length > 0 &&
          ` ${t("initiatives.in")} ${data.districts.join(", ")}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 4 }}>
        {filteredInitiatives.length > 0 ? (
          filteredInitiatives.map((initiative) => {
            const isSelected = data.selectedInitiatives.includes(initiative.id);
            return (
              <Card
                key={initiative.id}
                variant="outlined"
                sx={{
                  borderColor: isSelected ? COLORS.chlorophyll : COLORS.grey2,
                  borderWidth: 3,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // alignItems: "stretch",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "stretch" },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleInitiativeToggle(initiative.id)}
                    sx={{ flexGrow: 1, p: 2 }}
                  >
                    <Typography variant="h6" component="div">
                      {t(initiative.nameKey)}
                    </Typography>
                    <Typography variant="body2" color={COLORS.heading}>
                      {t(initiative.descriptionKey)}
                    </Typography>
                  </CardActionArea>

                  <Box
                    sx={{ display: "flex", alignItems: "center", p: 1, pr: 2 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQrCodeValue(`${initiative.link}`);
                      }}
                      sx={{
                        width: 100,
                        height: 100,
                        flexShrink: 0,
                        padding: "4px",
                        // borderColor: COLORS.chlorophyll,
                        color: COLORS.heading,
                        "&:hover": {
                          borderColor: COLORS.chlorophyll, // Change border to red on hover
                          // backgroundColor: 'rgba(231, 0, 0, 0.04)' // Optional: for a better feedback
                        },
                      }}
                    >
                      {/* {t("initiatives.qrCode")} */}
                      <QRCodeCanvas
                        value={initiative.link}
                        size={72} // A good resolution for a small, scannable thumbnail
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        bgColor="transparent" // Makes the QR background transparent
                        fgColor={COLORS.heading} // Sets the color of the QR code itself
                      />
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })
        ) : (
          <Typography color={COLORS.heading} fontStyle="italic">
            {t("initiatives.noInitiativesMatch")}
          </Typography>
        )}

        <Card
          variant="outlined"
          sx={{
            mt: 4,
            textAlign: "center",
            borderColor: COLORS.chlorophyll,
          }}
        >
          <CardActionArea
            onClick={async () => {
              try {
                setIsSavingDraft(true);
                await saveConversation({
                  uuid: data.uuid,
                  status: "in_progress" as any,
                  selectedInitiatives: data.selectedInitiatives,
                  interestAreas: data.interestAreas,
                  districts: data.districts,
                } as any);
              } catch (e) {
                // Non-blocking: still show QR to avoid UX dead-end
                console.error("Failed to save draft before showing QR", e);
              } finally {
                setIsSavingDraft(false);
                setQrCodeValue(`${PUBLIC_QR_BASE}/dialogue/${data.uuid}`);
              }
            }}
            sx={{ p: 2 }}
          >
            <Typography variant="h6">
              {isSavingDraft
                ? t("initiatives.preparingQR")
                : t("initiatives.showQR")}
            </Typography>
          </CardActionArea>
        </Card>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
        <StyledBackButton variant="text" onClick={handleLocalBack}>
          {t("dialogue.back")}
        </StyledBackButton>
        <StyledNextButton
          // variant="outlined"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {data.districts.length === 0
            ? t("dialogue.skip")
            : t("dialogue.next")}
        </StyledNextButton>
      </Box>
    </Box>
  );

  return (
    <Container>
      {!showInitiatives ? renderInterestSelection() : renderInitiativeList()}
      <Modal open={!!qrCodeValue} onClose={() => setQrCodeValue(null)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            {t("initiatives.scanForMoreInfo")}
          </Typography>
          {qrCodeValue && (
            <>
              <QRCodeCanvas
                value={qrCodeValue}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              {/* Mock link next to QR code */}
              <Box sx={{ mt: 2 }}>
                <a
                  href="#"
                  style={{
                    color: COLORS.feuerrot,
                    textDecoration: "underline",
                    marginLeft: 8,
                  }}
                >
                  A mock link for now
                </a>
              </Box>
            </>
          )}
          <Button onClick={() => setQrCodeValue(null)} sx={{ mt: 2 }}>
            {t("initiatives.close")}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Step3Initiatives;
