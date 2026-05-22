import { api } from "./api"
import type {
  BuscarExpedienteResponse,
  BuscarNombreParams,
  BuscarNombreResponse,
} from "~/types/api"

export const buscarService = {
  porExpediente(q: string) {
    return api<BuscarExpedienteResponse>("/buscar-expediente", {
      query: { q },
    })
  },

  porNombre(params: BuscarNombreParams) {
    return api<BuscarNombreResponse>("/buscar-nombre", {
      query: params,
    })
  },
}
