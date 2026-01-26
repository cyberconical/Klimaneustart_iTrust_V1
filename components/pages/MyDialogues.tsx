import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuthStore } from "../authentication/authStore.tsx";
import axios from "../authentication/axios";
import { useLanguage } from "../LanguageContext";
import {ConversationData} from "../../types.ts";

const MyDialogues: React.FC = () => {
  const username = useAuthStore((state) => state.username);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!username) {
        setError("Nicht eingeloggt.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/conversations/${username}`);
        setConversations(response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Fehler beim Laden der Dialoge"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [username]);

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
                  <ListItem>
                    <ListItemText
                        primary={`${t("dialogue.dialogue")} ${new Date(conv.createdAt).toLocaleString(useLanguage().language)}`}
                        secondary={
                          <>
                            {t("dialogue.notesLabel")}: {conv.notes || '-'} <br />
                            {t("districts.district")}: {conv.districts?.join(", ") || '-'} <br />
                            {t("dialogue.category")}: {'-'} <br />
                            {t("reflection.observerReflection")}: {conv.observerReflection} <br />
                            {t("metrics.dialoguePartners")}: {conv.numPeople || '-'} <br />
                            {t("metrics.duration")}: {conv.duration || '-'} {t("metrics.minutes")}
                          </>
                        }
                    />
                  </ListItem>
                  {idx < conversations.length - 1 && <Box component="li" sx={{ m: 0, p: 0 }}><hr style={{ margin: 0, border: 0, borderTop: '1px solid #e0e0e0' }} /></Box>}
                </React.Fragment>
            ))}
          </List>

        </Paper>
      )}
    </Box>
  );
};

export default MyDialogues;

