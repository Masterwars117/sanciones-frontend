<!--
  Componente recursivo para elementos de navegación
  Maneja menús de N niveles de profundidad usando clases nativas de Vuetify
-->
<template>
  <!-- Elemento con hijos (grupo expandible) -->
  <v-list-group
    v-if="menuItem.hijos && menuItem.hijos.length > 0"
    :value="menuItem.id"
    :class="depthClass"
  >
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        :prepend-icon="menuItem.icon_class"
        :title="menuItem.nombre"
        :class="depthItemClass"
        style="color: rgba(0, 0, 0, 0.87) !important; min-height: 36px !important"
        class="pa-0 ma-0"
        density="compact"
      />
    </template>

    <!-- Renderizado recursivo de los hijos -->
    <MenuNavigationItem
      v-for="hijo in menuItem.hijos"
      :key="hijo.id"
      :menu-item="hijo"
      :depth="depth + 1"
    />
  </v-list-group>

  <!-- Elemento sin hijos (enlace directo) -->
  <v-list-item
    v-else
    :to="menuItem.url || undefined"
    :prepend-icon="menuItem.icon_class"
    :title="menuItem.nombre"
    :disabled="!menuItem.url"
    :class="depthItemClass"
    style="color: rgba(0, 0, 0, 0.87) !important; min-height: 36px !important"
    class="pa-0 ma-0"
    density="compact"
  />
</template>

<script setup>
// Props del componente
const props = defineProps({
  menuItem: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
})

// Clases CSS dinámicas basadas en la profundidad
const depthClass = computed(() => {
  return `menu-depth-${props.depth}`
})

// Nueva clase para indentación que se aplica a TODOS los elementos del mismo nivel
const depthItemClass = computed(() => {
  return `menu-item-depth-${props.depth}`
})
</script>

<style scoped>
/* Forzar color negro para todos los elementos */
:deep(.v-list-item__content),
:deep(.v-list-item-title),
:deep(.v-list-group__header .v-list-item__content),
:deep(.v-list-group__header .v-list-item-title) {
  color: rgba(0, 0, 0, 0.87) !important;
  font-weight: 500 !important;
}

/* Forzar color negro para todos los iconos */
:deep(.v-list-item__prepend .v-icon),
:deep(.v-list-group__header .v-list-item__prepend .v-icon) {
  color: rgba(0, 0, 0, 0.87) !important;
}

/* Reducir spacing entre icono y texto al mínimo */
:deep(.v-list-item__prepend) {
  margin-inline-end: 4px !important;
  min-width: 20px !important;
}

/* Indentación progresiva compacta basada en profundidad */
.menu-item-depth-1 {
  padding-left: 24px !important;
}

.menu-item-depth-2 {
  padding-left: 36px !important;
}

.menu-item-depth-3 {
  padding-left: 48px !important;
}

.menu-item-depth-4 {
  padding-left: 60px !important;
}

.menu-item-depth-5 {
  padding-left: 72px !important;
}

.menu-item-depth-6 {
  padding-left: 84px !important;
}

.menu-item-depth-7 {
  padding-left: 96px !important;
}

.menu-item-depth-8 {
  padding-left: 108px !important;
}

.menu-item-depth-9 {
  padding-left: 120px !important;
}

.menu-item-depth-10 {
  padding-left: 132px !important;
}

/* Grupos con bordes para jerarquía visual */
.menu-depth-1 {
  border-left: 2px solid rgba(25, 118, 210, 0.3);
  margin-left: 8px;
}

.menu-depth-2 {
  border-left: 2px solid rgba(25, 118, 210, 0.4);
  margin-left: 16px;
}

.menu-depth-3 {
  border-left: 2px solid rgba(25, 118, 210, 0.5);
  margin-left: 24px;
}

.menu-depth-4 {
  border-left: 2px solid rgba(25, 118, 210, 0.6);
  margin-left: 32px;
}
</style>
