<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Detalle del registro federal</h1>
        <p class="subtitle">Tabla: INHABILIFEDERAL</p>
      </div>

      <div class="head-actions">
        <NuxtLink
          :to="`/admin/federal/editar?rfc=${encodeURIComponent(form.rfc)}`"
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
      <div v-if="cargandoDetalle" class="empty">
        Cargando registro...
      </div>

      <template v-else>
        <div class="form-sections">
          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Identificación del registro</h2>
              <p class="section-text">Datos base del registro federal.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Dependencia</label>
                <div class="value-box">{{ mostrar(form.dependencia) }}</div>
              </div>

              <div class="field">
                <label>RFC base</label>
                <div class="value-box">{{ mostrar(form.rfc) }}</div>
              </div>

              <div class="field">
                <label>Homoclave</label>
                <div class="value-box">{{ mostrar(form.homoclave) }}</div>
              </div>
            </div>
          </section>

          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Datos de la persona</h2>
              <p class="section-text">Información personal y laboral del sancionado.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Apellido paterno</label>
                <div class="value-box">{{ mostrar(form.apaterno) }}</div>
              </div>

              <div class="field">
                <label>Apellido materno</label>
                <div class="value-box">{{ mostrar(form.amaterno) }}</div>
              </div>

              <div class="field wide">
                <label>Nombres</label>
                <div class="value-box">{{ mostrar(form.nombres) }}</div>
              </div>

              <div class="field wide">
                <label>Autoridad sancionadora</label>
                <div class="value-box">{{ mostrar(form.autsanc) }}</div>
              </div>

              <div class="field">
                <label>Cargo</label>
                <div class="value-box">{{ mostrar(form.cargo) }}</div>
              </div>

              <div class="field">
                <label>Periodo</label>
                <div class="value-box">{{ mostrar(form.periodo) }}</div>
              </div>
            </div>
          </section>

          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Fechas de la sanción</h2>
              <p class="section-text">Fechas principales del registro federal.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Fecha resolución</label>
                <div class="value-box">{{ formatearFecha(form.fechares) }}</div>
              </div>

              <div class="field">
                <label>Fecha notificación</label>
                <div class="value-box">{{ formatearFecha(form.fechanot) }}</div>
              </div>

              <div class="field">
                <label>Fecha inicio inhabilitación</label>
                <div class="value-box">{{ formatearFecha(form.deinhabil) }}</div>
              </div>

              <div class="field">
                <label>Fecha fin inhabilitación</label>
                <div class="value-box">{{ formatearFecha(form.ainhabil) }}</div>
              </div>

              <div class="field">
                <label>Fecha informe</label>
                <div class="value-box">{{ formatearFecha(form.fechainf) }}</div>
              </div>
            </div>
          </section>
        </div>

        <div v-if="error" class="error-box">{{ error }}</div>
      </template>
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

const cargandoDetalle = ref(false)
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

function mostrar(valor) {
  if (valor === null || valor === undefined || valor === "") return "-"
  return String(valor)
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

async function cargarDetalle() {
  const rfc = (route.query.rfc || "").toString().trim()

  if (!rfc) {
    error.value = "No se recibió el RFC del registro."
    return
  }

  cargandoDetalle.value = true
  error.value = ""

  try {
    const res = await federalService.obtenerDetalle(rfc)

    const reg = res.registro || {}
    Object.assign(form, reg)
  } catch (e) {
    error.value = e?.data?.error || "No se pudo cargar el registro."
  } finally {
    cargandoDetalle.value = false
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
  border-radius: 14px;
  padding: 18px;
}

.form-sections {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-card {
  border: 1px solid #ececec;
  border-radius: 14px;
  padding: 18px;
  background: #fcfcfc;
}

.section-head {
  margin-bottom: 14px;
}

.section-title {
  margin: 0 0 4px;
  font-size: 18px;
  color: #2f2f2f;
}

.section-text {
  margin: 0;
  color: #777;
  font-size: 13px;
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

.value-box {
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  padding: 10px 12px;
  background: #fff;
  min-height: 42px;
  display: flex;
  align-items: center;
  color: #333;
}

.btn-primary,
.btn-secondary {
  border: none;
  background: #8e1738;
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
}

.btn-secondary {
  background: #555;
}

.empty {
  padding: 42px 20px;
  text-align: center;
  color: #777;
  border: 1px dashed #ccc;
  border-radius: 10px;
}

.error-box {
  margin-top: 14px;
  color: #b00020;
}

@media (max-width: 980px) {
  .head {
    flex-direction: column;
    align-items: stretch;
  }

  .head-actions {
    justify-content: stretch;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .field.wide {
    grid-column: span 1;
  }
}
</style>