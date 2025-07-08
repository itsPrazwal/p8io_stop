import { z } from "zod"

export const TaskFormSchema = z.object({
  name: z.string().min(1, "Task Name is required"),
  description: z.string().min(50, "Description must be at least 50 characters long"),
  category: z.string().nonempty("Task Category is required"),
  expectedStart: z.string(),
  hours: z.number().min(1),
  hourlyRate: z.number().min(1),
  currency: z.string().refine((val) => ["USD", "AUD", "SGD", "INR"].includes(val), {
    message: "Currency must be one of USD, EUR, GBP"
  })
})