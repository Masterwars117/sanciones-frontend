/**
 * Composables/useUser
 * Composable para manejo de información del usuario
 */

import userService from '~/services/userService'

export function useUser() {
  const authStore = useAuthStore()
  const refreshing = ref(false)

  // Estado computado del usuario
  const user = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const userFullName = computed(() => authStore.userFullName)
  const userDisplayInfo = computed(() => authStore.userDisplayInfo)
  const userMenu = computed(() => authStore.userMenu)
  const isUserActive = computed(() => authStore.isUserActive)
  const isLoading = computed(() => authStore.userInfoLoading || refreshing.value)

  // Funciones de utilidad
  const hasPermission = (permission) => {
    return authStore.hasPermission(permission)
  }

  const refreshUserInfo = async () => {
    refreshing.value = true
    try {
      await authStore.refreshUserInfo()
    } finally {
      refreshing.value = false
    }
  }

  const getPermissions = () => {
    return user.value?.permisos || []
  }

  const getUserById = () => {
    return user.value?.id || null
  }

  const getEmail = () => {
    return user.value?.email || ''
  }

  const getEntidad = () => {
    return user.value?.entidad_nombre || ''
  }

  const getGenero = () => {
    return user.value?.genero?.nombre || ''
  }

  const getTelefono = () => {
    return user.value?.telefono || ''
  }

  const getRFC = () => {
    return user.value?.rfc || ''
  }

  const getCURP = () => {
    return user.value?.curp || ''
  }

  const getFechaNacimiento = () => {
    return user.value?.fecha_nacimiento || ''
  }

  // Función para verificar si es necesario actualizar la información
  const checkAndRefreshIfNeeded = async () => {
    if (authStore.shouldRefreshUserInfo()) {
      await refreshUserInfo()
    }
  }

  return {
    // Estado
    user,
    isAuthenticated,
    userFullName,
    userDisplayInfo,
    userMenu,
    isUserActive,
    isLoading,

    // Funciones
    hasPermission,
    refreshUserInfo,
    checkAndRefreshIfNeeded,

    // Getters específicos
    getPermissions,
    getUserById,
    getEmail,
    getEntidad,
    getGenero,
    getTelefono,
    getRFC,
    getCURP,
    getFechaNacimiento,
  }
}
