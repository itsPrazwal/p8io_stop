"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskFormModal } from "@/app/dashboard/tasks/components/TaskFormModal";
import { useUserProfile } from "@/lib/hooks/user.queries";

export function TaskHeader() {
  const { data: user } = useUserProfile();

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      {user?.type === "USER" ? (
        <Button onClick={() => setOpen(true)}>Create Task</Button>
      ) : (
        <a href="/dashboard/offers">
          <Button>View Offers</Button>
        </a>
      )}
      <TaskFormModal open={open} setOpen={setOpen} />
    </div>
  );
}
