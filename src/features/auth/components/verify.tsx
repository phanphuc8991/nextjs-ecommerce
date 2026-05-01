"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { AUTH_ERROR_TYPES, createVerifyLoginSchema, VerifyLoginValues } from "../constants";
import { useActionState } from "react";
import { toFormData } from "@/lib/toFormData";
import { verify } from "../actions";
import { Input } from "@/components/ui/input";
import { ServerErrorProps } from "../next-auth";
import { useGlobalTransition } from "@/hooks/useGlobalTransition";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useResendEmail } from "../hook/useResendEmail";
import { toast } from "sonner";

export default function VerifyForm(props: any) {
  const locale = useLocale();
  const { handleResend } = useResendEmail();
  const { startTransition } = useGlobalTransition();
  const { _id, email } = props;
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(verify, null);
  const tValidation = useTranslations();
  const schema = createVerifyLoginSchema(tValidation);
  const router = useRouter();
  const form = useForm<VerifyLoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      _id,
      code: "",
    },
  });
  const { control, handleSubmit, clearErrors, getValues } = form;
  async function onSubmit(data: VerifyLoginValues) {
    const formData = toFormData(data);
    startTransition(() => {
      formAction(formData);
    });
  }

  const resendEmail = () => {
    startTransition(() => {
      handleResend(email, sendEmailSuccess);
    });
  };

  const sendEmailSuccess = () => {
    toast.success("Code sent. Please check your email.", {
      position: "top-center",
    });
  };
  const ServerError = ({ error }: ServerErrorProps) => {
    if (!error) return null;
    const renderError = () => {
      switch (error.type) {
        case AUTH_ERROR_TYPES.INVALID_ID:
        case AUTH_ERROR_TYPES.INVALID_CODE:
          return (
            <span>
              {t.rich("verify.errors.invalidId", {
                resend: (chunks) => (
                  <span
                    onClick={() => {
                      router.push(`/${locale}/auth/login`);
                    }}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </span>
          );
        case AUTH_ERROR_TYPES.INVALID_EMAIL:
          return (
            <span>
              {t.rich("verify.errors.invalidId", {
                resend: (chunks) => (
                  <span
                    onClick={() => {
                      router.push(`/${locale}/auth/login`);
                    }}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </span>
          );
        case AUTH_ERROR_TYPES.CODE_EXPIRED:
          return (
            <span>
              {t.rich("verify.errors.codeExpired", {
                resend: (chunks) => (
                  <span
                    onClick={() => {
                      resendEmail();
                    }}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </span>
          );
        default:
          return <span>{t("verify.errors.unknown")}</span>;
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

  function SuccessDialog() {
    return (
      <Dialog open={true}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-md text-center p-6"
        >
          <DialogTitle></DialogTitle>
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            {t("verifySuccess.title")}
          </h2>

          <p className="text-gray-500 mb-6">{t("verifySuccess.description")}</p>

          <Button
            className="w-full"
            onClick={() => {
              router.push(`/${locale}/auth/login`);
            }}
          >
            {t("verifySuccess.buttons.continue")}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
      {state?.success && SuccessDialog()}

      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{t("verify.title")}</CardTitle>
          <CardDescription>
            {t("verify.description", { email })}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="hidden" value={_id} />
            <FieldGroup className="mb-4">
              <div className="flex justify-center">
                <Controller
                  name="code"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col items-center gap-2">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(value) => {
                          if (!value) {
                            form.reset();
                            clearErrors("root");
                          }
                          const onlyNums = value.replace(/[^0-9]/g, "");

                          field.onChange(onlyNums);
                        }}
                        inputMode="numeric"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>

                      {fieldState.error && (
                        <FieldError className="text-center mt-2">
                          {fieldState.error.message}
                        </FieldError>
                      )}
                    </div>
                  )}
                />
              </div>
            </FieldGroup>

            <Field>
              {!state?.success && <ServerError error={state?.error} />}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                  ? t("verify.buttons.loading")
                  : t("verify.buttons.submit")}
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
