"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGlobalLoading } from "@/stores/loading.store";

export default function GlobalLoadingHandler() {
  const pathname = usePathname();
  const reset = useGlobalLoading((state) => state.reset);

  useEffect(() => {
    reset();
  }, [pathname, reset]);

  return null;
}
