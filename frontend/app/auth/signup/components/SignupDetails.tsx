import { UseFormReturn } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserSignupSchemaType } from "@/types/schema";
import { Input } from "@/components/ui/input";

interface IProps {
  methods: UseFormReturn<UserSignupSchemaType>
  onSubmit: (data: UserSignupSchemaType) => void
}

export function SignupDetails({ methods, onSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const isCompany = watch("isCompany");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {isCompany && (
          <>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
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
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Unable to process signup.</AlertTitle>
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

      <div className="flex flex-col gap-3 mt-6">
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>
    </form>
  );
}
