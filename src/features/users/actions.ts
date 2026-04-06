"use server";
import { auth } from "@/auth";
import { CreateUserPayload } from "./types";
import { createUser } from "./services";

export async function createUserAction(data: CreateUserPayload) {
  const session: any = await auth();
  const accessToken = session?.user?.data?.access_token;
  if (!accessToken) throw new Error("Unauthorized");
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "avatar" && value !== undefined) {
      formData.append(key, String(value));
    }
  });
  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }
  return await createUser(formData, accessToken);
}
