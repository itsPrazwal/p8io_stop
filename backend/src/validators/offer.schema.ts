import { z } from 'zod'

export const offerSchema = z.object({
  providerId: z.number().int().positive(),
  taskId: z.number().int().positive(),
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED'])
})

export type OfferSchemaType = z.infer<typeof offerSchema>
