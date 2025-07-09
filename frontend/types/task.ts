export interface ITask {
  id: number
  userId: number
  category: string
  name: string
  description: string
  expectedStart: string
  hours: number
  hourlyRate: number
  currency: string
  isCompleted: boolean
  createdAt: string
  modifiedAt: string
  offers: {
    id?: number
    status: string
    modifiedAt: string
    createdAt: string
  }[]
}

