import * as z from "zod";

export const addUserSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name"),
  lastName: z.string().trim().min(1, "Please enter your last name"),
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
  role: z.enum(["customer", "admin", "staff"]),
  status: z.enum(["active", "inactive"]),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "File must be less than 2MB",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPG, PNG, WEBP are allowed",
      },
    ),
});
