<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Detalle del registro estatal</h1>
        <p class="subtitle">Tabla: INHABILITADOS</p>
      </div>

      <div class="head-actions">
        <NuxtLink
          :to="`/admin/estatal/editar?anio=${encodeURIComponent(form.anio)}&sancionid=${encodeURIComponent(form.sancionid)}`"
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
      <div v-if="cargandoDetalle" class="empty">
        Cargando registro...
      </div>

      <template v-else>
        <div class="form-sections">
          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Identificación del registro</h2>
              <p class="section-text">Datos base del registro estatal.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Año</label>
                <div class="value-box">{{ mostrar(form.anio) }}</div>
              </div>

              <div class="field">
                <label>Sanción ID</label>
                <div class="value-box">{{ mostrar(form.sancionid) }}</div>
              </div>

              <div class="field">
                <label>Tipo entidad sancionadora</label>
                <div class="value-box">{{ descripcionTipoEntidad }}</div>
              </div>

              <div class="field">
                <label>Dependencia</label>
                <div class="value-box">{{ descripcionDependencia }}</div>
              </div>

              <div class="field">
                <label>Clave entidad labora</label>
                <div class="value-box">{{ mostrar(form.cve_entidad_labora) }}</div>
              </div>

              <div class="field">
                <label>Entidad labora</label>
                <div class="value-box">{{ descripcionEntidadLabora }}</div>
              </div>

              <div class="field">
                <label>Expediente</label>
                <div class="value-box">{{ mostrar(form.expediente) }}</div>
              </div>

              <div class="field">
                <label>ID SESEA</label>
                <div class="value-box">{{ mostrar(form.idsesea) }}</div>
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

              <div class="field">
                <label>RFC</label>
                <div class="value-box">{{ mostrar(form.rfc) }}</div>
              </div>

              <div class="field">
                <label>CURP</label>
                <div class="value-box">{{ mostrar(form.curp) }}</div>
              </div>

              <div class="field">
                <label>Género</label>
                <div class="value-box">{{ descripcionGenero }}</div>
              </div>

              <div class="field">
                <label>Cargo</label>
                <div class="value-box">{{ mostrar(form.cargo) }}</div>
              </div>

              <div class="field">
                <label>Nivel categoría</label>
                <div class="value-box">{{ mostrar(form.nivelcateg) }}</div>
              </div>
            </div>
          </section>

          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Resolución y sanción</h2>
              <p class="section-text">Datos jurídicos y vigencia de la sanción.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Oficio</label>
                <div class="value-box">{{ mostrar(form.oficio) }}</div>
              </div>

              <div class="field">
                <label>Fecha oficio</label>
                <div class="value-box">{{ formatearFecha(form.f_oficio) }}</div>
              </div>

              <div class="field">
                <label>Fecha resolución</label>
                <div class="value-box">{{ formatearFecha(form.f_resolucion) }}</div>
              </div>

              <div class="field">
                <label>Periodo</label>
                <div class="value-box">{{ mostrar(form.periodo) }}</div>
              </div>

              <div class="field">
                <label>Tipo sanción 1</label>
                <div class="value-box">{{ descripcionTipoSancion1 }}</div>
              </div>

              <div class="field">
                <label>Tipo sanción 2</label>
                <div class="value-box">{{ descripcionTipoSancion2 }}</div>
              </div>

              <div class="field">
                <label>Estatus sanción 1</label>
                <div class="value-box">{{ descripcionEstatus1 }}</div>
              </div>

              <div class="field">
                <label>Estatus sanción 2</label>
                <div class="value-box">{{ descripcionEstatus2 }}</div>
              </div>

              <div class="field">
                <label>Tipo falta</label>
                <div class="value-box">{{ descripcionTipoFalta }}</div>
              </div>

              <div class="field">
                <label>Gravedad</label>
                <div class="value-box">{{ descripcionGravedad }}</div>
              </div>

              <div class="field">
                <label>Fecha inicio inhabilitación</label>
                <div class="value-box">{{ formatearFecha(form.deinhabil) }}</div>
              </div>

              <div class="field">
                <label>Fecha término inhabilitación</label>
                <div class="value-box">{{ formatearFecha(form.ainhabil) }}</div>
              </div>

              <div class="field wide">
                <label>Motivo</label>
                <div class="value-box multiline">{{ mostrar(form.motivo) }}</div>
              </div>
            </div>
          </section>

          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Montos y ejecución</h2>
              <p class="section-text">Fechas de ejecución y montos relacionados.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Fecha ejecución 1</label>
                <div class="value-box">{{ formatearFecha(form.fejec1) }}</div>
              </div>

              <div class="field">
                <label>Fecha ejecución 2</label>
                <div class="value-box">{{ formatearFecha(form.fejec2) }}</div>
              </div>

              <div class="field">
                <label>Monto 1</label>
                <div class="value-box">{{ mostrar(form.monto1) }}</div>
              </div>

              <div class="field">
                <label>Monto 2</label>
                <div class="value-box">{{ mostrar(form.monto2) }}</div>
              </div>

              <div class="field">
                <label>Monto API 1</label>
                <div class="value-box">{{ mostrar(form.montoapi1) }}</div>
              </div>

              <div class="field">
                <label>Monto API 2</label>
                <div class="value-box">{{ mostrar(form.montoapi2) }}</div>
              </div>

              <div class="field">
                <label>Clave moneda 1</label>
                <div class="value-box">{{ descripcionMoneda1 }}</div>
              </div>

              <div class="field">
                <label>Clave moneda 2</label>
                <div class="value-box">{{ descripcionMoneda2 }}</div>
              </div>

              <div class="field">
                <label>Fecha registro</label>
                <div class="value-box">{{ formatearFechaHora(form.fechareg) }}</div>
              </div>

              <div class="field">
                <label>Particular</label>
                <div class="value-box">{{ descripcionParticular }}</div>
              </div>
            </div>
          </section>

          <section class="section-card">
            <div class="section-head">
              <h2 class="section-title">Documento y observaciones</h2>
              <p class="section-text">Enlaces, referencia documental y notas finales.</p>
            </div>

            <div class="grid">
              <div class="field">
                <label>Tipo documento</label>
                <div class="value-box">{{ descripcionTipoDocto }}</div>
              </div>

              <div class="field">
                <label>Fecha documento</label>
                <div class="value-box">{{ formatearFecha(form.fecha_docto) }}</div>
              </div>

              <div class="field wide">
                <label>Título documento</label>
                <div class="value-box">{{ mostrar(form.titulo_docto) }}</div>
              </div>

              <div class="field wide">
                <label>Descripción documento</label>
                <div class="value-box">{{ mostrar(form.descripcion_docto) }}</div>
              </div>

              <div class="field wide">
                <label>Resolución URL</label>
                <div class="value-box url-box">
                  <a
                    v-if="form.resolucionurl"
                    :href="form.resolucionurl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="url-link"
                  >
                    {{ form.resolucionurl }}
                  </a>
                  <span v-else>-</span>
                </div>
              </div>

              <div class="field wide">
                <label>Observaciones</label>
                <div class="value-box multiline">{{ mostrar(form.observaciones) }}</div>
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
import { reactive, ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { catalogosService } from "~/services/catalogosService"
import { estatalService } from "~/services/estatalService"

definePageMeta({
  layout: "admin"
})

const route = useRoute()

const cargandoDetalle = ref(false)
const error = ref("")

const catalogos = reactive({
  generos: [],
  tipos_sancion: [],
  monedas: [],
  niveles_gravedad: [],
  tipos_falta: [],
  tipos_docto: [],
  estatus_sancion: [],
  opciones_particular: [],
  tipos_entidad_sancionadora: [],
  dependencias: [],
})

const form = reactive({
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
  if (valor === null || valor === undefined || valor === "") return "-"
  return String(valor)
}

function normalizarClaveDependencia(value) {
  const clave = (value || "").toString().trim()
  if (!clave) return ""
  return /^[0-9]+$/.test(clave) ? clave.padStart(3, "0") : clave
}

function buscarDependenciaPorClave(clave) {
  const normalizada = normalizarClaveDependencia(clave)
  if (!normalizada) return null

  return catalogos.dependencias.find(
    (item) => normalizarClaveDependencia(item.clave) === normalizada
  ) || null
}

function formatearFecha(value) {
  if (!value) return "-"
  const soloFecha = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:T00:00(?::00(?:\.0+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/)
  if (soloFecha) return `${soloFecha[3]}/${soloFecha[2]}/${soloFecha[1]}`

  const fecha = new Date(value)
  if (Number.isNaN(fecha.getTime())) return value

  const dia = String(fecha.getDate()).padStart(2, "0")
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  const anio = fecha.getFullYear()
  return `${dia}/${mes}/${anio}`
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

function buscarDescripcion(lista, clave, campoDescripcion = "descripcion") {
  if (!clave) return "-"
  const item = lista.find((x) => String(x.clave) === String(clave))
  return item ? `${item.clave} - ${item[campoDescripcion]}` : String(clave)
}

const descripcionDependencia = computed(() => {
  if (!form.dependencia) return "-"
  const item = buscarDependenciaPorClave(form.dependencia)
  return item ? `${item.descripcion} - ${item.clave}` : String(form.dependencia)
})

const descripcionEntidadLabora = computed(() => {
  const item = buscarDependenciaPorClave(form.cve_entidad_labora)
  if (item) return `${item.descripcion} - ${item.clave}`

  return mostrar(form.entidad_labora)
})

const descripcionGenero = computed(() =>
  buscarDescripcion(catalogos.generos, form.genero)
)

const descripcionTipoSancion1 = computed(() =>
  buscarDescripcion(catalogos.tipos_sancion, form.tiposancion)
)

const descripcionTipoSancion2 = computed(() =>
  buscarDescripcion(catalogos.tipos_sancion, form.tiposancion2)
)

const descripcionEstatus1 = computed(() =>
  buscarDescripcion(catalogos.estatus_sancion, form.statussanc1)
)

const descripcionEstatus2 = computed(() =>
  buscarDescripcion(catalogos.estatus_sancion, form.statussanc2)
)

const descripcionTipoFalta = computed(() =>
  buscarDescripcion(catalogos.tipos_falta, form.tipofalta)
)

const descripcionGravedad = computed(() =>
  buscarDescripcion(catalogos.niveles_gravedad, form.gravedad)
)

const descripcionMoneda1 = computed(() =>
  buscarDescripcion(catalogos.monedas, form.cve_moneda1)
)

const descripcionMoneda2 = computed(() =>
  buscarDescripcion(catalogos.monedas, form.cve_moneda2)
)

const descripcionTipoDocto = computed(() =>
  buscarDescripcion(catalogos.tipos_docto, form.tipo_docto, "descripcion")
)

const descripcionParticular = computed(() =>
  buscarDescripcion(catalogos.opciones_particular, form.particular)
)

const descripcionTipoEntidad = computed(() => {
  const dep = buscarDependenciaPorClave(form.dependencia || form.cve_entidad_labora)

  if (!dep) return "-"

  const tipo = catalogos.tipos_entidad_sancionadora.find(
    (item) => String(item.clave) === String(dep.tipo)
  )

  return tipo ? `${tipo.clave} - ${tipo.descripcion}` : String(dep.tipo)
})

async function cargarCatalogos() {
  try {
    const res = await catalogosService.obtenerEstatales()
    const data = res.catalogos || {}

    catalogos.generos = data.generos || []
    catalogos.tipos_sancion = data.tipos_sancion || []
    catalogos.monedas = data.monedas || []
    catalogos.niveles_gravedad = data.niveles_gravedad || []
    catalogos.tipos_falta = data.tipos_falta || []
    catalogos.tipos_docto = data.tipos_docto || []
    catalogos.estatus_sancion = data.estatus_sancion || []
    catalogos.opciones_particular = data.opciones_particular || []
    catalogos.tipos_entidad_sancionadora = data.tipos_entidad_sancionadora || []
    catalogos.dependencias = data.dependencias || []
  } catch (e) {
    error.value = e?.data?.error || "No se pudieron cargar los catálogos."
  }
}

async function cargarDetalle() {
  const anio = (route.query.anio || "").toString().trim()
  const sancionid = (route.query.sancionid || "").toString().trim()

  if (!anio || !sancionid) {
    error.value = "No se recibieron los datos del registro."
    return
  }

  cargandoDetalle.value = true
  error.value = ""

  try {
    const res = await estatalService.obtenerDetalle(anio, sancionid)
    const reg = res.registro || {}
    Object.assign(form, reg)
  } catch (e) {
    error.value = e?.data?.error || "No se pudo cargar el registro."
  } finally {
    cargandoDetalle.value = false
  }
}

onMounted(async () => {
  await cargarCatalogos()
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

.value-box.multiline {
  min-height: 96px;
  align-items: flex-start;
  white-space: pre-wrap;
}

.url-box {
  word-break: break-word;
}

.url-link {
  color: #8e1738;
  text-decoration: none;
}

.url-link:hover {
  text-decoration: underline;
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
