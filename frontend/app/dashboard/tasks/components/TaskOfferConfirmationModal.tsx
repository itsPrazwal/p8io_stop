"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { MouseEventHandler, useEffect } from "react";
import { useCreateOffer } from "@/lib/hooks/offer.queries";
import { Button } from "@/components/ui/button";
import { ITask } from "@/types/task";

interface IProps {
  task?: ITask;
  open: boolean;
  onOfferModalClose: (val: boolean) => void;
}

export function TaskOfferConfirmationModal({ task, open, onOfferModalClose }: IProps) {

  const {isSuccess, mutate: createOffer, reset } = useCreateOffer()

  const handleSubmit:MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if(task){
      createOffer({ taskId: task.id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onOfferModalClose(false);
    }
  }, [isSuccess, onOfferModalClose]);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset, task]);

  return (
    <Dialog open={open} onOpenChange={onOfferModalClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirm Offer Submission</DialogTitle>
          <DialogDescription>Are you sure you want to submit offer for &#34;{task?.name}&#34; ?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit}>Confirm</Button>
          <Button variant="outline" onClick={() => onOfferModalClose(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
