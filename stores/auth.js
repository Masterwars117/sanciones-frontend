/**
 * Stores/Auth
 * Store de Pinia para manejo de estado de autenticación
 */

import authService from '~/services/authService'
import userService from '~/services/userService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
    userInfoLoading: false,
    lastUserInfoUpdate: null,
  }),

  getters: {
    /**
     * Obtiene el nombre completo del usuario
     */
    userFullName: (state) => {
      if (!state.user) return 'Usuario'
      return userService.getFullName(state.user)
    },

    /**
     * Verifica si el usuario tiene un permiso específico
     */
    hasPermission: (state) => {
      return (permission) => {
        return userService.hasPermission(state.user, permission)
      }
    },

    /**
     * Obtiene los permisos del usuario
     */
    getPermissions: (state) => {
      return userService.getPermissions(state.user)
    },

    /**
     * Obtiene el menú del usuario
     */
    userMenu: (state) => {
      return userService.getUserMenu(state.user)
    },

    /**
     * Verifica si el usuario está activo
     */
    isUserActive: (state) => {
      return userService.isUserActive(state.user)
    },

    /**
     * Obtiene información básica del usuario para mostrar en UI
     */
    userDisplayInfo: (state) => {
      if (!state.user) return null

      return {
        nombre: state.user.nombre || '',
        apellidoPaterno: state.user.apellido_paterno || '',
        apellidoMaterno: state.user.apellido_materno || '',
        email: state.user.email || '',
        nombreCompleto: userService.getFullName(state.user),
        entidad: state.user.entidad_nombre || '',
        genero: state.user.genero?.nombre || '',
        telefono: state.user.telefono || '',
        rfc: state.user.rfc || '',
        curp: state.user.curp || '',
        fechaNacimiento: state.user.fecha_nacimiento || '',
        isActive: state.user.is_active || false,
      }
    },
  },

  actions: {
    /**
     * Inicializa el store verificando si hay una sesión activa
     */
    async initialize() {
      this.isLoading = true
      try {
        if (authService.isAuthenticated()) {
          this.token = authService.getToken()
          this.isAuthenticated = true

          // Intentar obtener información del usuario desde caché primero
          const cachedUser = authService.getCachedUserInfo()
          if (cachedUser) {
            this.user = cachedUser
            this.lastUserInfoUpdate = Date.now()
          }

          // Luego intentar obtener información actualizada en segundo plano
          this.fetchUserInfo(false) // No mostrar loading para esta actualización
        }
      } catch (error) {
        this.logout()
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Inicia el proceso de login
     */
    async login() {
      this.isLoading = true
      this.error = null

      try {
        await authService.login()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Maneja el callback de OAuth
     */
    async handleAuthCallback(code, state) {
      this.isLoading = true
      this.error = null

      try {
        const result = await authService.handleAuthCallback(code, state)

        if (result.success) {
          this.token = result.token
          this.isAuthenticated = true

          // Obtener información del usuario inmediatamente después del login
          await this.fetchUserInfo(true) // Mostrar loading para esta primera carga
        }

        return result
      } catch (error) {
        this.error = error.message
        this.logout()
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Obtiene información del usuario
     */
    async fetchUserInfo(showLoading = true, forceRefresh = false) {
      if (showLoading) {
        this.userInfoLoading = true
      }

      try {
        const userInfo = await authService.getUserInfo(forceRefresh)

        if (userInfo) {
          this.user = userInfo
          this.lastUserInfoUpdate = Date.now()
        }

        return userInfo
      } catch (error) {
        // Mostrar error específico al usuario
        this.error = error.message || 'Error al obtener información del usuario'

        // Si es error de autenticación, cerrar sesión
        if (error.type === 'AUTH_ERROR') {
          this.logout()
        }

        // No lanzar error aquí para permitir que la app funcione
        // sin información completa del usuario
      } finally {
        if (showLoading) {
          this.userInfoLoading = false
        }
      }
    },

    /**
     * Refresca la información del usuario
     */
    async refreshUserInfo() {
      return await this.fetchUserInfo(true, true)
    },

    /**
     * Refresca el token de acceso
     */
    async refreshToken() {
      try {
        const newToken = await authService.refreshToken()
        this.token = newToken
        return newToken
      } catch (error) {
        this.logout()
        throw error
      }
    },

    /**
     * Cierra la sesión del usuario
     */
    async logout() {
      this.isLoading = true
      this.error = null
      try {
        await authService.logout()
        this.isAuthenticated = false
        this.user = null
        this.token = null
      } catch (error) {
        this.error = 'Ocurrió un error al cerrar la sesión.'
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Limpia errores del store
     */
    clearError() {
      this.error = null
    },

    /**
     * Verifica si necesita actualizar la información del usuario
     */
    shouldRefreshUserInfo() {
      if (!this.lastUserInfoUpdate) return true

      const fiveMinutes = 5 * 60 * 1000
      return Date.now() - this.lastUserInfoUpdate > fiveMinutes
    },
  },
})
