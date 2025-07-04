import express from 'express'
import * as authController from './auth.controller.js'
import { requireAuth } from '../../middlewares/authentication.js'
import { validateBody } from '../../middlewares/validator.js'
import { userSchema, UserSchemaType } from '../../validators/auth.schema.js'

const router = express.Router()

router.post('/login', authController.login)

router.post('/signup', validateBody<UserSchemaType>(userSchema), authController.signup)

router.get('/forget-password', authController.forgotPassword)

router.post('/reset-password', authController.resetPassword)

router.get('/me', requireAuth, authController.getMe)

router.post('/change-password', requireAuth, authController.changePassword)

router.put(
  '/update',
  requireAuth,
  validateBody<UserSchemaType>(userSchema),
  authController.updateProfile
)

export default router
