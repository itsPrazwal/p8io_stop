import app from './app.js'
import { env } from './config/env.js'

app.listen(app.get('port'), async () => {
  try {
    /* eslint-disable no-console */
    console.log(
      `Express Server started successfully.\n--- Environment: ${env.NODE_ENV.toUpperCase()}.`
    )
  } catch (error) {
    console.error('*** Error starting server:\n', error)
    /* eslint-enable no-console */
    process.exit(1) // Exit the process with failure
  }
})
