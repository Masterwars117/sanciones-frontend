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
      <div class="toolbar">
        <input
          v-model="busqueda"
          type="text"
          class="input"
          placeholder="Buscar por expediente, nombre, RFC o CURP"
          @keyup.enter="cargarRegistros"
        />
        <button class="btn-dark" @click="cargarRegistros">Buscar</button>
      </div>

      <div class="meta">
        Total: {{ registros.length }}
      </div>

      <div v-if="cargando" class="empty">
        Cargando registros...
      </div>

      <div v-else-if="registros.length === 0" class="empty">
        No hay registros estatales capturados todavía.
      </div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Año</th>
            <th>Sanción ID</th>
            <th>Expediente</th>
            <th>Nombre</th>
            <th>RFC</th>
            <th>CURP</th>
            <th>Cargo</th>
            <th>Dependencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in registros" :key="`${item.anio}-${item.sancionid}`">
            <td>{{ item.anio }}</td>
            <td>{{ item.sancionid }}</td>
            <td>{{ item.expediente || "-" }}</td>
            <td>{{ nombreCompleto(item) || "-" }}</td>
            <td>{{ item.rfc || "-" }}</td>
            <td>{{ item.curp || "-" }}</td>
            <td>{{ item.cargo || "-" }}</td>
            <td>{{ item.dependencia || "-" }}</td>
            <td>
              <NuxtLink
                class="mini link-mini"
                :to="`/admin/estatal/ver?anio=${encodeURIComponent(item.anio)}&sancionid=${encodeURIComponent(item.sancionid)}`"
              >
                Ver
              </NuxtLink>

              <NuxtLink
                class="mini link-mini"
                :to="`/admin/estatal/editar?anio=${encodeURIComponent(item.anio)}&sancionid=${encodeURIComponent(item.sancionid)}`"
              >
                Editar
              </NuxtLink>

              <button class="mini danger" @click="eliminar(item.anio, item.sancionid)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="error" class="error-box">
        {{ error }}
      </div>

      <div v-if="mensaje" class="ok-box">
        {{ mensaje }}
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
const error = ref("")
const mensaje = ref("")

function nombreCompleto(item) {
  return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ")
}

async function cargarRegistros() {
  cargando.value = true
  error.value = ""
  mensaje.value = ""

  try {
    const res = await $fetch("/api/sancionados", {
      query: {
        tipo: "estatal",
        q: busqueda.value.trim() || undefined
      }
    })

    registros.value = res.results || []
  } catch (e) {
    error.value = "No se pudieron cargar los registros estatales."
    registros.value = []
  } finally {
    cargando.value = false
  }
}

async function eliminar(anio, sancionid) {
  mensaje.value = ""
  error.value = ""

  const confirmado = window.confirm(`¿Eliminar el registro ${anio}-${sancionid}?`)
  if (!confirmado) return

  try {
    const res = await $fetch("/api/estatal/eliminar", {
      method: "POST",
      body: { anio, sancionid }
    })

    mensaje.value = res.message || "Registro eliminado correctamente."
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

.btn-primary {
  border: none;
  background: #8e1738;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
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
  margin-top: 14px;
  color: #0a7a2f;
}
</style>