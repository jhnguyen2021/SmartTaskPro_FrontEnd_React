import { create } from 'zustand';
//create is the function used to define a Zustand store.
//It returns a React hook (useUIStore in this case) that you can use inside components to read and update state.

type UIState = {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setTheme: (t: 'light' | 'dark') => void;
};

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (t) => set({ theme: t }),
}));
