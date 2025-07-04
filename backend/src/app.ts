import cors from 'cors'
import YAML from 'yamljs'
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'

import apiRoute from './api/api.route.js'
import { env } from './config/env.js'
import { getErrorObject } from './utils/response.js'

dotenv.config()
const app = express()

// Set the port from environment variables
app.set('port', env.PORT)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/ping', (_, res) => {
  res.status(200).json({
    message: 'pong',
    timestamp: new Date().toISOString()
  })
})

// Swagger Docs
const swaggerDocument = YAML.load('./src/docs/swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API Routes
app.use('/api', apiRoute)

// 404 Handler
app.use(
  /* eslint-disable */
  (err: Error & { status: number }, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.status || 500).json(getErrorObject(err, 'Internal Server Error'))
  }
  /* eslint-enable */
)

export default app
