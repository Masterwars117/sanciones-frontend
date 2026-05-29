import api from "./api"
import type { CatalogosEstatalResponse } from "~/types/api"

export const catalogosService = {
  async obtenerEstatales(): Promise<CatalogosEstatalResponse> {
    const { data } = await api.get("/catalogos/estatal")
    return data
  },
}