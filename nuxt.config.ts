// nuxt.config.ts
export default defineNuxtConfig({
  // ─── Módulos ───────────────────────────────────────────
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],

  // ─── Modo SPA (sin Server-Side Rendering) ─────────────
  // Nuestro proyecto es un panel interno, no necesita SSR.
  ssr: false,

  // ─── Variables de entorno ──────────────────────────────
  // En Nuxt 4, las variables VITE_* siguen funcionando,
  // pero la convención nueva es usar NUXT_PUBLIC_*
  runtimeConfig: {
    public: {
      apiUrl: process.env.VITE_API_URL || '',
      oauthClientId: process.env.VITE_OAUTH_CLIENT_ID || '',
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

  // ─── Vuetify ───────────────────────────────────────────
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#991547',
              secondary: '#BC955C',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
              surface: '#FAFAFA',
              background: '#FFFFFF',
            },
          },
          dark: {
            colors: {
              primary: '#2196F3',
              secondary: '#616161',
              accent: '#FF4081',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
              surface: '#212121',
              background: '#121212',
            },
          },
        },
      },
      defaults: {
        VBtn: { variant: 'flat', rounded: 'md' },
        VCard: { rounded: 'lg' },
        VTextField: { variant: 'outlined', density: 'comfortable' },
      },
    },
  },

  // ─── CSS Global ────────────────────────────────────────
  css: ['@mdi/font/css/materialdesignicons.css'],

  // ─── Google Fonts (reemplaza lo que estaba en index.html) ─
  app: {
    head: {
      title: 'Gestión Documental | SISTEMA ESTATAL DE LOS REGISTROS',
      htmlAttrs: { lang: 'es-MX' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SISTEMA ESTATAL DE LOS REGISTROS' },
        { name: 'author', content: 'Gestión Documental | SABG' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },

  // ─── Compatibilidad Nuxt 4 ────────────────────────────
  compatibilityDate: '2025-01-01',
})
