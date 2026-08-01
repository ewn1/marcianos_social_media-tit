import axios, { InternalAxiosRequestConfig } from 'axios'

// Estrutura para utilizar a variável de ambiente quando ela existir, caso contrário utiliza a local.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
})

// Interceptor tipado que injeta o token JWT no cabeçalho
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
