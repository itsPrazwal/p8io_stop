import { ITask } from "@/types/task";
import { IUser } from "@/types/user";

export interface IOfferUpdate {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface IOffer {
  id: number;
  providerId: number;
  provider: Partial<IUser>;
  taskId: number;
  task: Partial<ITask>;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  modifiedAt: string;
}
