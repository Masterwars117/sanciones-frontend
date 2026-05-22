import type { ApiErrorBody } from "~/types/api"

export class ApiError extends Error {
  status?: number
  data?: ApiErrorBody

  constructor(message: string, status?: number, data?: ApiErrorBody) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

export const api = $fetch.create({
  baseURL: "/api",
})

export async function apiUpload<T>(
  path: string,
  formData: FormData,
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    body: formData,
  })

  const data = (await res.json()) as T & ApiErrorBody

  if (!res.ok) {
    throw new ApiError(data.error || "Error en la solicitud.", res.status, data)
  }

  return data
}
