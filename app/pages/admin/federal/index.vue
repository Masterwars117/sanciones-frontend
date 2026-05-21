<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Sanciones Federales</h1>
        <p class="subtitle">Tabla: INHABILIFEDERAL</p>
      </div>

      <div class="head-actions">
        <label class="btn-upload">
          Cargar Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            class="hidden-file"
            @change="subirExcel"
          />
        </label>

        <NuxtLink to="/admin/federal/nuevo" class="btn-primary">
          Nuevo registro federal
        </NuxtLink>
      </div>
    </div>

    <div class="card">
      <div class="search-row">
        <input
          v-model="busqueda"
          type="text"
          class="input search-input"
          placeholder="Buscar por nombre, RFC, dependencia o cargo"
          @keyup.enter="cargarRegistros"
        />
        <button class="btn-dark" @click="cargarRegistros">Buscar</button>
      </div>

      <div v-if="subiendo" class="info-box">
        Cargando archivo Excel...
      </div>

      <div v-if="mensajeCarga" class="ok-box">
        {{ mensajeCarga }}
      </div>

      <div v-if="error" class="error-box">
        {{ error }}
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
  :items-per-page-options="[10, 25, 50, 100]"
  :default-items-per-page="50"
  default-sort="reciente"
  storage-key="federal"
  @view-selected="verSeleccionado"
  @edit-selected="editarSeleccionado"
  @delete-selected="eliminarSeleccionados"
/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import Swal from "sweetalert2"

definePageMeta({
  layout: "admin"
})

const router = useRouter()

const busqueda = ref("")
const registros = ref([])
const cargando = ref(false)
const subiendo = ref(false)
const error = ref("")
const mensajeCarga = ref("")

let debounceTimer = null

function limpiarDebounce() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
}

function limpiarMensajes() {
  error.value = ""
  mensajeCarga.value = ""
}

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

function getItemKey(item) {
  return item.rfc || ""
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

const columnas = [
  { key: "rfc", label: "RFC", class: "col-md" },
  { key: "homoclave", label: "Homoclave", class: "col-sm" },
  {
    key: "nombre",
    label: "Nombre",
    class: "col-lg",
    format: (row) => nombreCompleto(row) || "-"
  },
  { key: "dependencia", label: "Dependencia", class: "col-lg" },
  { key: "autsanc", label: "Autoridad sancionadora", class: "col-lg" },
  { key: "cargo", label: "Cargo", class: "col-lg" },
  { key: "periodo", label: "Periodo", class: "col-md" },
  {
    key: "fechares",
    label: "Fecha resolución",
    class: "col-md",
    format: (row) => formatearFecha(row.fechares)
  }
]

async function cargarRegistros() {
  limpiarDebounce()
  error.value = ""
  cargando.value = true

  try {
    const res = await $fetch("/api/sancionados", {
      query: {
        tipo: "federal",
        q: busqueda.value.trim() || undefined
      }
    })

    registros.value = res.results || []
  } catch (e) {
    error.value = "No se pudieron cargar los registros federales."
    registros.value = []
    mostrarError("No se pudieron cargar los registros federales.")
  } finally {
    cargando.value = false
  }
}

watch(busqueda, (nuevoValor, valorAnterior) => {
  const nuevo = nuevoValor.trim()
  const anterior = (valorAnterior || "").trim()

  if (nuevo === anterior) return

  limpiarDebounce()

  debounceTimer = setTimeout(async () => {
    await cargarRegistros()
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
  limpiarMensajes()

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
      await $fetch("/api/federal/eliminar", {
        method: "POST",
        body: { rfc: item.rfc }
      })
    }

    await cargarRegistros()

    const textoExito =
      items.length === 1
        ? "Registro eliminado correctamente."
        : "Registros eliminados correctamente."

    mensajeCarga.value = textoExito
    mostrarExito(textoExito)
  } catch (e) {
    const textoError = e?.data?.error || "No se pudo eliminar uno o más registros."
    error.value = textoError
    mostrarError(textoError)
  }
}

async function subirExcel(event) {
  error.value = ""
  mensajeCarga.value = ""

  const file = event.target.files?.[0]
  if (!file) return

  subiendo.value = true

  try {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/federal/cargar-excel", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "No se pudo cargar el Excel.")
    }

    await cargarRegistros()

    const textoExito = `Carga completada. Insertados: ${data.insertados || 0}. Duplicados: ${data.duplicados || 0}. Omitidos: ${data.omitidos || 0}.`
    mensajeCarga.value = textoExito
    mostrarExito(textoExito)
  } catch (e) {
    const textoError = e.message || "No se pudo cargar el archivo Excel."
    error.value = textoError
    mostrarError(textoError)
  } finally {
    subiendo.value = false
    event.target.value = ""
  }
}

onMounted(async () => {
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

.btn-primary,
.btn-upload {
  border: none;
  background: #8e1738;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.btn-upload {
  background: #444;
}

.hidden-file {
  display: none;
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

.info-box {
  margin-bottom: 12px;
  color: #444;
}

.ok-box {
  margin-bottom: 12px;
  color: #0a7a2f;
}

.error-box {
  margin-bottom: 12px;
  color: #b00020;
}

@media (max-width: 980px) {
  .head {
    flex-direction: column;
    align-items: stretch;
  }

  .head-actions {
    justify-content: flex-start;
  }

  .search-row {
    flex-direction: column;
  }
}
</style>