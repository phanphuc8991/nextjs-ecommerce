import { sendRequest } from "@/utils/api";


export const createUser = async (
  payload: FormData,
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
