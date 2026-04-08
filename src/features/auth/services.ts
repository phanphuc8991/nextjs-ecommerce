

import { sendRequest } from "@/utils/api";

import { ApiResponse } from "@/types/backend";
import { LoginInput, ResponseUserLogin } from "./next-auth";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: any;
}) => {
  return sendRequest({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
    method: "POST",
    data: payload,
  });
};

export const checkCode = async (payload: { _id: string; code: string }) => {
  return sendRequest({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
    method: "POST",
    data: payload,
  });
};

export const resendActivation = async (payload: { email: string }) => {
  return sendRequest({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/resend-activation`,
    method: "POST",
    data: payload,
  });
};



export const loginUser = async (payload: LoginInput):Promise<ApiResponse<ResponseUserLogin>> => {
  return sendRequest({
    method: "POST",
    url: `/api/v1/auth/login`,
    data: payload,
  });
};

export const loginGoogle = async (payload: {
  idToken: string;
}) => {
  return sendRequest({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google-login`,
    data: payload,
  });
};
