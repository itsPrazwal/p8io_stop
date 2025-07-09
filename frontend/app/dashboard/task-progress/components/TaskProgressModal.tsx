import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ITask } from "@/types/task";
import { useForm } from "react-hook-form";
import { CreateTaskProgressSchemaType } from "@/types/schema";
import { useUserProfile } from "@/lib/hooks/user.queries";
import { Input } from "@/components/ui/input";
import {
  useCreateTaskProgress,
  useTaskProgresses,
} from "@/lib/hooks/taskProgress.queries";
import { useEffect, useMemo } from "react";
import { useCompleteTask, useStartTask } from "@/lib/hooks/task.queries";

interface IProps {
  task: ITask;
  open: boolean;
  onClose: (val: boolean) => void;
}

export function TaskProgressModal({ task, open, onClose }: IProps) {
  const { data: user } = useUserProfile();
  const { mutate: createTaskProgress, isSuccess: createSuccess } =
    useCreateTaskProgress();
  const { data: taskProgresses } = useTaskProgresses(task.id);
  const { mutate: startTask, isSuccess: startSuccess } = useStartTask(task.id);
  const { mutate: markTaskComplete, isSuccess: completeSuccess } =
    useCompleteTask(task.id);

  const taskInProgress = useMemo(
    () => !!task.startDate && !task.isCompleted,
    [task],
  );
  const totalHoursWorked = useMemo(() => {
    if (!taskProgresses || taskProgresses.length === 0) return 0;
    return taskProgresses.reduce(
      (total, progress) => total + progress.hoursWorked,
      0,
    );
  }, [taskProgresses]);

  const { register, handleSubmit, reset, watch } =
    useForm<CreateTaskProgressSchemaType>({
      defaultValues: {
        description: "",
        hoursWorked: 0,
        taskId: task.id,
        providerId: user.id,
      },
    });

  const description = watch("description");

  useEffect(() => {
    if (createSuccess) {
      reset({
        description: "",
        hoursWorked: 0,
        taskId: task.id,
        providerId: user.id,
      });
    }
  }, [createSuccess, reset, onClose, task.id, user.id]);

  useEffect(() => {
    if (startSuccess || completeSuccess) {
      onClose(false);
    }
  }, [startSuccess, onClose, completeSuccess]);

  const onSubmit = (data: CreateTaskProgressSchemaType) => {
    createTaskProgress(data);
  };

  const handleStartTask = () => {
    if (taskInProgress) {
      console.warn("Task is already in progress.");
      return;
    }
    if (!task.id) {
      console.error("Task ID is required to start the task");
      return;
    }
    startTask();
  };

  const handleMarkTaskComplete = () => {
    if (!task.id) {
      console.error("Task ID is required to mark the task as complete");
      return;
    }
    markTaskComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>TASK-{task.id}</DialogTitle>
          <DialogDescription>{task.name}</DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-col items-start justify-between gap-2 p-4 border-y border-gray-200 w-full rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center justify-between gap-4 w-full ">
              <div className="flex flex-col items-center w-1/2">
                <h6 className="text-gray-500 font-medium text-sm">
                  Expected Start Date
                </h6>
                <p className="text-md tracking-widest">
                  {new Date(task.expectedStart).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col  items-center w-1/2">
                <h6 className="text-gray-500 font-medium text-sm">
                  Hourly Rate
                </h6>
                <p className="text-md tracking-widest">
                  {task.currency} {task.hourlyRate}
                </p>
              </div>
              <div className="flex flex-col  items-center w-1/2">
                <h6 className="text-gray-500 font-medium text-sm">Category</h6>
                <p className="text-md tracking-widest">{task.category}</p>
              </div>
              <div className="flex flex-col  items-center w-1/2">
                <h6 className="text-gray-500 font-medium text-sm">Hours</h6>
                <p className="text-md tracking-widest">{task.hours}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h6>Description</h6>
            <p className="text-sm text-gray-600 max-h-24 overflow-y-auto overflow-x-hidden">
              {task.description}
            </p>
          </div>
          <div className="mt-8 border-t bg-white">
            {taskInProgress && (
              <>
                <h6 className="py-2 ">Add New Progress</h6>
                <form
                  className=" grid grid-cols-12 gap-4 h-24 overflow-hidden"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid gap-1 col-span-9 h-full overflow-y-auto">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief about the task..."
                      className="resize-none"
                      {...register("description", { required: true })}
                    />
                  </div>
                  <div className="col-span-3 flex flex-col items-center justify-between ">
                    <div className="grid gap-1">
                      <Label htmlFor="hours">Hours Worked</Label>
                      <Input
                        id="hours"
                        type="number"
                        placeholder="0"
                        {...register("hoursWorked", { valueAsNumber: true })}
                      />
                    </div>
                    <Button
                      disabled={!description}
                      className="w-full"
                      type="submit"
                    >
                      Add Progress
                    </Button>
                  </div>
                </form>
              </>
            )}
            {(taskInProgress || task.isCompleted) && (
              <div className="w-full flex flex-col items-start justify-between gap-2 p-4 border rounded-md mt-4">
                <h6 className="font-semibold">Progress Track</h6>
                <div className="flex items-center justify-between w-full">
                  {task.startDate && (
                    <h4 className="font-light text-xs">
                      Actual Started At:{" "}
                      <strong className="font-semibold">
                        {new Date(task.startDate).toLocaleDateString()}
                      </strong>
                    </h4>
                  )}
                  <h4 className="font-light text-xs">
                    Total Hours Worked:{" "}
                    <strong className="font-semibold">
                      {totalHoursWorked}
                    </strong>
                  </h4>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="outline"
                        disabled={!taskInProgress || task.isCompleted}
                      >
                        Mark as Complete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-1/4">
                      <DialogHeader>
                        <DialogTitle>
                          Confirm marking task as complete?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Please confirm if you
                          want to proceed.
                        </DialogDescription>
                        <Button onClick={handleMarkTaskComplete}>Confirm</Button>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="overflow-y-auto overflow-x-hidden max-h-60 w-full mt-2">
                  {taskProgresses && taskProgresses.length > 0 ? (
                    taskProgresses.map((progress, index) => (
                      <div key={index} className="p-4 border rounded-md mb-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">
                            {progress.description}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500">
                          Hours Worked: {progress.hoursWorked}
                        </p>
                        <p className="text-xs text-gray-500">
                          Logged At:{" "}
                          {new Date(progress.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      No progress records found for this task.
                    </div>
                  )}
                </div>
              </div>
            )}
            {!taskInProgress && !task.isCompleted && (
              <div className="w-full flex flex-col items-center justify-center p-4 border rounded-md mt-4 gap-4">
                <div className="text-center text-gray-500 mt-4">
                  This task is not in progress. Please start the task to log
                  progress.
                </div>
                <Button onClick={handleStartTask}>Start Task</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
