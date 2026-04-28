import { create } from "zustand";

interface LoadingState {
  pendingCount: number;
  setLoading: (isPending: boolean) => void;
  isLoading: () => boolean; 
  reset: () => void;
}

export const useGlobalLoading = create<LoadingState>((set, get) => ({
  pendingCount: 0,
  setLoading: (isPending: boolean) => {
    set((state) => ({
      pendingCount: isPending 
        ? state.pendingCount + 1 
        : Math.max(0, state.pendingCount - 1)
    }));
  },
  
  isLoading: () => get().pendingCount > 0,
  reset: () => set({ pendingCount: 0 }),
}));