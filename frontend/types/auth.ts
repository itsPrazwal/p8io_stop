import { ApiResponse } from "@/types/general";
import { IUser } from "@/types/user";

export type LoginResponse = ApiResponse<{
  token: string;
  user: IUser
}>;
