import tailwindcss from "@tailwindcss/vite"

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
  nitro: {
    devProxy: {
      "/api": {
        //localhost
        target: "http://127.0.0.1:8000/api",
        //server
        //target: "http://10.15.10.38:8000/api",
        changeOrigin: true,
      },
    },
  },
})
