import { z } from 'zod'

const addressSchema = z.object({
  streetNumber: z.string().min(1, 'Street number is required'),
  streetName: z.string().min(1, 'Street name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postcode: z.string().min(1, 'Postcode is required')
})

export const userSchema = z
  .object({
    type: z.enum(['USER', 'PROVIDER']),
    isCompany: z.boolean(),
    email: z.string().email(),
    phone: z.string().min(5),
    password: z.string().min(6),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    companyName: z.string().optional().nullable(),
    taxNumber: z.string().optional().nullable(),
    address: addressSchema.optional() // 👈 Optional by default, refined below
  })
  .superRefine((data, ctx) => {
    if (data.isCompany) {
      // ✅ Company signup rules
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['companyName'],
          message: 'Company name is required for company signups'
        })
      }

      if (!data.taxNumber || !/^[A-Z0-9]{10}$/.test(data.taxNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['taxNumber'],
          message: 'Tax number must be 10 uppercase letters or digits'
        })
      }

      if (!data.firstName || !data.lastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['firstName'],
          message: 'Representative full name is required for companies'
        })
      }

      // address is optional, no issue
    } else {
      // ✅ Individual signup rules
      if (!data.firstName || !data.lastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['firstName'],
          message: 'Full name is required for individuals'
        })
      }

      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['address'],
          message: 'Address is required for individuals'
        })
      }
    }
  })

export type UserSchemaType = z.infer<typeof userSchema>
