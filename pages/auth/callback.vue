<!--
  Vista de Callback OAuth
  Maneja el retorno del proveedor OAuth
-->
<template>
  <div class="auth-callback-view">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="10" lg="6">
          <v-card elevation="8" class="pa-6 text-center">
            <v-icon :icon="status.icon" :color="status.color" size="64" class="mb-4" />
            <h2 class="text-h5 mb-4">{{ status.title }}</h2>
            <p class="text-body-1 text-medium-emphasis mb-4">
              {{ status.message }}
            </p>
            <v-progress-linear v-if="isProcessing" indeterminate color="primary" class="mb-4" />
            <v-btn
              v-if="status.showButton"
              :color="status.buttonColor"
              :to="status.redirectTo"
              prepend-icon="mdi-home"
            >
              {{ status.buttonText }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Autenticación',
  requiresAuth: false,
})

const router = useRouter()
const postLoginRedirectKey = 'post_login_redirect'
const isProcessing = ref(true)
const status = ref({
  icon: 'mdi-loading',
  color: 'primary',
  title: 'Procesando...',
  message: 'Validando credenciales de acceso',
  showButton: false,
  buttonText: 'Volver al Inicio',
  buttonColor: 'primary',
  redirectTo: '/',
})

function getPostLoginRedirect() {
  const fallbackRedirect = '/admin'
  const savedRedirect = sessionStorage.getItem(postLoginRedirectKey)

  sessionStorage.removeItem(postLoginRedirectKey)

  if (
    savedRedirect &&
    savedRedirect.startsWith('/') &&
    !savedRedirect.startsWith('//') &&
    !savedRedirect.startsWith('/auth/')
  ) {
    return savedRedirect
  }

  return fallbackRedirect
}

async function processAuthCallback() {
  const authStore = useAuthStore()
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const error = urlParams.get('error')

  try {
    if (error) {
      throw new Error(`Error OAuth: ${error}`)
    }

    if (!code || !state) {
      throw new Error('Parámetros de autorización faltantes')
    }

    await authStore.handleAuthCallback(code, state)
    const redirectTo = getPostLoginRedirect()

    status.value = {
      icon: 'mdi-check-circle',
      color: 'success',
      title: '¡Autenticación Exitosa!',
      message: 'Bienvenido al Sistema de Gestión RH | CFDI',
      showButton: false,
      buttonText: 'Aceptar',
      buttonColor: 'success',
      redirectTo,
    }

    setTimeout(() => {
      router.push(redirectTo)
    }, 10)
  } catch (err) {
    status.value = {
      icon: 'mdi-alert-circle',
      color: 'error',
      title: 'Error de Autenticación',
      message: err.message || 'No se pudo completar la autenticación',
      showButton: true,
      buttonText: 'Volver al Inicio',
      buttonColor: 'error',
      redirectTo: '/',
    }
  } finally {
    isProcessing.value = false
  }
}

onMounted(processAuthCallback)
</script>

<style scoped>
.auth-callback-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
}

.fill-height {
  height: 100vh;
}
</style>
