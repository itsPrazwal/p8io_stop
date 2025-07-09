"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TaskForm } from "./TaskForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchemaType } from "@/types/schema";
import { useCreateTask, useUpdateTask } from "@/lib/hooks/task.queries";
import { TaskFormSchema } from "@/app/dashboard/tasks/schema/task.schema";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { ITask } from "@/types/task";

interface IProps {
  task?: ITask;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function TaskFormModal({ task, open, setOpen }: IProps) {
  const methods = useForm<TaskFormSchemaType>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "design",
      expectedStart: "",
      hours: 1,
      hourlyRate: 0,
      currency: "USD",
    },
  });

  const { reset } = methods;
  const createTask = useCreateTask();
  const updateTask = useUpdateTask(task?.id);

  const isSuccess = useMemo(() => {
    if(!task) {
      return createTask.isSuccess;
    }else{
      return updateTask.isSuccess;
    }
  }, [task, createTask, updateTask])

  const handleSubmit = (data: TaskFormSchemaType) => {
    if (!!task) {
      updateTask.mutate(data);
    } else {
      createTask.mutate(data);
    }
  };

  useEffect(() => {
    // If a task is provided, populate the form with its data
    if (task) {
      reset({
        name: task.name,
        description: task.description,
        category: task.category as "design" | "development" | "marketing",
        expectedStart: task.expectedStart
          ? new Date(task.expectedStart).toISOString().split("T")[0]
          : "",
        hours: task.hours,
        hourlyRate: task.hourlyRate,
        currency: task.currency,
      });
    }
  }, [task, reset, setOpen]);

  // Close dialog and reset form when task is created
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      reset();
    }
  }, [isSuccess, reset, setOpen]);

  // Reset form when dialog is closed manually
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{!!task ? "Update" : "Create New"} Task</DialogTitle>
          <DialogDescription>Fill in the details.</DialogDescription>
        </DialogHeader>
        <TaskForm methods={methods} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
