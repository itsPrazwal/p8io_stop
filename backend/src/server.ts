import app from './app.js'
import { env } from './config/env.js'
import { testConnection } from './config/db.js'

const PORT = env.PORT

app.listen(PORT, async () => {
  try {
    await testConnection()
    /* eslint-disable no-console */
    console.log(`Express Server running on: http://localhost:${PORT}`)
  } catch (error) {
    console.error('*** Error starting server:\n', error)
    /* eslint-enable no-console */
    process.exit(1) // Exit the process with failure
  }
})
