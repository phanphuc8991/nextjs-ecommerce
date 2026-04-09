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

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/routes";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { authenticate } from "../actions";
import ResendEmailModal from "./resend-email-modal";
import { loginSchema, LoginValues } from "../constants";
import PasswordField from "@/components/PasswordField";
const LoginForm = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const resetForm = () => {
    setIsModalOpen(false);
    clearErrors("root");
    form.reset();
  };
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
      if (data.success) {
        router.push("/dashboard");
      } else {
        setError("root", {
          type: data.type,
          message: data.name,
        });
        if (data.type === "ACCOUNT_INACTIVE") {
          setUserEmail(values.email);
        }
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  const FormError = ({ error, onClose, onActivate }: any) => {
    if (!error) return null;

    return (
      <div className="relative">
        <div className="w-full rounded-lg bg-destructive/10 p-3 border border-destructive/20">
          <div className="text-sm text-destructive text-center px-4">
            {error.type === "ACCOUNT_INACTIVE" ? (
              <span>
                Your account isn’t active yet. Please{" "}
                <span onClick={onActivate} className="underline cursor-pointer">
                  click here to activate it
                </span>
              </span>
            ) : (
              error.message
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-destructive"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ResendEmailModal
        isModalOpen={isModalOpen}
        resetForm={resetForm}
        userEmail={userEmail}
      />
      <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <PasswordField control={control} clearErrors={clearErrors} />
              </FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {" "}
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <FormError
                  error={errors.root}
                  onClose={() => clearErrors("root")}
                  onActivate={() => setIsModalOpen(true)}
                />
                <Button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  variant="outline"
                  type="button"
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href={routes.signup}>Sign up</Link>
                </FieldDescription>
              </Field>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
