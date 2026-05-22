import { api, apiUpload } from "./api"
import type {
  CargaExcelResponse,
  DetalleFederalResponse,
  FederalEditarPayload,
  FederalRegistro,
  MensajeResponse,
} from "~/types/api"

export const federalService = {
  obtenerDetalle(rfc: string) {
    return api<DetalleFederalResponse>("/federal/detalle", {
      query: { rfc },
    })
  },

  crear(registro: FederalRegistro) {
    return api<MensajeResponse>("/federal/crear", {
      method: "POST",
      body: registro,
    })
  },

  editar(payload: FederalEditarPayload) {
    return api<MensajeResponse>("/federal/editar", {
      method: "POST",
      body: payload,
    })
  },

  eliminar(rfc: string) {
    return api<MensajeResponse>("/federal/eliminar", {
      method: "POST",
      body: { rfc },
    })
  },

  cargarExcel(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    return apiUpload<CargaExcelResponse>("/federal/cargar-excel", formData)
  },
}
