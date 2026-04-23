import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { auth } from "@/auth";
import { ApiResponse } from "@/types/backend";

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
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn("Token expired or invalid");
      // await logout();
      // or await refreshToken();
    }
    return Promise.reject(error);
  },
);

export const sendRequest = async <T = any>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {

  try {
    const response = await api.request<T>(config);
    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (!response) {
        const message =
          error.code === "ECONNABORTED" ? "REQUEST_TIMEOUT" : "NETWORK_ERROR";
        return {
          success: false,
          statusCode: 0,
          message,
          raw: error,
        };
      }
      if(`${error.status}` === '403'){
         return {
          success: false,
          statusCode: 0,
          message: response.data.message,
          raw: response.data,
        };
      }
      const message = response.data?.message || "UNKNOWN_ERROR";
      return {
        success: false,
        statusCode: response.status,
        message,
        raw: response.data,
      };
    }
    return {
      success: false,
      statusCode: 0,
      message: "UNKNOWN_ERROR",
      raw: error,
    };
  }
};
