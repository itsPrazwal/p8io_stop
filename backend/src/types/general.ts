import { User } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

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
interface IUserCompany {
  isCompany: true
  companyName: string | null
  taxNumber: string | null
}

interface IUserIndividual {
  isCompany: false
}

interface IUserBasic {
  id: number
  type: 'USER' | 'PROVIDER'
  email: string
  phone: string
  firstName: string | null
  lastName: string | null
}

export type AuthUserBody = IUserBasic & IUserIndividual | IUserBasic & IUserCompany;

export type JwtAuthResponse = AuthUserBody & JwtPayload