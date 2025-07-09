"use client";

import { useTasks, useTasksHavingOffer } from "@/lib/hooks/task.queries";
import { TaskListTable } from "@/app/dashboard/tasks/components/TaskList";
import { TaskHeader } from "@/app/dashboard/tasks/components/TaskHeader";
import { useState } from "react";
import { TaskDetailsDrawer } from "@/app/dashboard/tasks/components/TaskDetailDrawer";

export default function TaskPage() {
  const { data } = useTasks();
  const { data: { taskIds = [] } = {} } = useTasksHavingOffer();

  const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(
    undefined,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewTask = (id: number) => {
    setSelectedTaskId(id);
    setDrawerOpen(true);
  };

  return (
    <div className="w-full mx-auto p-4">
      <TaskHeader />
      <TaskListTable
        tasks={data?.tasks || []}
        handleViewTask={handleViewTask}
        tasksHavingOffer={taskIds}
      />
      <TaskDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        taskId={selectedTaskId}
      />
    </div>
  );
}
