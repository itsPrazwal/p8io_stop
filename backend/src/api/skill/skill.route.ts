import express from 'express'

import * as skillController from './skill.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import { skillSchema, SkillSchemaType } from '../../validators/skill.schema.js'

const router = express.Router()

router.get('/', skillController.getAllSkills)

router.post('/', validateBody<SkillSchemaType>(skillSchema), skillController.createSkill)

router.get('/:id', skillController.getSkillById)

router.put(
  '/:id',
  validateBody<Partial<SkillSchemaType>>(skillSchema.partial()),
  skillController.updateSkill
)

export default router
