import { api } from "../axios"
import {
  CreateTaskProgressSchemaType,
  UpdateTaskProgressSchemaType,
} from "@/types/schema"

export async function getAllTaskProgress(taskId: number) {
  const response = await api.get(`/task-progress/task/${taskId}`)
  return response.data?.data
}

export async function getTaskProgressById(id: number) {
  const response = await api.get(`/task-progress/${id}`)
  return response.data
}

export async function createTaskProgress(data: CreateTaskProgressSchemaType) {
  const response = await api.post("/task-progress", data)
  return response.data
}

export async function updateTaskProgress(id: number, data: UpdateTaskProgressSchemaType) {
  const response = await api.put(`/task-progress/${id}`, data)
  return response.data
}

export async function deleteTaskProgress(id: number) {
  const response = await api.delete(`/task-progress/${id}`)
  return response.data
}
