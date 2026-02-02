import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Alert,
    Collapse,
    Snackbar, CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useLanguage } from "./LanguageContext";

import { COLORS } from "../constants";
import axios from "./authentication/axios";
import { useAuthStore } from "./authentication/authStore.tsx";

interface LoginProps {
  onLoginSuccess: () => void;
}
let AppLogo = "/icons/logo_actual_square.png";

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {

    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setStoreUsername = useAuthStore((state) => state.setUsername);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errorToastMessage, setErrorToastMessage] = useState("");
    const [showErrorToast, setShowErrorToast] = useState(false);
    const { t } = useLanguage();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStoreUsername(username);
        setLoading(true);

        try {
            const response = await axios.post(
                "/users/login",
                { username, password},
                {
                    headers: {
                        withCredentials: true,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                const { accessToken } = response.data;
                setAccessToken(accessToken);
                onLoginSuccess();
            } else {
                const errorData = await response.data;
                throw new Error(errorData.message || 'Login failed');
            }
        } catch (error) {
            setError(error.response.data.message);
            setErrorToastMessage(t('login.failed'));
            setShowErrorToast(true);
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (error) {
          setError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) {
        setError("");
        }
    };

    const customTextFieldStyles = {
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
    };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Branding Section */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: 15,
          backgroundColor: "background.paper",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Box
            component="img"
            src={AppLogo}
            alt="Logo"
            sx={{
              width: { xs: 50, sm: 80 },
              height: { xs: 50, sm: 80 },
              // borderRadius: "16px",
              mb: 4,
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{ ml: 2, fontWeight: "bold", color: "error.main" }}
          >
            Klimaneustart Berlin
          </Typography>
        </Box>
        <Typography variant="h4" color={COLORS.red2} sx={{ mb: 4 }}>
          {t('welcome.title')}
        </Typography>
        <Box
          sx={{
            height: "2px",
            width: "40vw",
            backgroundColor: COLORS.green2,
            opacity: 1,
            borderRadius: "2px",
          }}
        />
        <Typography variant="h6" color={COLORS.green2} sx={{ mb: 4 }}>
          {t('welcome.tagline')}
        </Typography>
      </Grid>

      {/* Form Section */}
      <Grid item xs={12} lg={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              mb: 4,
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src={AppLogo}
              alt="Logo"
              sx={{
                width: { xs: 150, sm: 200 },
                height: { xs: 150, sm: 200 },
                borderRadius: "16px",
                mb: 2,
              }}
            />
            <Typography
              component="h1"
              variant="h1"
              sx={{
                ml: 1,
                fontWeight: "bold",
                color: "error.main",
                textAlign: "center",
              }}
            >
              Klimaneustart Berlin
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mt: 2, mb: 2 }}
            >
              {t('welcome.title')}
            </Typography>
            <Box
              sx={{
                height: "2px",
                width: "80%",
                backgroundColor: COLORS.green3,
                opacity: 0.5,
                borderRadius: "2px",
                mb: 2,
              }}
            />
            <Typography variant="body1" color="text.secondary">
              {t('welcome.tagline')}
            </Typography>
          </Box>
          <Typography
            component="h2"
            variant="h4"
            sx={{ mb: 1, textAlign: "center" }}
          >
            {t('login.welcomeBack')}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            {t('login.pleaseSignIn')}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleLogin}
            sx={{ mt: 1, width: "100%" }}
          >
            <Collapse in={!!error}>
              <Alert
                severity="error"
                sx={{ mb: 2 }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            </Collapse>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('login.username')}
              name="username"
              autoComplete="username"
              autoFocus
              variant="filled"
              value={username}
              onChange={handleUsernameChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={customTextFieldStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('login.password')}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              variant="filled"
              value={password}
              onChange={handlePasswordChange}
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
              sx={customTextFieldStyles}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: loading ? "#bdbdbd" : COLORS.green3 }}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {t('login.loginButton')}
            </Button>
              {loading && (
                  <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: "100%", mt: 2 }}>
                      <CircularProgress />
                  </Box>
              )}
          </Box>
          <Snackbar
            open={showErrorToast}
            autoHideDuration={4000}
            onClose={() => setShowErrorToast(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            message={errorToastMessage}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
