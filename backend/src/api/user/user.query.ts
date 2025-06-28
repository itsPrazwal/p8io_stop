import prisma from '../../config/db.js'
import type { User, UserType } from '@prisma/client'

export type CreateUserInput = {
  type: UserType
  isCompany: boolean
  firstName?: string
  lastName?: string
  companyName?: string
  taxNumber?: string
  email: string
  phone: string
  addressId?: number | null
}

export type UpdateUserInput = Partial<CreateUserInput>

export const createUser = async (data: CreateUserInput): Promise<User> => {
  return prisma.user.create({ data })
}

export const getUsers = async (): Promise<User[]> => {
  return prisma.user.findMany()
}

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } })
}

export const updateUser = async (id: number, data: UpdateUserInput): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
  })
}

export const deleteUser = async (id: number): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  })
}
