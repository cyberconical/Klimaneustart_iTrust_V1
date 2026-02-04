import React, { useEffect, useState } from "react";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Alert, Grid, ListItemAvatar, Avatar,
} from "@mui/material";
import { useAuthStore } from "../authentication/authStore.tsx";
import axios from "../authentication/axios";
import { useLanguage } from "../LanguageContext";
import {ConversationData} from "../../types.ts";
import {TOPIC_DEFINITIONS} from "../../constants.ts";

const MyDialogues: React.FC = () => {
  const username = useAuthStore((state) => state.username);
  const { t } = useLanguage();
  const language = useLanguage().language;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!username) {
        setError("Not logged in.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/conversations/user/${username}`);
        setConversations(response.data);
      } catch (err: any) {
        setError(
            err?.response?.data?.error === "No conversations found for this user" ? t("dialogue.noDialogues") :
                (err?.response?.data?.error || err?.response?.data?.message || err?.message || "Error loading dialogues")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [username]);

const renderTopicDetails = (conv: ConversationData) => {
  const allEntries: Array<[string, any]> = [];
  Object.entries(conv.topicDetails ?? {}).forEach(([topicId, details]) => {
    if (
      Object.keys(details).length > 0 &&
      (details as any).customNote ||
      Object.values(details).some(
        (d: any) => d.selectedOptions?.length > 0 || d.customNote
      )
    ) {
      allEntries.push([topicId, details]);
    }
  });

  if (allEntries.length === 0) return null;

  return (
      <List sx={{ width: '100%', bgcolor: 'background.paper', pl: 0, ml: 0 }}>
        {allEntries.map(([topicId, details]) => (
            <ListItem key={topicId} sx={{ pl: 0, ml: 0 }}>
              <ListItemAvatar>
                <Avatar>
                  {(() => {
                    const IconComponent = TOPIC_DEFINITIONS.find(value => value.id === topicId)?.icon || QuestionAnswerIcon;
                    return <IconComponent />;
                  })()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                  primary={ <b>{t(TOPIC_DEFINITIONS.find(value => value.id === topicId)?.nameKey) || topicId}</b> }
                  secondary={
                    <>
                      {details.customNote && (
                          <Typography>{details.customNote}</Typography>
                      )}
                      {Object.entries(details)
                          .filter(([key]) => key !== "customNote")
                          .map(([subGroupId, subGroupDetails]: [string, any]) => (
                              <Box key={subGroupId}>
                                {subGroupDetails.selectedOptions?.length > 0 && (
                                    <Typography>
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
                    </>
                  }
              />
            </ListItem>
        ))}
      </List>
  );
};

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("dialogue.myDialogues")} ({conversations.length})
      </Typography>
      {conversations.length === 0 ? (
        <Typography color="text.secondary">
          {t("dialogue.noDialoguesFound") || "Keine Dialoge gefunden."}
        </Typography>
      ) : (
        <Paper>

          <List>
            {conversations.map((conv, idx) => (
                <React.Fragment key={conv.uuid}>
                  <ListItem divider={true}>
                    <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "grey.100", borderRadius: 2, px: 1, py: 0.5, fontSize: "1.05rem" }}>
                            <QuestionAnswerIcon sx={{ color: "green", fontSize: "1.7rem" }} />
                            {`${t("dialogue.dialogueAt")} ${new Date(conv.createdAt).toLocaleString(language)}`}
                          </Box>
                        }
                        secondary={
                          <>
                            <Grid container spacing={2} sx={{ mt: 0 }}>
                              <Grid item xs={4}>
                                <Box fontWeight="bold">{t("districts.district")}:</Box>
                                <Box>{conv.districts?.join(", ") || '-'}</Box>
                              </Grid>
                              <Grid item xs={4}>
                                <Box fontWeight="bold">{t("metrics.persons")}:</Box>
                                <Box>{conv.numPeople || '-'}</Box>
                              </Grid>
                              <Grid item xs={4}>
                                <Box fontWeight="bold">{t("metrics.duration")}:</Box>
                                <Box>{conv.duration || '-'} {t("metrics.minutes")}</Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box fontWeight="bold">{t("dialogue.notesLabel")}:</Box>
                                <Box>{conv.notes || '-'}</Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box fontWeight="bold">{t("reflection.observerReflection")}:</Box>
                                <Box>{conv.observerReflection || '-'}</Box>
                              </Grid>
                              <Grid item xs={12}>
                                {renderTopicDetails(conv)}
                              </Grid>
                            </Grid>
                          </>
                        }
                    />
                  </ListItem>
                </React.Fragment>
            ))}
          </List>

        </Paper>
      )}
    </Box>
  );
};

export default MyDialogues;

