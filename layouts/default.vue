<!--
  Layout Simple sin dependencias del store
  Para evitar dependencias circulares durante la inicialización
-->
<template>
  <v-app class="simple-layout-app" :class="{ 'is-authenticated': isAuthenticated }">
    <!-- Header Simple -->
    <v-app-bar app color="primary" dark>
      <v-btn v-if="isAuthenticated" icon="mdi-menu" class="me-2" @click="drawer = !drawer" />
      <v-toolbar-title>
        <v-icon icon="mdi-account-group" class="me-2" />
        Sistemas SABG
      </v-toolbar-title>
      <v-spacer />

      <!-- Información del Usuario (solo visible cuando está autenticado) -->
      <div
        v-if="isAuthenticated && userDisplayInfo"
        class="d-flex align-center me-4 user-info-section"
      >
        <!-- Información en pantallas medianas y grandes -->
        <div class="d-none d-md-flex">
          <div class="d-flex flex-column mx-3">
            <!-- validacion para mostrar rol a un costado de la bienvenida -->
            <span v-if="userPermissions.length > 0" class="text-caption text-white opacity-80"
              >Bienvenido(a) Administrador</span
            >
            <span v-else="" class="text-caption text-white opacity-80">Bienvenido(a)</span>
            <span class="text-body-2 text-white font-weight-medium">{{
              userDisplayInfo.nombreCompleto
            }}</span>
          </div>
          <div v-if="userDisplayInfo.entidad" class="d-flex flex-column mx-3">
            <span class="text-caption text-white opacity-80">Ente</span>
            <span class="text-body-2 text-white font-weight-medium">{{
              userDisplayInfo.entidad
            }}</span>
          </div>
        </div>

        <!-- Información compacta en pantallas pequeñas -->
        <div class="d-flex d-md-none flex-column text-end mx-2 user-info-compact">
          <span class="text-body-2 text-white font-weight-medium">{{
            userDisplayInfo.nombreCompleto
          }}</span>
          <span v-if="userDisplayInfo.entidad" class="text-caption text-white opacity-80">{{
            userDisplayInfo.entidad
          }}</span>
        </div>
      </div>

      <v-btn v-show="isAuthenticated" color="white" icon="mdi-account" id="menu-activator"></v-btn>
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item prepend-icon="mdi-account-circle" to="/perfil">
            <v-list-item-title>Mi Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-logout" @click="handleLogout">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
      app
      location="left"
      :width="drawerWidth"
      class="compact-menu"
    >
      <v-list density="compact">
        <MenuNavigationItem
          v-for="menuItem in userMenu"
          :key="menuItem.id"
          :menu-item="menuItem"
          :depth="0"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido Principal -->
    <v-main class="simple-layout-main" :class="{ 'is-authenticated': isAuthenticated }">
      <div class="simple-layout-content">
        <slot />
      </div>
    </v-main>

    <!-- Footer Simple -->
    <v-footer app>
      <div class="w-100 text-center">
        © {{ currentYear }} Secretaría Anti corrupción y Buen Gobierno
      </div>
    </v-footer>

    <!-- Overlay Global -->
    <AppOverlay :visible="globalLoading" :message="globalLoadingMessage" persistent />
  </v-app>
</template>

<script setup>
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const router = useRouter()

const drawer = ref(false)
const globalLoading = ref(false)
const globalLoadingMessage = ref('Cargando...')

const currentYear = computed(() => new Date().getFullYear())
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userDisplayInfo = computed(() => authStore.userDisplayInfo)
const userMenu = computed(() => authStore.userMenu)
const userPermissions = computed(() => authStore.getPermissions)

// Función para calcular la profundidad máxima del menú
const getMaxDepth = (menuItems, currentDepth = 0) => {
  if (!menuItems || !Array.isArray(menuItems)) return currentDepth

  let maxDepth = currentDepth
  for (const item of menuItems) {
    if (item.hijos && item.hijos.length > 0) {
      const childDepth = getMaxDepth(item.hijos, currentDepth + 1)
      maxDepth = Math.max(maxDepth, childDepth)
    }
  }
  return maxDepth
}

// Ancho dinámico del navigation drawer basado en profundidad
const drawerWidth = computed(() => {
  const maxDepth = getMaxDepth(userMenu.value)
  // Ancho base: 280px + (profundidad * 24px por nivel)
  const baseWidth = 280
  const depthMultiplier = 24
  const calculatedWidth = baseWidth + maxDepth * depthMultiplier

  // Límites: mínimo 280px, máximo 420px
  return Math.min(Math.max(calculatedWidth, 280), 420)
})

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    drawer.value = true
  } else {
    drawer.value = false
  }
})

onMounted(async () => {
  await authStore.initialize()
  if (isAuthenticated.value) {
    drawer.value = true
  }
})

async function handleLogout() {
  try {
    globalLoading.value = true
    globalLoadingMessage.value = 'Cerrando sesión...'
    await authStore.logout()
    router.push('/')
    showLogoutSuccessToast()
  } catch (error) {
  } finally {
    globalLoading.value = false
    drawer.value = false
  }
}

function showLogoutSuccessToast() {
  Swal.fire({
    toast: true,
    position: 'top-start',
    icon: 'success',
    title: 'Sesión cerrada exitosamente',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'logout-toast',
    },
  })
}
</script>

<style scoped>
.simple-layout-app {
  background: #ffffff;
}

.simple-layout-app.is-authenticated {
  background: #d8c79d;
}

.simple-layout-main {
  background: #ffffff;
}

.simple-layout-main.is-authenticated {
  background: linear-gradient(180deg, rgba(219, 201, 156, 0.92) 0%, rgba(211, 190, 143, 0.95) 100%);
}

.simple-layout-main :deep(.v-main__wrap) {
  min-height: 100%;
  padding: 16px;
}

.simple-layout-content {
  min-height: 100%;
}

/* Estilos para la información del usuario */
.user-info-section {
  transition: all 0.3s ease;
}

.user-info-section .text-caption {
  font-size: 0.75rem !important;
  line-height: 1.2;
  letter-spacing: 0.033em;
}

.user-info-section .text-body-2 {
  font-size: 0.875rem !important;
  line-height: 1.25;
  letter-spacing: 0.025em;
}

/* Opacidad para los labels */
.opacity-80 {
  opacity: 0.8 !important;
}

/* Estilos para menú compacto */
.compact-menu {
  transition: width 0.3s ease !important;
}

.compact-menu :deep(.v-list) {
  padding: 8px 4px !important;
}

.compact-menu :deep(.v-list-item) {
  min-height: 36px !important;
  padding: 0 12px !important;
  margin: 1px 0 !important;
  border-radius: 6px !important;
}

.compact-menu :deep(.v-list-item__prepend) {
  margin-inline-end: 8px !important;
}

.compact-menu :deep(.v-list-group__items) {
  padding-left: 0 !important;
}

/* Espaciado responsivo */
@media (max-width: 960px) {
  .user-info-compact {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-info-compact .text-body-2 {
    font-size: 0.8rem !important;
  }

  .user-info-compact .text-caption {
    font-size: 0.7rem !important;
  }
}

@media (max-width: 600px) {
  .user-info-compact {
    max-width: 120px;
  }

  .user-info-compact .text-body-2 {
    font-size: 0.75rem !important;
  }

  .user-info-compact .text-caption {
    font-size: 0.65rem !important;
  }
}

/* Estilos para el toast de logout */
.logout-toast {
  background: rgba(76, 175, 80, 0.95) !important;
  border-left: 4px solid #4caf50 !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  backdrop-filter: blur(10px);
  font-family: 'Roboto', sans-serif !important;
}

.logout-toast .swal2-title {
  color: white !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.logout-toast .swal2-icon.swal2-success {
  border-color: white !important;
  color: white !important;
  width: 20px !important;
  height: 20px !important;
}

.logout-toast .swal2-icon.swal2-success .swal2-success-ring {
  border-color: white !important;
}

.logout-toast .swal2-icon.swal2-success .swal2-success-fix {
  background-color: rgba(76, 175, 80, 0.95) !important;
}

.logout-toast .swal2-timer-progress-bar {
  background: rgba(255, 255, 255, 0.5) !important;
}
</style>
