"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Dispatch, MouseEventHandler, SetStateAction, useEffect } from "react";
import { useCreateOffer } from "@/lib/hooks/offer.queries";
import { Button } from "@/components/ui/button";

interface IProps {
  taskId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function TaskOfferConfirmationModal({ taskId, open, setOpen }: IProps) {

  const {isSuccess, mutate: createOffer, reset } = useCreateOffer()

  const handleSubmit:MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    createOffer({ taskId });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset, taskId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirm Offer Submission</DialogTitle>
          <DialogDescription>Are you sure you want to submit offer for this task ({taskId}) ?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit}>Confirm</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
