import { api } from "./api"
import type { CatalogosEstatalResponse } from "~/types/api"

export const catalogosService = {
  obtenerEstatales() {
    return api<CatalogosEstatalResponse>("/catalogos/estatal")
  },
}
