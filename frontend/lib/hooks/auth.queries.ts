"use client"

import { useMutation } from "@tanstack/react-query"
import { loginUser, signupUser } from "@/lib/api/auth";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { UserLoginSchemaType, UserSignupSchemaType } from "@/types/schema";
import { LoginResponse } from "@/types/auth";
import { localStorageUtil } from "@/lib/utils";

export function useSignup() {
  const router = useRouter()
  return useMutation({
    mutationFn: (data: UserSignupSchemaType) => signupUser(data),
    onSuccess: () => {
      toast.success("Signup successful!")
      router.push("/auth/login")
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Signup failed")
    }
  })
}

export function useLogin() {
  const router = useRouter()
  return useMutation<LoginResponse, Error, UserLoginSchemaType>({
    mutationFn: (data) => loginUser(data), // Replace with actual login function
    onSuccess: async (data) => {
      localStorageUtil.set('token', data.data.token)
      localStorageUtil.set('user', data.data.user)
      toast.success(data.message)
      router.push("/dashboard/profile")
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Login failed")
    }
  })
}