import { TaskProgressBlock } from "@/app/dashboard/task-progress/components/TaskProgressBlock";
import { TaskProgressItem } from "@/app/dashboard/task-progress/components/TaskProgressItem";
import { ITask } from "@/types/task";
import { TaskProgressModal } from "@/app/dashboard/task-progress/components/TaskProgressModal";
import { MouseEventHandler, useState } from "react";

interface IProps {
  tasks: ITask[]
}

export function TaskProgressContainer({ tasks }: IProps) {

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const dividedTasks: {
    toDo: ITask[];
    inProgress: ITask[];
    complete: ITask[];
  } = {
    toDo: [],
    inProgress: [],
    complete: [],
  }

  if( tasks && tasks.length > 0) {
    tasks.forEach(task => {
      if (!task.startDate && !task.isCompleted) {
        dividedTasks.toDo.push(task);
      }
      if (task.startDate && !task.isCompleted) {
        dividedTasks.inProgress.push(task);
      }
      if (task.isCompleted) {
        dividedTasks.complete.push(task);
      }
    });
  }

  const handleModalClose = (val: boolean) => {
    setOpenModal(val);
    setSelectedTask(null);
  }

  const handleItemClick = (task: ITask):MouseEventHandler<HTMLDivElement> => (e) => {
    e.preventDefault();
    setSelectedTask(task);
    setOpenModal(true);
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full grid grid-cols-3 gap-4 min-h-full">
        <TaskProgressBlock title="TO DO" >
          {dividedTasks.toDo.length === 0 ? (
            <p className="text-gray-500">No tasks available</p>
          ) : (
            dividedTasks.toDo.map(task => (
              <TaskProgressItem key={task.id} task={task} onClick={handleItemClick(task)} />
            ))
          )}
        </TaskProgressBlock>
        <TaskProgressBlock title="IN PROGRESS">
          {dividedTasks.inProgress.length === 0 ? (
            <p className="text-gray-500">No tasks in progress</p>
          ) : (
            dividedTasks.inProgress.map(task => (
              <TaskProgressItem key={task.id} task={task} onClick={handleItemClick(task)} />
            ))
          )}
        </TaskProgressBlock>
        <TaskProgressBlock title="COMPLETE">
          {dividedTasks.complete.length === 0 ? (
            <p className="text-gray-500">No completed tasks</p>
          ) : (
            dividedTasks.complete.map(task => (
              <TaskProgressItem key={task.id} task={task} onClick={handleItemClick(task)} />
            ))
          )}
        </TaskProgressBlock>
      </div>
      {selectedTask && <TaskProgressModal task={selectedTask} open={openModal} onClose={handleModalClose} />}
    </div>
  );
}
