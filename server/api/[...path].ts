import { proxyRequest } from "h3"
import { joinURL } from "ufo"

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const path = getRouterParam(event, "path") || ""
  const query = getQuery(event)
  const queryString = new URLSearchParams(
    query as Record<string, string>,
  ).toString()
  const target = joinURL(config.apiBackendUrl, path)
  const url = queryString ? `${target}?${queryString}` : target

  return proxyRequest(event, url)
})
