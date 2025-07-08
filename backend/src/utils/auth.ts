// utils/auth.ts
import jwt from 'jsonwebtoken'
import { AuthUserBody } from '../types/general.js'
import { env } from '../config/env.js'
import { CookieOptions } from 'express-serve-static-core'

export const generateAccessToken = (payload: AuthUserBody) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: 1000 * 60 }) // 1 minute

export const generateRefreshToken = (payload: AuthUserBody) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: 1000 * 60 * 60 * 24 }) // 1 day

const COOKIE_OPTIONS:CookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: env.NODE_ENV === 'production'
}

export const ACCESS_COOKIE_OPTIONS: CookieOptions = {
  ...COOKIE_OPTIONS,
  maxAge: 1000 * 60 // 1 minute
}

export const REFRESH_COOKIE_OPTIONS: CookieOptions = {
  ...COOKIE_OPTIONS,
  maxAge: 1000 * 60 * 60 * 24 // 1 day
}