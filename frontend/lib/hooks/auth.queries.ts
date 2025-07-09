"use client";

import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  logoutUser,
  signupUser,
} from "@/lib/api/auth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { UserLoginSchemaType, UserSignupSchemaType } from "@/types/schema";
import { LoginResponse } from "@/types/auth";

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

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      toast.success("Logout successful!");
      router.push("/auth/login");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Logout failed");
    },
  });
}

export function useChangePassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      changePassword(data),
    onSuccess: async () => {
      toast.success("Password changed successfully!");
      toast("Please login again to continue!");
      router.push("/auth/login");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to change password");
    },
  });
}
