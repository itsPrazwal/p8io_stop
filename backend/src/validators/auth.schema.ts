import { z } from 'zod'

const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{2,4}\)?[- ]?\d{3,4}[- ]?\d{3,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const addressSchema = z.object({
  streetNumber: z.string().min(1, 'Street number is required'),
  streetName: z.string().min(1, 'Street name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postcode: z.string().min(1, 'Postcode is required')
})

export const userSignupSchema = z
  .object({
  type: z.enum(['USER', 'PROVIDER']),
  isCompany: z.boolean(),
  email: z.string().email(),
  phone: z
  .string()
  .regex(phoneRegex, 'Invalid phone number format'),
  password: z
  .string()
  .regex(
    passwordRegex,
    'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
  ),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  taxNumber: z.string().optional().nullable(),
  address: addressSchema.optional()
})
.superRefine((data, ctx) => {
  if (data.isCompany) {
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

  } else {
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

export const userProfileSchema = z
  .object({
    isCompany: z.boolean(),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    companyName: z.string().optional().nullable(),
    taxNumber: z.string().optional().nullable(),
    address: addressSchema.optional()
  })
  .superRefine((data, ctx) => {
    if (data.isCompany) {
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
    } else {
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

export const userPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .regex(
        passwordRegex,
        'New password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      ),
    oldPassword: z.string().min(1, 'Old password is required')
  })

export type UserSchemaType = z.infer<typeof userSignupSchema>
export type UserProfileSchemaType = z.infer<typeof userProfileSchema>
export type UserPasswordType = z.infer<typeof userPasswordSchema>
