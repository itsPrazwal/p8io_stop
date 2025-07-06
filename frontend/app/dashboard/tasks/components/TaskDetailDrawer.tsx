"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { XIcon } from "lucide-react"

import { useTask } from "@/lib/hooks/task.queries";

interface TaskDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId?: number;
}

export function TaskDetailsDrawer({
  open,
  onOpenChange,
  taskId,
}: TaskDetailsDrawerProps) {
  const { data, isLoading } = useTask(taskId);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-3/5 min-h-1/2 mx-auto">
        <DrawerHeader>
          <DrawerTitle>
            {isLoading
              ? "Loading Task"
              : data?.task
                ? data?.task.name
                : "Invalid"}
          </DrawerTitle>
          {!isLoading && data?.task && (
            <DrawerDescription className="capitalize text-sm text-muted-foreground">
              {data?.task.category} •{" "}
              {new Date(data?.task.expectedStart).toLocaleDateString()}
            </DrawerDescription>
          )}
            <DrawerClose
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DrawerClose>
        </DrawerHeader>
        {isLoading ? (
          <div className="p-6">Loading...</div>
        ) : data?.task ? (
          <>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-md">
                <div>
                  <span className="text-muted-foreground">Hours</span>
                  <div>{data?.task.hours}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Rate</span>
                  <div>
                    {data?.task.currency} {data?.task.hourlyRate?.toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-md text-muted-foreground">
                  Description
                </h3>
                <p className="text-md">{data?.task.description}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 text-sm text-red-500">Task not found.</div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
