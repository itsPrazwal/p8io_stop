"use client"

import { TaskProgressHeader } from "@/app/dashboard/task-progress/components/TaskProgressHeader";
import { TaskProgressContainer } from "@/app/dashboard/task-progress/components/TaskProgressContainer";
import { useApprovedTasks } from "@/lib/hooks/task.queries";

export default function TaskProgressPage() {
  
  const { data} = useApprovedTasks();

  return(
    <div className="w-full mx-auto p-4">
      <TaskProgressHeader />
      <TaskProgressContainer tasks={data?.tasks || []} />
    </div>
  )
}