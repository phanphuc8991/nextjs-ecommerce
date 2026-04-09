import { AuthError } from "next-auth";

// export const AUTH_ERROR_MESSAGES: Record<string, string> = {
//   UNAUTHORIZED: "The email or password you entered is incorrect.",
//   ACCOUNT_INACTIVE:
//     "Your account is inactive. Please activate your account or contact support.",
//   EMAIL_ALREADY_EXISTS: "Email already exists. Please use another email",
// };

export class CustomAuthError extends AuthError {
  public customType?: string;
  public customName?: string;

  constructor(message: string, customType?: string, customName?: string) {
    super(message);
    this.name = "CustomAuthError";
    this.customType = customType;
    this.customName = customName;
  }
}
