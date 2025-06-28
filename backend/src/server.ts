import app from './app.js'
import { env } from './config/env.js'

const PORT = env.PORT

app.listen(PORT, async () => {
  try {
    /* eslint-disable no-console */
    console.log(`Express Server started successfully on port ${PORT}.\n--- Environment: ${env.NODE_ENV.toUpperCase()}.`)
  } catch (error) {
    console.error('*** Error starting server:\n', error)
    /* eslint-enable no-console */
    process.exit(1) // Exit the process with failure
  }
})
