
import * as z from "zod";
export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .trim()
    .min(1, "Please enter your email"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export type LoginValues = z.infer<typeof loginSchema>;



export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .regex(/^[A-Za-z\s]+$/, "First name can only contain letters"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[A-Za-z\s]+$/, "Last name can only contain letters"),

    email: z
      .email("Please enter a valid email")
      .trim()
      .min(1, "Please enter your email"),

    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain uppercase letter")
      .regex(/[a-z]/, "Password must contain lowercase letter")
      .regex(/[0-9]/, "Password must contain number")
      .regex(/[^A-Za-z0-9]/, "Password must contain special character"),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;



export const verifyLoginSchema = z.object({
  _id: z.string(),
  code: z.string().min(6, "Code must be 6 digits"),
});

export type verifyLoginValues = z.infer<typeof verifyLoginSchema>;