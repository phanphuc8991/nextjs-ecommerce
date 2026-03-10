import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  _id: string;
  username?: string;
  name: string;
  email: string;
  isVerify?: boolean;
  type?: string;
  role?: string;
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
    access_expire: number;
    error: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    data: {
      user: {
        _id: string;
        name: string;
        email: string;
      };
    };
    access_token: string;
  }
  interface Session {
    user: IUser;
    access_token: string;
    refresh_token: string;
    access_expire: number;
    error: string;
  }
}
export { }

declare global {

    interface IRequest {
        url: string,
        method: string,
        body?: {[key: string]: any},
        queryParams?: any,
        useCredentials?: boolean,
        headers?: any,
        nextOption?: any,
    }

    interface IBackendRes<T> {
        error?: string | string[],
        message: string,
        statusCode?: number | string,
        data?: T,
    }

    interface IModelPaginate<T> {
        meta: {
            current: number,
            pageSize: number
            pages: number,
            total: number
        },
        result: T[]
    }

    interface ILogin {
        user: {
            _id: string,
            name: string,
            email: string,
        }
        access_token: string,
    }
}








