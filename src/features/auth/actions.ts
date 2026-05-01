"use server";
import { signIn } from "@/auth";
import { CustomAuthError } from "@/utils/errors";
import { redirect } from "next/navigation";
import {
  checkCode,
  forgotPasswordService,
  registerUser,
  resendActivation,
} from "./services";
import { getLocale } from "next-intl/server";
import { AUTH_ERROR_TYPES, AuthErrorType, FormState } from "./constants";

function handleAuthError(
  error: unknown,
  extra?: Partial<FormState>,
): FormState {
  let type: AuthErrorType = AUTH_ERROR_TYPES.UNKNOWN_ERROR;
  let message = "Something went wrong. Please try again.";
  if (error instanceof CustomAuthError) {
    type = error.customType || type;
    message = error.customName || message;
  }
  return {
    success: false,
    error: { type, message },
    ...extra,
  };
}

export async function authenticate(
  preveState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    const type = error instanceof CustomAuthError ? error.customType : "MANUAL";
    return handleAuthError(error, {
      email: type === AUTH_ERROR_TYPES.ACCOUNT_INACTIVE ? email : undefined,
    });
  }
  const locale = await getLocale();
  redirect(`/${locale}/dashboard`);
}

export async function register(
  preveState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let encodedEmail = "";
  let id = "";
  try {
    const res = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    if (res.success) {
      id = res?.data?._id;
      encodedEmail = btoa(res?.data?.email);
    } else {
      throw new CustomAuthError("", res.error.type, res.error.message);
    }
  } catch (error) {
    return handleAuthError(error);
  }
  const locale = await getLocale();
  redirect(
    `/${locale}/auth/verify?id=${id}&e=${encodeURIComponent(encodedEmail)}`,
  );
}

export async function resend(formData: FormData): Promise<FormState> {
  try {
    const email = formData.get("email") as string;
    const res = await resendActivation({ email });
    if (res.success) {
      return {
        success: true,
        _id: res.data._id,
      };
    } else {
      throw new CustomAuthError("", res.error.type, res.error.message);
    }
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function verify(
  preveState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const _id = formData.get("_id") as string;
  const code = formData.get("code") as string;
  try {
    const res = await checkCode({
      _id,
      code,
    });
    if (res.success) {
      return { success: true };
    } else {
      throw new CustomAuthError("", res.error.type, res.error.message);
    }
    return { success: true };
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function reVerify(
  preveState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const _id = formData.get("_id") as string;
  const code = formData.get("code") as string;
  try {
    const res = await checkCode({
      _id,
      code,
    });
    if (res.success) {
      return {
        success: true,
      };
    } else {
      throw new CustomAuthError("", res.error.type, res.error.message);
    }
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function forgotPassword(
  preveState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const userId = formData.get("userId") as string;
  const code = formData.get("code") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  try {
    const res = await forgotPasswordService({
      _id: userId,
      code,
      newPassword,
      confirmPassword,
    });
    if (res.success) {
      return {
        success: true,
      };
    } else {
      throw new CustomAuthError("", res.error.type, res.error.message);
    }
  } catch (error) {
    return handleAuthError(error);
  }
}
