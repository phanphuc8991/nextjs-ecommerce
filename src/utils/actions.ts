"use server";
import { signIn } from "@/auth";
import { AUTH_ERROR_MESSAGES } from "./errors";

export async function authenticate(email: string, password: string) {
  try {
    const data = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return { success: true, data };
  } catch (err: any) {
    const errorCode = err?.error;
    return {
      success: false,
      code: errorCode,
      message:
        AUTH_ERROR_MESSAGES[errorCode] ??
        "Something went wrong. Please try again.",
    };
  }
}
