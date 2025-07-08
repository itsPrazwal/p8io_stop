import { AuthUserBody } from './general.js'

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserBody
    }
  }
}
