"use client";

import { cn } from "@/lib/cn";
import { defineStepper } from "@stepperize/react";
import { CheckCircle, CreditCard, Home, User, BadgeCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";

const stepper = defineStepper(
  { id: "login", label: "Login", icon: User },
  { id: "verification", label: "Verification", icon: BadgeCheck },
  { id: "done", label: "Done", icon: CreditCard },
);

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const ResendEmailModal = ({isModalOpen}: {isModalOpen: boolean}) => {
  return (
    <stepper.Scoped>
      <Dialog open={isModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 ring-0" showCloseButton={false}>
          <section
            id="resend-email-modal"
          >
            <DemoContent />
          </section>
        </DialogContent>
      </Dialog>
    </stepper.Scoped>
  );
};

// #region DemoContent

const DemoContent = () => {
  const methods = stepper.useStepper();

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!methods.state.isLast) {
      methods.navigation.next();
    }
  };

  const isComplete = methods.state.isLast;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-gray-6 rounded-xl overflow-hidden bg-gray-2/30">
        <StepperHeader methods={methods} isComplete={isComplete} />
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* <h3 className="text-base font-semibold text-gray-12 mb-4">
                Activate Account
              </h3> */}
              {methods.flow.when("login", () => (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <LoginStep formData={formData} handleChange={handleChange} />
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
                  <AddressStep
                    formData={formData}
                    handleChange={handleChange}
                  />
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
                  <PaymentStep
                    formData={formData}
                    handleChange={handleChange}
                  />
                </motion.div>
              ))}
              {/* {methods.flow.when("success", () => (
                <motion.div
                  key="step4"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <CompletionScreen
                    onReset={() => {
                      methods.navigation.reset();
                    }}
                  />
                </motion.div>
              ))} */}
            </AnimatePresence>
            <div className="mt-6 flex justify-between">
              {/* <button
                  type="button"
                  onClick={() => methods.navigation.prev()}
                  className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-7 text-gray-12 hover:bg-gray-4 transition-colors"
                >
                  Back
                </button> */}

              <button
                type="submit"
                className="ml-auto px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 hover:cursor-pointer transition-colors"
              >
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// #endregion DemoContent

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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const LoginStep = ({
  formData,
  handleChange,
}: {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <h6 className="text-base font-semibold text-gray-12 mb-4">
      Your account isn’t activated yet.
    </h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
      </div>
    </div>
  </div>
);

// #endregion Login

// #region verification

const AddressStep = ({
  formData,
  handleChange,
}: {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <h6 className="text-base font-semibold text-gray-12 mb-4">
      Your account isn’t activated yet.
    </h6>
    <div className="space-y-4">
      <InputField
        label="Street Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <InputField
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  </div>
);

// #endregion verification

// #region done

const PaymentStep = ({
  formData,
  handleChange,
}: {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <h3 className="text-base font-semibold text-gray-12 mb-4">
      Your account isn’t activated yet.
    </h3>
    <div className="space-y-4">
      <InputField
        label="Name on Card"
        name="cardName"
        value={formData.cardName}
        onChange={handleChange}
        required
      />
      <InputField
        label="Card Number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="XXXX XXXX XXXX XXXX"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Expiry"
          name="expiry"
          value={formData.expiry}
          onChange={handleChange}
          placeholder="MM/YY"
          required
        />
        <InputField
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="XXX"
          required
        />
      </div>
    </div>
  </div>
);

// #endregion done

// #region CompletionScreen

const CompletionScreen = ({ onReset }: { onReset: () => void }) => (
  <div className="text-center py-8">
    <div className="size-14 bg-green-9 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle className="size-7 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-12 mb-1">Done!</h3>
    <p className="text-sm text-gray-11 mb-6">Form submitted successfully.</p>
    <button
      type="button"
      onClick={onReset}
      className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-9 hover:bg-indigo-10 transition-colors"
    >
      Start over
    </button>
  </div>
);

// #endregion CompletionScreen

export default ResendEmailModal;
