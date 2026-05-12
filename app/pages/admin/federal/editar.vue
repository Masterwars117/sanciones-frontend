<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Editar registro federal</h1>
        <p class="subtitle">Tabla: INHABILIFEDERAL</p>
      </div>

      <NuxtLink to="/admin/federal" class="btn-secondary">Volver</NuxtLink>
    </div>

    <div class="card">
      <div v-if="cargandoDetalle" class="empty">
        Cargando registro...
      </div>

      <template v-else>
        <div class="grid">
          <div class="field">
            <label>Dependencia</label>
            <input v-model.trim="form.dependencia" class="input" />
          </div>

          <div class="field">
            <label>RFC base *</label>
            <input
              v-model.trim="form.rfc"
              class="input upper"
              maxlength="10"
              disabled
            />
          </div>

          <div class="field">
            <label>Homoclave</label>
            <input
              v-model.trim="form.homoclave"
              class="input upper"
              maxlength="3"
              @input="form.homoclave = normalizeHomoclaveInput(form.homoclave)"
            />
          </div>

          <div class="field">
            <label>Apellido paterno</label>
            <input v-model.trim="form.apaterno" class="input" />
          </div>

          <div class="field">
            <label>Apellido materno</label>
            <input v-model.trim="form.amaterno" class="input" />
          </div>

          <div class="field">
            <label>Nombres</label>
            <input v-model.trim="form.nombres" class="input" />
          </div>

          <div class="field wide">
            <label>Autoridad sancionadora</label>
            <input v-model.trim="form.autsanc" class="input" />
          </div>

          <div class="field">
            <label>Cargo</label>
            <input v-model.trim="form.cargo" class="input" />
          </div>

          <div class="field">
            <label>Periodo</label>
            <input v-model.trim="form.periodo" class="input" />
          </div>

          <div class="field">
            <label>Fecha resolución</label>
            <input v-model="form.fechares" type="date" class="input" />
          </div>

          <div class="field">
            <label>Fecha notificación</label>
            <input v-model="form.fechanot" type="date" class="input" />
          </div>

          <div class="field">
            <label>Fecha inicio inhabilitación</label>
            <input v-model="form.deinhabil" type="date" class="input" />
          </div>

          <div class="field">
            <label>Fecha fin inhabilitación</label>
            <input v-model="form.ainhabil" type="date" class="input" />
          </div>

          <div class="field">
            <label>Fecha informe</label>
            <input v-model="form.fechainf" type="date" class="input" />
          </div>
        </div>

        <div class="actions">
          <button class="btn-primary" :disabled="guardando" @click="guardar">
            {{ guardando ? "Guardando..." : "Actualizar" }}
          </button>
        </div>

        <div v-if="mensaje" class="ok-box">{{ mensaje }}</div>
        <div v-if="error" class="error-box">{{ error }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

definePageMeta({
  layout: "admin"
})

const route = useRoute()
const router = useRouter()

const guardando = ref(false)
const cargandoDetalle = ref(false)
const mensaje = ref("")
const error = ref("")
const rfcOriginal = ref("")

const form = reactive({
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

function normalizeHomoclaveInput(value) {
  return (value || "")
    .toUpperCase()
    .replace(/[\s-]/g, "")
}

function validarHomoclave(homoclave) {
  if (!homoclave) return true
  return /^[A-Z0-9]{3}$/.test(homoclave)
}

function validarFormulario() {
  form.homoclave = normalizeHomoclaveInput(form.homoclave)

  if (!form.rfc) {
    error.value = "RFC base es obligatorio."
    return false
  }

  if (!validarHomoclave(form.homoclave)) {
    error.value = "Homoclave inválida. Debe tener 3 caracteres alfanuméricos."
    return false
  }

  return true
}

async function cargarDetalle() {
  const rfc = (route.query.rfc || "").toString().trim()

  if (!rfc) {
    error.value = "No se recibió el RFC del registro."
    return
  }

  cargandoDetalle.value = true
  error.value = ""

  try {
    const res = await $fetch("/api/federal/detalle", {
      query: { rfc }
    })

    const reg = res.registro || {}
    rfcOriginal.value = reg.rfc || ""
    Object.assign(form, reg)
  } catch (e) {
    error.value = e?.data?.error || "No se pudo cargar el registro."
  } finally {
    cargandoDetalle.value = false
  }
}

async function guardar() {
  mensaje.value = ""
  error.value = ""

  if (!validarFormulario()) return

  guardando.value = true

  try {
    const res = await $fetch("/api/federal/editar", {
      method: "POST",
      body: {
        rfc_original: rfcOriginal.value,
        ...form
      }
    })

    mensaje.value = res.message || "Registro federal actualizado correctamente."

    setTimeout(() => {
      router.push("/admin/federal")
    }, 900)
  } catch (e) {
    error.value = e?.data?.error || "No se pudo actualizar el registro."
  } finally {
    guardando.value = false
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
  grid-template-columns: repeat(2, minmax(220px, 1fr));
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
  color: #444;
  font-size: 14px;
  font-weight: 600;
}

.input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  background: white;
}

.upper {
  text-transform: uppercase;
}

.actions {
  margin-top: 18px;
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

.btn-secondary {
  display: inline-block;
}

.empty {
  padding: 42px 20px;
  text-align: center;
  color: #777;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.ok-box {
  margin-top: 14px;
  color: #0a7a2f;
}

.error-box {
  margin-top: 14px;
  color: #b00020;
}
</style>