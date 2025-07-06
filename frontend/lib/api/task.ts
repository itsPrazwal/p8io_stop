import { api } from "../axios"
import { TaskFormSchemaType } from "@/types/schema"

// Get all tasks (for user/provider depending on auth)
export async function getTasks() {
  const response = await api.get("/task")
  return response.data
}

// Get a single task by ID
export async function getTaskById(id?: number) {
  if(!id) {
    throw new Error("Task ID is required to fetch a task")
  }
  const response = await api.get(`/task/${id}`)
  return response.data
}

// Create a new task
export async function createTask(data: TaskFormSchemaType) {
  const response = await api.post("/task", data)
  return response.data
}

// Update existing task
export async function updateTask(id: number, data: TaskFormSchemaType) {
  const response = await api.put(`/task/${id}`, data)
  return response.data
}
