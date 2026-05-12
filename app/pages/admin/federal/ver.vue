<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Detalle federal</h1>
        <p class="subtitle">Tabla: INHABILIFEDERAL</p>
      </div>

      <div class="head-actions">
        <NuxtLink
          v-if="registro.rfc"
          :to="`/admin/federal/editar?rfc=${encodeURIComponent(registro.rfc)}`"
          class="btn-primary"
        >
          Editar
        </NuxtLink>

        <NuxtLink to="/admin/federal" class="btn-secondary">
          Volver
        </NuxtLink>
      </div>
    </div>

    <div class="card">
      <div v-if="cargando" class="empty">
        Cargando detalle...
      </div>

      <div v-else-if="error" class="error-box">
        {{ error }}
      </div>

      <div v-else class="grid">
        <div class="field">
          <label>Dependencia</label>
          <div class="value">{{ mostrar(registro.dependencia) }}</div>
        </div>

        <div class="field">
          <label>RFC</label>
          <div class="value">{{ mostrar(registro.rfc) }}</div>
        </div>

        <div class="field">
          <label>Homoclave</label>
          <div class="value">{{ mostrar(registro.homoclave) }}</div>
        </div>

        <div class="field">
          <label>Apellido paterno</label>
          <div class="value">{{ mostrar(registro.apaterno) }}</div>
        </div>

        <div class="field">
          <label>Apellido materno</label>
          <div class="value">{{ mostrar(registro.amaterno) }}</div>
        </div>

        <div class="field">
          <label>Nombres</label>
          <div class="value">{{ mostrar(registro.nombres) }}</div>
        </div>

        <div class="field wide">
          <label>Autoridad sancionadora</label>
          <div class="value">{{ mostrar(registro.autsanc) }}</div>
        </div>

        <div class="field">
          <label>Cargo</label>
          <div class="value">{{ mostrar(registro.cargo) }}</div>
        </div>

        <div class="field">
          <label>Periodo</label>
          <div class="value">{{ mostrar(registro.periodo) }}</div>
        </div>

        <div class="field">
          <label>Fecha resolución</label>
          <div class="value">{{ mostrar(registro.fechares) }}</div>
        </div>

        <div class="field">
          <label>Fecha notificación</label>
          <div class="value">{{ mostrar(registro.fechanot) }}</div>
        </div>

        <div class="field">
          <label>Fecha inicio inhabilitación</label>
          <div class="value">{{ mostrar(registro.deinhabil) }}</div>
        </div>

        <div class="field">
          <label>Fecha término inhabilitación</label>
          <div class="value">{{ mostrar(registro.ainhabil) }}</div>
        </div>

        <div class="field">
          <label>Fecha informe</label>
          <div class="value">{{ mostrar(registro.fechainf) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute } from "vue-router"

definePageMeta({
  layout: "admin"
})

const route = useRoute()

const cargando = ref(false)
const error = ref("")

const registro = reactive({
  dependencia: "",
  rfc: "",
  homoclave: "",
  apaterno: "",
  amaterno: "",
  nombres: "",
  autsanc: "",
  cargo: "",
  periodo: "",
  fechares: "",
  fechanot: "",
  deinhabil: "",
  ainhabil: "",
  fechainf: "",
})

function mostrar(valor) {
  return valor && String(valor).trim() !== "" ? valor : "-"
}

async function cargarDetalle() {
  const rfc = (route.query.rfc || "").toString().trim()

  if (!rfc) {
    error.value = "No se recibió el RFC del registro."
    return
  }

  cargando.value = true
  error.value = ""

  try {
    const res = await $fetch("/api/federal/detalle", {
      query: { rfc }
    })

    Object.assign(registro, res.registro || {})
  } catch (e) {
    error.value = e?.data?.error || "No se pudo cargar el detalle."
  } finally {
    cargando.value = false
  }
}

onMounted(async () => {
  await cargarDetalle()
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

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
}

.field.wide {
  grid-column: span 2;
}

.field label {
  margin-bottom: 6px;
  color: #555;
  font-size: 13px;
  font-weight: 700;
}

.value {
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
  padding: 10px 12px;
  min-height: 18px;
}

.btn-primary,
.btn-secondary {
  border: none;
  background: #8e1738;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
}

.empty {
  padding: 42px 20px;
  text-align: center;
  color: #777;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.error-box {
  color: #b00020;
}
</style>