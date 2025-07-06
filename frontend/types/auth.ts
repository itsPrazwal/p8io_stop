import { ApiResponse } from "@/types/general";

export type LoginResponse = ApiResponse<{
  token: string;
  user: {
    id: number;
    email: string;
    type: "USER" | "PROVIDER";
  };
}>;
