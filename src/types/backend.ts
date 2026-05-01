import { AuthErrorType } from "@/features/auth/constants";

type ApiErrorDetail = {
  type: AuthErrorType;
  message: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
  statusCode: number;
  message?: string;
};

export type ApiError = {
  success: false;
  statusCode: number;
  error: ApiErrorDetail;
  timestamp?: string;
  path?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
