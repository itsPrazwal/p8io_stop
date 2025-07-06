import { z } from 'zod'

export const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  experience: z.number().int().min(0, 'Experience must be non-negative'),
  nature: z.enum(['ONLINE', 'ONSITE']),
  hourlyRate: z.number().positive('Hourly rate must be greater than 0')
})

export type SkillSchemaType = z.infer<typeof skillSchema>
