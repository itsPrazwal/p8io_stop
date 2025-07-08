import prisma from '../../config/db.js'
import type { Offer, OfferStatus } from '@prisma/client'
import { OfferSchemaType } from '../../validators/offer.schema'

export const createOffer = async (
  data: OfferSchemaType & { providerId: number }
): Promise<Offer> => {
  return prisma.offer.create({
    data: {
      ...data,
      status: 'PENDING'
    }
  })
}

export const getOfferById = async (id: number): Promise<Offer | null> => {
  return prisma.offer.findUnique({ where: { id } })
}

export const getOffersByTask = async (taskId: number): Promise<Offer[]> => {
  return prisma.offer.findMany({
    where: { taskId },
    include: {
      task: { select: { name: true, category: true } },
      provider: {
        select: {
          isCompany: true,
          firstName: true,
          lastName: true,
          companyName: true,
          taxNumber: true,
          email: true,
          phone: true
        }
      }
    }
  })
}

export const getOffersByProvider = async (providerId: number): Promise<Offer[]> => {
  return prisma.offer.findMany({
    where: { providerId },
    include: {
      task: { select: { name: true, category: true } },
      provider: {
        select: {
          isCompany: true,
          firstName: true,
          lastName: true,
          companyName: true,
          taxNumber: true,
          email: true,
          phone: true
        }
      }
    }
  })
}

export const updateOfferStatus = async (id: number, status: OfferStatus): Promise<Offer> => {
  return prisma.offer.update({
    where: { id },
    data: {
      status
    }
  })
}

export const deleteOffer = async (id: number): Promise<Offer> => {
  return prisma.offer.delete({ where: { id } })
}
