"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOffer,
  getOfferById,
  getOfferByProviderId,
  getOfferByTaskId,
  updateOfferStatus,
} from "@/lib/api/offer";
import { OfferSchemaType } from "@/types/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IOfferUpdate } from "@/types/offer";

export function useOffers() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOfferByProviderId
  });
}

export function useOffersByTask(taskId: number) {
  return useQuery({
    queryKey: ["offers"],
    queryFn: () => getOfferByTaskId(taskId),
    enabled: !!taskId,
  });
}

export function useOffer(id?: number) {
  return useQuery({
    queryKey: ["offer", id],
    queryFn: () => getOfferById(id),
    enabled: !!id,
  });
}

export function useCreateOffer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OfferSchemaType) => createOffer(data),
    onSuccess: () => {
      toast.success("Offer created successfully!");
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      router.push("/dashboard/offers");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to create offer");
    },
  });
}

export function useUpdateOfferStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ offerId, data }: { offerId: number; data: IOfferUpdate }) =>
      updateOfferStatus(offerId || -1, data),
    onSuccess: () => {
      toast.success("Offer updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update offer");
    },
  });
}
