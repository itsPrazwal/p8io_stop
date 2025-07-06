export interface ISkill {
  id: number
  providerId: number
  category: string
  nature: 'ONLINE' | 'ONSITE'
  experience: string
  hourlyRate: number
  createdAt: string
  modifiedAt: string
}