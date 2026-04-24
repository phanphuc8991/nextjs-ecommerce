"use client";

import { Button } from "@/components/ui/button";
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
import { createVerifyLoginSchema, VerifyLoginValues } from "../constants";
import { startTransition, useActionState } from "react";
import { toFormData } from "@/lib/toFormData";
import { verify } from "../actions";
import { Input } from "@/components/ui/input";
import { ServerErrorProps } from "../next-auth";

export default function VerifyForm(props: any) {
  const { _id, email } = props;
  const t = useTranslations("verify");
  const [state, formAction, isPending] = useActionState(verify, null);
  const tValidation = useTranslations();
  const schema = createVerifyLoginSchema(tValidation);
  const form = useForm<VerifyLoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      _id,
      code: "",
    },
  });
  const { control, handleSubmit } = form;
  async function onSubmit(data: VerifyLoginValues) {
    console.log("fieldState.error");
    const formData = toFormData(data);
    startTransition(() => {
      formAction(formData);
    });
  }
  const ServerError = ({ error }: ServerErrorProps) => {
    if (!error) return null;
    const renderError = () => {
      switch (error.type) {
        case "INVALID_ID":
        case "INVALID_CODE":
          return (
            <span>
              {t.rich("errors.invalidId", {
                resend: (chunks) => (
                  <span
                    onClick={() => {}}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </span>
          );
        case "CODE_EXPIRED":
          return (
            <span>
              {t.rich("errors.codeExpired", {
                resend: (chunks) => (
                  <span
                    onClick={() => {}}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </span>
          );
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
        <CardHeader className="text-center">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description", { email })}</CardDescription>
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
              <ServerError error={state?.error} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? t("buttons.loading") : t("buttons.submit")}
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
