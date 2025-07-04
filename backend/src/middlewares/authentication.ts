import { Handler } from 'express'
import jwt from 'jsonwebtoken'
import { AuthUser } from '../types/general'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

export const requireAuth: Handler = (req, res, next): void => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, JWT_SECRET) as AuthUser
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
