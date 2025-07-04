import { AuthUser } from './general'

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}
