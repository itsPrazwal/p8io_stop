import axios from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'withCredentials': 'true',
  }
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.error || error.message || 'Unknown error'
    toast.error(error.message)

    if (status === 401) {
      // Optional: redirect to login
    }

    return Promise.reject(new Error(message))
  }
)
