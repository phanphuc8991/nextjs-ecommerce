"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";



const loginSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .trim()
    .min(1, "Please enter your email"),
  password: z.string().trim().min(1, "Please enter your password"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: LoginValues) {
    try {
      const data = await authenticate(values.email, values.password);
      console.log('data',data);
      if (!data.success) {
        setError("root", {
          type: "manual",
          message: data.message,
        });
        return;
      }
      router.push("/");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:  "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="flex mx-10 sm:mx-0 min-h-screen items-center justify-center flex-col gap-6">
      <Card className="w-full sm:max-w-md">
        <div className="relative">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>

          {/* LỚP PHỦ LỖI (OVERLAY ERROR) */}
          {errors.root && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-card px-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-full rounded-lg bg-destructive/10 p-3 border border-destructive/20 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-destructive text-center w-full">
                  {errors.root.message}
                </p>
                {/* Nút X để xóa lỗi nhanh nếu muốn */}
                <button
                  type="button"
                  onClick={() => clearErrors("root")}
                  className="text-destructive hover:opacity-70"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Button variant="outline" type="button">
                Login with Apple
              </Button>

              <Button variant="outline" type="button">
                Login with Google
              </Button>
            </Field>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-5">
              Or continue with
            </FieldSeparator>

            {/* EMAIL */}
            <FieldGroup className="mb-6">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
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

            {/* PASSWORD */}
            <FieldGroup className="mb-6">
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

                    <Input
                      {...field}
                      type="password"
                      autoComplete="password"
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
            <Field>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="text-center mt-3">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
