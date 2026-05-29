/**
 * Services/Auth
 * Servicio de autenticación OAuth 2.0 con PKCE
 */

import api from './api'
import userService from './userService'
import SHA256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

class AuthService {
  constructor() {
    this.clientId = import.meta.env.VITE_OAUTH_CLIENT_ID
    this.redirectUri =
      import.meta.env.VITE_OAUTH_REDIRECT_URI || `${window.location.origin}/auth/callback`
    this.authUrl = import.meta.env.VITE_OAUTH_AUTH_URL
    this.tokenUrl = import.meta.env.VITE_OAUTH_TOKEN_URL
    this.revokeUrl = import.meta.env.VITE_OAUTH_REVOKE_URL
    this.scope = import.meta.env.VITE_OAUTH_SCOPE || 'read:user'
  }

  /**
   * Genera un código aleatorio para PKCE
   */
  generateRandomString(length = 128) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let text = ''
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  /**
   * Genera el code_challenge para PKCE
   */
  async generateCodeChallenge(codeVerifier) {
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      // Usar crypto-js en modo debug para evitar problemas con HTTPS
      const hash = SHA256(codeVerifier)
      const base64 = Base64.stringify(hash)
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    } else {
      // Usar Web Crypto API en producción
      const encoder = new TextEncoder()
      const data = encoder.encode(codeVerifier)
      const digest = await window.crypto.subtle.digest('SHA-256', data)
      return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
    }
  }

  /**
   * Inicia el flujo de autorización OAuth 2.0 con PKCE
   */
  async login() {
    try {
      const codeVerifier = this.generateRandomString()
      const codeChallenge = await this.generateCodeChallenge(codeVerifier)
      const state = this.generateRandomString()

      // Guardar valores en sessionStorage para verificación posterior
      sessionStorage.setItem('code_verifier', codeVerifier)
      sessionStorage.setItem('oauth_state', state)

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        scope: this.scope,
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      })

      const authorizationUrl = `${this.authUrl}?${params.toString()}`

      // Redirigir al proveedor OAuth
      window.location.href = authorizationUrl
    } catch (error) {
      throw new Error('Error al iniciar la autenticación')
    }
  }

  /**
   * Intercambia el código de autorización por tokens
   */
  async handleAuthCallback(code, state) {
    try {
      // Verificar state para seguridad
      const savedState = sessionStorage.getItem('oauth_state')
      if (state !== savedState) {
        throw new Error('Estado inválido. Posible ataque CSRF.')
      }

      const codeVerifier = sessionStorage.getItem('code_verifier')
      if (!codeVerifier) {
        throw new Error('Code verifier no encontrado')
      }

      const tokenData = {
        grant_type: 'authorization_code',
        client_id: this.clientId,
        code: code,
        redirect_uri: this.redirectUri,
        code_verifier: codeVerifier,
      }

      const response = await api.post(this.tokenUrl, tokenData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const { access_token, refresh_token, expires_in, id_token, scope } = response.data

      // Guardar tokens incluyendo el id_token
      this.saveTokens(access_token, refresh_token, expires_in, id_token, scope)

      // Limpiar sessionStorage
      sessionStorage.removeItem('code_verifier')
      sessionStorage.removeItem('oauth_state')

      return {
        success: true,
        token: access_token,
      }
    } catch (error) {
      throw new Error('Error al procesar la autenticación')
    }
  }

  /**
   * Guarda los tokens en localStorage
   */
  saveTokens(accessToken, refreshToken, expiresIn, idToken = null, scope = null) {
    const expirationTime = Date.now() + expiresIn * 1000

    localStorage.setItem('auth_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('token_expires_at', expirationTime.toString())

    // Guardar id_token si está presente (OpenID Connect)
    if (idToken) {
      localStorage.setItem('id_token', idToken)
    }

    // Guardar scope si está presente
    if (scope) {
      localStorage.setItem('token_scope', scope)
    }
  }

  /**
   * Obtiene el token de acceso
   */
  getToken() {
    return localStorage.getItem('auth_token')
  }

  /**
   * Obtiene el ID token (JWT con información del usuario)
   */
  getIdToken() {
    return localStorage.getItem('id_token')
  }

  /**
   * Decodifica la información básica del ID token (sin verificar firma)
   */
  decodeIdToken() {
    const idToken = this.getIdToken()
    if (!idToken) return null

    try {
      // Decodificar solo el payload (segunda parte del JWT)
      const payload = idToken.split('.')[1]
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      return JSON.parse(decoded)
    } catch (error) {
      return null
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated() {
    const token = this.getToken()
    if (!token) return false

    const expiresAt = localStorage.getItem('token_expires_at')
    if (!expiresAt) return false

    return Date.now() < parseInt(expiresAt)
  }

  /**
   * Refresca el token de acceso
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible')
      }

      const tokenData = {
        grant_type: 'refresh_token',
        client_id: this.clientId,
        refresh_token: refreshToken,
      }

      const response = await api.post(this.tokenUrl, tokenData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const { access_token, refresh_token: newRefreshToken, expires_in } = response.data

      this.saveTokens(access_token, newRefreshToken || refreshToken, expires_in)

      return access_token
    } catch (error) {
      this.logout()
      throw new Error('Error al refrescar el token')
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout() {
    await this.revokeToken() // Revocar el token en el servidor

    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_expires_at')
    localStorage.removeItem('id_token')
    localStorage.removeItem('token_scope')
    localStorage.removeItem('user_info')

    // Limpiar también el caché del nuevo servicio de usuario
    this.clearUserInfoCache()
  }

  /**
   * Revoca el token de acceso en el servidor OAuth
   */
  async revokeToken() {
    const token = this.getToken()
    if (!token || !this.revokeUrl) {
      return
    }

    try {
      const payload = new URLSearchParams()
      payload.append('token', token)
      payload.append('client_id', this.clientId)

      await api.post(this.revokeUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    } catch (error) {}
  }

  /**
   * Obtiene información del usuario autenticado
   */
  async getUserInfo(forceRefresh = false) {
    try {
      return await userService.getUserInfo(forceRefresh)
    } catch (error) {
      // Como fallback, intentar usar info del id_token
      const idTokenInfo = this.decodeIdToken()
      if (idTokenInfo) {
        return {
          id: idTokenInfo.sub,
          email: idTokenInfo.email || '',
          nombre: idTokenInfo.name || '',
          source: 'id_token',
          fallback: true,
        }
      }

      throw error
    }
  }

  /**
   * Obtiene la información del usuario desde localStorage
   */
  getCachedUserInfo() {
    return userService.getCachedUserInfo()
  }

  /**
   * Limpia el caché de información del usuario
   */
  clearUserInfoCache() {
    userService.clearUserInfoCache()
  }
}

export default new AuthService()
