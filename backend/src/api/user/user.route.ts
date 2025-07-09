import express from 'express'

import { requireAuth } from '../../middlewares/authentication.js'
import { validateBody } from '../../middlewares/validator.js'
import { userProfileSchema, UserProfileSchemaType } from '../../validators/auth.schema.js'
import * as userController from './user.controller.js'

const router = express.Router()

router.get("/me", requireAuth, userController.getUserProfile)

router.put(
  '/update',
  requireAuth,
  validateBody<UserProfileSchemaType>(userProfileSchema),
  userController.updateProfile
)

export default router
