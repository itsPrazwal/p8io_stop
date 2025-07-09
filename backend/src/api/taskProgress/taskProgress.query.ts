import prisma from '../../config/db.js'
import {
  CreateTaskProgressSchemaType,
  UpdateTaskProgressSchemaType
} from '../../validators/taskProgress.schema.js'
import type { TaskProgress } from '@prisma/client'

export const createTaskProgress = async (data: CreateTaskProgressSchemaType) => {
  return prisma.taskProgress.create({ data })
}

export const getTaskProgressById = async (id: number):Promise<TaskProgress | null> => {
  return prisma.taskProgress.findUnique({
    where: { id },
  })
}

export const getAllTaskProgress = async (taskId: number):Promise<TaskProgress[]> => {
  return prisma.taskProgress.findMany({
    where: {
      taskId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
}

export const updateTaskProgress = async (id: number, data: UpdateTaskProgressSchemaType) => {
  return prisma.taskProgress.update({
    where: { id },
    data
  })
}

export const deleteTaskProgress = async (id: number) => {
  return prisma.taskProgress.delete({
    where: { id }
  })
}
