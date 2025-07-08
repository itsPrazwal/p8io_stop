import { z } from 'zod'

export const offerSchema = z.object({
  taskId: z.number().int().positive(),
})

export const offerStatusSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be one of PENDING, ACCEPTED, or REJECTED',
  })
})

export type OfferSchemaType = z.infer<typeof offerSchema>
export type OfferStatusSchemaType = z.infer<typeof offerStatusSchema>
