"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateUserPayload } from "../types";
import { addUserSchema } from "../constants";
import { createUserAction } from "../actions";
import { toast } from "sonner";

const AddUser = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState("");

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
      status: "inactive",
      avatar: undefined,
    },
  });
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChangeFile = (e: any, field: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    field.onChange(file);
  };

  const onSubmit: SubmitHandler<CreateUserPayload> = async (
    values: CreateUserPayload,
  ) => {
    clearErrors("root");
    try {
      const result = await createUserAction(values);
      console.log('result',result);
      if (result.success) {
        toast.success("User added successfully", { position: "top-center" });
      } else {
        console.log("Lỗi:", result.message);
        console.log("Status:", result.statusCode);
        console.log("Raw data:", result.raw);
        toast.error(result.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  const onOpenChange = () => {
    setPreview("");
    reset();
  };
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="default"
          className="text-sm font-medium px-4 py-[17px] tracking-tight hover:opacity-80 transition"
        >
          <CirclePlus className="mr-1" />
          Add new user
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="align-center mb-5">
            <DialogTitle>Add New User</DialogTitle>

            <DialogDescription></DialogDescription>
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
                      onChange={(e) => handleChangeFile(e, field)}
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
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
