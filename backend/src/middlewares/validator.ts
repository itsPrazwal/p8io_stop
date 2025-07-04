import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        issues: result.error.format()
      })
    } else {
      req.body = result.data
      next()
    }
  }
