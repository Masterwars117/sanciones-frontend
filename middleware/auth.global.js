// middleware/auth.global.js

import authService from '~/services/authService'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  // 1. Título dinámico
  if (to.meta.title && import.meta.client) {
    document.title = to.meta.title
  }

  // 2. Rutas públicas
  const publicPaths = ['/', '/consulta', '/buscar']
  const isPublic =
    publicPaths.includes(to.path) ||
    to.path.startsWith('/auth/')

  if (isPublic) {
    return
  }

  // 3. Proteger todo /admin
  const isAdminRoute = to.path.startsWith('/admin')

  if (!isAdminRoute) {
    return
  }

  // 4. Verificar autenticación real
  const authStore = useAuthStore()

  try {
    await authStore.initialize()
  } catch (error) {
    console.error('Error al inicializar autenticación:', error)
  }

  // 5. Si no hay sesión válida, lanzar login institucional
  if (!authService.isAuthenticated() || !authStore.isAuthenticated) {
    if (import.meta.client) {
      try {
        await authStore.login()
        return abortNavigation()
      } catch (error) {
        console.error('No se pudo iniciar sesión:', error)
        return navigateTo('/')
      }
    }

    return navigateTo('/')
  }
})
