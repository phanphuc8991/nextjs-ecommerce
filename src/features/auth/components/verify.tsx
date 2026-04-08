"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { checkCode } from "../services";
import { verifyLoginSchema, verifyLoginValues } from "../constants";

export default function VerifyForm(props: any) {
  const { _id, email } = props;
  const router = useRouter();

  const form = useForm<verifyLoginValues>({
    resolver: zodResolver(verifyLoginSchema),
    defaultValues: {
      _id,
      code: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: verifyLoginValues) {
    const res = await checkCode({
      _id: values._id,
      code: values.code,
    });

    if (res?.data) {
      router.push(`/auth/login`);
    } else {
      // TODO: show error
    }
  }

  return (
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Enter Verification Code</CardTitle>
          <CardDescription>We've sent a code to {email}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* hidden _id */}
            <input type="hidden" value={_id} />

            {/* OTP */}

            <FieldGroup className="mb-6">
              <div className="flex justify-center">
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
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
                  )}
                />
              </div>
            </FieldGroup>

            {/* Submit */}
            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
