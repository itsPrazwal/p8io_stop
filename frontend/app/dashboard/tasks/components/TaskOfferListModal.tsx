"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Dispatch, MouseEventHandler, SetStateAction, useEffect } from "react";
import {
  useOffersByTask,
  useUpdateOfferStatus,
} from "@/lib/hooks/offer.queries";
import { Button } from "@/components/ui/button";
import { IOffer } from "@/types/offer";
import { twMerge } from "tailwind-merge";

interface IProps {
  taskId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function TaskOfferListModal({ taskId, open, setOpen }: IProps) {
  const { isSuccess, mutate: updateOffer } = useUpdateOfferStatus();
  const { data, isLoading, refetch, isRefetching, error } =
    useOffersByTask(taskId);

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [taskId, open, refetch]);

  const handleStatusChange =
    (
      status: "ACCEPTED" | "REJECTED",
      offerId: number,
    ): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      if (!taskId) {
        console.error("Task ID is required to create an offer");
        return;
      }
      updateOffer({ offerId, data: { status } });
    };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>List of offers</DialogTitle>
          <DialogDescription>
            Please review the offers submitted for this task. You can change the
            status of each offer as needed.
          </DialogDescription>
        </DialogHeader>
        {isLoading || isRefetching ? (
          <div>Loading...</div>
        ) : data.offers?.length && !error ? (
          <div className="space-y-4">
            {data?.offers.map((offer: IOffer) => (
              <div
                key={offer.id}
                className={twMerge(
                  "p-4 border rounded-md flex items-center h-24 overflow-hidden",
                  offer.status === "PENDING"
                    ? ""
                    : offer.status === "ACCEPTED"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200",
                )}
              >
                <h3 className="font-semibold h-full w-1/6 flex items-center justify-center">
                  ID: {offer.id}
                </h3>
                <div className="flex flex-col justify-center items-start w-4/6 px-8 capitalize border-x">
                  {offer.provider.isCompany && (
                    <strong>{offer.provider.companyName}</strong>
                  )}
                  <p>
                    {offer.provider.firstName} {offer.provider.lastName}
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-1/6 px-2">
                  {offer.status === "PENDING" ? (
                    <>
                      <Button
                        onClick={handleStatusChange("ACCEPTED", offer.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleStatusChange("REJECTED", offer.id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <div>
                      <span
                        className={`text-sm font-semibold ${offer.status === "ACCEPTED" ? "text-green-600" : "text-red-600"}`}
                      >
                        {offer.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No offers found for this task.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
