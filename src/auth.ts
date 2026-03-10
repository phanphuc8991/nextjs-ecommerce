import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InActiveAccountError, InternalServerError, InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
          const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          body: {
            username: credentials.email,
            password: credentials.password,
          },
        });
        if (!res.error) {
          return 
        } else if (res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res.statusCode === 400) {
          throw new InActiveAccountError();
        } else {
          throw new InternalServerError();
        }
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
})