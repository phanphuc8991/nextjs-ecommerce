import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginGoogle, loginUser } from "@/services/auth.service";
import GoogleProvider from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const res = await loginUser({
            username: credentials.email,
            password: credentials.password,
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
          token.user = user as any;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
});
