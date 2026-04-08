export type ApiSuccess<T> = {
  success: true;
  data: T;
  statusCode: number;
};

export type ApiError = {
  success: false;
  statusCode: number;
  message: string;
  raw?: any;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

