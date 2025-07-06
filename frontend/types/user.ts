export type AddressType = {
  streetNumber: string
  streetName: string
  city: string
  state: string
  postcode: string
}

export type UserType = {
  type: 'USER' | 'PROVIDER'
  isCompany: boolean
  email: string
  phone: string
  password: string
  firstName: string | null
  lastName: string | null
  companyName?: string | null
  taxNumber?: string | null
  address?: AddressType
}

export type UserResponseType = {
  id: number
  email: string
  type: 'USER' | 'PROVIDER'
  isCompany: boolean
  phone: string
  firstName: string | null
  lastName: string | null
  companyName?: string | null
  taxNumber?: string | null
  address?: AddressType
  createdAt: string
  modifiedAt: string
}

export type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
}

export type ResetPasswordInput = {
  token: string
  newPassword: string
}

export type ForgotPasswordInput = {
  email: string
}
