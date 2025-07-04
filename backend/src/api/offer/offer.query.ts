import prisma from '../../config/db.js'
import type { Offer, OfferStatus } from '@prisma/client'
import { OfferSchemaType } from '../../validators/offer.schema'

export const createOffer = async (data: OfferSchemaType): Promise<Offer> => {
  return prisma.offer.create({
    data: {
      ...data,
      status: (data.status as OfferStatus) || 'PENDING'
    }
  })
}

export const getOfferById = async (id: number): Promise<Offer | null> => {
  return prisma.offer.findUnique({ where: { id } })
}

export const getOffersByTask = async (taskId: number): Promise<Offer[]> => {
  return prisma.offer.findMany({ where: { taskId } })
}

export const getOffersByProvider = async (providerId: number): Promise<Offer[]> => {
  return prisma.offer.findMany({ where: { providerId } })
}

export const updateOffer = async (id: number, data: Partial<OfferSchemaType>): Promise<Offer> => {
  return prisma.offer.update({
    where: { id },
    data: {
      ...data,
      status: data.status as OfferStatus
    }
  })
}

export const deleteOffer = async (id: number): Promise<Offer> => {
  return prisma.offer.delete({ where: { id } })
}
