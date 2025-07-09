import { ITask } from "@/types/task";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  task: ITask;
}

export function TaskProgressItem({ task, onClick }: IProps) {
  return (
    <div
      className="flex flex-col items-start justify-between gap-2 p-4 border border-gray-200 w-full rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex items-center justify-start">
        <h4 className="text-xs font-semibold">TASK-{task.id}</h4>
      </div>
      <div className="flex items-center justify-start">
        <p className="text-lg font-light">{task.name}</p>
      </div>
      <div className="flex items-center gap-4 w-full ">
        <div className="flex flex-col items-start w-1/2">
          <h6 className="text-gray-500 font-medium text-sm">Start Date</h6>
          <p className="text-md tracking-widest">
            {new Date(task.expectedStart).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-end w-1/2">
          <h6 className="text-gray-500 font-medium text-sm">Hours</h6>
          <p className="text-md tracking-widest">{task.hours}</p>
        </div>
      </div>
    </div>
  );
}
