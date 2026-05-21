<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Sanciones Estatales</h1>
        <p class="subtitle">Tabla: INHABILITADOS</p>
      </div>

      <NuxtLink to="/admin/estatal/nuevo" class="btn-primary">
        Nuevo registro estatal
      </NuxtLink>
    </div>

    <div class="card">
      <div class="search-row">
        <input
          v-model="busqueda"
          type="text"
          class="input search-input"
          placeholder="Buscar por expediente, nombre, RFC o CURP"
          @keyup.enter="cargarRegistros"
        />
        <button class="btn-dark" @click="cargarRegistros">Buscar</button>
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
  :items-per-page-options="[10, 25, 50, 100]"
  :default-items-per-page="50"
  default-sort="reciente"
  storage-key="estatal"
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

let debounceTimer = null

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
  { key: "dependencia", label: "Dependencia", class: "col-md" },
  {
    key: "fechareg",
    label: "Fecha registro",
    class: "col-md",
    format: (row) => formatearFecha(row.fechareg)
  }
]

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

async function cargarRegistros() {
  limpiarDebounce()
  cargando.value = true

  try {
    const res = await $fetch("/api/sancionados", {
      query: {
        tipo: "estatal",
        q: busqueda.value.trim() || undefined
      }
    })

    registros.value = res.results || []
  } catch (e) {
    registros.value = []
    mostrarError("No se pudieron cargar los registros estatales.")
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

  try {
    for (const item of items) {
      await $fetch("/api/estatal/eliminar", {
        method: "POST",
        body: {
          anio: item.anio,
          sancionid: item.sancionid
        }
      })
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