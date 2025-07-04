import express from 'express'

import * as skillController from './skill.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import { skillSchema, SkillSchemaType } from '../../validators/skill.schema.js'

const router = express.Router()

router.post('/', validateBody<SkillSchemaType>(skillSchema), skillController.createSkill)

router.get('/:id', skillController.getSkillById)

router.get('/provider/:providerId', skillController.getSkillsByProvider)

router.put(
  '/:id',
  validateBody<Partial<SkillSchemaType>>(skillSchema.partial()),
  skillController.updateSkill
)

router.delete('/:id', skillController.deleteSkill)

export default router
