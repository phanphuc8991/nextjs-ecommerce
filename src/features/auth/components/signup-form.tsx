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
import { createSignUpSchema, SignUpValues } from "../constants";
import PasswordField from "@/components/PasswordField";
import { useTranslations, useLocale } from "next-intl";
import { startTransition, useActionState } from "react";
import { toFormData } from "@/lib/toFormData";
import { register } from "../actions";
import { ServerErrorProps } from "../next-auth";
const SignupForm = () => {
  const t = useTranslations("auth.signup");
  const tValidation = useTranslations();
  const schema = createSignUpSchema(tValidation);
  const [state, formAction, isPending] = useActionState(register, null);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { control, handleSubmit, clearErrors } = form;
  async function onSubmit(data: SignUpValues) {
    const formData = toFormData(data);
    startTransition(() => {
      formAction(formData);
    });
  }

  const ServerError = ({ error }: ServerErrorProps) => {
    if (!error) return null;
    const renderError = () => {
      switch (error.type) {
        case "EMAIL_ALREADY_EXISTS":
          return <span>{t("errors.emailAlreadyExists")}</span>;
        default:
          return <span>{t("errors.unknown")}</span>;
      }
    };
    return (
      <div className="relative">
        <div className="w-full rounded-lg bg-destructive/10 p-3 border border-destructive/20">
          <div className="text-sm text-destructive text-center px-4">
            {renderError()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="mb-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{t("firstName.label")}<span className="text-red-500 -ml-2 -mt-1">*</span></FieldLabel>

                    <Input
                      {...field}
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
                    <FieldLabel>{t("lastName.label")}<span className="text-red-500 -ml-2 -mt-1">*</span></FieldLabel>
                    <Input
                      {...field}
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
                    <FieldLabel>{t("email.label")}<span className="text-red-500 -ml-2 -mt-1">*</span></FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("email.placeholder")}
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
                label={t("password.label")}
                name="password"
                control={control}
                clearErrors={clearErrors}
                hideForgetPassWord={false}
              />
            </FieldGroup>

            <FieldGroup className="mb-4">
              <PasswordField
                label={t("confirmPassword.label")}
                name="confirmPassword"
                control={control}
                clearErrors={clearErrors}
                hideForgetPassWord={false}
              />
            </FieldGroup>

            <Field>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? t("buttons.loading") : t("buttons.signup")}
              </Button>
              <ServerError error={state?.error} />
              <Button variant="outline" type="button">
                {t("buttons.googleSignup")}
              </Button>

              <FieldDescription className="text-center">
                {t("footer.alreadyHaveAccount")}{" "}
                <Link href={routes.login}>{t("footer.signIn")}</Link>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
