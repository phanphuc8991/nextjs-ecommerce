import { useRef, useState } from "react";
import { resend, reVerify } from "../actions";
import { toFormData } from "@/lib/toFormData";
import { useGlobalTransition } from "@/hooks/useGlobalTransition";

export const useResendEmail = () => {
  const { startTransition, isPending: isLoading } = useGlobalTransition();
  const refUserId = useRef<string | undefined>("");
  const [state, setState] = useState<any>();
  const handleResend = async (email: string, onSuccess: () => void) => {
    startTransition(async () => {
      const formData = toFormData({ email });
      const result = await resend(formData);
      if (result.success) {
        onSuccess();
        refUserId.current = result._id;
      }
      setState(result);
    });
  };

  const handleVerify = async (code: string, onSuccess: () => void) => {
    startTransition(async (): Promise<any> => {
      const formData = toFormData({ _id: refUserId.current, code });
      const result = await reVerify(null, formData);
      if (result.success) {
        onSuccess();
      }
      setState(result);
    });
  };

  return { isLoading, handleResend, handleVerify, state };
};
