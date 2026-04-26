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
import { routes } from "@/routes";
import { startTransition, useActionState, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { authenticate } from "../actions";
import ResendEmailModal from "./resend-email-modal";

import { createLoginSchema, LoginValues } from "../constants";

import PasswordField from "@/components/PasswordField";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { ServerErrorProps } from "../next-auth";
import { toFormData } from "@/lib/toFormData";

const LoginForm = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("auth.login");
  const tValidation = useTranslations();
  const schema = createLoginSchema(tValidation);
  const [state, formAction, isPending] = useActionState(authenticate, null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState(state?.error);

  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, clearErrors } = form;

  const handleChangeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const resetForm = () => {
    setIsModalOpen(false);
    clearErrors("root");
    setServerError(undefined);
    form.reset();
  };

  const onSubmit = (data: LoginValues) => {
    const formData = toFormData(data);
    startTransition(() => {
      formAction(formData);
    });
  };

  const ServerError = ({ error, onActivate }: ServerErrorProps) => {
    if (!error) return null;
    const renderError = () => {
      switch (error.type) {
        case "ACCOUNT_INACTIVE":
          return (
            <span>
              {t("errors.inactive")}{" "}
              <span onClick={onActivate} className="underline cursor-pointer">
                {t("errors.activate")}
              </span>
            </span>
          );
        case "UNAUTHORIZED":
          return <span>{t("errors.unauthorized")}</span>;
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

  useEffect(() => {
    setServerError(state?.error);
  }, [state]);

  return (
    <>
      {/* LANGUAGE SWITCH */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => handleChangeLocale("en")}
          disabled={locale === "en"}
        >
          EN
        </button>

        <button
          onClick={() => handleChangeLocale("vi")}
          disabled={locale === "vi"}
        >
          VI
        </button>
      </div>

      {isModalOpen && (
        <ResendEmailModal resetForm={resetForm} userEmail={state?.email} />
      )}

      <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="mb-6">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {t("email.label")}
                        <span className="text-red-500 -ml-2 -mt-1">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("email.placeholder")}
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

              <FieldGroup className="mb-6">
                <PasswordField
                  label={t("password.label")}
                  name="password"
                  control={control}
                  clearErrors={clearErrors}
                  hideForgetPassWord={false}
                />
              </FieldGroup>

              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? t("buttons.loading") : t("buttons.login")}
                </Button>
                <ServerError
                  error={serverError}
                  onActivate={() => setIsModalOpen(true)}
                />
                <Button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  variant="outline"
                  type="button"
                  disabled={true}
                >
                  {t("buttons.loginWithGoogle")}
                </Button>
                <FieldDescription className="text-center">
                  {t("footer.noAccount")}{" "}
                  <Link href={routes.signup}>{t("footer.signUp")}</Link>
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
