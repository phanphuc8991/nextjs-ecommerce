import { sendRequest } from "@/utils/api";

export const createUser = async (payload: FormData) => {
  return sendRequest({
    url: "/api/v1/users/create",
    method: "POST",
    data: payload,
  });
};
