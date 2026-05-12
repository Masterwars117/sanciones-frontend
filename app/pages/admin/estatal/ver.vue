<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Detalle estatal</h1>
        <p class="subtitle">Tabla: INHABILITADOS</p>
      </div>

      <div class="head-actions">
        <NuxtLink
          v-if="registro.anio && registro.sancionid"
          :to="`/admin/estatal/editar?anio=${encodeURIComponent(registro.anio)}&sancionid=${encodeURIComponent(registro.sancionid)}`"
          class="btn-primary"
        >
          Editar
        </NuxtLink>

        <NuxtLink to="/admin/estatal" class="btn-secondary">
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
          <label>Año</label>
          <div class="value">{{ mostrar(registro.anio) }}</div>
        </div>

        <div class="field">
          <label>Sanción ID</label>
          <div class="value">{{ mostrar(registro.sancionid) }}</div>
        </div>

        <div class="field">
          <label>Oficio</label>
          <div class="value">{{ mostrar(registro.oficio) }}</div>
        </div>

        <div class="field">
          <label>Fecha oficio</label>
          <div class="value">{{ mostrar(registro.f_oficio) }}</div>
        </div>

        <div class="field">
          <label>Expediente</label>
          <div class="value">{{ mostrar(registro.expediente) }}</div>
        </div>

        <div class="field">
          <label>Fecha resolución</label>
          <div class="value">{{ mostrar(registro.f_resolucion) }}</div>
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

        <div class="field">
          <label>Dependencia</label>
          <div class="value">{{ mostrar(registro.dependencia) }}</div>
        </div>

        <div class="field">
          <label>Cargo</label>
          <div class="value">{{ mostrar(registro.cargo) }}</div>
        </div>

        <div class="field">
          <label>Entidad labora</label>
          <div class="value">{{ mostrar(registro.entidad_labora) }}</div>
        </div>

        <div class="field">
          <label>Tipo sanción 1</label>
          <div class="value">{{ mostrar(registro.tiposancion) }}</div>
        </div>

        <div class="field">
          <label>Tipo sanción 2</label>
          <div class="value">{{ mostrar(registro.tiposancion2) }}</div>
        </div>

        <div class="field">
          <label>Periodo</label>
          <div class="value">{{ mostrar(registro.periodo) }}</div>
        </div>

        <div class="field">
          <label>Fecha inicio inhabilitación</label>
          <div class="value">{{ mostrar(registro.deinhabil) }}</div>
        </div>

        <div class="field">
          <label>Fecha término inhabilitación</label>
          <div class="value">{{ mostrar(registro.ainhabil) }}</div>
        </div>

        <div class="field wide">
          <label>Motivo</label>
          <div class="value">{{ mostrar(registro.motivo) }}</div>
        </div>

        <div class="field">
          <label>Estatus sanción 1</label>
          <div class="value">{{ mostrar(registro.statussanc1) }}</div>
        </div>

        <div class="field">
          <label>Estatus sanción 2</label>
          <div class="value">{{ mostrar(registro.statussanc2) }}</div>
        </div>

        <div class="field">
          <label>RFC</label>
          <div class="value">{{ mostrar(registro.rfc) }}</div>
        </div>

        <div class="field">
          <label>CURP</label>
          <div class="value">{{ mostrar(registro.curp) }}</div>
        </div>

        <div class="field">
          <label>Fecha ejecución 1</label>
          <div class="value">{{ mostrar(registro.fejec1) }}</div>
        </div>

        <div class="field">
          <label>Fecha ejecución 2</label>
          <div class="value">{{ mostrar(registro.fejec2) }}</div>
        </div>

        <div class="field">
          <label>Monto 1</label>
          <div class="value">{{ mostrar(registro.monto1) }}</div>
        </div>

        <div class="field">
          <label>Monto 2</label>
          <div class="value">{{ mostrar(registro.monto2) }}</div>
        </div>

        <div class="field">
          <label>Fecha registro</label>
          <div class="value">{{ mostrar(registro.fechareg) }}</div>
        </div>

        <div class="field">
          <label>Género</label>
          <div class="value">{{ mostrar(registro.genero) }}</div>
        </div>

        <div class="field">
          <label>ID SESEA</label>
          <div class="value">{{ mostrar(registro.idsesea) }}</div>
        </div>

        <div class="field">
          <label>Clave entidad labora</label>
          <div class="value">{{ mostrar(registro.cve_entidad_labora) }}</div>
        </div>

        <div class="field">
          <label>Tipo falta</label>
          <div class="value">{{ mostrar(registro.tipofalta) }}</div>
        </div>

        <div class="field">
          <label>Nivel categoría</label>
          <div class="value">{{ mostrar(registro.nivelcateg) }}</div>
        </div>

        <div class="field wide">
          <label>Resolución URL</label>
          <div class="value">{{ mostrar(registro.resolucionurl) }}</div>
        </div>

        <div class="field wide">
          <label>Observaciones</label>
          <div class="value">{{ mostrar(registro.observaciones) }}</div>
        </div>

        <div class="field">
          <label>Clave moneda 1</label>
          <div class="value">{{ mostrar(registro.cve_moneda1) }}</div>
        </div>

        <div class="field">
          <label>Clave moneda 2</label>
          <div class="value">{{ mostrar(registro.cve_moneda2) }}</div>
        </div>

        <div class="field">
          <label>Tipo documento</label>
          <div class="value">{{ mostrar(registro.tipo_docto) }}</div>
        </div>

        <div class="field">
          <label>Título documento</label>
          <div class="value">{{ mostrar(registro.titulo_docto) }}</div>
        </div>

        <div class="field">
          <label>Descripción documento</label>
          <div class="value">{{ mostrar(registro.descripcion_docto) }}</div>
        </div>

        <div class="field">
          <label>Fecha documento</label>
          <div class="value">{{ mostrar(registro.fecha_docto) }}</div>
        </div>

        <div class="field">
          <label>Particular</label>
          <div class="value">{{ mostrar(registro.particular) }}</div>
        </div>

        <div class="field">
          <label>Monto API 1</label>
          <div class="value">{{ mostrar(registro.montoapi1) }}</div>
        </div>

        <div class="field">
          <label>Monto API 2</label>
          <div class="value">{{ mostrar(registro.montoapi2) }}</div>
        </div>

        <div class="field">
          <label>Gravedad</label>
          <div class="value">{{ mostrar(registro.gravedad) }}</div>
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
  anio: "",
  sancionid: "",
  oficio: "",
  f_oficio: "",
  expediente: "",
  f_resolucion: "",
  apaterno: "",
  amaterno: "",
  nombres: "",
  dependencia: "",
  cargo: "",
  entidad_labora: "",
  tiposancion: "",
  tiposancion2: "",
  periodo: "",
  deinhabil: "",
  ainhabil: "",
  motivo: "",
  statussanc1: "",
  statussanc2: "",
  rfc: "",
  fejec1: "",
  fejec2: "",
  monto1: "",
  monto2: "",
  curp: "",
  fechareg: "",
  genero: "",
  idsesea: "",
  cve_entidad_labora: "",
  tipofalta: "",
  nivelcateg: "",
  resolucionurl: "",
  observaciones: "",
  cve_moneda1: "",
  cve_moneda2: "",
  tipo_docto: "",
  titulo_docto: "",
  descripcion_docto: "",
  fecha_docto: "",
  particular: "",
  montoapi1: "",
  montoapi2: "",
  gravedad: "",
})

function mostrar(valor) {
  return valor && String(valor).trim() !== "" ? valor : "-"
}

async function cargarDetalle() {
  const anio = (route.query.anio || "").toString().trim()
  const sancionid = (route.query.sancionid || "").toString().trim()

  if (!anio || !sancionid) {
    error.value = "No se recibieron los datos del registro."
    return
  }

  cargando.value = true
  error.value = ""

  try {
    const res = await $fetch("/api/estatal/detalle", {
      query: { anio, sancionid }
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