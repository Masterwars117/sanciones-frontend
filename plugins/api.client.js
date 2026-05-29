import api from '~/services/api'

export default defineNuxtPlugin(() => {
  const { public: config } = useRuntimeConfig()
  api.defaults.baseURL = config.apiBase || '/api'
})
