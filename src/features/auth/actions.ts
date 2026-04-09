"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const data = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      type: (error as any).customType,
      name:
        (error as any).customName || "Something went wrong. Please try again.",
    };
  }
}
