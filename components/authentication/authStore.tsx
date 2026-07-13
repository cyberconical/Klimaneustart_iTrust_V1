import { create } from 'zustand';

interface AuthState {
    username: string;
    accessToken: string | null;
    isAdmin: boolean;
    setUsername: (username: string | null) => void;
    setAccessToken: (token: string | null) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    username: null,
    accessToken: null,
    isAdmin: false,
    setUsername: (username) => set({ username }),
    setAccessToken: (token) => set({ accessToken: token }),
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    clearTokens: () => set({ accessToken: null, isAdmin: false }),
}));
