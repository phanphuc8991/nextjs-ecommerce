import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { auth } from "@/auth";
import { ApiResponse, ApiSuccess } from "@/types/backend";
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const session = await auth();
  const token = session?.user?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn("Token expired or invalid");
    }
    return Promise.reject(error);
  },
);

export const sendRequest = async <T = any>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.request<ApiSuccess<T>>(config);
    return response.data;
  } catch (error) {
     if (axios.isAxiosError(error)) {
      const res = error.response;
      const data = res?.data;
      return {
        success: false,
        statusCode: res?.status ?? 500,
        error: data?.error || {
          type: "UNKNOWN_ERROR",
          message: error.message,
        },
        timestamp: data?.timestamp,
        path: data?.path,
      };
    }
    return {
      success: false,
      statusCode: 500,
      error: {
        type: "UNKNOWN_ERROR",
        message: "Something went wrong. Please try again.",
      },
    };
  }
};
