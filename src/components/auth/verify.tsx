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
  _id: z.string(),
  code: z.string(),
});

export default function RegisterPage(props: any) {
  const { _id } = props;

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id,
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { _id, code } = values;

    const res = await sendRequest<IBackendRes<ILogin>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        _id,
        code,
      },
    });
    if (res?.data) {
      toast.success("Active account successfull", { position: "top-right" });
      router.push(`/auth/login`);
    } else {
      toast.error(res.message, { position: "top-right" });
    }
    console.log('res',res);
  }

  return (
    <>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Verify</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="_id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel hidden htmlFor="form-rhf-input-_id">
                      Id
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-_id"
                      aria-invalid={fieldState.invalid}
                      placeholder={_id}
                      autoComplete="_id"
                      disabled
                      hidden
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
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-code">Code</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-code"
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                      autoComplete="code"
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
