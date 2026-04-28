"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// Schema validation
// const addUserSchema = z.object({
//   firstName: z.string().trim().min(1, "Please enter your first name"),
//   lastName: z.string().trim().min(1, "Please enter your last name"),
//   email: z
//     .email("Please enter a valid email")
//     .trim()
//     .min(1, "Please enter your email"),
//   password: z
//     .string()
//     .trim()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[0-9]/, "Password must contain at least one number")
//     .regex(
//       /[^A-Za-z0-9]/,
//       "Password must contain at least one special character",
//     ),
//   role: z.enum(["customer", "admin", "staff"]),
//   status: z.enum(["active", "inactive"]),
//   image: z.any().optional(),
// });

const addUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),

  password: z.string(),

  role: z.enum(["customer", "admin", "staff"]),
  status: z.enum(["active", "inactive"]),
  avatar: z.any().optional(),
});

type AddUserValues = z.infer<typeof addUserSchema>;

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function AddUser(props: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState("https://github.com/shadcn.png");
  const form = useForm<AddUserValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
      status: "inactive",
      avatar: null,
    },
  });
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: any, field: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    field.onChange(file);
  };
  const { trigger } = props;

  async function onSubmit(values: any) {
    clearErrors("root");
    try {
      const formData = new FormData(); 

     
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "avatar" && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      if (values.avatar) {
        formData.append("avatar", values.avatar);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/upload-avatar`,
          {
            method: "POST",
            body: formData, 
          },
        );
      }
    } catch (err: any) {}
  }
  return (
    <Dialog
      onOpenChange={() => {
        setPreview("https://github.com/shadcn.png");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="lg:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="align-center mb-5">
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-6">
            <FieldGroup>
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>First Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder=""
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

            <Controller
              name="avatar"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex justify-center items-center row-span-2">
                  <div className="flex flex-col justify-center items-center">
                    <Avatar className="cursor-pointer w-25 h-25 -mt-2 mb-4">
                      <AvatarImage src={preview} alt="@shadcn" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                      size="sm"
                    >
                      <Upload /> Upload Photo
                    </Button>
                    <Input
                      accept="image/*"
                      type="file"
                      hidden
                      ref={inputRef}
                      onChange={(e) => handleChange(e, field)}
                    />
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />

            <FieldGroup>
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Last Name</FieldLabel>

                    <Input
                      {...field}
                      type="text"
                      placeholder=""
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

            <FieldGroup>
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

            <FieldGroup>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel>Password</FieldLabel>
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
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="role"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Role</FieldLabel>
                    <Select
                      {...field}
                      onValueChange={(e) => {
                        field.onChange(e);
                        clearErrors("root");
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                      {...field}
                      onValueChange={(e) => {
                        field.onChange(e);
                        clearErrors("root");
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
