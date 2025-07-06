import { api } from './axios'

export const get = async <T, P = unknown>(url: string, params?: P): Promise<T> => {
  const res = await api.get<T>(url, { params })
  return res.data
}

export const post = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const res = await api.post<T>(url, body)
  return res.data
}

export const put = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const res = await api.put<T>(url, body)
  return res.data
}

export const patch = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const res = await api.patch<T>(url, body)
  return res.data
}

export const del = async <T>(url: string): Promise<T> => {
  const res = await api.delete<T>(url)
  return res.data
}
