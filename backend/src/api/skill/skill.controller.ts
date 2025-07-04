import { Handler } from 'express'
import * as skillQuery from './skill.query.js'
import { SkillSchemaType } from '../../validators/skill.schema.js'

export const createSkill: Handler = async (req, res, next) => {
  try {
    const input = req.body as SkillSchemaType
    const skill = await skillQuery.createSkill(input)
    res.status(201).json({ message: 'Skill created successfully', skill })
  } catch (error) {
    next(error)
  }
}

export const getSkillById: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const skill = await skillQuery.getSkillById(id)
    if (!skill) {
      res.status(404).json({ error: 'Skill not found' })
      return
    }
    res.json({ skill })
  } catch (error) {
    next(error)
  }
}

export const getSkillsByProvider: Handler = async (req, res, next) => {
  try {
    const providerId = Number(req.params.providerId)
    const skills = await skillQuery.getSkillsByProvider(providerId)
    res.json({ skills })
  } catch (error) {
    next(error)
  }
}

export const updateSkill: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const input = req.body as Partial<SkillSchemaType>
    const skill = await skillQuery.updateSkill(id, input)
    res.json({ message: 'Skill updated successfully', skill })
  } catch (error) {
    next(error)
  }
}

export const deleteSkill: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await skillQuery.deleteSkill(id)
    res.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    next(error)
  }
}
