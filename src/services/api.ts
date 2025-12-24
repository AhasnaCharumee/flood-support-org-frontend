import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
})

// Add token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface HelpRequest {
  _id?: string
  name: string
  phone: string
  type: string
  description: string
  location: {
    lat: number
    lng: number
  }
  status?: 'pending' | 'in-progress' | 'resolved'
  createdAt?: string
  updatedAt?: string
}

export const helpApi = {
  create: (data: Omit<HelpRequest, '_id' | 'createdAt' | 'updatedAt' | 'status'>) => api.post('/help', data),
  getAll: () => api.get('/help'),
  getById: (id: string) => api.get(`/help/${id}`),
  updateStatus: (id: string, status: string) => api.patch(`/help/${id}`, { status }),
  resolve: (id: string) => api.put(`/help/${id}/resolve`),
}

export const statsApi = {
  getStats: () => api.get('/stats'),
}
