import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ResponseUserLogin } from "@/types/backend";

export interface LoginResponse {
  // cấu trúc response từ loginUser / loginGoogle của bạn
  user: BackendUser;
  accessToken?: string;
  refreshToken?: string;
  // ... các field khác
}

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
