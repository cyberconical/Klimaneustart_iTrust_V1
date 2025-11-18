import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  Paper,
  useTheme,
  Grow,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppProps } from "../../types";
import { TOPIC_DEFINITIONS } from "../../constants";
import { useLanguage } from "../LanguageContext";
import { TransitionGroup } from "react-transition-group";
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
  border: 2px solid ${COLORS.green6};
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: ${COLORS.feuerrot};
  color: ${COLORS.primary_background};
  &:hover {
    background-color: ${COLORS.feuerrot};
    border: 2px solid ${COLORS.brown0};
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

const Step2Topics: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const theme = useTheme();
  const { t } = useLanguage();

  // --- START: SORTING LOGIC ---
  // Separate the "notes" topic from the others
  const notesTopic = TOPIC_DEFINITIONS.find((topic) => topic.type === "notes");
  const sortableTopics = TOPIC_DEFINITIONS.filter(
    (topic) => topic.type !== "notes"
  );

  // Sort the other topics alphabetically based on their translated name
  sortableTopics.sort((a, b) => t(a.nameKey).localeCompare(t(b.nameKey)));

  // Recombine the list with the "notes" topic at the end
  const sortedTopicDefinitions = [
    ...sortableTopics,
    ...(notesTopic ? [notesTopic] : []),
  ];
  // --- END: SORTING LOGIC ---

  const handleOptionToggle = (
    topicId: string,
    subGroupId: string,
    optionId: string
  ) => {
    const topicDetails = data.topicDetails?.[topicId] ?? {};
    const subGroupDetails = (topicDetails as any)?.[subGroupId] ?? {
      selectedOptions: [],
      customNote: "",
    };
    const selectedOptions = subGroupDetails.selectedOptions.includes(optionId)
      ? subGroupDetails.selectedOptions.filter((id: string) => id !== optionId)
      : [...subGroupDetails.selectedOptions, optionId];
    updateData({
      topicDetails: {
        ...data.topicDetails,
        [topicId]: {
          ...(topicDetails as any),
          [subGroupId]: { ...subGroupDetails, selectedOptions },
        },
      },
    });
  };

  const handleNoteChange = (
    topicId: string,
    subGroupId: string,
    text: string
  ) => {
    const topicDetails = data.topicDetails?.[topicId] ?? {};
    const subGroupDetails = (topicDetails as any)?.[subGroupId] ?? {
      selectedOptions: [],
      customNote: "",
    };
    updateData({
      topicDetails: {
        ...data.topicDetails,
        [topicId]: {
          ...(topicDetails as any),
          [subGroupId]: { ...subGroupDetails, customNote: text },
        },
      },
    });
  };

  const renderTopicDetails = (topicId: string) => {
    const topic = TOPIC_DEFINITIONS.find((t) => t.id === topicId);
    if (!topic) return null;

    // A simple note-taking topic
    if (topic.type === "notes") {
      return (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={() => setActiveTopicId(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h2">
              {t(topic.nameKey)}
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={8}
            label={t("dialogue.notesLabel")}
            value={(data.topicDetails[topic.id] as any)?.customNote || ""}
            onChange={(e) =>
              updateData({
                topicDetails: {
                  ...data.topicDetails,
                  [topic.id]: {
                    customNote: e.target.value,
                    selectedOptions: [],
                  },
                },
              })
            }
            margin="normal"
            variant="outlined"
          />
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => setActiveTopicId(null)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h2">
            {t(topic.nameKey)}
          </Typography>
        </Box>
        {topic.subGroups?.map((sub) => (
          <Accordion
            key={sub.id}
            defaultExpanded
            sx={{
              borderRadius: 2,
              marginBottom: 2,
            }}
          >
            {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{t(sub.nameKey)}</Typography>
            </AccordionSummary> */}
            <AccordionDetails>
              <Grid container spacing={1}>
                {sub.options
                  .sort((a, b) => t(a.nameKey).localeCompare(t(b.nameKey)))
                  .map((option) => (
                    <Grid xs={12} sm={6} key={option.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              (data.topicDetails[topic.id] as any)?.[
                                sub.id
                              ]?.selectedOptions.includes(option.id) || false
                            }
                            onChange={() =>
                              handleOptionToggle(topic.id, sub.id, option.id)
                            }
                          />
                        }
                        label={t(option.nameKey)}
                      />
                    </Grid>
                  ))}
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={2}
                label={t("dialogue.notesLabel")}
                value={
                  (data.topicDetails?.[topic.id] as any)?.[sub.id]
                    ?.customNote || ""
                }
                onChange={(e) =>
                  handleNoteChange(topic.id, sub.id, e.target.value)
                }
                margin="normal"
                variant="outlined"
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  const isSidebarMode = activeTopicId !== null;
  const ANIMATION_SPEED = "0.5s";

  const sidebarContainerStyles = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: isSidebarMode ? "1fr" : "1fr 1fr" },
    gap: 2,
    width: isSidebarMode ? { xs: "90px", sm: "90px" } : "100%",

    transition: `all ${ANIMATION_SPEED} ease-in-out`,
    flexShrink: 0,
    ...(isSidebarMode && {
      display: "flex",
      flexDirection: "column",
      backgroundColor: COLORS.primary_background,
      borderRight: 2,
      borderColor: "divider",
      padding: 0.5,
      height: "100%",
    }),
  };

  const topicItemStyles = (topicId: string) => {
    const isActive = activeTopicId === topicId;
    return {
      display: "flex",
      alignItems: "center",
      p: 2,
      cursor: "pointer",
      borderRadius: 2,
      transition: `all ${ANIMATION_SPEED} ease-in-out`,
      border: "1px solid",
      borderColor: "grey.300",
      // Sidebar Mode Styles
      ...(isSidebarMode
        ? {
            flexDirection: "row",
            justifyContent: "center",
            height: { xs: "70px", sm: "70px" },
            width: { xs: "70px", sm: "70px" },
            p: 1,
            color: isActive ? COLORS.white2 : COLORS.feuerrot,
            backgroundColor: isActive
              ? COLORS.feuerrot
              : COLORS.primary_background,
            border: isActive ? "1px solid" : "1px solid",
            borderColor: isActive ? COLORS.feuerrot : COLORS.white2,
            // borderSize: isActive ? 2 : 1,
            position: "relative",
            "::after": {
              content: '""',
              display: isActive ? "block" : "none",
              position: "absolute",
              top: "50%",
              right: { sm: "-9px" },
              left: { xs: "auto", sm: "auto" },
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: { sm: `8px solid ${theme.palette.primary.main}` },
              transition: `opacity 0.3s ${ANIMATION_SPEED}`,
            },
            "&:hover": {
              // backgroundColor: isActive ? "none" : COLORS.feuerrot,
              borderColor: isActive ? "none" : COLORS.feuerrot,
              border: isActive ? "1px solid" : "5px solid",
            },
          }
        : {
            // Grid Mode Styles
            flexDirection: "row",
            // justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "action.hover",
              borderColor: COLORS.feuerrot,
            },
          }),
    };
  };

  const topicIconStyles = {
    transition: `font-size ${ANIMATION_SPEED} ease-in-out`,
    fontSize: isSidebarMode ? 32 : 24,
  };

  const topicTextStyles = {
    transition: `opacity 0.2s, max-width ${ANIMATION_SPEED} ease-in-out, margin-left ${ANIMATION_SPEED} ease-in-out`,
    opacity: isSidebarMode ? 0 : 1,
    maxWidth: isSidebarMode ? "0px" : "200px",
    marginLeft: isSidebarMode ? 0 : theme.spacing(2),
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontWeight: "bold",
    lineHeight: 1.2,
    textAlign: "center",
    color: "text.primary",
  };

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: isSidebarMode
            ? { xs: "column", sm: "column" }
            : "column",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        {/* Header for Grid mode */}
        {!isSidebarMode && (
          <StyledPaper elevation={0}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("dialogue.categoriesTitle")}
            </Typography>
            <Typography variant="h6">
              {t("dialogue.categoriesSubtitle")}
            </Typography>
          </StyledPaper>
        )}

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            gap: 1,
            minHeight: 0,
            marginTop: 3,
          }}
        >
          {/* Animating Container */}
          <Box sx={sidebarContainerStyles}>
            {sortedTopicDefinitions.map((topic) => {
              const Icon = topic.icon;
              const isSelected = activeTopicId === topic.id;
              return (
                <Paper
                  component={"div"}
                  key={topic.id}
                  elevation={isSidebarMode && isSelected ? 3 : 1}
                  onClick={() => setActiveTopicId(topic.id)}
                  sx={topicItemStyles(topic.id)}
                >
                  <Icon sx={topicIconStyles} />
                  <Typography
                    sx={{
                      ...topicTextStyles,
                      color:
                        isSidebarMode && isSelected
                          ? "primary.contrastText"
                          : "text.primary",
                    }}
                  >
                    {t(topic.nameKey)}
                  </Typography>
                </Paper>
              );
            })}
          </Box>

          {/* Details Pane */}
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              display: "flex",
              backgroundColor: "background.transparent",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <TransitionGroup component={null}>
              {activeTopicId && (
                <Grow key={activeTopicId} timeout={500} appear>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      p: { xs: 1, sm: 2 },
                      overflowY: "auto",
                    }}
                  >
                    {renderTopicDetails(activeTopicId)}
                  </Box>
                </Grow>
              )}
            </TransitionGroup>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          mt: "auto",
        }}
      >
        <StyledBackButton variant="text" onClick={onBack}>
          {t("dialogue.back")}
        </StyledBackButton>
        <StyledNextButton
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {t("dialogue.next")}
        </StyledNextButton>
      </Box>
    </Container>
  );
};

export default Step2Topics;
