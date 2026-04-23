"use client";

import { cn } from "@/lib/cn";
import { defineStepper } from "@stepperize/react";
import {
  CheckCircle,
  CreditCard,
  Home,
  User,
  BadgeCheck,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { checkCode, resendActivation } from "../services";

const stepper = defineStepper(
  { id: "login", label: "Login", icon: User },
  { id: "verification", label: "Verification", icon: BadgeCheck },
  { id: "done", label: "Done", icon: Check },
);

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const ResendEmailModal = ({
  isModalOpen,
  userEmail,
  resetForm,
}: {
  isModalOpen: boolean;
  userEmail?: string;
  resetForm: any;
}) => {
  return (
    <stepper.Scoped>
      <Dialog open={isModalOpen}>
        <DialogContent
          className="sm:max-w-[500px] p-0 ring-0"
          showCloseButton={false}
        >
          <DialogTitle className="hidden"></DialogTitle>
          <section id="resend-email-modal">
            <ResendContent
              userEmail={userEmail}
              resetForm={resetForm}
            />
          </section>
        </DialogContent>
      </Dialog>
    </stepper.Scoped>
  );
};

// #region Content

const ResendContent = (props: any) => {
  const methods = stepper.useStepper();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<any>("");
  const [code, setCode] = useState("");

  const resend = async () => {
    try {
      setIsLoading(true);
      const res = await resendActivation({
        email: props?.userEmail,
      });
      if (res) {
        setUserId(res.data?._id);
        methods.navigation.next();
      }
      setIsLoading(false);
    } catch (err: any) {
      console.log("err", err);
      setIsLoading(false);
    }
  };
  const active = async () => {
    try {
      setIsLoading(true);
      const res = await checkCode({
        _id: userId,
        code: code,
      });
      if (res) {
        methods.navigation.next();
      }
      setIsLoading(false);
    } catch (err: any) {
      console.log("err", err);
      setIsLoading(false);
    }
  };

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
              onClick={() => resend()}
              disabled={isLoading}
            >
              {isLoading && <Spinner data-icon="inline-start" />}

              {isLoading ? "Resending..." : "Resend code"}
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
              onClick={() => active()}
              disabled={isLoading}
            >
              {isLoading && <Spinner data-icon="inline-start" />}

              {isLoading ? "Activating..." : "Activate"}
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
              Close
            </Button>
          </div>
        );
      }
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-gray-6 rounded-xl overflow-hidden bg-gray-2/30">
        <StepperHeader methods={methods} isComplete={isComplete} />
        <div className="p-6">
          <form className="h-[158px]">
            <AnimatePresence mode="wait">
              {methods.flow.when("login", () => (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <LoginStep userEmail={props.userEmail} />
                </motion.div>
              ))}
              {methods.flow.when("verification", () => (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <Verification code={code} setCode={setCode} />
                </motion.div>
              ))}
              {methods.flow.when("done", () => (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <h4 className="pt-[50px] pb-[25px]">
                    Great! Your account is now active. You can start using it
                    right away.
                  </h4>
                </motion.div>
              ))}
            </AnimatePresence>

            {renderButton(methods)}
          </form>
        </div>
      </div>
    </div>
  );
};

// #endregion Content

// #region InputField

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
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
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full px-3 py-2 text-sm bg-red ${disabled ? "bg-gray-3/50" : "bg-gray-2"} border border-gray-6 rounded-lg text-gray-12 placeholder:text-gray-9 focus:outline-none focus:ring-2 focus:ring-indigo-8 focus:border-indigo-8`}
    />
  </div>
);

// #endregion InputField

// #region StepperHeader

const StepperHeader = ({
  methods,
  isComplete,
}: {
  methods: ReturnType<typeof stepper.useStepper>;
  isComplete: boolean;
}) => {
  const steps = methods.state.all;
  const currentIndex = methods.state.current.index;
  const progress =
    methods.state.current.data.id === steps[steps.length - 1].id || isComplete
      ? "100%"
      : `${(currentIndex / (steps.length - 1)) * 100}%`;
  return (
    <nav className="bg-gray-3/50 border-b border-gray-6 px-4 py-5">
      <ol className="flex justify-between items-center relative">
        {/* Line from center of first step to center of last step (3 steps = 16.67% / 83.33%) */}
        <div className="absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gray-6 z-0 rounded-full">
          <div
            className="h-full bg-indigo-9 rounded-full transition-all duration-300"
            style={{ width: progress }}
          />
        </div>
        {steps.map((step, index) => {
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
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// #endregion StepperHeader

// #region Login

const LoginStep = (data: any) => (
  <div>
    <h6 className="text-base font-semibold text-gray-12 mb-4">
      Activate your account.
    </h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <InputField
          label="Email"
          name="email"
          type="email"
          value={data.userEmail}
          disabled
        />
      </div>
    </div>
  </div>
);

// #endregion Login

// #region Verification

const Verification = ({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="">
    <h6 className="text-base font-semibold text-gray-12 mb-4">
      Please enter the verification code.
    </h6>
    <label className="block text-sm font-medium text-gray-12 mb-1">Code</label>
    <InputOTP
      maxLength={6}
      value={code}
      onChange={(value: any) => {
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
  </div>
);

// #endregion Verification

export default ResendEmailModal;
