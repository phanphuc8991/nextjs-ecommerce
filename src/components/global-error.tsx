"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useErrorStore } from "@/stores/error.store";

export const GlobalError = () => {
  const error = useErrorStore((s) => s.error);
  const clearError = useErrorStore((s) => s.clearError);

  return (
    <Dialog open={!!error} onOpenChange={clearError}>
      <DialogContent className="z-[9999]">
        <DialogHeader className="z-[9999] border-red-200">
          <DialogTitle className="text-red-600 font-semibold">
            {error?.title || "Oops!"}
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            {error?.message}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
