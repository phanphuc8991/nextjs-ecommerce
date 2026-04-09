import { Controller, Control, UseFormClearErrors } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginValues } from "@/features/auth/constants";

type Props = {
  control: Control<LoginValues>;
  clearErrors: UseFormClearErrors<LoginValues>;
};

const PasswordField = ({ control, clearErrors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center">
            <FieldLabel>Password</FieldLabel>

            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline !text-black"
            >
              Forgot your password?
            </a>
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
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
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
