import express from 'express'

import * as taskController from './task.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import { taskSchema, TaskSchemaType } from '../../validators/task.schema.js'

const router = express.Router()

router.get('/', taskController.getAllTasks)

router.post('/', validateBody<TaskSchemaType>(taskSchema), taskController.createTask)

router.get('/having-offers', taskController.getTasksHavingOffer)

router.get('/approved', taskController.getApprovedTask)

router.patch('/start/:id', taskController.startTaskById)

router.patch('/complete/:id', taskController.completeTaskById)

router.get('/:id', taskController.getTaskById)

router.put(
  '/:id',
  validateBody<Partial<TaskSchemaType>>(taskSchema.partial()),
  taskController.updateTask
)

router.delete('/:id', taskController.deleteTask)


export default router
