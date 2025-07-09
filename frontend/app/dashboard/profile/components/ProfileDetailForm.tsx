"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserProfileSchemaType } from "@/types/schema";
import { userProfileSchema } from "@/app/dashboard/profile/schema/profile.schema";
import { IUser } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "@/lib/hooks/user.queries";

interface IProps {
  user: IUser
}

export function ProfileDetailForm({user}: IProps){

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      isCompany: user.isCompany,
      companyName: user.isCompany ? user.companyName : "",
      taxNumber: user.isCompany ? user.taxNumber : "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    },
  });

  const { mutate: updateProfile } = useUpdateProfile();

  const onSubmit = (data: UserProfileSchemaType) => {
    updateProfile(data);
  };

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 py-4 border-b-2 border-dashed border-b-gray-500 ">
      <div className="grid grid-cols-2 gap-6 mb-6">
        {user.isCompany && (
          <>
            <h2 className="col-span-2 font-semibold text-gray-600">
              Company Details
            </h2>
            <div className="grid gap-1">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Awesome Co."
                {...register("companyName")}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="taxNumber">Tax Number</Label>
              <Input
                id="taxNumber"
                type="text"
                placeholder="AB12345678"
                {...register("taxNumber")}
              />
            </div>
          </>
        )}
        <h2 className="col-span-2 font-semibold text-gray-600">
          Personal Details
        </h2>
        <div className="grid gap-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            {...register("firstName")}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            {...register("lastName")}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+61..."
            {...register("phone")}
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
        <Button type="submit" className="w-1/4">
          Save
        </Button>
      </div>
    </form>
  )
}