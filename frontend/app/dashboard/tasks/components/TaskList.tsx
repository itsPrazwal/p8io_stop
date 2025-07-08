"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskFormModal } from "@/app/dashboard/tasks/components/TaskFormModal";
import { TaskOfferConfirmationModal } from "@/app/dashboard/tasks/components/TaskOfferConfirmationModal";
import { TaskOfferListModal } from "@/app/dashboard/tasks/components/TaskOfferListModal";

interface IProps {
  tasks: ITask[];
  handleViewTask: (id: number) => void;
}

export function TaskListTable({ tasks, handleViewTask }: IProps) {
  const [open, setOpen] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [openOfferListModal, setOpenOfferListModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>(
    undefined,
  );
  const [offerTaskId, setOfferTaskId] = useState<number>(-1);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          ) : (
            tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell className="capitalize">{task.category}</TableCell>
                <TableCell>
                  {new Date(task.expectedStart).toLocaleDateString()}
                </TableCell>
                <TableCell>{task.hours}</TableCell>
                <TableCell>
                  {task.currency} {task.hourlyRate.toFixed(2)}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => handleViewTask(task.id)}>View</Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setSelectedTask(task);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenOfferModal(true);
                      setOfferTaskId(task.id);
                    }}
                  >
                    Make Offer
                  </Button>
                  <Button
                    onClick={() => {
                      setOfferTaskId(task.id);
                      setOpenOfferListModal(true);
                    }}
                  >
                    View Offers
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TaskFormModal task={selectedTask} open={open} setOpen={setOpen} />
      <TaskOfferConfirmationModal taskId={offerTaskId} open={openOfferModal} setOpen={setOpenOfferModal} />
      <TaskOfferListModal taskId={offerTaskId} open={openOfferListModal} setOpen={setOpenOfferListModal} />
    </div>
  );
}
