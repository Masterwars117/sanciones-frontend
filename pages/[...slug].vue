<!--
  Vista 404 - Página no encontrada
-->
<template>
  <div class="not-found-view">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" lg="6">
          <div class="text-center">
            <v-icon icon="mdi-emoticon-sad-outline" size="120" color="grey" class="mb-6" />
            <h1 class="text-h2 font-weight-bold mb-4">404</h1>
            <h2 class="text-h4 mb-4">Página no encontrada</h2>
            <p class="text-h6 text-medium-emphasis mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>

            <div class="d-flex justify-center gap-4 flex-wrap">
              <v-btn size="large" color="primary" prepend-icon="mdi-home" to="/">
                Volver al Inicio
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Página no encontrada',
  requiresAuth: false,
})
</script>

<style scoped>
.not-found-view {
  min-height: 100vh;
}

.fill-height {
  height: 100vh;
}

.gap-4 {
  gap: 1rem;
}

@media (max-width: 600px) {
  .gap-4 {
    gap: 0.5rem;
  }

  .flex-wrap {
    flex-direction: column;
    align-items: center;
  }
}
</style>
