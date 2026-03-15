import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const res = await sendRequest<IBackendRes<ILogin>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
            body: {
              username: credentials.email,
              password: credentials.password,
            },
          });
          return res;
        } catch (err: any) {
          const authError = new AuthError();
          (authError as any).error = err.error;
          throw authError;
        }
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user as AdapterUser & IUser;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as AdapterUser & IUser;
      return session;
    },
  },
});
