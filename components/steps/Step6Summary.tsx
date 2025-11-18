import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import { AppProps, StepId } from "../../types";
import {INITIATIVES, STEPS, TOPIC_DEFINITIONS} from "../../constants";
import { saveConversation } from "../../services/conversationService";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useLanguage } from "../LanguageContext";
interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  onEdit?: () => void;
  editable?: boolean;
}

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

const SummaryItem: React.FC<SummaryItemProps> = ({
  label,
  value,
  onEdit,
  editable = false,
}) => {
  const { t } = useLanguage();
  const displayValue = value || (
    <Typography component="span" fontStyle="italic" color="text.secondary">
        {t("summary.notProvided")}
    </Typography>
  );

  return (
    <ListItem divider>
      <ListItemText
        primary={label}
        secondary={displayValue}
        primaryTypographyProps={{ fontWeight: "bold" }}
        secondaryTypographyProps={{
          component: "div",
          color: "text.primary",
          mt: 0.5,
        }}
      />
      {editable && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const Step6Summary: React.FC<AppProps> = ({
  data,
  onNext,
  onBack,
  updateData,
  navigateToStep,
}) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = (stepId: StepId) => {
    console.log(`Navigating to step: ${stepId}`);

    if (navigateToStep) {
      navigateToStep(stepId);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const payload = { ...data, status: "completed" };
      const result = await saveConversation(payload);
      onNext();
    } catch (e) {
      setError("Failed to submit conversation. Please try again.");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTopicDetails = () => {
    const mainTopicEntries = Object.entries(data.topicDetails).filter(
      ([, details]) =>
        Object.keys(details).length > 0 &&
        ((details as any).customNote ||
          Object.values(details).some(
            (d: any) => d.selectedOptions?.length > 0 || d.customNote
          ))
    );
    if (mainTopicEntries.length === 0) return null;

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {mainTopicEntries.map(([topicId, subGroups]) => {
          const details = subGroups as any;
          return (
            <Box key={topicId}>
              <Typography variant="subtitle1" fontWeight="bold">
                  {t(TOPIC_DEFINITIONS.filter(value => value.id === topicId)[0]?.nameKey) || topicId}
              </Typography>
              {details.customNote && (
                <Typography variant="body2">{details.customNote}</Typography>
              )}
              {Object.entries(details)
                .filter(([key]) => key !== "customNote")
                .map(([subGroupId, subGroupDetails]: [string, any]) => (
                  <Box key={subGroupId} sx={{ ml: 2, mt: 1 }}>
                    {subGroupDetails.selectedOptions?.length > 0 && (
                      <Typography variant="body2">
                          {(subGroupDetails.selectedOptions || []).map((optionId: string) => {
                              const topic = TOPIC_DEFINITIONS.find(value => value.id === topicId);
                              const subGroup = topic?.subGroups?.find((sg: any) => sg.id === subGroupId);
                              const option = subGroup?.options?.find((opt: any) => opt.id === optionId);
                              return option ? t(option.nameKey) : optionId;
                          }).join(", ") || topicId}
                      </Typography>
                    )}
                    {subGroupDetails.customNote && (
                      <Typography variant="body2" color="text.secondary">
                          {t("summary.note")}: {subGroupDetails.customNote}
                      </Typography>
                    )}
                  </Box>
                ))}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("summary.summary")}
      </Typography>
      <Paper variant="outlined">
        <List dense>
          <SummaryItem
            label={t("districts.selectDistrict")}
            value={data.districts.join(", ")}
            editable
            onEdit={() => handleEdit(StepId.District)}
          />
          <SummaryItem
            label={t("dialogue.categoriesTitle")}
            value={renderTopicDetails()}
            editable
            onEdit={() => handleEdit(StepId.Topics)}
          />
          <SummaryItem
            label={t("initiatives.initiatives")}
            value={data.selectedInitiatives
              .map((id) => {
                const initiative = INITIATIVES.find((i) => i.id === id);
                return initiative ? t(initiative.nameKey) : id;
              })
              .join(", ")}
            editable
            onEdit={() => handleEdit(StepId.Initiatives)}
          />
          <SummaryItem
            label={t("consent.stayAnonymous")}
            value={data.isAnonymous ? "Yes" : "No"}
            editable
            onEdit={() => handleEdit(StepId.Consent)}
          />
          <SummaryItem
            label={t("consent.shareContact")}
            value={data.shareContact ? `Yes (${data.contactInfo})` : "No"}
            editable
            onEdit={() => handleEdit(StepId.Consent)}
          />
          <SummaryItem
            label={t("reflection.resonanceEssence")}
            value={data.observerReflection}
            editable
            onEdit={() => handleEdit(StepId.Reflection)}
          />
          <SummaryItem
            label={t("reflection.yourReflection")}
            value={data.surprise}
            editable
            onEdit={() => handleEdit(StepId.Reflection)}
          />
          <SummaryItem
            label={t("metrics.duration")}
            value={`${data.numPeople} people, ${data.duration} minutes`}
            editable
            onEdit={() => handleEdit(StepId.Metrics)}
          />
        </List>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <StyledBackButton variant="contained" onClick={onBack}>
          {t("dialogue.back")}
        </StyledBackButton>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={isSubmitting}
          sx={{
            backgroundColor: COLORS.chlorophyll,
            color: COLORS.white2,
            ":hover": {
              backgroundColor: COLORS.chlorophyll,
              opacity: 0.7,
            },
          }}
        >
          Submit Conversation
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Step6Summary;
