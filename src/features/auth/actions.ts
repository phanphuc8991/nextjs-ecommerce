"use server";
import { signIn } from "@/auth";
import { CustomAuthError } from "@/utils/errors";
import { redirect } from "next/navigation";

type FormState = {
  success?: boolean;
  error?: { type: string; message: string };
  email?: string;
};

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
    let type = "MANUAL";
    let message = "Something went wrong. Please try again.";
    if (error instanceof CustomAuthError) {
      type = error.customType || type;
      message = error.customName || message;
    }
    return {
      success: false,
      error: { type, message },
      email: type === "ACCOUNT_INACTIVE" ? email : undefined,
    };
  }
  redirect("/dashboard");
}
