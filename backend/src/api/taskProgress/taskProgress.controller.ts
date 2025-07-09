import { Handler } from 'express'
import * as TaskProgressQuery from './taskProgress.query.js'
import { getSuccessObject } from '../../utils/response.js'

export const createTaskProgress: Handler = async (req, res, next) => {
  try {
    const taskProgress = await TaskProgressQuery.createTaskProgress(req.body)
    res.status(201).json(getSuccessObject('Task progress created successfully', taskProgress))
  } catch (error: any) {
    next(error)
  }
}

export const getTaskProgressById: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const taskProgress = await TaskProgressQuery.getTaskProgressById(id)
    res.status(200).json(getSuccessObject('Task progress get successfully', taskProgress))
  } catch (error: any) {
    next(error)
  }
}

export const getTaskProgressList: Handler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskId)
    const taskProgressList = await TaskProgressQuery.getAllTaskProgress(taskId)
    res.status(200).json(getSuccessObject('Task progress list successfully', taskProgressList))
  } catch (error: any) {
    next(error)
  }
}

export const updateTaskProgress: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const taskProgress = await TaskProgressQuery.updateTaskProgress(id, req.body)
    res.status(200).json(getSuccessObject('Task progress updated successfully', taskProgress))
  } catch (error: any) {
    next(error)
  }
}

export const deleteTaskProgress: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await TaskProgressQuery.deleteTaskProgress(id)
    res.status(204).end()
  } catch (error: any) {
    next(error)
  }
}
