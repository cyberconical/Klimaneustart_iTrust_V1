import { create } from 'zustand';

// The top-level views rendered by AuthenticatedApp. Kept in a shared store so
// siblings such as AppMenu (which lives outside AuthenticatedApp in App.tsx)
// can switch the active view.
export type AppView = "dialogue" | "dashboard" | "myDialogues" | "adminUsers";

interface ViewState {
    view: AppView;
    setView: (view: AppView) => void;
}

export const useViewStore = create<ViewState>((set) => ({
    view: "dialogue",
    setView: (view) => set({ view }),
}));
