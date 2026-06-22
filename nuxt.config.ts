// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // ─── Módulos ───────────────────────────────────────────
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],

  // ─── Modo SPA (sin Server-Side Rendering) ─────────────
  // Nuestro proyecto es un panel interno, no necesita SSR.
  ssr: false,

  // ─── Variables de entorno ──────────────────────────────
  // NUXT_* y NUXT_PUBLIC_* del .env sobreescriben estos valores en runtime.
  runtimeConfig: {
    apiBackendUrl: '',
    public: {
      apiBase: '/api',
      oauthClientId: '',
      oauthRedirectUri: '',
      oauthBaseUrl: '',
      oauthAuthUrl: '',
      oauthTokenUrl: '',
      oauthRevokeUrl: '',
      oauthScope: 'read:user',
      appName: 'Gestión Documental | SABG',
      appVersion: '1.0.0',
      appEnvironment: 'development',
      debugMode: false,
      logLevel: 'info',
      useMock: false,
    },
  },

  // ─── Proxy de desarrollo (/api → backend real) ─────────
  // NUXT_API_BACKEND_URL debe apuntar al Django accesible desde donde corre Nitro:
  // host → localhost:8000 | Docker → http://django:8000/api (ver docker/dev/docker-compose.yml)
  routeRules: {
    '/api/**': {
      proxy: `${process.env.NUXT_API_BACKEND_URL || 'http://localhost:8000/api'}/**`,
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
  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/gob-theme.css'],

  // ─── Tailwind CSS ─────────────────────────────────────
  vite: {
    plugins: [tailwindcss()],
  },

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
