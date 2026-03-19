"use client";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PasswordInput({
  field,
  fieldState,
  label,
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative">
        <Input
          {...field}
          type={showPassword ? "text" : "password"}
          aria-invalid={fieldState.invalid}
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

      {fieldState.error && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  );
}