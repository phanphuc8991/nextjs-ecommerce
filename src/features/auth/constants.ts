import * as z from "zod";

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
