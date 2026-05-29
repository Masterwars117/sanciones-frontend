<!--
  Componente AppOverlay
  Overlay reutilizable con indicador de carga y mensaje opcional
-->
<template>
  <v-overlay
    :model-value="visible"
    class="app-overlay"
    :persistent="persistent"
    :scrim="scrim"
    :z-index="zIndex"
    @click:outside="handleClickOutside"
  >
    <div class="overlay-content">
      <!-- Indicador de progreso -->
      <v-progress-circular
        v-if="showProgress"
        :size="size"
        :width="width"
        :color="color"
        :indeterminate="indeterminate"
        :model-value="progress"
        class="mb-4"
      />

      <!-- Icono personalizado -->
      <v-icon v-else-if="icon" :icon="icon" :size="size" :color="color" class="mb-4" />

      <!-- Mensaje de texto -->
      <div v-if="message" class="overlay-message" :class="messageClass">
        {{ message }}
      </div>

      <!-- Slot para contenido personalizado -->
      <slot />

      <!-- Botones de acción -->
      <div v-if="$slots.actions" class="overlay-actions mt-4">
        <slot name="actions" />
      </div>
    </div>
  </v-overlay>
</template>

<script setup>
const props = defineProps({
  /**
   * Controla la visibilidad del overlay
   */
  visible: {
    type: Boolean,
    default: false,
  },

  /**
   * Mensaje a mostrar en el overlay
   */
  message: {
    type: String,
    default: '',
  },

  /**
   * Mostrar indicador de progreso circular
   */
  showProgress: {
    type: Boolean,
    default: true,
  },

  /**
   * Tamaño del indicador/icono
   */
  size: {
    type: [String, Number],
    default: 64,
  },

  /**
   * Ancho del indicador de progreso
   */
  width: {
    type: [String, Number],
    default: 4,
  },

  /**
   * Color del indicador/icono
   */
  color: {
    type: String,
    default: 'primary',
  },

  /**
   * Progreso indeterminado (animación continua)
   */
  indeterminate: {
    type: Boolean,
    default: true,
  },

  /**
   * Valor del progreso (0-100)
   */
  progress: {
    type: [String, Number],
    default: 0,
  },

  /**
   * Icono personalizado en lugar del indicador de progreso
   */
  icon: {
    type: String,
    default: null,
  },

  /**
   * El overlay no se puede cerrar haciendo clic fuera
   */
  persistent: {
    type: Boolean,
    default: true,
  },

  /**
   * Color de fondo del overlay
   */
  scrim: {
    type: [String, Boolean],
    default: true,
  },

  /**
   * Z-index del overlay
   */
  zIndex: {
    type: [String, Number],
    default: 2000,
  },

  /**
   * Clases CSS adicionales para el mensaje
   */
  messageClass: {
    type: [String, Array, Object],
    default: 'text-h6 text-center',
  },
})

const emit = defineEmits(['click:outside', 'update:visible'])

/**
 * Maneja el clic fuera del overlay
 */
function handleClickOutside() {
  if (!props.persistent) {
    emit('update:visible', false)
  }
  emit('click:outside')
}
</script>

<style scoped>
.app-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  max-width: 400px;
  margin: 16px;
}

.overlay-message {
  word-break: break-word;
  max-width: 100%;
}

.overlay-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Tema oscuro */
.v-theme--dark .overlay-content {
  background: rgba(33, 33, 33, 0.95);
  color: white;
}
</style>
