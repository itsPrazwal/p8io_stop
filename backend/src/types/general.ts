import { User } from '@prisma/client'

export type ApiResponse<T = unknown> = {
  success: boolean
  data: T | null
  message: string
}

export interface AuthUser {
  id: number
  email: User['email']
  type: User['type']
}
