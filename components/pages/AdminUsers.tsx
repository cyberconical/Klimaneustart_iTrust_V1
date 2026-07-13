import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Collapse,
  Snackbar,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import axios from "../authentication/axios";
import { useLanguage } from "../LanguageContext";

interface AdminUsersProps {
  onBack: () => void;
}

interface UserEntry {
  _id: string;
  username: string;
  isAdmin: boolean;
  createdAt?: string;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [users, setUsers] = useState<UserEntry[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchUsers = async () => {
    setListLoading(true);
    setListError("");
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (err: any) {
      setListError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          t("admin.loadError")
      );
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await axios.post("/users", { username, password, isAdmin });
      setToastMessage(t("admin.createSuccess"));
      setToastOpen(true);
      setUsername("");
      setPassword("");
      setIsAdmin(false);
      await fetchUsers();
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          t("admin.createError")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={onBack} aria-label={t("admin.back")} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{t("admin.title")}</Typography>
      </Box>

      {/* Create user form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("admin.createUser")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleCreate}>
          <Collapse in={!!error}>
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          </Collapse>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("admin.username")}
            variant="filled"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("admin.password")}
            type={showPassword ? "text" : "password"}
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={t("admin.passwordHint")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
            label={t("admin.isAdmin")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5 }}
            disabled={submitting}
          >
            {t("admin.createButton")}
          </Button>
          {submitting && (
            <Box display="flex" justifyContent="center" sx={{ width: "100%", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Paper>

      {/* User list */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t("admin.existingUsers")} ({users.length})
      </Typography>
      {listLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : listError ? (
        <Alert severity="error">{listError}</Alert>
      ) : (
        <Paper>
          <List>
            {users.map((user) => (
              <ListItem key={user._id} divider>
                <ListItemText primary={user.username} />
                {user.isAdmin && (
                  <Chip label={t("admin.adminBadge")} color="primary" size="small" />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={toastMessage}
      />
    </Box>
  );
};

export default AdminUsers;
