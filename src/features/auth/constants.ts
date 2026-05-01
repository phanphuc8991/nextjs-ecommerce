import * as z from "zod";
export const AUTH_ERROR_TYPES = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  ACCOUNT_INACTIVE: "ACCOUNT_INACTIVE",
  INVALID_CODE: "INVALID_CODE",
  CODE_EXPIRED: "CODE_EXPIRED",
  INVALID_ID: "INVALID_ID",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS"
} as const;

export type AuthErrorType =
  (typeof AUTH_ERROR_TYPES)[keyof typeof AUTH_ERROR_TYPES];

  type SuccessState = {
  success: true;
  email?: string;
  _id?: string;
};

type ErrorState = {
  success: false;
  error: {
    type: string;
    message: string;
  };
  email?: string;
};

export type FormState = SuccessState | ErrorState;

export type TFunction = (key: string) => string;

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("auth.validation.email.required"))
      .email(t("auth.validation.email.invalid")),

    password: z
      .string()
      .trim()
      .min(8, t("auth.validation.password.min"))
      .regex(/[A-Z]/, t("auth.validation.password.uppercase"))
      .regex(/[a-z]/, t("auth.validation.password.lowercase"))
      .regex(/[0-9]/, t("auth.validation.password.number"))
      .regex(/[^A-Za-z0-9]/, t("auth.validation.password.special")),
  });

export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;

export const createSignUpSchema = (t: TFunction) =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, t("auth.validation.firstName.min"))
        .regex(/^[A-Za-z\s]+$/, t("auth.validation.firstName.invalid")),

      lastName: z
        .string()
        .trim()
        .min(2, t("auth.validation.lastName.min"))
        .regex(/^[A-Za-z\s]+$/, t("auth.validation.lastName.invalid")),

      email: z
        .string()
        .trim()
        .min(1, t("auth.validation.email.required"))
        .email(t("auth.validation.email.invalid")),

      password: z
        .string()
        .trim()
        .min(8, t("auth.validation.password.min"))
        .regex(/[A-Z]/, t("auth.validation.password.uppercase"))
        .regex(/[a-z]/, t("auth.validation.password.lowercase"))
        .regex(/[0-9]/, t("auth.validation.password.number"))
        .regex(/[^A-Za-z0-9]/, t("auth.validation.password.special")),

      confirmPassword: z
        .string()
        .trim()
        .min(1, t("auth.validation.confirmPassword.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.validation.confirmPassword.mismatch"),
      path: ["confirmPassword"],
    });

export type SignUpValues = z.infer<ReturnType<typeof createSignUpSchema>>;

export const createVerifyLoginSchema = (t: TFunction) =>
  z.object({
    _id: z.string(),

    code: z.string().min(6, t("verify.validation.code")),
  });

export type VerifyLoginValues = z.infer<
  ReturnType<typeof createVerifyLoginSchema>
>;

export const createForgetPasswordStepOneSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("auth.validation.email.required"))
      .email(t("auth.validation.email.invalid")),
  });

export type ForgetPasswordStepOneValues = z.infer<
  ReturnType<typeof createForgetPasswordStepOneSchema>
>;

export const createForgetPasswordStepTwoSchema = (t: TFunction) =>
  z.object({
    userId: z.string(),
    code: z.string().min(6, t("verify.validation.code")),
    newPassword: z
      .string()
      .trim()
      .min(8, t("auth.validation.password.min"))
      .regex(/[A-Z]/, t("auth.validation.password.uppercase"))
      .regex(/[a-z]/, t("auth.validation.password.lowercase"))
      .regex(/[0-9]/, t("auth.validation.password.number"))
      .regex(/[^A-Za-z0-9]/, t("auth.validation.password.special")),
    confirmPassword: z
      .string()
      .trim()
      .min(1, t("auth.validation.confirmPassword.required")),
  });

  export type ForgetPasswordStepTwoValues = z.infer<
  ReturnType<typeof createForgetPasswordStepTwoSchema>
>;