import { useRef, useState } from "react";
import { resend, reVerify } from "../actions";
import { CustomError } from "../next-auth";
import { toFormData } from "@/lib/toFormData";
import { useErrorStore } from "@/stores/error.store";
import { useGlobalTransition } from "@/hooks/useGlobalTransition";

export const useResendEmail = () => {
  const { startTransition, isPending: isLoading } = useGlobalTransition();
  const showError = useErrorStore((s) => s.showError);

  const [error, setError] = useState<CustomError>();
  const refUserId = useRef<string | undefined>("");
  const [state, setState] = useState<{ _id: string }>({ _id: "" });
  const handleResend = async (email: string, onSuccess: () => void) => {
    startTransition(async () => {
      const formData = toFormData({ email });
      const result = await resend(formData);

      if (result.success) {
        onSuccess();
        refUserId.current = result._id;
        if (result._id) {
          setState({ _id: result._id });
        }
      } else {
        if (result.error?.type === "INVALID_EMAIL") {
          setError(result.error);
        } else {
          showError("", result?.error?.message);
        }
      }
    });
  };

  const handleVerify = async (code: string, onSuccess: () => void) => {
    startTransition(async (): Promise<any> => {
      setError({ type: "", message: "" });
      const formData = toFormData({ _id: refUserId.current, code });
      const result = await reVerify(null, formData);
      if (result.success) {
        onSuccess();
        return result;
      } else {
        if (
          result.error?.type === "INVALID_CODE" ||
          result.error?.type === "CODE_EXPIRED"
        ) {
          setError(result.error);
        } else {
          showError("", result?.error?.message);
        }
      }
    });
  };

  return { isLoading, error, handleResend, handleVerify, state };
};
