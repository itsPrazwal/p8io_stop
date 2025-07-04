import express from 'express'

import { requireAuth } from '../middlewares/authentication.js'

import authRouter from './auth/auth.route.js'
import offerRouter from './offer/offer.route.js'
import skillRouter from './skill/skill.route.js'
import taskRouter from './task/task.route.js'

const app = express()

app.use('/auth', authRouter)
app.use('/offer', requireAuth, offerRouter)
app.use('/skill', requireAuth, skillRouter)
app.use('/task', requireAuth, taskRouter)

export default app
