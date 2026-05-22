<template>
  <div>
    <div v-if="showTopActions" class="controls-row">
      <div class="left-controls">
        <button
          class="action-top action-view"
          :disabled="selectedRows.length !== 1"
          :title="selectedRows.length !== 1 ? 'Selecciona 1 registro para ver' : ''"
          @click="$emit('view-selected', selectedRows[0])"
        >
          Ver
        </button>

        <button
          class="action-top action-edit"
          :disabled="selectedRows.length !== 1"
          :title="selectedRows.length !== 1 ? 'Selecciona 1 registro para editar' : ''"
          @click="$emit('edit-selected', selectedRows[0])"
        >
          Editar
        </button>

        <button
          class="action-top action-delete"
          :disabled="selectedRows.length === 0"
          :title="selectedRows.length === 0 ? 'Selecciona al menos 1 registro para eliminar' : ''"
          @click="$emit('delete-selected', selectedRows)"
        >
          Eliminar
        </button>

        <button
          class="action-top action-clear"
          :disabled="selectedRows.length === 0"
          @click="limpiarSeleccion"
        >
          Limpiar selección
        </button>
      </div>

      <div class="right-controls">
        <div class="filter-item">
          <label>Ordenar por</label>
          <select v-model="orden" class="input select-small">
            <option value="reciente">Más reciente</option>
            <option value="antiguo">Más antiguo</option>
            <option value="nombre_asc">Nombre A-Z</option>
            <option value="nombre_desc">Nombre Z-A</option>
          </select>
        </div>

        <div class="filter-item">
          <label>Items por página</label>
          <select v-model.number="porPagina" class="input select-small">
            <option
              v-for="opcion in itemsPerPageOptions"
              :key="opcion"
              :value="opcion"
            >
              {{ opcion }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="meta">
      <span>{{ textoTotalResultados }}</span>
      <span v-if="showSelectionCount">Seleccionados: {{ selectedRows.length }}</span>
    </div>

    <div v-if="loading" class="empty">
      <div class="mini-spinner"></div>
      <span>{{ loadingText }}</span>
    </div>

    <div v-else-if="filasOrdenadas.length === 0" class="empty">
      {{ emptyText }}
    </div>

    <template v-else>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th v-if="showSelection" class="col-check">
                <input
                  ref="headerCheckbox"
                  type="checkbox"
                  :checked="todosSeleccionadosEnPagina"
                  @change="toggleSeleccionPaginaActual"
                />
              </th>

              <th
                v-for="columna in columns"
                :key="columna.key"
                :class="columna.class || ''"
              >
                {{ columna.label }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="fila in filasPaginadas"
              :key="getKey(fila)"
              :class="{ selectedRow: estaSeleccionado(fila) }"
            >
              <td v-if="showSelection">
                <input
                  type="checkbox"
                  :checked="estaSeleccionado(fila)"
                  @change="toggleSeleccion(fila)"
                />
              </td>

              <td
                v-for="columna in columns"
                :key="`${getKey(fila)}-${columna.key}`"
                :class="columna.class || ''"
              >
                <slot
                  :name="`cell-${columna.key}`"
                  :row="fila"
                  :value="fila[columna.key]"
                >
                  {{ formatearValor(columna, fila) }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <div class="footer-left">
          <span class="footer-label">Items por página:</span>
          <select v-model.number="porPagina" class="footer-select">
            <option
              v-for="opcion in itemsPerPageOptions"
              :key="`footer-${opcion}`"
              :value="opcion"
            >
              {{ opcion }}
            </option>
          </select>
        </div>

        <div class="footer-center">
          <span>{{ textoRango }}</span>
          <span class="page-info">Página {{ paginaVisible }} de {{ totalPaginas }}</span>
        </div>

        <div class="footer-right">
          <button
            class="pager-btn"
            :disabled="!puedeIrAtras"
            @click="irPrimera"
            title="Primera página"
          >
            «
          </button>

          <button
            class="pager-btn"
            :disabled="!puedeIrAtras"
            @click="irAnterior"
            title="Página anterior"
          >
            ‹
          </button>

          <div v-if="mostrarSaltoPagina" class="jump-box">
            <span class="jump-label">Ir a</span>
            <input
              v-model="paginaDestino"
              type="number"
              min="1"
              :max="totalPaginas"
              class="jump-input"
              @keyup.enter="irAPagina"
            />
            <button class="jump-btn" @click="irAPagina">
              OK
            </button>
          </div>

          <button
            class="pager-btn"
            :disabled="!puedeIrAdelante"
            @click="irSiguiente"
            title="Página siguiente"
          >
            ›
          </button>

          <button
            class="pager-btn"
            :disabled="!puedeIrAdelante"
            @click="irUltima"
            title="Última página"
          >
            »
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue"

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  rowKey: {
    type: Function,
    required: true
  },
  getDisplayName: {
    type: Function,
    default: null
  },
  getSortDate: {
    type: Function,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: "Cargando registros..."
  },
  emptyText: {
    type: String,
    default: "No hay registros."
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [10, 25, 50, 100, 200]
  },
  defaultItemsPerPage: {
    type: Number,
    default: 50
  },
  maxPageSize: {
    type: Number,
    default: 200
  },
  defaultSort: {
    type: String,
    default: "reciente"
  },
  showSelection: {
    type: Boolean,
    default: true
  },
  showTopActions: {
    type: Boolean,
    default: true
  },
  showSelectionCount: {
    type: Boolean,
    default: true
  },
  storageKey: {
    type: String,
    default: ""
  },
  serverSide: {
    type: Boolean,
    default: false
  },
  page: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  hasNext: {
    type: Boolean,
    default: false
  },
  hasPrevious: {
    type: Boolean,
    default: false
  },
  totalCount: {
    type: Number,
    default: null
  }
})

const emit = defineEmits([
  "view-selected",
  "edit-selected",
  "delete-selected",
  "selection-change",
  "page-change"
])

const paginaActual = ref(1)
const porPagina = ref(props.defaultItemsPerPage)
const orden = ref(props.defaultSort)
const selectedIds = ref([])
const paginaDestino = ref("")
const headerCheckbox = ref(null)

const storagePrefix = computed(() => {
  return props.storageKey ? `tabla-paginada:${props.storageKey}` : ""
})

function getKey(row) {
  return props.rowKey(row)
}

function limpiarSeleccion() {
  selectedIds.value = []
}

function obtenerNombre(row) {
  if (!props.getDisplayName) return ""
  return (props.getDisplayName(row) || "").toString().trim()
}

function obtenerTiempoFecha(row) {
  if (!props.getSortDate) return 0
  const raw = props.getSortDate(row)
  if (!raw) return 0

  const fecha = new Date(raw)
  const tiempo = fecha.getTime()
  return Number.isNaN(tiempo) ? 0 : tiempo
}

function normalizarTexto(value) {
  return (value || "").toString().trim().toLowerCase()
}

function formatearValor(columna, fila) {
  if (typeof columna.format === "function") {
    return columna.format(fila)
  }

  const valor = fila[columna.key]
  return valor ?? "-"
}

function normalizarPorPagina(valor) {
  const numero = Math.min(props.maxPageSize, Math.max(1, Number(valor)))

  if (props.itemsPerPageOptions.includes(numero)) {
    return numero
  }

  return props.defaultItemsPerPage
}

function cargarPreferencias() {
  if (!import.meta.client || !storagePrefix.value) return

  const ordenGuardado = localStorage.getItem(`${storagePrefix.value}:orden`)
  const porPaginaGuardado = localStorage.getItem(`${storagePrefix.value}:porPagina`)

  if (ordenGuardado) {
    orden.value = ordenGuardado
  }

  if (porPaginaGuardado) {
    porPagina.value = normalizarPorPagina(porPaginaGuardado)
  }
}

function guardarPreferencias() {
  if (!import.meta.client || !storagePrefix.value) return

  localStorage.setItem(`${storagePrefix.value}:orden`, orden.value)
  localStorage.setItem(`${storagePrefix.value}:porPagina`, String(normalizarPorPagina(porPagina.value)))
}

const filasOrdenadas = computed(() => {
  if (props.serverSide) {
    return props.rows
  }

  const lista = [...props.rows]

  if (orden.value === "nombre_asc") {
    return lista.sort((a, b) =>
      normalizarTexto(obtenerNombre(a)).localeCompare(normalizarTexto(obtenerNombre(b)), "es")
    )
  }

  if (orden.value === "nombre_desc") {
    return lista.sort((a, b) =>
      normalizarTexto(obtenerNombre(b)).localeCompare(normalizarTexto(obtenerNombre(a)), "es")
    )
  }

  if (orden.value === "antiguo") {
    return lista.sort((a, b) => obtenerTiempoFecha(a) - obtenerTiempoFecha(b))
  }

  return lista.sort((a, b) => obtenerTiempoFecha(b) - obtenerTiempoFecha(a))
})

const paginaVisible = computed(() => {
  return props.serverSide ? props.page : paginaActual.value
})

const totalPaginas = computed(() => {
  if (props.serverSide) {
    return props.totalPages > 0 ? props.totalPages : 1
  }

  const total = filasOrdenadas.value.length
  return total > 0 ? Math.ceil(total / porPagina.value) : 1
})

const inicioPagina = computed(() => {
  return (paginaVisible.value - 1) * porPagina.value
})

const finPagina = computed(() => {
  return inicioPagina.value + porPagina.value
})

const filasPaginadas = computed(() => {
  if (props.serverSide) {
    return filasOrdenadas.value
  }

  return filasOrdenadas.value.slice(inicioPagina.value, finPagina.value)
})

const totalResultados = computed(() => {
  if (props.serverSide && props.totalCount != null) {
    return props.totalCount
  }

  return filasOrdenadas.value.length
})

const textoTotalResultados = computed(() => {
  if (props.serverSide && props.totalCount == null) {
    return `Resultados en esta página: ${filasPaginadas.value.length}`
  }

  return `Total resultados: ${totalResultados.value}`
})

const textoRango = computed(() => {
  if (props.serverSide) {
    const count = filasPaginadas.value.length
    if (count === 0) return "0 registros"

    return `${count} registro${count === 1 ? "" : "s"} en esta página`
  }

  const total = totalResultados.value
  if (total === 0) return "0-0 de 0"

  const inicio = inicioPagina.value + 1
  const fin = Math.min(finPagina.value, total)

  return `${inicio}-${fin} de ${total}`
})

const puedeIrAtras = computed(() => {
  return props.serverSide ? props.hasPrevious : paginaVisible.value > 1
})

const puedeIrAdelante = computed(() => {
  return props.serverSide ? props.hasNext : paginaVisible.value < totalPaginas.value
})

const idsPaginaActual = computed(() => {
  return filasPaginadas.value.map((fila) => getKey(fila))
})

const todosSeleccionadosEnPagina = computed(() => {
  if (idsPaginaActual.value.length === 0) return false
  return idsPaginaActual.value.every((id) => selectedIds.value.includes(id))
})

const algunosSeleccionadosEnPagina = computed(() => {
  if (idsPaginaActual.value.length === 0) return false
  const seleccionados = idsPaginaActual.value.filter((id) => selectedIds.value.includes(id)).length
  return seleccionados > 0 && seleccionados < idsPaginaActual.value.length
})

const mostrarSaltoPagina = computed(() => totalPaginas.value > 1)

const selectedRows = computed(() => {
  return props.rows.filter((row) => selectedIds.value.includes(getKey(row)))
})

watch(selectedRows, (rows) => {
  emit("selection-change", rows)
})

function emitPageChange(page) {
  emit("page-change", {
    page,
    pageSize: porPagina.value,
    sort: orden.value
  })
}

function cambiarPagina(page) {
  paginaDestino.value = ""

  if (props.serverSide) {
    if (page < 1 || page > totalPaginas.value || page === paginaVisible.value) return
    emitPageChange(page)
    return
  }

  paginaActual.value = page
}

watch(
  () => props.rows,
  () => {
    selectedIds.value = []
    paginaDestino.value = ""

    if (!props.serverSide) {
      paginaActual.value = 1
    }
  }
)

watch(porPagina, (nuevoValor) => {
  const normalizado = normalizarPorPagina(nuevoValor)

  if (normalizado !== nuevoValor) {
    porPagina.value = normalizado
    return
  }

  paginaDestino.value = ""
  limpiarSeleccion()
  guardarPreferencias()

  if (props.serverSide) {
    emitPageChange(1)
    return
  }

  paginaActual.value = 1
})

watch(orden, () => {
  paginaDestino.value = ""
  limpiarSeleccion()
  guardarPreferencias()

  if (props.serverSide) {
    emitPageChange(1)
    return
  }

  paginaActual.value = 1
})

watch(filasOrdenadas, () => {
  if (props.serverSide) return

  if (paginaActual.value > totalPaginas.value) {
    paginaActual.value = totalPaginas.value
  }
})

watch(
  [todosSeleccionadosEnPagina, algunosSeleccionadosEnPagina],
  async () => {
    await nextTick()
    if (headerCheckbox.value) {
      headerCheckbox.value.indeterminate = algunosSeleccionadosEnPagina.value
    }
  },
  { immediate: true }
)

function estaSeleccionado(row) {
  return selectedIds.value.includes(getKey(row))
}

function toggleSeleccion(row) {
  const id = getKey(row)

  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((x) => x !== id)
    return
  }

  selectedIds.value = [...selectedIds.value, id]
}

function toggleSeleccionPaginaActual() {
  const ids = idsPaginaActual.value

  if (todosSeleccionadosEnPagina.value) {
    selectedIds.value = selectedIds.value.filter((id) => !ids.includes(id))
    return
  }

  const nuevos = [...selectedIds.value]
  ids.forEach((id) => {
    if (!nuevos.includes(id)) nuevos.push(id)
  })
  selectedIds.value = nuevos
}

function irPrimera() {
  cambiarPagina(1)
}

function irAnterior() {
  if (!puedeIrAtras.value) return
  cambiarPagina(paginaVisible.value - 1)
}

function irSiguiente() {
  if (!puedeIrAdelante.value) return
  cambiarPagina(paginaVisible.value + 1)
}

function irUltima() {
  cambiarPagina(totalPaginas.value)
}

function irAPagina() {
  const pagina = Number(paginaDestino.value)

  if (!pagina || Number.isNaN(pagina)) return

  if (pagina < 1) {
    cambiarPagina(1)
    return
  }

  if (pagina > totalPaginas.value) {
    cambiarPagina(totalPaginas.value)
    return
  }

  cambiarPagina(pagina)
}

onMounted(() => {
  cargarPreferencias()
})
</script>

<style scoped>
.controls-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.left-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.right-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 160px;
}

.filter-item label {
  font-size: 13px;
  color: #555;
  font-weight: 600;
}

.meta {
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  background: white;
}

.select-small {
  min-width: 150px;
}

.action-top {
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.15s ease;
}

.action-top:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.action-view {
  background: #eef3f8;
  color: #2d5f8b;
  border-color: #cddceb;
}

.action-view:hover:not(:disabled) {
  background: #dfeaf5;
}

.action-edit {
  background: #f5e9ee;
  color: #8e1738;
  border-color: #e0bcc9;
}

.action-edit:hover:not(:disabled) {
  background: #edd8e1;
}

.action-delete {
  background: #fbefef;
  color: #b00020;
  border-color: #efc4cc;
}

.action-delete:hover:not(:disabled) {
  background: #f6dde1;
}

.action-clear {
  background: #f5f5f5;
  color: #444;
  border-color: #dddddd;
}

.action-clear:hover:not(:disabled) {
  background: #ececec;
}

.empty {
  padding: 42px 20px;
  text-align: center;
  color: #777;
  border: 1px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.mini-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-top-color: #8e1738;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.table {
  width: 100%;
  min-width: 1280px;
  border-collapse: collapse;
  background: white;
}

.table th,
.table td {
  border-bottom: 1px solid #e5e5e5;
  padding: 12px 10px;
  text-align: left;
  vertical-align: top;
}

.table th {
  background: #f4f4f4;
  color: #333;
  font-weight: 700;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table tbody tr:hover {
  background: #faf7f8;
}

.selectedRow {
  background: #fdf4f7 !important;
}

.col-check {
  min-width: 50px;
  width: 50px;
}

.col-sm {
  min-width: 90px;
}

.col-md {
  min-width: 150px;
}

.col-lg {
  min-width: 220px;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.footer-left,
.footer-center,
.footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-center {
  flex-direction: column;
  gap: 4px;
}

.page-info {
  color: #777;
  font-size: 13px;
}

.footer-label {
  color: #555;
  font-size: 14px;
}

.footer-select {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 10px;
  background: white;
}

.pager-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  background: white;
  color: #444;
  cursor: pointer;
  font-size: 18px;
}

.pager-btn:hover:not(:disabled) {
  background: #f5f5f5;
}

.pager-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.jump-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 6px;
}

.jump-label {
  color: #555;
  font-size: 14px;
}

.jump-input {
  width: 64px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 10px;
  background: white;
  text-align: center;
}

.jump-btn {
  border: none;
  background: #444;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
}

.jump-btn:hover {
  background: #333;
}

@media (max-width: 980px) {
  .controls-row {
    flex-direction: column;
    align-items: stretch;
  }

  .left-controls,
  .right-controls {
    width: 100%;
  }

  .filter-item {
    flex: 1 1 180px;
  }

  .table-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>