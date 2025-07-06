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

export const getTasksByUser = async (userId: number): Promise<Task[]> => {
  return prisma.task.findMany({ where: { userId } })
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

export const deleteTask = async (id: number): Promise<Task> => {
  return prisma.task.delete({ where: { id } })
}
