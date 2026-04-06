import { sendRequest } from "@/utils/api";

type status = "active" | "inactive";
type role = "admin" | "staff" | "user";
export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: status;
  role: role;
  avatar?: string;
};
export const createUser = async (
  payload: CreateUserPayload,
  accessToken: string,
) => {
  return sendRequest<IBackendRes<ILogin>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/create`,
    method: "POST",
    body: payload,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
