import express from 'express'
import * as TaskProgressController from './taskProgress.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import {
  createTaskProgressSchema,
  CreateTaskProgressSchemaType,
  updateTaskProgressSchema,
  UpdateTaskProgressSchemaType
} from '../../validators/taskProgress.schema.js'

const router = express.Router()

router.post(
  '/',
  validateBody<CreateTaskProgressSchemaType>(createTaskProgressSchema),
  TaskProgressController.createTaskProgress
)

router.get('/task/:taskId', TaskProgressController.getTaskProgressList)

router.get('/:id', TaskProgressController.getTaskProgressById)

router.put(
  '/:id',
  validateBody<UpdateTaskProgressSchemaType>(updateTaskProgressSchema),
  TaskProgressController.updateTaskProgress
)

router.delete('/:id', TaskProgressController.deleteTaskProgress)

export default router
