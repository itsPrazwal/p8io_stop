import authRouter from './auth/auth.route.js'
import express from 'express'
const app = express()

app.use('/auth', authRouter)

export default app
