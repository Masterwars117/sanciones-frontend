/**
 * Services/User
 * Servicio para manejo de información del usuario
 */

import api from './api'

class UserService {
  constructor() {
    this.userInfoCacheKey = 'user_info_cache'
    this.cacheExpiration = 5 * 60 * 1000 // 5 minutos en milisegundos
  }

  /**
   * Obtiene la información completa del usuario desde el API
   */
  async fetchUserInfo() {
    try {
      const response = await api.get('/accounts/userinfo/')

      if (!response.data || !response.data.data) {
        throw new Error('Respuesta del servidor inválida')
      }

      const userInfo = response.data.data

      // Validar estructura de datos esperada
      this.validateUserInfo(userInfo)

      // Guardar en caché con timestamp
      const cacheData = {
        data: userInfo,
        timestamp: Date.now(),
        expires: Date.now() + this.cacheExpiration,
      }

      localStorage.setItem(this.userInfoCacheKey, JSON.stringify(cacheData))

      return userInfo
    } catch (error) {
      console.log(error)

      // Manejar diferentes tipos de errores
      if (error.type === 'NETWORK_ERROR') {
        throw new Error('Sin conexión a internet. Verifica tu conexión.')
      }

      if (error.type === 'AUTH_ERROR') {
        throw new Error('Sesión expirada. Inicia sesión nuevamente.')
      }

      if (error.response?.status === 403) {
        throw new Error('No tienes permisos para acceder a esta información.')
      }

      throw new Error('Error al obtener información del usuario. Intenta nuevamente.')
    }
  }

  /**
   * Valida que la información del usuario tenga la estructura esperada
   */
  validateUserInfo(userInfo) {
    const requiredFields = ['nombre', 'email']

    for (const field of requiredFields) {
      if (!userInfo.hasOwnProperty(field)) {
      }
    }

    // Validar estructura del menú si existe
    if (userInfo.menu && Array.isArray(userInfo.menu)) {
      userInfo.menu.forEach((menuItem, index) => {
        if (!menuItem.id || !menuItem.nombre) {
        }
      })
    }

    // Validar permisos si existen
    if (userInfo.permisos && !Array.isArray(userInfo.permisos)) {
    }
  }

  /**
   * Obtiene la información del usuario desde caché si está disponible y válida
   */
  getCachedUserInfo() {
    try {
      const cached = localStorage.getItem(this.userInfoCacheKey)

      if (!cached) {
        return null
      }

      const cacheData = JSON.parse(cached)

      // Verificar si el caché no ha expirado
      if (Date.now() > cacheData.expires) {
        localStorage.removeItem(this.userInfoCacheKey)
        return null
      }

      return cacheData.data
    } catch (error) {
      localStorage.removeItem(this.userInfoCacheKey)
      return null
    }
  }

  /**
   * Obtiene información del usuario (primero desde caché, luego desde API)
   */
  async getUserInfo(forceRefresh = false) {
    try {
      // Si no se fuerza refresh, intentar obtener desde caché
      if (!forceRefresh) {
        const cachedInfo = this.getCachedUserInfo()
        if (cachedInfo) {
          return cachedInfo
        }
      }

      // Obtener desde API
      return await this.fetchUserInfo()
    } catch (error) {
      // Como último recurso, intentar obtener desde caché aunque haya expirado
      const cachedInfo = this.getCachedUserInfo()
      if (cachedInfo) {
        return cachedInfo
      }

      throw error
    }
  }

  /**
   * Limpia el caché de información del usuario
   */
  clearUserInfoCache() {
    localStorage.removeItem(this.userInfoCacheKey)
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  getFullName(userInfo) {
    if (!userInfo) return 'Usuario'

    const { nombre, apellido_paterno, apellido_materno } = userInfo

    const parts = [nombre, apellido_paterno, apellido_materno].filter(Boolean)

    return parts.length > 0 ? parts.join(' ') : 'Usuario'
  }

  /**
   * Verifica si el usuario tiene un permiso específico
   */
  hasPermission(userInfo, permission) {
    if (!userInfo || !userInfo.permisos || !Array.isArray(userInfo.permisos)) {
      return false
    }

    return userInfo.permisos.includes(permission)
  }

  /**
   * Obtiene los permisos del usuario
   */
  getPermissions(userInfo, permission) {
    if (!userInfo || !userInfo.permisos || !Array.isArray(userInfo.permisos)) {
      return []
    }
    return userInfo.permisos
  }

  /**
   * Obtiene el menú del usuario
   */
  getUserMenu(userInfo) {
    if (!userInfo || !userInfo.menu || !Array.isArray(userInfo.menu)) {
      return []
    }

    return userInfo.menu
  }

  /**
   * Verifica si el usuario está activo
   */
  isUserActive(userInfo) {
    return userInfo && userInfo.is_active === true
  }
}

export default new UserService()
