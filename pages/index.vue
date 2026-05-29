<template>
  <div class="index-basic">
    <v-btn v-if="!isAuthenticated" color="primary" prepend-icon="mdi-login" @click="handleLogin">
      Iniciar Sesion
    </v-btn>

    <p v-else class="session-text">Sesion iniciada</p>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Inicio',
  requiresAuth: false,
})

const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

async function handleLogin() {
  try {
    await authStore.login()
  } catch (error) {
    console.error('Error en login:', error)
  }
}
</script>

<style scoped>
.index-basic {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.session-text {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
}
</style>
