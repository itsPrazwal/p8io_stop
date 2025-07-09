import express from 'express'
import * as authController from './auth.controller.js'
import { requireAuth } from '../../middlewares/authentication.js'
import { validateBody } from '../../middlewares/validator.js'
import {
  userPasswordSchema,
  UserPasswordType,
  UserSchemaType,
  userSignupSchema
} from '../../validators/auth.schema.js'

const router = express.Router()

router.post('/login', authController.login)

router.post('/signup', validateBody<UserSchemaType>(userSignupSchema), authController.signup)

router.get('/forget-password', authController.forgotPassword)

router.post('/reset-password', authController.resetPassword)

router.get('/me', requireAuth, authController.getMe)

router.put(
  '/change-password',
  validateBody<UserPasswordType>(userPasswordSchema),
  requireAuth,
  authController.changePassword
)

router.get('/logout', authController.logout)

export default router
