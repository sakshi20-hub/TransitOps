import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 8000
})

// once backend is ready, attach token here
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('transitops_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance

