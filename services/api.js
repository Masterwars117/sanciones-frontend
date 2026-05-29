/**
 * Services/Axios
 * Configuración de cliente HTTP con interceptores
 */

import axios from 'axios'

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para agregar token de autorización
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Manejar errores de red
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: 'Error de conexión. Verifica tu conexión a internet.',
        type: 'NETWORK_ERROR',
      })
    }

    // Manejar token expirado (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const authStore = useAuthStore()

        // Intentar refrescar el token
        const newToken = await authStore.refreshToken()

        if (newToken) {
          // Reintentar la petición original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
        const authStore = useAuthStore()
        authStore.logout()

        return Promise.reject({
          ...error,
          message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
          type: 'AUTH_ERROR',
        })
      }
    }

    // Manejar otros errores HTTP
    let errorMessage = 'Ha ocurrido un error inesperado.'

    switch (error.response?.status) {
      case 403:
        errorMessage = 'No tienes permisos para realizar esta acción.'
        break
      case 404:
        errorMessage = 'El recurso solicitado no fue encontrado.'
        break
      case 500:
        errorMessage = 'Error del servidor. Intenta nuevamente más tarde.'
        break
      case 503:
        errorMessage = 'Servicio no disponible. Intenta nuevamente más tarde.'
        break
      default:
        errorMessage = error.response?.data?.message || error.message || errorMessage
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
      type: 'HTTP_ERROR',
    })
  },
)

export default api
