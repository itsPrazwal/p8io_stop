import prisma from '../../config/db.js'
import type { Skill, WorkNature } from '@prisma/client'
import { SkillSchemaType } from '../../validators/skill.schema'

export const createSkill = async (data: SkillSchemaType & {providerId: number}): Promise<Skill> => {
  return prisma.skill.create({
    data: {
      ...data,
      nature: data.nature as WorkNature
    }
  })
}

export const getSkillById = async (id: number): Promise<Skill | null> => {
  return prisma.skill.findUnique({ where: { id } })
}

export const getSkillsByProvider = async (providerId: number): Promise<Skill[]> => {
  return prisma.skill.findMany({ where: { providerId } })
}

export const updateSkill = async (id: number, data: Partial<SkillSchemaType>): Promise<Skill> => {
  return prisma.skill.update({
    where: { id },
    data: {
      ...data,
      nature: data.nature as WorkNature
    }
  })
}
