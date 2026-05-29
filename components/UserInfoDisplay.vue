<!-- 
Componente de ejemplo para mostrar información del usuario
Este componente demuestra cómo usar la nueva funcionalidad de usuario
-->

<template>
  <v-card class="user-info-card">
    <v-card-title class="d-flex align-center">
      <v-icon class="me-2">mdi-account-circle</v-icon>
      Información del Usuario
      <v-spacer></v-spacer>
      <v-btn
        v-if="false"
        icon
        size="small"
        :loading="isLoading"
        @click="refreshUserInfo"
        title="Actualizar información"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text v-if="isAuthenticated">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-4">
        <v-progress-circular indeterminate></v-progress-circular>
        <p class="mt-2">Cargando información del usuario...</p>
      </div>

      <!-- User Information -->
      <div v-else-if="userDisplayInfo">
        <v-row>
          <v-col cols="12" md="6">
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title>Nombre Completo</v-list-item-title>
                <v-list-item-subtitle>{{ userDisplayInfo.nombreCompleto }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ userDisplayInfo.email }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Entidad</v-list-item-title>
                <v-list-item-subtitle>{{
                  userDisplayInfo.entidad || 'No especificado'
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Teléfono</v-list-item-title>
                <v-list-item-subtitle>{{
                  userDisplayInfo.telefono || 'No especificado'
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title>RFC</v-list-item-title>
                <v-list-item-subtitle>{{
                  userDisplayInfo.rfc || 'No especificado'
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>CURP</v-list-item-title>
                <v-list-item-subtitle>{{
                  userDisplayInfo.curp || 'No especificado'
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Género</v-list-item-title>
                <v-list-item-subtitle>{{
                  userDisplayInfo.genero || 'No especificado'
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Estado</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip :color="userDisplayInfo.isActive ? 'success' : 'error'" size="small">
                    {{ userDisplayInfo.isActive ? 'Activo' : 'Inactivo' }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <!-- Permisos -->
        <v-divider v-if="false" class="my-4"></v-divider>
        <div v-if="false">
          <h4 class="mb-2">Permisos ({{ getPermissions().length }})</h4>
          <div v-if="getPermissions().length > 0">
            <v-chip
              v-for="permiso in getPermissions()"
              :key="permiso"
              class="me-1 mb-1"
              size="small"
              variant="outlined"
            >
              {{ permiso }}
            </v-chip>
          </div>
          <p v-else class="text-grey">No hay permisos asignados</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-4">
        <v-icon size="48" color="error">mdi-alert-circle</v-icon>
        <p class="mt-2">No se pudo cargar la información del usuario</p>
        <v-btn @click="refreshUserInfo" variant="outlined" color="primary"> Reintentar </v-btn>
      </div>
    </v-card-text>

    <v-card-text v-else class="text-center">
      <v-icon size="48" color="grey">mdi-account-off</v-icon>
      <p class="mt-2">Usuario no autenticado</p>
    </v-card-text>
  </v-card>
</template>

<script setup>
const { isAuthenticated, userDisplayInfo, isLoading, refreshUserInfo, getPermissions } = useUser()
</script>

<style scoped>
.user-info-card {
  max-width: 800px;
  margin: 0 auto;
}

pre {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 11px;
}
</style>
