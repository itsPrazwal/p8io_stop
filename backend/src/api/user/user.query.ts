import prisma from '../../config/db.js'
import type { User } from '@prisma/client'
import { UserSchemaType } from '../../validators/auth.schema'

export const createUser = async (data: UserSchemaType): Promise<User> => {
  const { address, ...restData } = data

  let addressId: number | null = null

  if (address) {
    const createdAddress = await prisma.address.create({ data: address })
    addressId = createdAddress.id
  }

  return prisma.user.create({
    data: {
      ...restData,
      addressId: addressId
    }
  })
}

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } })
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } })
}

export const updateUser = async (
  id: number,
  data: Partial<UserSchemaType & { addressId: number | null }>
): Promise<User> => {
  const { address, ...resetData } = data

  if (address) {
    if (resetData.addressId) {
      await prisma.address.update({
        where: { id: resetData.addressId },
        data: address
      })
    } else {
      const createdAddress = await prisma.address.create({ data: address })
      resetData.addressId = createdAddress.id
    }
  }

  return prisma.user.update({
    where: { id },
    data: resetData
  })
}

export const changePassword = async (id: number, hashedPassword: string): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { password: hashedPassword }
  })
}

export const deleteUser = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw new Error(`User with id ${id} not found`)
  }
  if (user.addressId) {
    // If the user has an address, delete it
    await prisma.address.delete({
      where: { id: user.addressId }
    })
  }
  return prisma.user.delete({
    where: { id }
  })
}
