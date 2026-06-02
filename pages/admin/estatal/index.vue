<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title" style="font-weight: bold; font-size: 40px;">Sanciones Estatales</h1>
        <p class="subtitle">Tabla: INHABILITADOS</p>
      </div>

      <div class="head-actions">
        <input
          ref="excelInput"
          type="file"
          accept=".xlsx,.xls"
          class="hidden-file"
          @change="onSeleccionarExcel"
        />

        <button
          type="button"
          class="btn-secondary"
          :disabled="subiendoExcel"
          @click="abrirSelectorExcel"
        >
          <svg
            class="excel-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
          >
            <path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"></path>
            <path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"></path>
            <path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z"></path>
            <path fill="#17472a" d="M14 24.005H29V33.055H14z"></path>
            <g>
              <path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"></path>
              <path fill="#27663f" d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"></path>
              <path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z"></path>
              <path fill="#129652" d="M29 24.005H44V33.055H29z"></path>
            </g>
            <path fill="#0c7238" d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"></path>
            <path fill="#fff" d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"></path>
          </svg>
          <span>{{ subiendoExcel ? "Cargando Excel..." : "Carga masiva Excel" }}</span>
        </button>

        <NuxtLink to="/admin/estatal/nuevo" class="btn-primary">
          Nuevo registro estatal
        </NuxtLink>
      </div>
    </div>

    <div class="card">
      <div class="search-row">
        <input
          v-model="busqueda"
          type="text"
          class="input search-input"
          placeholder="Buscar por expediente, nombre, RFC o CURP"
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
        empty-text="No hay registros estatales capturados todavía."
        :items-per-page-options="PAGE_SIZE_OPTIONS"
        :default-items-per-page="50"
        :max-page-size="MAX_PAGE_SIZE"
        default-sort="reciente"
        :storage-key="STORAGE_KEY"
        server-side
        :page="pagina"
        :total-pages="totalPaginas"
        :total-count="totalResultados"
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
import { catalogosService } from "~/services/catalogosService"
import { estatalService } from "~/services/estatalService"

definePageMeta({
  layout: "admin"
})

const router = useRouter()

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200]
const MAX_PAGE_SIZE = 200
const STORAGE_KEY = "estatal"

const busqueda = ref("")
const registros = ref([])
const dependenciasCatalogo = ref([])
const cargando = ref(false)
const pagina = ref(1)
const totalPaginas = ref(1)
const totalResultados = ref(null)
const tieneSiguiente = ref(false)
const tieneAnterior = ref(false)
const itemsPorPagina = ref(50)
const sortOrden = ref("reciente")
const excelInput = ref(null)
const subiendoExcel = ref(false)

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
  return `${item.anio}-${item.sancionid}`
}

function nombreCompleto(item) {
  return [item.nombres, item.apaterno, item.amaterno]
    .filter(Boolean)
    .join(" ")
    .trim()
}

function obtenerFechaOrden(item) {
  return item?.fechareg || null
}

function formatearFechaHora(value) {
  if (!value) return "-"
  const soloFecha = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:T00:00(?::00(?:\.0+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/)
  if (soloFecha) return `${soloFecha[3]}/${soloFecha[2]}/${soloFecha[1]}`

  const fecha = new Date(value)
  if (Number.isNaN(fecha.getTime())) return value

  const dia = String(fecha.getDate()).padStart(2, "0")
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  const anio = fecha.getFullYear()
  const horas = String(fecha.getHours()).padStart(2, "0")
  const minutos = String(fecha.getMinutes()).padStart(2, "0")
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`
}

const mapaDependencias = computed(() => {
  return Object.fromEntries(
    (dependenciasCatalogo.value || []).map((item) => [
      String(item.clave),
      item.descripcion,
    ])
  )
})

const columnas = computed(() => [
  { key: "anio", label: "Año", class: "col-sm" },
  { key: "sancionid", label: "Sanción ID", class: "col-sm" },
  { key: "expediente", label: "Expediente", class: "col-md" },
  {
    key: "nombre",
    label: "Nombre",
    class: "col-lg",
    format: (row) => nombreCompleto(row) || "-"
  },
  { key: "rfc", label: "RFC", class: "col-md" },
  { key: "curp", label: "CURP", class: "col-lg" },
  { key: "cargo", label: "Cargo", class: "col-lg" },
  {
    key: "dependencia",
    label: "Dependencia",
    class: "col-lg",
    format: (row) =>
      mapaDependencias.value[String(row.dependencia)] || row.dependencia || "-"
  },
  {
    key: "fechareg",
    label: "Fecha registro",
    class: "col-lg",
    format: (row) => formatearFechaHora(row.fechareg)
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

async function cargarCatalogoDependencias() {
  try {
    const res = await catalogosService.obtenerEstatales()
    dependenciasCatalogo.value = res.catalogos?.dependencias || []
  } catch {
    dependenciasCatalogo.value = []
  }
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
    const res = await sancionadosService.listarEstatales({
      q: busqueda.value.trim() || undefined,
      page: pagina.value,
      page_size: itemsPorPagina.value,
      sort: sortOrden.value
    })

    registros.value = res.results || []
    pagina.value = res.page ?? pagina.value
    totalPaginas.value = res.total_pages ?? 1
    totalResultados.value = res.total_count ?? res.count ?? null
    tieneSiguiente.value = Boolean(res.next)
    tieneAnterior.value = Boolean(res.previous)

    if (typeof res.page_size === "number") {
      itemsPorPagina.value = normalizarPageSize(res.page_size)
    }
  } catch (e) {
    registros.value = []
    pagina.value = 1
    totalPaginas.value = 1
    totalResultados.value = null
    tieneSiguiente.value = false
    tieneAnterior.value = false
    mostrarError("No se pudieron cargar los registros estatales.")
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

function abrirSelectorExcel() {
  excelInput.value?.click()
}

async function onSeleccionarExcel(event) {
  const file = event?.target?.files?.[0]
  if (!file) return

  subiendoExcel.value = true

  try {
    const res = await estatalService.cargarExcel(file)
    await cargarRegistros({ resetPage: true })

    mostrarExito(
      `Carga finalizada. Insertados: ${res.insertados || 0}. Duplicados: ${res.duplicados || 0}. Omitidos: ${res.omitidos || 0}.`
    )
  } catch (e) {
    mostrarError(e?.data?.error || e?.message || "No se pudo cargar el archivo Excel.")
  } finally {
    subiendoExcel.value = false
    if (event?.target) {
      event.target.value = ""
    }
  }
}

function verSeleccionado(item) {
  if (!item) return

  router.push(
    `/admin/estatal/ver?anio=${encodeURIComponent(item.anio)}&sancionid=${encodeURIComponent(item.sancionid)}`
  )
}

function editarSeleccionado(item) {
  if (!item) return

  router.push(
    `/admin/estatal/editar?anio=${encodeURIComponent(item.anio)}&sancionid=${encodeURIComponent(item.sancionid)}`
  )
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

  let huboIntento = false

  try {
    for (const item of items) {
      huboIntento = true
      await estatalService.eliminar(item.anio, item.sancionid)
    }

    await cargarRegistros()

    mostrarExito(
      items.length === 1
        ? "Registro eliminado correctamente."
        : "Registros eliminados correctamente."
    )
  } catch (e) {
    if (huboIntento) {
      await cargarRegistros()
    }

    mostrarError(e?.data?.error || "No se pudo eliminar uno o más registros.")
  }
}

onMounted(async () => {
  itemsPorPagina.value = cargarPageSizeGuardado()
  sortOrden.value = cargarSortGuardado()
  await cargarCatalogoDependencias()
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

.head-actions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
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

.hidden-file {
  display: none;
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

.btn-secondary {
  border: none;
  background: #107c41;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-secondary:hover:not(:disabled) {
  background: #0b6f3a;
}

.btn-secondary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.excel-icon {
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
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

  .head-actions {
    width: 100%;
    justify-content: stretch;
    flex-direction: column;
  }

  .search-row {
    flex-direction: column;
  }
}
</style>
