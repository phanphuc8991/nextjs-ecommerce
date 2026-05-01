import { AuthErrorType } from "@/features/auth/constants";
import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  public customType?: AuthErrorType;
  public customName?: string;

  constructor(message: string, customType?: AuthErrorType, customName?: string) {
    super(message);
    this.name = "CustomAuthError";
    this.customType = customType;
    this.customName = customName;
    Object.setPrototypeOf(this, CustomAuthError.prototype);
  }
  
}
