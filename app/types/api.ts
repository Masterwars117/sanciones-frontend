export interface CatalogoItem {
  clave: string
  descripcion: string
  tipo?: string | number
}

export interface CatalogosEstatal {
  generos: CatalogoItem[]
  tipos_sancion: CatalogoItem[]
  monedas: CatalogoItem[]
  niveles_gravedad: CatalogoItem[]
  tipos_falta: CatalogoItem[]
  tipos_docto: CatalogoItem[]
  estatus_sancion: CatalogoItem[]
  opciones_particular: CatalogoItem[]
  tipos_entidad_sancionadora: CatalogoItem[]
  dependencias: CatalogoItem[]
  dependencias_por_tipo?: Record<string, CatalogoItem[]>
}

export interface PaginatedResponse<T> {
  results: T[]
  page?: number
  total_pages?: number
  page_size?: number
  next?: boolean | string | null
  previous?: boolean | string | null
}

export interface SancionadoEstatalListItem {
  anio: string
  sancionid: string
  apaterno?: string
  amaterno?: string
  nombres?: string
  expediente?: string
  dependencia?: string
  cargo?: string
  fechareg?: string
  [key: string]: unknown
}

export interface SancionadoFederalListItem {
  rfc: string
  homoclave?: string
  apaterno?: string
  amaterno?: string
  nombres?: string
  dependencia?: string
  autsanc?: string
  cargo?: string
  periodo?: string
  fechares?: string
  [key: string]: unknown
}

export interface EstatalRegistro {
  anio: string
  sancionid: string
  oficio?: string
  f_oficio?: string
  expediente?: string
  f_resolucion?: string
  apaterno?: string
  amaterno?: string
  nombres?: string
  dependencia?: string
  cargo?: string
  entidad_labora?: string
  tiposancion?: string
  tiposancion2?: string
  periodo?: string
  deinhabil?: string
  ainhabil?: string
  motivo?: string
  statussanc1?: string
  statussanc2?: string
  rfc?: string
  fejec1?: string
  fejec2?: string
  monto1?: string
  monto2?: string
  curp?: string
  fechareg?: string
  genero?: string
  idsesea?: string
  cve_entidad_labora?: string
  tipofalta?: string
  nivelcateg?: string
  resolucionurl?: string
  observaciones?: string
  cve_moneda1?: string
  cve_moneda2?: string
  tipo_docto?: string
  titulo_docto?: string
  descripcion_docto?: string
  fecha_docto?: string
  particular?: string
  montoapi1?: string
  montoapi2?: string
  gravedad?: string
  [key: string]: unknown
}

export interface EstatalEditarPayload extends EstatalRegistro {
  anio_original: string
  sancionid_original: string
}

export interface FederalRegistro {
  dependencia?: string
  rfc: string
  homoclave?: string
  apaterno?: string
  amaterno?: string
  nombres?: string
  autsanc?: string
  cargo?: string
  periodo?: string
  fechares?: string
  fechanot?: string
  deinhabil?: string
  ainhabil?: string
  fechainf?: string
  [key: string]: unknown
}

export interface FederalEditarPayload extends FederalRegistro {
  rfc_original: string
}

export interface MensajeResponse {
  message?: string
}

export interface DetalleEstatalResponse {
  registro: EstatalRegistro
}

export interface DetalleFederalResponse {
  registro: FederalRegistro
}

export interface CatalogosEstatalResponse {
  catalogos: CatalogosEstatal
}

export interface BuscarExpedienteResponse {
  resultados: Record<string, unknown>[]
}

export interface BuscarNombreResponse {
  estatal: Record<string, unknown>[]
  federal: Record<string, unknown>[]
}

export interface CargaExcelResponse {
  insertados?: number
  duplicados?: number
  omitidos?: number
  error?: string
}

export interface ListarSancionadosParams {
  tipo: "estatal" | "federal"
  q?: string
  page?: number
  page_size?: number
}

export interface BuscarNombreParams {
  paterno?: string
  materno?: string
  nombre?: string
}

export interface ApiErrorBody {
  error?: string
}
