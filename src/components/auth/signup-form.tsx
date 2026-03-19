"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import PasswordInput from "../ui/password-input";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";
import { AUTH_ERROR_MESSAGES } from "@/utils/errors";

const loginSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters"),

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

    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginValues = z.infer<typeof loginSchema>;

export default function SignupForm(props: any) {
  const router = useRouter();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: LoginValues) {
    clearErrors("root");
    try {
      const res = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      
      if (res?.data?._id) {
        console.log
        const encodedEmail = btoa(res?.data?.email);
        router.push(
          `/verify/${res.data._id}?e=${encodeURIComponent(encodedEmail)}`,
        );
      }
    } catch (err: any) {
      console.log("err", err);
      const errorCode = err?.error;
      setError("root", {
        type: "manual",
        message: AUTH_ERROR_MESSAGES[errorCode] || "Something went wrong",
      });
    }
  }

  return (
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
      <Card className="w-full sm:max-w-md">
        <div className="relative">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          {/*  (OVERLAY ERROR) */}
          {errors.root && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-card px-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-full rounded-lg bg-destructive/10 p-3 border border-destructive/20 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-destructive text-center w-full">
                  {errors.root.message}
                </p>
                <button
                  type="button"
                  onClick={() => clearErrors("root")}
                  className="text-destructive hover:opacity-70"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <FieldGroup className="mb-6">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("root");
                      }}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* EMAIL */}
            <FieldGroup className="mb-6">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("root");
                      }}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* PASSWORD */}
            <FieldGroup className="mb-6">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <PasswordInput
                    field={field}
                    fieldState={fieldState}
                    label="Password"
                    onChange={(e: any) => {
                      field.onChange(e);
                      clearErrors("root");
                    }}
                  />
                )}
              />
            </FieldGroup>

            <FieldGroup className="mb-6">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <PasswordInput
                    field={field}
                    fieldState={fieldState}
                    label="Confirm Password"
                    onChange={(e: any) => {
                      field.onChange(e);
                      clearErrors("root");
                    }}
                  />
                )}
              />
            </FieldGroup>
            

            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link href={routes.login}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
