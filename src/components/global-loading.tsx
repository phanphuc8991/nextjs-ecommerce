"use client";

import { useGlobalLoading } from "@/stores/loading.store";



export const GlobalLoading = () => {

  const isLoading = useGlobalLoading((state: any) => state.pendingCount > 0);


  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center pointer-events-auto">
     
    </div>
  );
};