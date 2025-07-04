import { AuthUser } from './general.js'

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}
