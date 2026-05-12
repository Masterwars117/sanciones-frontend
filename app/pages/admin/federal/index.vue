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
      <div class="toolbar">
        <input
          v-model="busqueda"
          type="text"
          class="input"
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

      <div class="meta">
        Total: {{ registros.length }}
      </div>

      <div v-if="cargando" class="empty">
        Cargando registros...
      </div>

      <div v-else-if="registros.length === 0" class="empty">
        No hay registros federales capturados todavía.
      </div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>RFC</th>
            <th>Homoclave</th>
            <th>Nombre</th>
            <th>Dependencia</th>
            <th>Autoridad sancionadora</th>
            <th>Cargo</th>
            <th>Periodo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in registros" :key="`${item.rfc}-${item.homoclave}`">
            <td>{{ item.rfc || "-" }}</td>
            <td>{{ item.homoclave || "-" }}</td>
            <td>{{ nombreCompleto(item) || "-" }}</td>
            <td>{{ item.dependencia || "-" }}</td>
            <td>{{ item.autsanc || "-" }}</td>
            <td>{{ item.cargo || "-" }}</td>
            <td>{{ item.periodo || "-" }}</td>
            <td>
              <NuxtLink
                class="mini link-mini"
                :to="`/admin/federal/ver?rfc=${encodeURIComponent(item.rfc)}`"
              >
                Ver
              </NuxtLink>

              <NuxtLink
                class="mini link-mini"
                :to="`/admin/federal/editar?rfc=${encodeURIComponent(item.rfc)}`"
              >
                Editar
              </NuxtLink>

              <button class="mini danger" @click="eliminar(item.rfc)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="error" class="error-box">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

definePageMeta({
  layout: "admin"
})

const busqueda = ref("")
const registros = ref([])
const cargando = ref(false)
const subiendo = ref(false)
const error = ref("")
const mensajeCarga = ref("")

function nombreCompleto(item) {
  return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ")
}

async function cargarRegistros() {
  cargando.value = true
  error.value = ""

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
  } finally {
    cargando.value = false
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

    mensajeCarga.value = `Carga completada. Insertados: ${data.insertados || 0}. Duplicados: ${data.duplicados || 0}. Omitidos: ${data.omitidos || 0}.`
    await cargarRegistros()
  } catch (e) {
    error.value = e.message || "No se pudo cargar el archivo Excel."
  } finally {
    subiendo.value = false
    event.target.value = ""
  }
}

async function eliminar(rfc) {
  error.value = ""
  mensajeCarga.value = ""

  const confirmado = window.confirm(`¿Eliminar el registro con RFC ${rfc}?`)
  if (!confirmado) return

  try {
    const res = await $fetch("/api/federal/eliminar", {
      method: "POST",
      body: { rfc }
    })

    mensajeCarga.value = res.message || "Registro eliminado correctamente."
    await cargarRegistros()
  } catch (e) {
    error.value = e?.data?.error || "No se pudo eliminar el registro."
  }
}

onMounted(async () => {
  await cargarRegistros()
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

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.meta {
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
}

.input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
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
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.empty {
  padding: 42px 20px;
  text-align: center;
  color: #777;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.info-box {
  margin-bottom: 12px;
  color: #444;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  vertical-align: top;
}

.table th {
  background: #f1f1f1;
}

.mini {
  margin-right: 6px;
  padding: 6px 10px;
  border: 1px solid #bbb;
  background: white;
  cursor: pointer;
  border-radius: 6px;
}

.link-mini {
  text-decoration: none;
  color: #333;
  display: inline-block;
}

.danger {
  color: #9b102d;
  border-color: #d8a7b4;
}

.error-box {
  margin-top: 14px;
  color: #b00020;
}

.ok-box {
  margin-bottom: 12px;
  color: #0a7a2f;
}
</style>