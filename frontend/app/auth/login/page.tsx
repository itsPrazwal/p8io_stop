"use client";

import { LoginForm } from "./components/LoginForm"
import { UserLoginSchemaType } from "@/types/schema";
import { userLoginSchema } from "@/app/auth/login/schema/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/auth.queries";

export default function Page() {

  const {mutate: login} = useLogin()

  const methods = useForm<UserLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: UserLoginSchemaType) => {
    // Handle login logic here
    login(data)
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm methods={methods} submit={onSubmit} />
      </div>
    </div>
  )
}
