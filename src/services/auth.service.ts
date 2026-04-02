import { sendRequest } from "@/utils/api";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: any;
}) => {
  return sendRequest<IBackendRes<ILogin>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
    method: "POST",
    body: payload,
  });
};

export const checkCode = async (payload: { _id: string; code: string }) => {
  return sendRequest<IBackendRes<ILogin>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
    method: "POST",
    body: payload,
  });
};

export const resendActivation = async (payload: { email: string }) => {
  return sendRequest<IBackendRes<ILogin>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/resend-activation`,
    method: "POST",
    body: payload,
  });
};

export const loginUser = async (payload: { username: any; password: any }):  Promise<IBackendRes<ILogin>> => {
  return sendRequest<IBackendRes<ILogin>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
    body: payload,
  });
};

export const loginGoogle = async (payload: {
  idToken: string;
}): Promise<IBackendRes<ILogin>> => {
  return sendRequest<IBackendRes<ILogin>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google-login`,
    body: payload,
  });
};
