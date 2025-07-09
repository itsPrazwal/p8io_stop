import { z } from 'zod'

export const createTaskProgressSchema = z.object({
  taskId: z.number(),
  providerId: z.number(),
  description: z.string().min(1),
  hoursWorked: z.number().optional(),
})

export const updateTaskProgressSchema = z.object({
  description: z.string().min(1).optional(),
  hoursWorked: z.number().optional(),
})

export type CreateTaskProgressSchemaType = z.infer<typeof createTaskProgressSchema>
export type UpdateTaskProgressSchemaType = z.infer<typeof updateTaskProgressSchema>