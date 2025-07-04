import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Handler } from 'express'

import * as userQuery from '../user/user.query.js'
import { UserSchemaType } from '../../validators/auth.schema.js'
import { env } from '../../config/env.js'
import { AuthUser } from '../../types/general.js'

export const signup: Handler = async (req, res, next) => {
  try {
    const input = req.body as UserSchemaType

    const existing = await userQuery.getUserByEmail(input.email)
    if (existing) {
      res.status(400).json({ error: 'Email already exists, please login!' })
      return
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const user = await userQuery.createUser({ ...input, password: hashedPassword })

    res.status(201).json({ message: 'Signup successful', user: { id: user.id, email: user.email } })
  } catch (error) {
    next(error)
  }
}

export const login: Handler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userQuery.getUserByEmail(email)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ id: user.id, email: user.email, type: user.type }, env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.json({ token, user: { id: user.id, email: user.email, type: user.type } })
  } catch (error) {
    next(error)
  }
}

export const getMe: Handler = async (req, res, next) => {
  try {
    const user = req.user
    res.json({ user })
  } catch (error) {
    next(error)
  }
}

export const changePassword: Handler = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { currentPassword, newPassword } = req.body

    if (userId) {
      const user = await userQuery.getUserById(userId)
      if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        res.status(401).json({ error: 'Current password is incorrect' })
        return
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10)
      const updatedUser = await userQuery.changePassword(userId, hashedNewPassword)
      res.json({
        message: 'Password changed successfully',
        user: { id: updatedUser.id, email: updatedUser.email }
      })
    }
  } catch (error) {
    next(error)
  }
}
export const forgotPassword: Handler = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await userQuery.getUserByEmail(email)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: '1h' })
    // Here you would send the token to the user's email address
    // For simplicity, we are just returning it in the response
    res.json({ message: 'Password reset link sent', token })
  } catch (error) {
    next(error)
  }
}
export const resetPassword: Handler = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser
      const user = await userQuery.getUserById(decoded.id)
      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10)
      await userQuery.changePassword(user.id, hashedNewPassword)

      res.json({ message: 'Password reset successfully' })
    } catch (error) {
      next(error)
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

export const deleteAccount: Handler = async (req, res, next) => {
  try {
    const userId = req.user?.id
    if (userId) {
      const user = await userQuery.getUserById(userId)

      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }

      await userQuery.deleteUser(userId)
      res.json({ message: 'Account deleted successfully' })
    }
  } catch (error) {
    next(error)
  }
}
