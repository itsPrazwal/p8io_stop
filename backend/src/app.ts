import cors from 'cors'
import YAML from 'yamljs'
import dotenv from 'dotenv'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

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

export default app
