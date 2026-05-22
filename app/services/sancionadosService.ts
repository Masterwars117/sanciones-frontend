import { api } from "./api"
import type {
  ListarSancionadosParams,
  PaginatedResponse,
  SancionadoEstatalListItem,
  SancionadoFederalListItem,
} from "~/types/api"

export const sancionadosService = {
  listarEstatales(params: Omit<ListarSancionadosParams, "tipo"> = {}) {
    return api<PaginatedResponse<SancionadoEstatalListItem>>("/sancionados", {
      query: { ...params, tipo: "estatal" },
    })
  },

  listarFederales(params: Omit<ListarSancionadosParams, "tipo"> = {}) {
    return api<PaginatedResponse<SancionadoFederalListItem>>("/sancionados", {
      query: { ...params, tipo: "federal" },
    })
  },
}
