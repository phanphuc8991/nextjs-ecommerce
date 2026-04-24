import * as z from "zod";

// i18n t function type
export type TFunction = (key: string) => string;

/**
 * =========================
 * LOGIN SCHEMA
 * =========================
 */
export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("auth.login.errors.validation.email.required"))
      .email(t("auth.login.errors.validation.email.invalid")),

    password: z
      .string()
      .trim()
      .min(8, t("auth.login.errors.validation.password.min"))
      .regex(/[A-Z]/, t("auth.login.errors.validation.password.uppercase"))
      .regex(/[a-z]/, t("auth.login.errors.validation.password.lowercase"))
      .regex(/[0-9]/, t("auth.login.errors.validation.password.number"))
      .regex(
        /[^A-Za-z0-9]/,
        t("auth.login.errors.validation.password.special")
      ),
  });

export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;

/**
 * =========================
 * SIGN UP SCHEMA
 * =========================
 */
export const createSignUpSchema = (t: TFunction) =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, t("auth.login.errors.validation.firstName.min"))
        .regex(/^[A-Za-z\s]+$/, t("auth.login.errors.validation.firstName.invalid")),

      lastName: z
        .string()
        .trim()
        .min(2, t("auth.login.errors.validation.lastName.min"))
        .regex(/^[A-Za-z\s]+$/, t("auth.login.errors.validation.lastName.invalid")),

      email: z
        .string()
        .trim()
        .min(1, t("auth.login.errors.validation.email.required"))
        .email(t("auth.login.errors.validation.email.invalid")),

      password: z
        .string()
        .trim()
        .min(8, t("auth.login.errors.validation.password.min"))
        .regex(/[A-Z]/, t("auth.login.errors.validation.password.uppercase"))
        .regex(/[a-z]/, t("auth.login.errors.validation.password.lowercase"))
        .regex(/[0-9]/, t("auth.login.errors.validation.password.number"))
        .regex(
          /[^A-Za-z0-9]/,
          t("auth.login.errors.validation.password.special")
        ),

      confirmPassword: z
        .string()
        .trim()
        .min(1, t("auth.login.errors.validation.confirmPassword.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.login.errors.validation.password.mismatch"),
      path: ["confirmPassword"],
    });

export type SignUpValues = z.infer<ReturnType<typeof createSignUpSchema>>;

/**
 * =========================
 * VERIFY LOGIN SCHEMA (OTP / CODE)
 * =========================
 */
export const createVerifyLoginSchema = (t: TFunction) =>
  z.object({
    _id: z.string().min(1),
    code: z.string().min(6, t("auth.login.errors.validation.code.min")),
  });

export type VerifyLoginValues = z.infer<
  ReturnType<typeof createVerifyLoginSchema>
>;