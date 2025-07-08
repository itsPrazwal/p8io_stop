export interface AddressType {
  streetNumber: string
  streetName: string
  city: string
  state: string
  postcode: string
}

interface IUserCompany {
  isCompany: true
  companyName: string
  taxNumber: string
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

export type IUser = IUserBasic & IUserIndividual | IUserBasic & IUserCompany;

export type IUserExtended = IUser & {
  address?: AddressType
  createdAt: string
  modifiedAt: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

export interface ResetPasswordInput {
  token: string
  newPassword: string
}

export interface ForgotPasswordInput {
  email: string
}
