import { Handler } from 'express'
import * as taskQuery from './task.query.js'
import { TaskSchemaType } from '../../validators/task.schema.js'

export const createTask: Handler = async (req, res, next) => {
  try {
    const input = req.body as TaskSchemaType
    const userId = req.user?.id as number
    const task = await taskQuery.createTask({ ...input, userId })
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
    const userType = req.user?.type

    if (userType === 'PROVIDER') {
      const tasks = await taskQuery.getAllTaskForProvider(userId)
      res.json({ tasks })
    } else {
      const tasks = await taskQuery.getTasksByUser(userId)
      res.json({ tasks })
    }
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

export const startTaskById: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const task = await taskQuery.startTaskById(id)
    if (!task) {
      next({ message: 'Task not found or already started' })
      return
    }
    res.status(200).json({ message: 'Task started successfully' })
  } catch (error) {
    next(error)
  }
}

export const getApprovedTask: Handler = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id)
    const tasks = await taskQuery.getApprovedTasksForProvider(userId)
    res.json({ tasks })
  } catch (error) {
    next(error)
  }
}

export const completeTaskById: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const task = await taskQuery.completeTaskById(id)
    if (!task) {
      next({ message: 'Task not found or already completed' })
      return
    }
    res.json({ message: 'Task completed successfully', task })
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
