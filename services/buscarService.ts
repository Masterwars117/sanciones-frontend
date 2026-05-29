import api from "./api"
import type {
  BuscarExpedienteResponse,
  BuscarNombreParams,
  BuscarNombreResponse,
} from "~/types/api"

export const buscarService = {
  async porExpediente(q: string): Promise<BuscarExpedienteResponse> {
    const { data } = await api.get("/buscar-expediente", {
      params: { q },
    })
    return data
  },

  async porNombre(params: BuscarNombreParams): Promise<BuscarNombreResponse> {
    const { data } = await api.get("/buscar-nombre", {
      params,
    })
    return data
  },
}