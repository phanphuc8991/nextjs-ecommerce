"use client";

import { cn } from "@/lib/cn";
import { defineStepper } from "@stepperize/react";
import { CheckCircle, User, BadgeCheck, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendEmail } from "../hook/useResendEmail";
import { _Translator, useLocale, useTranslations } from "next-intl";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createForgetPasswordStepOneSchema,
  createForgetPasswordStepTwoSchema,
  ForgetPasswordStepOneValues,
  ForgetPasswordStepTwoValues,
} from "../constants";
import { toFormData } from "@/lib/toFormData";
import PasswordField from "@/components/PasswordField";
import { forgotPassword } from "../actions";
import { useGlobalTransition } from "@/hooks/useGlobalTransition";

const stepper = defineStepper(
  { id: "email", label: "step_login", icon: User },
  { id: "verifyAndReset", label: "step_verifyAndReset", icon: BadgeCheck },
  { id: "done", label: "step_done", icon: Check },
);

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const motionProps = {
  variants: slideVariants,
  initial: "enter",
  animate: "center",
  exit: "exit",
  transition: { duration: 0.15 },
};

export const ForgotPasswordlModal = ({
  userEmail,
  resetForm,
}: {
  userEmail?: string;
  resetForm: any;
}) => {
  return (
    <stepper.Scoped>
      <Dialog open={true}>
        <DialogContent
          className="sm:max-w-[500px] p-0 ring-0"
          showCloseButton={false}
        >
          <DialogTitle className="hidden"></DialogTitle>
          <section id="resend-email-modal">
            <ResendContent userEmail={userEmail} resetForm={resetForm} />
          </section>
          <span
            onClick={() => resetForm()}
            className="absolute top-0 right-0 p-2 cursor-pointer"
          >
            <X className="size-4" />
          </span>
        </DialogContent>
      </Dialog>
    </stepper.Scoped>
  );
};

const ResendContent = (props: any) => {
  const t = useTranslations("forgotPassword");

  const methods = stepper.useStepper();
  const [userId, setUserId] = useState("");
  const isComplete = methods.state.isLast;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-gray-6 rounded-xl overflow-hidden bg-gray-2/30">
        <StepperHeader methods={methods} isComplete={isComplete} t={t} />
        <div className="p-6">
          <AnimatePresence mode="wait">
            {methods.flow.when("email", () => (
              <motion.div key="step1" {...motionProps}>
                <LoginStep setUserId={setUserId} t={t} methods={methods} />
              </motion.div>
            ))}
            {methods.flow.when("verifyAndReset", () => (
              <motion.div key="step2" {...motionProps}>
                <Verification userId={userId} methods={methods} t={t} />
              </motion.div>
            ))}
            {methods.flow.when("done", () => (
              <motion.div
                key="step3"
                {...motionProps}
                className="flex flex-col items-center justify-center text-center px-6 py-10"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  {t("forgotPasswordSuccess.title")}
                </h2>

                <p className="text-gray-500 mb-6 max-w-sm">
                  {t("forgotPasswordSuccess.description")}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const StepperHeader = ({ methods, isComplete, t }: any) => {
  const steps = methods.state.all;
  const currentIndex = methods.state.current.index;
  const progress =
    methods.state.current.data.id === steps[steps.length - 1].id || isComplete
      ? "100%"
      : `${(currentIndex / (steps.length - 1)) * 100}%`;

  return (
    <nav className="bg-gray-3/50 border-b border-gray-6 px-4 py-5">
      <ol className="flex justify-between items-center relative">
        <div className="absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gray-6 z-0 rounded-full">
          <div
            className="h-full bg-indigo-9 rounded-full transition-all duration-300"
            style={{ width: progress }}
          />
        </div>
        {steps.map((step: any, index: number) => {
          const isActive = step.id === methods.state.current.data.id;
          const isPast = index < currentIndex;
          return (
            <li
              key={step.id}
              className="flex flex-col items-center relative z-10 flex-1"
            >
              <button
                type="button"
                onClick={() => !isComplete && methods.navigation.goTo(step.id)}
                className={cn(
                  "size-9 rounded-full flex items-center justify-center transition-colors shrink-0",
                  isPast || (isComplete && index < steps.length - 1)
                    ? "bg-indigo-9 text-white"
                    : isActive || (isComplete && index === steps.length - 1)
                      ? "bg-indigo-9 text-white"
                      : "bg-gray-6 text-gray-10",
                )}
                disabled={isComplete}
              >
                {isPast || (isComplete && index <= currentIndex) ? (
                  <CheckCircle className="size-4" />
                ) : (
                  <step.icon className="size-4" />
                )}
              </button>
              <span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block",
                  isActive ? "text-gray-12 font-medium" : "text-gray-10",
                )}
              >
                {t(`steps.${step.id}`)}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
const ServerError = (error: any, t: any) => {
  if (!error?.type) return null;
  const renderError = () => {
    switch (error?.type) {
      case "INVALID_CODE":
        return <span>{t("errors.invalidCode")}</span>;
      case "CODE_EXPIRED":
        return <span>{t("errors.codeExpired")}</span>;
      case "INVALID_EMAIL":
        return <span>{t("errors.invalidEmail")}</span>;
      default:
        return <span>{t("errors.unknown")}</span>;
    }
  };
  return <div className="text-sm text-destructive mt-2">{renderError()}</div>;
};

const LoginStep = (props: any) => {
  const { setUserId, t, methods } = props;
  const { isLoading, handleResend, error, state } = useResendEmail();
  console.log("isLoadingisLoadingisLoadingisLoading", isLoading);
  const tValidation = useTranslations();
  const schema = createForgetPasswordStepOneSchema(tValidation);
  const form = useForm<ForgetPasswordStepOneValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const { control, handleSubmit, clearErrors } = form;
  const onSubmit = (data: { email: string }) => {
    const email = data?.email;
    handleResend(email, methods.navigation.next);
  };
  useEffect(() => {
    if (state?._id) {
      setUserId(state?._id);
    }
  }, [state]);

  return (
    <div>
      <h6 className="text-base font-semibold text-gray-12">
        {t("stepOne.title")}
      </h6>
      <div className="mb-4">{t("stepOne.description")}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="mb-6">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      {t("stepOne.email.label")}
                      <span className="text-red-500 -ml-2 -mt-1">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("stepOne.email.placeholder")}
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
            <div className="mt-6 flex justify-between">
              {ServerError(error, t)}
              <Button
                type="submit"
                className="ml-auto px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 hover:cursor-pointer transition-colors"
              >
                {isLoading ? t("buttons.loading") : t("buttons.sendCode")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Verification = (props: any) => {
  const { methods, userId, t } = props;
  const tValidation = useTranslations();
  const schema = createForgetPasswordStepTwoSchema(tValidation);
  const { startTransition } = useGlobalTransition();
  const form = useForm<ForgetPasswordStepTwoValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: userId,
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = form;
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  const onSubmit = (data: {
    userId: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const formData = toFormData(data);
    startTransition(() => {
      formAction(formData);
    });
  };
  useEffect(() => {
    if (state?.success) {
      methods.navigation.next();
    }
  }, [state?.success]);
  return (
    <div>
      <h6 className="text-base font-semibold text-gray-12">
        {t("stepTwo.title")}
      </h6>
      <div className="mb-4">{t("stepTwo.description")}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="mb-4 hidden">
          <Controller
            name="userId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <span className="text-red-500 -ml-2 -mt-1">*</span>
                </FieldLabel>

                <Input {...field} aria-invalid={fieldState.invalid} />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="mb-6">
          <Controller
            name="code"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  {t("stepTwo.code.label")}
                  <span className="text-red-500 -ml-2 -mt-1">*</span>
                </FieldLabel>

                <InputOTP
                  maxLength={6}
                  onChange={(value: string) => {
                    const onlyNums = value.replace(/[^0-9]/g, "");
                    field.onChange(onlyNums);
                    clearErrors("root");
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

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="mb-6">
          <PasswordField
            label={t("stepTwo.newPassword.label")}
            name="newPassword"
            control={control}
            clearErrors={clearErrors}
            hideForgetPassWord={false}
          />
        </FieldGroup>

        <FieldGroup className="mb-6">
          <PasswordField
            label={t("stepTwo.confirmPassword.label")}
            name="confirmPassword"
            control={control}
            clearErrors={clearErrors}
            hideForgetPassWord={false}
          />
        </FieldGroup>
        <div className="mt-6 flex justify-between">
          <div>
            {ServerError(state?.error, t)}
            <Button
              type="submit"
              className="ml-auto px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 hover:cursor-pointer transition-colors"
            >
              {isPending ? t("buttons.loading") : t("buttons.resetPassword")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordlModal;
