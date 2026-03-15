"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export default function RegisterPage() {
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   const { email, password, name } = values;
    const res = await sendRequest<IBackendRes<ILogin>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      method: "POST",
      body: {
        email,
        password,
        name,
      },
    });
    if (res?.data) {
      router.push(`/verify/${res.data._id}`);
    } else {
        toast.error(res.error,{ position: "top-right" });
    }
  }


  return (
    <>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="shadcn"
                      autoComplete="email"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="shadcn"
                      autoComplete="password"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="shadcn"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="form-rhf-input">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
}
