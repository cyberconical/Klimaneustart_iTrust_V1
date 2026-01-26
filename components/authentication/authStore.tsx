import { create } from 'zustand';

interface AuthState {
    username: string;
    accessToken: string | null;
    setUsername: (username: string | null) => void;
    setAccessToken: (token: string | null) => void;
    clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    username: null,
    accessToken: null,
    setUsername: (username) => set({ username }),
    setAccessToken: (token) => set({ accessToken: token }),
    clearTokens: () => set({ accessToken: null }),
}));
