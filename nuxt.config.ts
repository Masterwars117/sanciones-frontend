import tailwindcss from "@tailwindcss/vite"
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  
  css: ["~/assets/css/gob-theme.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "lucide-vue-next",
      ],
    },
  },
  imports: {
    dirs: ["services"],
  },
  runtimeConfig: {
    apiBackendUrl: process.env.NUXT_API_BACKEND_URL || 'http://localhost:9099/api',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
})
