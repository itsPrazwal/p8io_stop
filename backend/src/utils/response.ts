import { ApiResponse } from '../types/general.js'

export const getSuccessObject = <T>(message: string, data: T | null): ApiResponse<T> => ({
  success: true,
  data,
  message
})

export const getErrorObject = (error: Error, message: string): ApiResponse => {
  /* eslint-disable no-console */
  console.error(error) // Log the error for debugging
  /* eslint-enable no-console */
  return {
    success: false,
    message,
    data: null
  }
}
