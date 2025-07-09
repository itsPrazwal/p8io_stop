"use client";

import { IUser } from "@/types/user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userPasswordSchema } from "@/app/dashboard/profile/schema/profile.schema";
import { UserPasswordType } from "@/types/schema";
import { useChangePassword } from "@/lib/hooks/auth.queries";

interface IProps {
  user: IUser;
}

export function ProfileCredentialsForm({ user }: IProps) {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<UserPasswordType>({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: {
      email: user.email || "",
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
  });

  const { mutate: changePassword } = useChangePassword();

  const onSubmit = (data: UserPasswordType) => {
    // Here you would typically handle the form submission, e.g., send data to an API
    changePassword({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const newPassword = watch("newPassword");
  const currentPassword = watch("currentPassword");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <h2 className="col-span-3 font-semibold text-gray-600">Credentials</h2>
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled
          />
        </div>
        <h2 className="col-span-3 font-semibold text-gray-600">
          Change Password
        </h2>
        <div className="grid gap-1">
          <Label htmlFor="newPassword">Current Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("currentPassword")}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="confirmPassword">Re-type Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Unable to save current details.</AlertTitle>
          <AlertDescription>
            <p>Please verify your details and try again.</p>
            <ul className="list-inside list-disc text-sm">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex w-full items-center justify-center border-t pt-4 gap-3 mt-6">
        <Button
          type="submit"
          className="w-1/4"
          disabled={!(currentPassword && newPassword)}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
}
