import { ApiResponse } from '../types/general'

export const getSuccessObject = <T>(message: string, data: T | null): ApiResponse<T> => ({
  success: true,
  data,
  message
})

export const getErrorObject = (error: Error, message: string): ApiResponse => {
  console.error(error) // Log the error for debugging
  return {
    success: false,
    message,
    data: null
  }
}
