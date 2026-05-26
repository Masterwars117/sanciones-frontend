<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title" style="font-weight: bold; font-size: 40px;"> Sanciones Federales </h1>
        <p class="subtitle">Tabla: INHABILIFEDERAL</p>
      </div>

      <NuxtLink to="/admin/federal/nuevo" class="btn-primary">
        Nuevo registro federal
      </NuxtLink>
    </div>

    <div class="card">
      <div class="search-row">
        <input
          v-model="busqueda"
          type="text"
          class="input search-input"
          placeholder="Buscar por RFC, nombre, dependencia o cargo"
          @keyup.enter="cargarRegistros({ resetPage: true })"
        />
        <button class="btn-dark" @click="cargarRegistros({ resetPage: true })">
          Buscar
        </button>
      </div>

      <TablaPaginada
        :rows="registros"
        :columns="columnas"
        :row-key="getItemKey"
        :get-display-name="nombreCompleto"
        :get-sort-date="obtenerFechaOrden"
        :loading="cargando"
        loading-text="Cargando registros..."
        empty-text="No hay registros federales capturados todavía."
        :items-per-page-options="PAGE_SIZE_OPTIONS"
        :default-items-per-page="50"
        :max-page-size="MAX_PAGE_SIZE"
        default-sort="reciente"
        :storage-key="STORAGE_KEY"
        server-side
        :page="pagina"
        :total-pages="totalPaginas"
        :has-next="tieneSiguiente"
        :has-previous="tieneAnterior"
        @page-change="onPageChange"
        @view-selected="verSeleccionado"
        @edit-selected="editarSeleccionado"
        @delete-selected="eliminarSeleccionados"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import Swal from "sweetalert2"
import { sancionadosService } from "~/services/sancionadosService"
import { federalService } from "~/services/federalService"

definePageMeta({
  layout: "admin"
})

const router = useRouter()

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200]
const MAX_PAGE_SIZE = 200
const STORAGE_KEY = "federal"

const busqueda = ref("")
const registros = ref([])
const cargando = ref(false)
const pagina = ref(1)
const totalPaginas = ref(1)
const tieneSiguiente = ref(false)
const tieneAnterior = ref(false)
const itemsPorPagina = ref(50)
const sortOrden = ref("reciente")

let debounceTimer = null

function normalizarPageSize(valor) {
  const numero = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(valor)))

  if (PAGE_SIZE_OPTIONS.includes(numero)) {
    return numero
  }

  return 50
}

function normalizarSort(valor) {
  const permitidos = ["reciente", "antiguo", "nombre_asc", "nombre_desc"]
  return permitidos.includes(valor) ? valor : "reciente"
}

function cargarPageSizeGuardado() {
  if (!import.meta.client) return 50

  const guardado = localStorage.getItem(`tabla-paginada:${STORAGE_KEY}:porPagina`)
  if (!guardado) return 50

  return normalizarPageSize(guardado)
}

function cargarSortGuardado() {
  if (!import.meta.client) return "reciente"

  const guardado = localStorage.getItem(`tabla-paginada:${STORAGE_KEY}:sort`)
  if (!guardado) return "reciente"

  return normalizarSort(guardado)
}

function limpiarDebounce() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
}

function getItemKey(item) {
  return `${item.rfc}-${item.homoclave || ""}`
}

function nombreCompleto(item) {
  return [item.nombres, item.apaterno, item.amaterno]
    .filter(Boolean)
    .join(" ")
    .trim()
}

function obtenerFechaOrden(item) {
  return item?.fechares || null
}

function formatearFecha(value) {
  if (!value) return "-"
  const fecha = new Date(value)
  if (Number.isNaN(fecha.getTime())) return value

  const dia = String(fecha.getDate()).padStart(2, "0")
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  const anio = fecha.getFullYear()
  return `${dia}/${mes}/${anio}`
}

const columnas = computed(() => [
  { key: "rfc", label: "RFC base", class: "col-md" },
  { key: "homoclave", label: "Homoclave", class: "col-sm" },
  {
    key: "nombre",
    label: "Nombre",
    class: "col-lg",
    format: (row) => nombreCompleto(row) || "-"
  },
  { key: "dependencia", label: "Dependencia", class: "col-lg" },
  { key: "cargo", label: "Cargo", class: "col-lg" },
  { key: "periodo", label: "Periodo", class: "col-md" },
  {
    key: "fechares",
    label: "Fecha resolución",
    class: "col-md",
    format: (row) => formatearFecha(row.fechares)
  }
])

function mostrarError(texto) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: texto,
    confirmButtonColor: "#8e1738"
  })
}

function mostrarExito(texto) {
  Swal.fire({
    icon: "success",
    title: "Correcto",
    text: texto,
    confirmButtonColor: "#8e1738"
  })
}

async function cargarRegistros(opciones = {}) {
  limpiarDebounce()

  if (opciones.resetPage) {
    pagina.value = 1
  }

  if (typeof opciones.page === "number") {
    pagina.value = opciones.page
  }

  if (typeof opciones.pageSize === "number") {
    itemsPorPagina.value = normalizarPageSize(opciones.pageSize)
  }

  if (typeof opciones.sort === "string") {
    sortOrden.value = normalizarSort(opciones.sort)
  }

  cargando.value = true

  try {
    const res = await sancionadosService.listarFederales({
      q: busqueda.value.trim() || undefined,
      page: pagina.value,
      page_size: itemsPorPagina.value,
      sort: sortOrden.value
    })

    registros.value = res.results || []
    pagina.value = res.page ?? pagina.value
    totalPaginas.value = res.total_pages ?? 1
    tieneSiguiente.value = Boolean(res.next)
    tieneAnterior.value = Boolean(res.previous)

    if (typeof res.page_size === "number") {
      itemsPorPagina.value = normalizarPageSize(res.page_size)
    }
  } catch (e) {
    registros.value = []
    pagina.value = 1
    totalPaginas.value = 1
    tieneSiguiente.value = false
    tieneAnterior.value = false
    mostrarError("No se pudieron cargar los registros federales.")
  } finally {
    cargando.value = false
  }
}

function onPageChange(payload) {
  cargarRegistros({
    page: payload?.page,
    pageSize: payload?.pageSize,
    sort: payload?.sort
  })
}

watch(busqueda, (nuevoValor, valorAnterior) => {
  const nuevo = nuevoValor.trim()
  const anterior = (valorAnterior || "").trim()

  if (nuevo === anterior) return

  limpiarDebounce()

  debounceTimer = setTimeout(async () => {
    await cargarRegistros({ resetPage: true })
  }, 350)
})

function verSeleccionado(item) {
  if (!item) return

  router.push(`/admin/federal/ver?rfc=${encodeURIComponent(item.rfc)}`)
}

function editarSeleccionado(item) {
  if (!item) return

  router.push(`/admin/federal/editar?rfc=${encodeURIComponent(item.rfc)}`)
}

async function eliminarSeleccionados(items) {
  if (!items?.length) return

  const texto =
    items.length === 1
      ? "¿Eliminar el registro seleccionado?"
      : `¿Eliminar los ${items.length} registros seleccionados?`

  const resultado = await Swal.fire({
    title: "Confirmar eliminación",
    text: texto,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#b00020",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  })

  if (!resultado.isConfirmed) return

  try {
    for (const item of items) {
      await federalService.eliminar(item.rfc)
    }

    await cargarRegistros()

    mostrarExito(
      items.length === 1
        ? "Registro eliminado correctamente."
        : "Registros eliminados correctamente."
    )
  } catch (e) {
    mostrarError(e?.data?.error || "No se pudo eliminar uno o más registros.")
  }
}

onMounted(async () => {
  itemsPorPagina.value = cargarPageSizeGuardado()
  sortOrden.value = cargarSortGuardado()
  await cargarRegistros()
})

onBeforeUnmount(() => {
  limpiarDebounce()
})
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  gap: 16px;
}

.title {
  margin: 0;
  color: #333;
}

.subtitle {
  margin: 6px 0 0;
  color: #777;
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 18px;
}

.search-row {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.search-input {
  flex: 1;
  min-width: 0;
}

.input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  background: white;
}

.btn-primary {
  border: none;
  background: #8e1738;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
}

.btn-dark {
  border: none;
  background: #444;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
}

@media (max-width: 980px) {
  .head {
    flex-direction: column;
    align-items: stretch;
  }

  .search-row {
    flex-direction: column;
  }
}
</style>