import jwt from 'jsonwebtoken'
import { Handler } from 'express'

import { env } from '../config/env.js'
import { AuthUser } from '../types/general.js'

export const requireAuth: Handler = (req, res, next): void => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Token not provided' })
    return
  }
  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as AuthUser
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
