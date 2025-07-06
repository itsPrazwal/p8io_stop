import { api } from "../axios"
import { SkillFormSchemaType } from "@/types/schema"

// Get all skills (for user/provider depending on auth)
export async function getSkills() {
  const response = await api.get("/skill")
  return response.data
}

// Get a single skill by ID
export async function getSkillById(id?: number) {
  if(!id) {
    throw new Error("Skill ID is required to fetch a skill.")
  }
  const response = await api.get(`/skill/${id}`)
  return response.data
}

// Create a new skill
export async function createSkill(data: SkillFormSchemaType) {
  const response = await api.post("/skill", data)
  return response.data
}

// Update existing skill
export async function updateSkill(id: number, data: SkillFormSchemaType) {
  const response = await api.put(`/skill/${id}`, data)
  return response.data
}
