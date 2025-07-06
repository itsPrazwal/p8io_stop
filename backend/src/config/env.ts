import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DB_USER: z.string().nonempty({ message: 'DB_USER is required' }),
  DB_HOST: z.string().nonempty({ message: 'DB_HOST is required' }),
  DB_NAME: z.string().nonempty({ message: 'DB_NAME is required' }),
  DB_PASSWORD: z.string().nonempty({ message: 'DB_PASSWORD is required' }),
  DB_PORT: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 5432 // Default PostgresSQL port
      const port = Number(val)
      if (Number.isNaN(port) || port <= 0) {
        throw new Error('DB_PORT must be a positive number')
      }
      return port
    }),
  PORT: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 8000 // Default port for the application
      const port = Number(val)
      if (Number.isNaN(port) || port <= 0) {
        throw new Error('PORT must be a positive number')
      }
      return port
    }),
  JWT_SECRET: z.string().min(64, { message: 'JWT_SECRET must be at least 64 bit long.' }),
  FRONTEND_ORIGIN: z.string().url({ message: 'FRONTEND_ORIGIN must be a valid URL' }).optional(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  /* eslint-disable no-console */
  console.error(' Invalid environment variables:', parsedEnv.error.format())
  /* eslint-enable no-console */
  process.exit(1)
}

export const env = parsedEnv.data
