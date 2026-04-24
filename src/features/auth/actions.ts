"use server";
import { signIn } from "@/auth";
import { routes } from "@/routes";
import { CustomAuthError } from "@/utils/errors";
import { redirect } from "next/navigation";
import { registerUser } from "./services";

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
      throw new CustomAuthError("", res.raw.type, res.raw.message);
    }
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
    };
  }
  // redirect(`/verify/${id}?e=${encodeURIComponent(encodedEmail)}`);
}
