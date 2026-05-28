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
    public: {
      apiUrl: process.env.NUXT_API_URL || '',
      oauthClientId: process.env.NUXT_OAUTH_CLIENT_ID || '',
      oauthRedirectUri: process.env.VITE_OAUTH_REDIRECT_URI || '',
      oauthBaseUrl: process.env.VITE_OAUTH_BASE_URL || '',
      oauthAuthUrl: process.env.VITE_OAUTH_AUTH_URL || '',
      oauthTokenUrl: process.env.VITE_OAUTH_TOKEN_URL || '',
      oauthRevokeUrl: process.env.VITE_OAUTH_REVOKE_URL || '',
      oauthScope: process.env.VITE_OAUTH_SCOPE || '',
      appName: process.env.VITE_APP_NAME || 'Gestión Documental | SABG',
      appVersion: process.env.VITE_APP_VERSION || '1.0.0',
    },
  },
})
