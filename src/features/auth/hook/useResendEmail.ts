import { useRef, useState } from "react";
import { resend, reVerify } from "../actions";
import { CustomError } from "../next-auth";
import { useGlobalError } from "@/components/global-error-provider";
import { toFormData } from "@/lib/toFormData";

export const useResendEmail = () => {
  const { showError } = useGlobalError();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CustomError>();
  const refUserId = useRef<string | undefined>("");
  const handleResend = async (email: string, onSuccess: () => void) => {
    setIsLoading(true);
    const result = await resend(email);
    if (result.success) {
      onSuccess();
      refUserId.current = result._id;
    } else {
      showError("", result.error?.message);
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleVerify = async (code: string, onSuccess: () => void) => {
    setIsLoading(true);
    setError({ type: "", message: "" });
    const formData = toFormData({ _id: refUserId.current, code });
    const result = await reVerify(null, formData);
    if (result.success) {
      onSuccess();
    } else {
      showError("", result?.error?.message);
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return { isLoading, error, handleResend, handleVerify };
};
