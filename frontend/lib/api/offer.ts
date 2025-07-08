import { api } from "../axios"
import { OfferSchemaType } from "@/types/schema"
import { IOfferUpdate } from "@/types/offer";

// Get all offers for provider
export async function getOfferByProviderId() {
  const response = await api.get("/offer/provider")
  return response.data
}

// Get all offers for the task
export async function getOfferByTaskId(taskId: number) {
  const response = await api.get(`/offer/task/${taskId}`)
  return response.data
}

// Get a single offer by ID
export async function getOfferById(id?: number) {
  if(!id) {
    throw new Error("Offer ID is required to fetch a offer.")
  }
  const response = await api.get(`/offer/${id}`)
  return response.data
}

// Create a new offer
export async function createOffer(data: OfferSchemaType) {
  const response = await api.post("/offer", data)
  return response.data
}

// Update existing offer
export async function updateOfferStatus(id: number, data: IOfferUpdate) {
  const response = await api.put(`/offer/status/${id}`, data)
  return response.data
}
