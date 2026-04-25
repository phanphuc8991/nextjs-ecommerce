"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const GlobalErrorContext = createContext<{
  showError: (title: string, message: string | undefined) => void;
} | null>(null);

export const GlobalErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<{ title: string; message: string | undefined } | null>(null);

  const showError = (title: string, message: string | undefined) => {
    setError({ title, message });
  };

  return (
    <GlobalErrorContext.Provider value={{ showError }}>
      {children}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="z-[9999]"> 
          <DialogHeader>
            <DialogTitle className="text-red-600">{error?.title || "Lỗi"}</DialogTitle>
            <DialogDescription>{error?.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </GlobalErrorContext.Provider>
  );
};

export const useGlobalError = () => {
  const context = useContext(GlobalErrorContext);
  if (!context) throw new Error("useGlobalError must be used within GlobalErrorProvider");
  return context;
};