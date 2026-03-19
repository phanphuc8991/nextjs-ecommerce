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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/routes";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const loginSchema = z.object({
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

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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
      const data = await authenticate(values.email, values.password);
      if (!data.success) {
        setError("root", {
          type: "manual",
          message: data.message,
        });
        return;
      }
      router.push("/");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
      <Card className="w-full sm:max-w-md">
        <div className="relative">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
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
            <Field>
              <Button variant="outline" type="button">
                Login with Apple
              </Button>

              <Button variant="outline" type="button">
                Login with Google
              </Button>
            </Field>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-5">
              Or continue with
            </FieldSeparator>

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
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel>Password</FieldLabel>

                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline !text-black"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="password"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                          field.onChange(e);
                          clearErrors("root");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Field>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="text-center mt-3">
                Don&apos;t have an account?{" "}
                <Link href={routes.signup}>Sign up</Link>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
