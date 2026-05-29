import api from "./api"
import type {
  DetalleEstatalResponse,
  EstatalEditarPayload,
  EstatalRegistro,
  MensajeResponse,
} from "~/types/api"

export const estatalService = {
  async obtenerDetalle(
    anio: string,
    sancionid: string,
  ): Promise<DetalleEstatalResponse> {
    const { data } = await api.get("/estatal/detalle", {
      params: { anio, sancionid },
    })
    return data
  },

  async crear(registro: EstatalRegistro): Promise<MensajeResponse> {
    const { data } = await api.post("/estatal/crear", registro)
    return data
  },

  async editar(payload: EstatalEditarPayload): Promise<MensajeResponse> {
    const { data } = await api.post("/estatal/editar", payload)
    return data
  },

  async eliminar(anio: string, sancionid: string): Promise<MensajeResponse> {
    const { data } = await api.post("/estatal/eliminar", { anio, sancionid })
    return data
  },
}