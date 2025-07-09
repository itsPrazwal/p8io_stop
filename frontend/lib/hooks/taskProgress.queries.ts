"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTaskProgress,
  deleteTaskProgress,
  getAllTaskProgress,
  getTaskProgressById,
  updateTaskProgress,
} from "@/lib/api/taskProgress";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  CreateTaskProgressSchemaType,
  UpdateTaskProgressSchemaType,
} from "@/types/schema";
import { ITaskProgress } from "@/types/taskProgress";

export function useTaskProgresses(taskId?: number) {
  return useQuery({
    queryKey: ["task-progress", taskId],
    queryFn: ():Promise<ITaskProgress[]> => getAllTaskProgress(taskId!),
    enabled: !!taskId,
  })
}

export function useTaskProgress(id?: number) {
  return useQuery({
    queryKey: ["task-progress", id],
    queryFn: () => getTaskProgressById(id!),
    enabled: !!id,
  });
}

export function useCreateTaskProgress() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateTaskProgressSchemaType) =>
      createTaskProgress(data),
    onSuccess: () => {
      toast.success("Task progress created successfully!");
      queryClient.invalidateQueries({ queryKey: ["task-progress"] });
      router.push("/dashboard/task-progress");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.error || "Failed to create task progress",
      );
    },
  });
}

export function useUpdateTaskProgress(id: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateTaskProgressSchemaType) =>
      updateTaskProgress(id, data),
    onSuccess: () => {
      toast.success("Task progress updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["task-progress"] });
      router.push("/dashboard/task-progress");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.error || "Failed to update task progress",
      );
    },
  });
}

export function useDeleteTaskProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTaskProgress(id),
    onSuccess: () => {
      toast.success("Task progress deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["task-progress"] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.error || "Failed to delete task progress",
      );
    },
  });
}
