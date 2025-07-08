import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { Handler } from 'express'
import { env } from '../config/env.js'
import { AuthUserBody, JwtAuthResponse } from '../types/general.js'
import {
  ACCESS_COOKIE_OPTIONS,
  generateAccessToken,
  generateRefreshToken,
  REFRESH_COOKIE_OPTIONS
} from '../utils/auth.js'

const getUserPayload = (payload: JwtAuthResponse): AuthUserBody => ({
  id: payload.id,
  email: payload.email,
  type: payload.type,
  isCompany: payload.isCompany,
  firstName: payload.firstName,
  lastName: payload.lastName,
  phone: payload.phone,
  companyName: payload.companyName,
  taxNumber: payload.taxNumber
})

export const requireAuth: Handler = (req, res, next): void => {
  const accessToken = req.cookies?.token
  const refreshToken = req.cookies?.refreshToken

  try {
    const payload = jwt.verify(accessToken, env.JWT_SECRET) as JwtAuthResponse
    req.user = getUserPayload(payload)
    next()
  } catch (err: unknown) {
    const jwtErr = err as JsonWebTokenError

    if (jwtErr.name === 'TokenExpiredError' && refreshToken) {
      try {
        const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtAuthResponse

        const newAccessToken = generateAccessToken(payload)
        res.cookie('token', newAccessToken, ACCESS_COOKIE_OPTIONS) // 24 hours

        // Check if refresh token is close to expiring (<1 day)
        const now = Math.floor(Date.now() / 1000)

        if (payload.exp && payload.exp - now < (24 * 60 * 12)) {
          const newRefreshToken = generateRefreshToken(payload)
          res.cookie('refreshToken', newRefreshToken, REFRESH_COOKIE_OPTIONS) // 7 days
        }

        req.user = getUserPayload(payload)
        next()
      } catch (err: unknown) {
        next(err)
      }
    } else {
      next({
        message: 'Invalid access token',
        status: 403
      })
    }
  }
}
