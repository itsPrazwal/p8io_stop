"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskFormModal } from "@/app/dashboard/tasks/components/TaskFormModal";

export function TaskHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <Button onClick={() => setOpen(true)}>Create Task</Button>
      <TaskFormModal open={open} setOpen={setOpen} />
    </div>
  );
}
