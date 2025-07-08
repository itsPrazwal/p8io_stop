import { z } from 'zod'

export const offerSchema = z.object({
  taskId: z.number().int().positive(),
})