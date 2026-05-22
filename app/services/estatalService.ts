import { api } from "./api"
import type {
  DetalleEstatalResponse,
  EstatalEditarPayload,
  EstatalRegistro,
  MensajeResponse,
} from "~/types/api"

export const estatalService = {
  obtenerDetalle(anio: string, sancionid: string) {
    return api<DetalleEstatalResponse>("/estatal/detalle", {
      query: { anio, sancionid },
    })
  },

  crear(registro: EstatalRegistro) {
    return api<MensajeResponse>("/estatal/crear", {
      method: "POST",
      body: registro,
    })
  },

  editar(payload: EstatalEditarPayload) {
    return api<MensajeResponse>("/estatal/editar", {
      method: "POST",
      body: payload,
    })
  },

  eliminar(anio: string, sancionid: string) {
    return api<MensajeResponse>("/estatal/eliminar", {
      method: "POST",
      body: { anio, sancionid },
    })
  },
}
