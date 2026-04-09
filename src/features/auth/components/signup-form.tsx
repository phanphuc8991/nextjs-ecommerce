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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { registerUser } from "../services";
import { signUpSchema, SignUpValues } from "../constants";
import PasswordField from "@/components/PasswordField";

const SignupForm = () => {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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

  async function onSubmit(values: SignUpValues) {
    // clearErrors("root");
    // try {
    //   const res = await registerUser({
    //     name: values.name,
    //     email: values.email,
    //     password: values.password,
    //   });
    //   if (res?._id) {
    //     console.log;
    //     const encodedEmail = btoa(res?.data?.email);
    //     router.push(
    //       `/verify/${res.data._id}?e=${encodeURIComponent(encodedEmail)}`,
    //     );
    //   }
    // } catch (err: any) {
    //   console.log("err", err);
    //   const errorCode = err?.error;
    //   setError("root", {
    //     type: "manual",
    //     message: AUTH_ERROR_MESSAGES[errorCode] || "Something went wrong",
    //   });
    // }
  }

  const FormError = ({ error, onClose }: any) => {
    if (!error) return null;
    return (
      <div className="relative">
        <div className="w-full rounded-lg bg-destructive/10 p-3 border border-destructive/20">
          <div className="text-sm text-destructive text-center px-4">
            {error.message}
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
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-3">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        {/*  (OVERLAY ERROR) */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="mb-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>First Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder=""
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
            <FieldGroup className="mb-4">
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder=""
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
            <FieldGroup className="mb-4">
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
            <FieldGroup className="mb-4">
              <PasswordField
                label="Password"
                name="password"
                control={control}
                clearErrors={clearErrors}
                hideForgetPassWord={false}
              />
            </FieldGroup>
            <FieldGroup className="mb-4">
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                control={control}
                clearErrors={clearErrors}
                hideForgetPassWord={false}
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
                <FormError
                  error={errors.root}
                  onClose={() => clearErrors("root")}
                />
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
};
export default SignupForm;
