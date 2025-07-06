"use client";

import React, { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupSchema } from "../schema/signup.schema";
import { UserSignupSchemaType } from "@/types/schema";
import { SignupSelection } from "@/app/auth/signup/components/SignupSelection";
import { SignupDetails } from "@/app/auth/signup/components/SignupDetails";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/lib/hooks/auth.queries";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const methods = useForm<UserSignupSchemaType>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      isCompany: false,
    },
  });

  const { mutate: signup } = useSignup()

  const [selectionState, setSelectionState] = React.useState(true);

  const handleSelectionToggle:MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setSelectionState(!selectionState);
  }

  const onSubmit = (data: UserSignupSchemaType) => {
    signup(data)
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="relative">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Fill out the form to sign up</CardDescription>
          <Button disabled={selectionState && !methods.watch('type')} className="absolute top-0 right-4" variant="link" onClick={handleSelectionToggle}>
            {selectionState ? "Next" : "Back"}
          </Button>
        </CardHeader>
        <CardContent>
          {selectionState ? (
            <SignupSelection methods={methods} />
          ) : (
            <SignupDetails methods={methods} onSubmit={onSubmit} />
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/auth/login" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
