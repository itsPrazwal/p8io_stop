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