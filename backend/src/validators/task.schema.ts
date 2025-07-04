import { z } from 'zod'

export const taskSchema = z.object({
  userId: z.number().int().positive(),
  category: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  expectedStart: z.coerce.date(), // Accepts ISO strings as well
  hours: z.number().int().min(1, 'Hours must be at least 1'),
  hourlyRate: z.number().positive(),
  currency: z.enum(['AUD', 'USD', 'EUR', 'INR', 'GBP']),
  isCompleted: z.boolean()
})

export type TaskSchemaType = z.infer<typeof taskSchema>
