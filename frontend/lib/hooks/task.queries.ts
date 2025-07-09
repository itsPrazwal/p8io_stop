"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  completeTask,
  createTask,
  getApprovedTasks,
  getTaskById,
  getTasks,
  getTasksHavingOffer,
  startTask,
  updateTask
} from "@/lib/api/task";
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

export function useTasksHavingOffer() {
  return useQuery({
    queryKey: ["tasks", "having-offers"],
    queryFn: getTasksHavingOffer,
  });
}

export function useApprovedTasks() {
  return useQuery({
    queryKey: ["tasks", "approved"],
    queryFn: () => getApprovedTasks(),
  });
}

export function useStartTask(taskId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => startTask(taskId!),
    onSuccess: () => {
      toast.success("Task started successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks", "approved"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to start task");
    },
  });
}

export function useCompleteTask(taskId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => completeTask(taskId!),
    onSuccess: () => {
      toast.success("Task completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks", "approved"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to complete task");
    },
  });
}