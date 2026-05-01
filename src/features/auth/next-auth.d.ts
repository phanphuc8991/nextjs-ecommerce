
export interface CredentialsInput {
  email: string;
  password: string;
}
declare module "next-auth" {
    interface User {
    access_token?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user?: ResponseUserLogin;
  }
}

export interface ResponseUserLogin {
  _id: string;
  email: string;
  access_token: string;
}

export interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginResponse {
  user: BackendUser;
  accessToken?: string;
  refreshToken?: string;
}

export type ServerErrorProps = {
  error: ApiErrorDetail | null;
  onActivate?: () => void;
};

export type CustomError =  {
  type: string;
  message: string;
}