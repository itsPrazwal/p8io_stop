"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOffer } from "@/types/offer";

interface IProps {
  offers: IOffer[];
}

export function OfferListTable({ offers }: IProps) {

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No offers found.
              </TableCell>
            </TableRow>
          ) : (
            offers?.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.id}</TableCell>
                <TableCell className="capitalize">{offer.task.name}</TableCell>
                <TableCell className="capitalize">{offer.task.category}</TableCell>
                <TableCell className="capitalize">{offer.status}</TableCell>
                <TableCell>
                  {new Date(offer.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(offer.modifiedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
