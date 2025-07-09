"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import { UserProfileSchemaType } from "@/types/schema";
import { getUserProfile, updateUserProfile } from "@/lib/api/user";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });
}

export function useUpdateProfile() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UserProfileSchemaType) => updateUserProfile(data),
    onSuccess: () => {
      router.push("/dashboard/profile");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update profile");
    },
  });
}
