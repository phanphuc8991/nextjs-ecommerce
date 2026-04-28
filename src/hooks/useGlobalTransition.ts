import { useGlobalLoading } from "@/stores/loading.store";
import { useEffect, useTransition } from "react";

export const useGlobalTransition = () => {
  const [isPending, startTransition] = useTransition();
  console.log('isPending',isPending);
  const setLoading = useGlobalLoading((state) => state.setLoading);

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return { startTransition, isPending };
};