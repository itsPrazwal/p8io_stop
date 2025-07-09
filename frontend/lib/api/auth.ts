import { api } from "../axios"
import { UserLoginSchemaType, UserSignupSchemaType } from "@/types/schema";

export async function signupUser(data: UserSignupSchemaType) {
  const response = await api.post("/auth/signup", data)
  return response.data
}

export async function loginUser(data: UserLoginSchemaType) {
  const response = await api.post("/auth/login", data)
  return response.data
}

export async function logoutUser() {
  const response = await api.get("/auth/logout")
  return response.data
}

export async function changePassword(data: { oldPassword: string; newPassword: string }) {
  const response = await api.put("/auth/change-password", data)
  return response.data
}