import { create } from "zustand";

type ErrorType = {
  title: string;
  message?: string;
};

type ErrorState = {
  error: ErrorType | null;
  showError: (title: string, message?: string) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,

  showError: (title, message) =>
    set({
      error: { title, message },
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));