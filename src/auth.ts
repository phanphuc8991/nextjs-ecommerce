import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginGoogle, loginUser } from "@/services/auth.service";
import GoogleProvider from "next-auth/providers/google";
import { ResponseUserLogin } from "./types/backend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      authorize: async (credentials) => {
        try {
          if (
            !credentials ||
            typeof credentials.email !== "string" ||
            typeof credentials.password !== "string"
          )
            return null;
          const res = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });
          if (res.success) {
            return res.data;
          } else {
            throw new Error(res.message);
          }
        } catch (err) {
          const error = err as string;
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const idToken = account?.id_token as string;
        const res = await loginGoogle({ idToken });
        (user as any).backendData = res;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        if ("backendData" in user) {
          token.user = user.backendData as any;
        } else {
          token.user = user as ResponseUserLogin;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
