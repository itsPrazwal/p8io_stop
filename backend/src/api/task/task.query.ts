import prisma from '../../config/db.js'
import type { Currency, Task } from '@prisma/client'
import { TaskSchemaType } from '../../validators/task.schema'

export const createTask = async (data: TaskSchemaType & { userId: number }): Promise<Task> => {
  return prisma.task.create({
    data: {
      ...data,
      isCompleted: false,
      currency: data.currency as Currency
    }
  })
}

export const getTaskById = async (id: number): Promise<Task | null> => {
  return prisma.task.findUnique({ where: { id } })
}

export const getTasksByUser = async (userId: number): Promise<Partial<Task>[]> => {
  return prisma.task.findMany({
    where: { userId },
    select: {
      id: true,
      category: true,
      name: true,
      description: true,
      expectedStart: true,
      hours: true,
      currency: true,
      hourlyRate: true,
      offers: {
        select: {
          id: true,
          status: true,
          modifiedAt: true,
          createdAt: true
        }
      }
    }
  })
}

export const getAllTaskForProvider = async (providerId: number): Promise<Partial<Task>[]> => {
  return prisma.task.findMany({
    select: {
      id: true,
      category: true,
      name: true,
      description: true,
      expectedStart: true,
      hours: true,
      currency: true,
      hourlyRate: true,
      offers: {
        where: {
          providerId
        },
        select: {
          status: true,
          modifiedAt: true,
          createdAt: true
        },
        take: 1
      }
    }
  })
}

export const updateTask = async (id: number, data: Partial<TaskSchemaType>): Promise<Task> => {
  return prisma.task.update({
    where: { id },
    data: {
      ...data,
      currency: data.currency as Currency
    }
  })
}

export const getTasksHavingOffer = async (userId: number): Promise<{ [key: number]: number }> => {
  const data = await prisma.task.findMany({
    where: {
      userId,
      offers: {
        some: {}
      }
    },
    select: {
      id: true,
      _count: {
        select: { offers: true }
      }
    }
  })

  return data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr._count.offers }), {})
}

export const deleteTask = async (id: number): Promise<Task> => {
  return prisma.task.delete({ where: { id } })
}
