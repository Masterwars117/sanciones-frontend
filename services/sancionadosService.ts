import api from "./api"
import type {
  ListarSancionadosParams,
  PaginatedResponse,
  SancionadoEstatalListItem,
  SancionadoFederalListItem,
} from "~/types/api"

export const sancionadosService = {
  async listarEstatales(
    params: Omit<ListarSancionadosParams, "tipo"> = {},
  ): Promise<PaginatedResponse<SancionadoEstatalListItem>> {
    const { data } = await api.get("/sancionados", {
      params: { ...params, tipo: "estatal" },
    })
    return data
  },

  async listarFederales(
    params: Omit<ListarSancionadosParams, "tipo"> = {},
  ): Promise<PaginatedResponse<SancionadoFederalListItem>> {
    const { data } = await api.get("/sancionados", {
      params: { ...params, tipo: "federal" },
    })
    return data
  },
}