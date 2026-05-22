export default defineNuxtConfig({
  imports: {
    dirs: ["services"],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:8000/api",
        changeOrigin: true,
      },
    },
  },
})
