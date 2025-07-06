"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTaskById, getTasks, updateTask } from "@/lib/api/task";
import { TaskFormSchemaType } from "@/types/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useTask(id?: number) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskFormSchemaType) => createTask(data),
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/dashboard/tasks");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to create task");
    },
  });
}

export function useUpdateTask(taskId?: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskFormSchemaType) => updateTask(taskId || -1, data),
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/dashboard/tasks");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update task");
    },
  });
}
