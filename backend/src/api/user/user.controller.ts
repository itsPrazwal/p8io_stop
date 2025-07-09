import { Handler } from 'express'
import { UserSchemaType } from '../../validators/auth.schema.js'
import * as userQuery from './user.query.js'
import { AuthUserBody } from '../../types/general.js'
import { getSuccessObject } from '../../utils/response.js'

export const getUserProfile: Handler = async (req, res, next) => {
  try {
    const userId = req.user?.id
    if (userId) {
      const user = await userQuery.getUserById(userId)
      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }
      res.json(
        getSuccessObject<AuthUserBody>('User profile retrieved successfully', {
          id: user.id,
          email: user.email,
          type: user.type,
          isCompany: user.isCompany,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          companyName: user.companyName,
          taxNumber: user.taxNumber
        })
      )
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    next(error)
  }
}

export const updateProfile: Handler = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const input = req.body as UserSchemaType

    if (userId) {
      const user = await userQuery.getUserById(userId)
      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }
      const updatedUser = await userQuery.updateUser(userId, input)
      res.json({
        message: 'Profile updated successfully',
        user: { id: updatedUser.id, email: updatedUser.email }
      })
    }
  } catch (error) {
    next(error)
  }
}
