import api from "./api"
import type {
  CargaExcelResponse,
  DetalleFederalResponse,
  FederalEditarPayload,
  FederalRegistro,
  MensajeResponse,
} from "~/types/api"

export const federalService = {
  async obtenerDetalle(rfc: string): Promise<DetalleFederalResponse> {
    const { data } = await api.get("/federal/detalle", {
      params: { rfc },
    })
    return data
  },

  async crear(registro: FederalRegistro): Promise<MensajeResponse> {
    const { data } = await api.post("/federal/crear", registro)
    return data
  },

  async editar(payload: FederalEditarPayload): Promise<MensajeResponse> {
    const { data } = await api.post("/federal/editar", payload)
    return data
  },

  async eliminar(rfc: string): Promise<MensajeResponse> {
    const { data } = await api.post("/federal/eliminar", { rfc })
    return data
  },

  async cargarExcel(file: File): Promise<CargaExcelResponse> {
    const formData = new FormData()
    formData.append("file", file)

    const { data } = await api.post("/federal/cargar-excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return data
  },
}