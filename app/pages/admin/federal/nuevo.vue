<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Nuevo registro federal</h1>
        <p class="subtitle">Tabla: INHABILIFEDERAL</p>
      </div>

      <NuxtLink to="/admin/federal" class="btn-secondary">Volver</NuxtLink>
    </div>

    <div class="card">
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
            @input="form.rfc = normalizeRFCBaseInput(form.rfc)"
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
          {{ guardando ? "Guardando..." : "Guardar" }}
        </button>
      </div>

      <div v-if="mensaje" class="ok-box">{{ mensaje }}</div>
      <div v-if="error" class="error-box">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

definePageMeta({
  layout: "admin"
})

const router = useRouter()

const guardando = ref(false)
const mensaje = ref("")
const error = ref("")

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

function normalizeRFCBaseInput(value) {
  return (value || "")
    .toUpperCase()
    .replace(/[\s-]/g, "")
}

function normalizeHomoclaveInput(value) {
  return (value || "")
    .toUpperCase()
    .replace(/[\s-]/g, "")
}

function validarRFCBaseFederal(rfc) {
  return /^[A-ZÑ&]{3,4}[0-9]{6}$/.test(rfc)
}

function validarHomoclave(homoclave) {
  if (!homoclave) return true
  return /^[A-Z0-9]{3}$/.test(homoclave)
}

function validarFormulario() {
  form.rfc = normalizeRFCBaseInput(form.rfc)
  form.homoclave = normalizeHomoclaveInput(form.homoclave)

  if (!form.rfc) {
    error.value = "RFC base es obligatorio."
    return false
  }

  if (!validarRFCBaseFederal(form.rfc)) {
    error.value = "RFC federal inválido. Debe capturarse sin homoclave y con base de 9 o 10 caracteres."
    return false
  }

  if (!validarHomoclave(form.homoclave)) {
    error.value = "Homoclave inválida. Debe tener 3 caracteres alfanuméricos."
    return false
  }

  return true
}

async function guardar() {
  mensaje.value = ""
  error.value = ""

  if (!validarFormulario()) return

  guardando.value = true

  try {
    const res = await $fetch("/api/federal/crear", {
      method: "POST",
      body: { ...form }
    })

    mensaje.value = res.message || "Registro federal creado correctamente."

    setTimeout(() => {
      router.push("/admin/federal")
    }, 900)
  } catch (e) {
    error.value = e?.data?.error || "No se pudo guardar el registro."
  } finally {
    guardando.value = false
  }
}
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

.ok-box {
  margin-top: 14px;
  color: #0a7a2f;
}

.error-box {
  margin-top: 14px;
  color: #b00020;
}
</style>