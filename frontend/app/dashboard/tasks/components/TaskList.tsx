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
import { CircleDashed, Settings, TicketPercent, View } from "lucide-react";
import { useUserProfile } from "@/lib/hooks/user.queries";
import { twMerge } from "tailwind-merge";

interface IProps {
  tasks: ITask[];
  tasksHavingOffer?: { [key: number]: number };
  handleViewTask: (id: number) => void;
}

export function TaskListTable({
  tasks,
  handleViewTask,
  tasksHavingOffer,
}: IProps) {
  const [openOfferForm, setOpenOfferForm] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [openOfferListModal, setOpenOfferListModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>(
    undefined,
  );
  const { data: user } = useUserProfile();

  const onOfferModalClose = (val: boolean) => {
    setOpenOfferModal(val);
    setSelectedTask(undefined);
  };

  const onOfferListModalClose = (val: boolean) => {
    setOpenOfferListModal(val);
    setSelectedTask(undefined);
  };

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
            tasks?.map((task) => {
              const offerStatus =
                task.offers?.length > 0 ? task.offers[0].status : null;

              return (
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
                    <Button
                      onClick={() => handleViewTask(task.id)}
                      variant="ghost"
                      title="View Task"
                    >
                      <View />
                    </Button>
                    {user?.type === "USER" ? (
                      <>
                        <Button
                          onClick={() => {
                            setOpenOfferForm(true);
                            setSelectedTask(task);
                          }}
                          variant="ghost"
                          title="Edit Task"
                        >
                          <Settings />
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedTask(task);
                            setOpenOfferListModal(true);
                          }}
                          variant="outline"
                          disabled={!tasksHavingOffer?.[task.id]}
                        >
                          <strong>{tasksHavingOffer?.[task.id] || 0}</strong>
                          {tasksHavingOffer?.[task.id] &&
                          tasksHavingOffer?.[task.id] > 1
                            ? "Offers"
                            : "Offer"}
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          if (!offerStatus) {
                            setOpenOfferModal(true);
                            setSelectedTask(task);
                          }
                        }}
                        variant="outline"
                        title={
                          offerStatus
                            ? `Offer is in ${offerStatus} status.`
                            : "Make an Offer"
                        }
                        className={twMerge(
                          offerStatus ? "cursor-not-allowed" : "cursor-pointer",
                          offerStatus === "ACCEPTED"
                            ? "bg-green-50 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : "",
                          offerStatus === "REJECTED"
                            ? "bg-red-50 text-red-800 hover:bg-red-100 hover:text-red-800"
                            : "",
                          offerStatus === "PENDING"
                            ? "bg-yellow-50 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
                            : "",
                        )}
                      >
                        {offerStatus ? (
                          <>
                            <CircleDashed /> {offerStatus}
                          </>
                        ) : (
                          <>
                            <TicketPercent /> Offer
                          </>
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <TaskFormModal task={selectedTask} open={openOfferForm} setOpen={setOpenOfferForm} />
      <TaskOfferConfirmationModal
        task={selectedTask}
        open={openOfferModal}
        onOfferModalClose={onOfferModalClose}
      />
      <TaskOfferListModal
        taskId={selectedTask?.id || -1}
        open={openOfferListModal}
        setOpenOfferListModal={onOfferListModalClose}
      />
    </div>
  );
}
