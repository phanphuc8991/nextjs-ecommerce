import { AuthError } from "next-auth";



export class InvalidEmailPasswordError extends AuthError {
  static type = "Invalid Email Or Password"
}

export class InActiveAccountError extends AuthError {
  static type = "Inactive Account Error"
}

export class InternalServerError extends AuthError {
  static type = "Internal Server Error"
}
