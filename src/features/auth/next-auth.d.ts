
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

export interface ResponseUserSignup {
  _id: string;
  email: string;
}


export interface LoginInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginResponse {
  // cấu trúc response từ loginUser / loginGoogle của bạn
  user: BackendUser;
  accessToken?: string;
  refreshToken?: string;
  // ... các field khác
}

export type ServerErrorProps = {
  error?: { type: string; message?: string };
  onActivate?: () => void;
};