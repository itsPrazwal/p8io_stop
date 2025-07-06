"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSkill, getSkillById, getSkills, updateSkill } from "@/lib/api/skill";
import { SkillFormSchemaType } from "@/types/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
}

export function useSkill(id?: number) {
  return useQuery({
    queryKey: ["skill", id],
    queryFn: () => getSkillById(id),
    enabled: !!id,
  });
}

export function useCreateSkill() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SkillFormSchemaType) => createSkill(data),
    onSuccess: () => {
      toast.success("Skill created successfully!");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      router.push("/dashboard/skills");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to create skill");
    },
  });
}

export function useUpdateSkill(skillId?: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SkillFormSchemaType) => updateSkill(skillId || -1, data),
    onSuccess: () => {
      toast.success("Skill updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      router.push("/dashboard/skills");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update skill");
    },
  });
}
