"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "@/lib/api/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserLoginSchemaType, UserSignupSchemaType } from "@/types/schema";
import { LoginResponse } from "@/types/auth";
import { useSearchParams } from 'next/navigation'

export function useSignup() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: UserSignupSchemaType) => signupUser(data),
    onSuccess: () => {
      toast.success("Signup successful!");
      router.push("/auth/login");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Signup failed");
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/dashboard";

  return useMutation<LoginResponse, Error, UserLoginSchemaType>({
    mutationFn: (data) => loginUser(data), // Replace with actual login function
    onSuccess: async (data) => {
      toast.success(data.message);
      router.push(redirectPath);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Login failed");
    },
  });
}
