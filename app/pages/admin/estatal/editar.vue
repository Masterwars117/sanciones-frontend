<template>
  <div>
    <div class="head">
      <div>
        <h1 class="title">Editar registro estatal</h1>
        <p class="subtitle">Tabla: INHABILITADOS</p>
      </div>

      <NuxtLink to="/admin/estatal" class="btn-secondary">
        Volver
      </NuxtLink>
    </div>

    <div class="card">
      <div v-if="cargandoDetalle || cargandoCatalogos" class="empty">
        {{ cargandoCatalogos ? "Cargando catálogos..." : "Cargando registro..." }}
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
                <label>Año *</label>
                <input
                  v-model="form.anio"
                  class="input input-disabled"
                  disabled
                />
              </div>

              <div class="field">
                <label>Sanción ID *</label>
                <input
                  v-model="form.sancionid"
                  class="input input-disabled"
                  disabled
                />
              </div>

              <div class="field wide">
                <label>Entidad que sanciona</label>
                <div class="radio-grid">
                  <button
                    v-for="item in catalogos.tipos_entidad_sancionadora"
                    :key="item.clave"
                    type="button"
                    class="radio-like"
                    :class="{ active: tipoEntidadSancionadora === String(item.clave) }"
                    @click="toggleTipoEntidad(String(item.clave))"
                  >
                    {{ item.descripcion }}
                  </button>
                </div>
              </div>

              <div class="field wide">
                <label>Dependencia / Institución</label>
                <select v-model="form.dependencia" class="input" @change="alCambiarDependencia">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in dependenciasFiltradas"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Clave entidad labora</label>
                <input
                  v-model="form.cve_entidad_labora"
                  class="input"
                  readonly
                  placeholder="Se completa automáticamente"
                />
              </div>

              <div class="field">
                <label>Entidad labora</label>
                <input
                  v-model="form.entidad_labora"
                  class="input"
                  readonly
                  placeholder="Se completa automáticamente"
                />
              </div>

              <div class="field">
                <label>Expediente</label>
                <input
                  v-model.trim="form.expediente"
                  class="input"
                  placeholder="Ej. EXP-2025-001"
                />
              </div>

              <div class="field">
                <label>ID SESEA</label>
                <input
                  v-model.trim="form.idsesea"
                  class="input"
                  placeholder="Identificador interno"
                />
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
                <input
                  v-model.trim="form.apaterno"
                  class="input"
                  placeholder="Apellido paterno"
                />
              </div>

              <div class="field">
                <label>Apellido materno</label>
                <input
                  v-model.trim="form.amaterno"
                  class="input"
                  placeholder="Apellido materno"
                />
              </div>

              <div class="field wide">
                <label>Nombres</label>
                <input
                  v-model.trim="form.nombres"
                  class="input"
                  placeholder="Nombre o nombres"
                />
              </div>

              <div class="field">
                <label>RFC</label>
                <input
                  v-model.trim="form.rfc"
                  class="input upper"
                  maxlength="13"
                  @input="form.rfc = normalizeRFCInput(form.rfc)"
                  placeholder="RFC de 12 o 13 caracteres"
                />
              </div>

              <div class="field">
                <label>CURP</label>
                <input
                  v-model.trim="form.curp"
                  class="input upper"
                  maxlength="18"
                  @input="form.curp = normalizeCURPInput(form.curp)"
                  placeholder="CURP de 18 caracteres"
                />
              </div>

              <div class="field">
                <label>Género</label>
                <select v-model="form.genero" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.generos"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Cargo</label>
                <input
                  v-model.trim="form.cargo"
                  class="input"
                  placeholder="Cargo o puesto"
                />
              </div>

              <div class="field">
                <label>Nivel categoría</label>
                <input
                  v-model.trim="form.nivelcateg"
                  class="input"
                  placeholder="Nivel o categoría"
                />
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
                <input
                  v-model.trim="form.oficio"
                  class="input"
                  placeholder="Número o referencia de oficio"
                />
              </div>

              <div class="field">
                <label>Fecha oficio</label>
                <input v-model="form.f_oficio" type="date" class="input" />
              </div>

              <div class="field">
                <label>Fecha resolución</label>
                <input v-model="form.f_resolucion" type="date" class="input" />
              </div>

              <div class="field">
                <label>Periodo</label>
                <input
                  v-model.trim="form.periodo"
                  class="input"
                  placeholder="Ej. 6 meses / 1 año"
                />
              </div>

              <div class="field">
                <label>Tipo sanción 1</label>
                <select v-model="form.tiposancion" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.tipos_sancion"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Tipo sanción 2</label>
                <select v-model="form.tiposancion2" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.tipos_sancion"
                    :key="`ts2-${item.clave}`"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Estatus sanción 1</label>
                <select v-model="form.statussanc1" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.estatus_sancion"
                    :key="`es1-${item.clave}`"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Estatus sanción 2</label>
                <select v-model="form.statussanc2" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.estatus_sancion"
                    :key="`es2-${item.clave}`"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Tipo falta</label>
                <select v-model="form.tipofalta" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.tipos_falta"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Gravedad</label>
                <select v-model="form.gravedad" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.niveles_gravedad"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Fecha inicio inhabilitación</label>
                <input v-model="form.deinhabil" type="date" class="input" />
              </div>

              <div class="field">
                <label>Fecha término inhabilitación</label>
                <input v-model="form.ainhabil" type="date" class="input" />
              </div>

              <div class="field wide">
                <label>Motivo</label>
                <textarea
                  v-model.trim="form.motivo"
                  class="input textarea"
                  placeholder="Descripción del motivo de la sanción"
                ></textarea>
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
                <input v-model="form.fejec1" type="date" class="input" />
              </div>

              <div class="field">
                <label>Fecha ejecución 2</label>
                <input v-model="form.fejec2" type="date" class="input" />
              </div>

              <div class="field">
                <label>Monto 1</label>
                <input
                  v-model.trim="form.monto1"
                  class="input"
                  placeholder="Monto textual o libre"
                />
              </div>

              <div class="field">
                <label>Monto 2</label>
                <input
                  v-model.trim="form.monto2"
                  class="input"
                  placeholder="Monto textual o libre"
                />
              </div>

              <div class="field">
                <label>Monto API 1</label>
                <input
                  v-model.trim="form.montoapi1"
                  type="number"
                  step="any"
                  class="input"
                  placeholder="0.00"
                />
              </div>

              <div class="field">
                <label>Monto API 2</label>
                <input
                  v-model.trim="form.montoapi2"
                  type="number"
                  step="any"
                  class="input"
                  placeholder="0.00"
                />
              </div>

              <div class="field">
                <label>Clave moneda 1</label>
                <select v-model="form.cve_moneda1" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.monedas"
                    :key="`m1-${item.clave}`"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Clave moneda 2</label>
                <select v-model="form.cve_moneda2" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.monedas"
                    :key="`m2-${item.clave}`"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Fecha registro</label>
                <input v-model="form.fechareg" type="date" class="input" />
              </div>

              <div class="field">
                <label>Particular</label>
                <select v-model="form.particular" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.opciones_particular"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.clave }} - {{ item.descripcion }}
                  </option>
                </select>
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
                <select v-model="form.tipo_docto" class="input">
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="item in catalogos.tipos_docto"
                    :key="item.clave"
                    :value="item.clave"
                  >
                    {{ item.descripcion }}
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Fecha documento</label>
                <input v-model="form.fecha_docto" type="date" class="input" />
              </div>

              <div class="field wide">
                <label>Título documento</label>
                <input
                  v-model.trim="form.titulo_docto"
                  class="input"
                  placeholder="Título o nombre del documento"
                />
              </div>

              <div class="field wide">
                <label>Descripción documento</label>
                <input
                  v-model.trim="form.descripcion_docto"
                  class="input"
                  placeholder="Breve descripción documental"
                />
              </div>

              <div class="field wide">
                <label>Resolución URL</label>
                <input
                  v-model.trim="form.resolucionurl"
                  class="input"
                  placeholder="https://..."
                />
              </div>

              <div class="field wide">
                <label>Observaciones</label>
                <textarea
                  v-model.trim="form.observaciones"
                  class="input textarea"
                  placeholder="Notas u observaciones adicionales"
                ></textarea>
              </div>
            </div>
          </section>
        </div>

        <div class="actions">
          <button class="btn-primary" :disabled="guardando" @click="guardar">
            {{ guardando ? "Actualizando..." : "Actualizar registro" }}
          </button>
        </div>

        <div v-if="mensaje" class="ok-box">{{ mensaje }}</div>
        <div v-if="error" class="error-box">{{ error }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

definePageMeta({
  layout: "admin"
})

const route = useRoute()
const router = useRouter()

const guardando = ref(false)
const cargandoDetalle = ref(false)
const cargandoCatalogos = ref(true)
const mensaje = ref("")
const error = ref("")
const anioOriginal = ref("")
const sancionidOriginal = ref("")
const tipoEntidadSancionadora = ref("")

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
  dependencias_por_tipo: {},
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

function normalizeRFCInput(value) {
  return (value || "")
    .toUpperCase()
    .replace(/[\s-]/g, "")
}

function normalizeCURPInput(value) {
  return (value || "")
    .toUpperCase()
    .replace(/[\s-]/g, "")
}

function validarRFCEstatal(rfc) {
  return /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/.test(rfc)
}

function validarCURP(curp) {
  return /^[A-Z][AEIOUX][A-Z]{2}[0-9]{6}[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9][0-9]$/.test(curp)
}

function validarFormulario() {
  form.rfc = normalizeRFCInput(form.rfc)
  form.curp = normalizeCURPInput(form.curp)

  if (form.rfc && !validarRFCEstatal(form.rfc)) {
    error.value = "RFC inválido. En estatal solo se permiten RFC de 12 o 13 caracteres con estructura válida."
    return false
  }

  if (form.curp && !validarCURP(form.curp)) {
    error.value = "CURP inválida. Debe tener 18 caracteres y estructura válida."
    return false
  }

  return true
}

const dependenciasFiltradas = computed(() => {
  if (!tipoEntidadSancionadora.value) {
    return catalogos.dependencias
  }
  return catalogos.dependencias_por_tipo?.[tipoEntidadSancionadora.value] || []
})

async function cargarCatalogos() {
  cargandoCatalogos.value = true
  error.value = ""

  try {
    const res = await $fetch("/api/catalogos/estatal")
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
    catalogos.dependencias_por_tipo = data.dependencias_por_tipo || {}
  } catch (e) {
    error.value = e?.data?.error || "No se pudieron cargar los catálogos."
  } finally {
    cargandoCatalogos.value = false
  }
}

function toggleTipoEntidad(valor) {
  if (tipoEntidadSancionadora.value === valor) {
    tipoEntidadSancionadora.value = ""
    form.dependencia = ""
    form.cve_entidad_labora = ""
    form.entidad_labora = ""
    return
  }

  tipoEntidadSancionadora.value = valor
  form.dependencia = ""
  form.cve_entidad_labora = ""
  form.entidad_labora = ""
}

function alCambiarDependencia() {
  const dep = catalogos.dependencias.find((item) => item.clave === form.dependencia)
  if (!dep) {
    form.cve_entidad_labora = ""
    form.entidad_labora = ""
    return
  }

  form.cve_entidad_labora = dep.clave
  form.entidad_labora = dep.descripcion
  tipoEntidadSancionadora.value = String(dep.tipo)
}

function sincronizarDependenciaActual() {
  const dep = catalogos.dependencias.find((item) => item.clave === form.dependencia)
  if (!dep) return

  form.cve_entidad_labora = dep.clave
  form.entidad_labora = dep.descripcion
  tipoEntidadSancionadora.value = String(dep.tipo)
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
    const res = await $fetch("/api/estatal/detalle", {
      query: { anio, sancionid }
    })

    const reg = res.registro || {}

    anioOriginal.value = reg.anio || ""
    sancionidOriginal.value = reg.sancionid || ""

    Object.assign(form, reg)
    sincronizarDependenciaActual()
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
    const res = await $fetch("/api/estatal/editar", {
      method: "POST",
      body: {
        anio_original: anioOriginal.value,
        sancionid_original: sancionidOriginal.value,
        ...form
      }
    })

    mensaje.value = res.message || "Registro actualizado correctamente."

    setTimeout(() => {
      router.push("/admin/estatal")
    }, 900)
  } catch (e) {
    error.value = e?.data?.error || "No se pudo actualizar el registro."
  } finally {
    guardando.value = false
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

.input {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 12px;
  background: white;
}

.input-disabled {
  background: #f5f5f5;
  color: #666;
}

.upper {
  text-transform: uppercase;
}

.textarea {
  min-height: 96px;
  resize: vertical;
}

.radio-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  background: #fafafa;
}

.radio-like {
  border: 1px solid #cfcfcf;
  background: white;
  color: #333;
  border-radius: 10px;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s ease;
}

.radio-like:hover {
  background: #f7f7f7;
}

.radio-like.active {
  background: #8e1738;
  color: white;
  border-color: #8e1738;
  font-weight: 600;
}

.actions {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
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
  display: inline-block;
  background: #555;
}

.empty {
  padding: 42px 20px;
  text-align: center;
  color: #777;
  border: 1px dashed #ccc;
  border-radius: 10px;
}

.ok-box {
  margin-top: 14px;
  color: #0a7a2f;
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

  .grid,
  .radio-grid {
    grid-template-columns: 1fr;
  }

  .field.wide {
    grid-column: span 1;
  }

  .actions {
    justify-content: stretch;
  }

  .actions .btn-primary {
    width: 100%;
  }
}
</style>