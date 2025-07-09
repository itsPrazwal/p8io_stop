import { Handler } from 'express'
import * as taskQuery from './task.query.js'
import { TaskSchemaType } from '../../validators/task.schema.js'

export const createTask: Handler = async (req, res, next) => {
  try {
    const input = req.body as TaskSchemaType
    const userId = req.user?.id as number
    const task = await taskQuery.createTask({ ...input, userId,  })
    res.status(201).json({ message: 'Task created successfully', task })
  } catch (error) {
    next(error)
  }
}

export const getTaskById: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const task = await taskQuery.getTaskById(id)
    if (!task) {
      res.status(404).json({ error: 'Task not found' })
      return
    }
    res.json({ task })
  } catch (error) {
    next(error)
  }
}

export const getAllTasks: Handler = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id)
    const tasks = await taskQuery.getTasksByUser(userId)
    res.json({ tasks })
  } catch (error) {
    next(error)
  }
}

export const updateTask: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const input = req.body as Partial<TaskSchemaType>
    const task = await taskQuery.updateTask(id, input)
    res.json({ message: 'Task updated successfully', task })
  } catch (error) {
    next(error)
  }
}

export const getTasksHavingOffer: Handler = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id)
    const taskIds = await taskQuery.getTasksHavingOffer(userId)
    res.json({ taskIds })
  } catch (error) {
    next(error)
  }
}

export const deleteTask: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await taskQuery.deleteTask(id)
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
}
