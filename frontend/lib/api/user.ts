import { UserProfileSchemaType } from "@/types/schema";
import { api } from "@/lib/axios";

export async function getUserProfile() {
  const response = await api.get("/user/me");
  return response.data.data;
}

export async function updateUserProfile(data: UserProfileSchemaType) {
  const response = await api.put("/user/update", data);
  return response.data;
}

