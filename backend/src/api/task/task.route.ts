import express from 'express'

import * as taskController from './task.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import { taskSchema, TaskSchemaType } from '../../validators/task.schema.js'

const router = express.Router()

router.post('/', validateBody<TaskSchemaType>(taskSchema), taskController.createTask)

router.get('/:id', taskController.getTaskById)

router.get('/user/:userId', taskController.getTasksByUser)

router.put(
  '/:id',
  validateBody<Partial<TaskSchemaType>>(taskSchema.partial()),
  taskController.updateTask
)

router.delete('/:id', taskController.deleteTask)

export default router
