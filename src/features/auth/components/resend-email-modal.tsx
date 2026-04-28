"use client";

import { cn } from "@/lib/cn";
import { defineStepper } from "@stepperize/react";
import { CheckCircle, User, BadgeCheck, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendEmail } from "../hook/useResendEmail";
import { useTranslations } from "next-intl";

const stepper = defineStepper(
  { id: "login", label: "step_login", icon: User },
  { id: "verification", label: "step_verification", icon: BadgeCheck },
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

export const ResendEmailModal = ({
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
  const t = useTranslations("ResendEmail");
  const { isLoading, handleResend, handleVerify, error } = useResendEmail();
  const methods = stepper.useStepper();
  const [code, setCode] = useState("");
  const isComplete = methods.state.isLast;

  const renderButton = (methods: any) => {
    const id = methods?.state?.current?.data?.id;
    switch (id) {
      case "login": {
        return (
          <div className="mt-6 flex justify-between">
            <Button
              type="submit"
              className="ml-auto px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 hover:cursor-pointer transition-colors"
              onClick={() => {
                console.log('click');
                handleResend(props.userEmail, methods.navigation.next);
              }}
              disabled={isLoading}
            >
              {isLoading ? t("login.resending_btn") : t("login.resend_btn")}
            </Button>
          </div>
        );
      }
      case "verification": {
        return (
          <div className="mt-6 flex justify-between">
            <Button
              type="submit"
              className="ml-auto px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 hover:cursor-pointer transition-colors"
              onClick={() => {
                handleVerify(code, methods.navigation.next)
              }}
              disabled={isLoading || !code}
            >
              {isLoading
                ? t("verification.activating_btn")
                : t("verification.activate_btn")}
            </Button>
          </div>
        );
      }
      default: {
        return (
          <div className="mt-6 flex justify-between">
            <Button
              type="submit"
              className="ml-auto px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 hover:cursor-pointer transition-colors"
              onClick={() => {
                props.resetForm();
              }}
              disabled={isLoading}
            >
              {t("done.close_btn")}
            </Button>
          </div>
        );
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-gray-6 rounded-xl overflow-hidden bg-gray-2/30">
        <StepperHeader methods={methods} isComplete={isComplete} t={t} />
        <div className="p-6">
            <AnimatePresence mode="wait">
              {methods.flow.when("login", () => (
                <motion.div key="step1" {...motionProps}>
                  <LoginStep userEmail={props.userEmail} t={t} />
                </motion.div>
              ))}
              {methods.flow.when("verification", () => (
                <motion.div key="step2" {...motionProps}>
                  <Verification
                    code={code}
                    setCode={setCode}
                    t={t}
                    error={error}
                  />
                </motion.div>
              ))}
              {methods.flow.when("done", () => (
                <motion.div key="step3" {...motionProps}>
                  <h4 className="pt-[50px] pb-[25px]">{t("done.message")}</h4>
                </motion.div>
              ))}
            </AnimatePresence>
            {renderButton(methods)}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, disabled }: any) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-12 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      disabled={disabled}
      className={`w-full px-3 py-2 text-sm ${disabled ? "bg-gray-3/50" : "bg-gray-2"} border border-gray-6 rounded-lg text-gray-12 placeholder:text-gray-9 focus:outline-none focus:ring-2 focus:ring-indigo-8 focus:border-indigo-8`}
    />
  </div>
);

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

const LoginStep = ({ userEmail, t }: any) => (
  <div>
    <h6 className="text-base font-semibold text-gray-12 mb-4">
      {t("login.title")}
    </h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <InputField
          label={t("login.email_label")}
          name="email"
          type="email"
          value={userEmail}
          disabled
        />
      </div>
    </div>
  </div>
);

const ServerError = (error: any, t: any) => {
  if (!error?.type) return null;
  const renderError = () => {
    switch (error?.type) {
      case "INVALID_CODE":
        return <span>{t("errors.invalidCode")}</span>;
      case "CODE_EXPIRED":
        return <span>{t("errors.codeExpired")}</span>;
      default:
        return <span>{t("errors.unknown")}</span>;
    }
  };
  return <div className="text-sm text-destructive mt-2">{renderError()}</div>;
};
const Verification = ({ code, setCode, t, error }: any) => (
  <div>
    <h6 className="text-base font-semibold text-gray-12 mb-4">
      {t("verification.title")}
    </h6>
    <label className="block text-sm font-medium text-gray-12 mb-1">
      {t("verification.code_label")}
      <span className="text-red-500">*</span>
    </label>
    <InputOTP
      maxLength={6}
      value={code}
      onChange={(value: string) => {
        const onlyNums = value.replace(/[^0-9]/g, "");
        setCode(onlyNums);
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
    <div>{ServerError(error, t)}</div>
  </div>
);

export default ResendEmailModal;
