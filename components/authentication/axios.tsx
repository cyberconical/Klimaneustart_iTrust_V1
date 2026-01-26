import axios from "axios";
import { useAuthStore } from "./authStore.tsx";

const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || "";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL ? `${API_BASE_URL}/api/v1` : `/api/v1`,
    withCredentials: true, // Required to send cookies
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axiosInstance.post(
                    "/users/refresh",
                    { username: useAuthStore.getState().username },
                    { withCredentials: true }
                );
                useAuthStore.getState().setAccessToken(data.accessToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                useAuthStore.getState().clearTokens();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;