import { Pool } from 'pg'

import { env } from './env.js'

export const psqlPool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  ssl: env.NODE_ENV === 'production'
})

export async function testConnection() {
  try {
    const client = await psqlPool.connect()
    client.release()
    /* eslint-disable no-console */
    console.log(
      `PSQL DB connection test SUCCEED.\n--- Host: ${env.DB_HOST}\n--- Database: (${env.DB_NAME.toUpperCase()}) | PORT: ${env.DB_PORT}.`
    )
  } catch (error) {
    console.error('***PSQL DB connection test FAILED\n--- Error:')
    /* eslint-enable no-console */
    throw error
  }
}
