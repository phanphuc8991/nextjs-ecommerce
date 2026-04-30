import { Controller, Control, UseFormClearErrors } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgetPasswordStepTwoValues, LoginValues, SignUpValues } from "@/features/auth/constants";

type Props = {
  control: Control<any>;
  clearErrors:
    | UseFormClearErrors<LoginValues>
    | UseFormClearErrors<SignUpValues>
    | UseFormClearErrors<ForgetPasswordStepTwoValues>;
  hideForgetPassWord?: boolean;
  name: string;
  label: string;
  handleForgotPassword?: any;
};

const PasswordField = ({
  label,
  name,
  control,
  clearErrors,
  hideForgetPassWord = true,
  handleForgotPassword,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center">
            <FieldLabel>{label} <span className="text-red-500 -ml-2 -mt-1">*</span></FieldLabel>
            {hideForgetPassWord && (
              <span
                onClick={handleForgotPassword}
                className="ml-auto text-sm cursor-pointer !text-black"
              >
                Forgot your password?
              </span>
            )}
          </div>
          <div className="relative">
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              autoComplete="password"
              aria-invalid={fieldState.invalid}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("root");
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
export default PasswordField;
