<template>
  <header class="w-full">
    <!-- Top Bar - GOB.MX style -->
    <div class="bg-[#9F2241] text-white">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-10 items-center justify-between text-sm">
          <div class="flex items-center gap-6">
            <a
              href="https://www.gob.mx"
              class="flex items-center gap-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="font-semibold">gob.mx</span>
            </a>
          </div>
          <div class="hidden items-center gap-4 md:flex">
            <a href="https://www.gob.mx/tramites" class="hover:underline" target="_blank" rel="noopener noreferrer">Trámites</a>
            <a href="https://www.gob.mx/gobierno" class="hover:underline" target="_blank" rel="noopener noreferrer">Gobierno</a>
            <a href="#contacto" class="hover:underline">Contacto</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="border-b border-border bg-white">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-20 items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <div class="flex h-12 w-12 items-center justify-center rounded bg-[#691C32]">
                  <svg viewBox="0 0 40 40" class="h-8 w-8 text-white" fill="currentColor">
                    <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6v12l-12 6-12-6V14l12-6z" />
                    <circle cx="20" cy="20" r="6" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <span class="block text-xl font-bold text-[#691C32]">tabasco</span>
                  <span class="block text-xs text-muted-foreground">.gob.mx</span>
                </div>
              </div>
            </div>
            <div class="hidden h-12 w-px bg-border lg:block" />
            <div class="hidden lg:block">
              <p class="text-sm font-medium text-[#235B4E]">Secretaría de la</p>
              <p class="text-sm font-bold text-[#235B4E]">Función Pública</p>
            </div>
          </div>

          <nav class="hidden items-center gap-1 lg:flex">
            <a href="/" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">
              Inicio
            </a>
            <a href="#consultas" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">
              Consultas
              <ChevronDown class="h-4 w-4" />
            </a>
            <a href="#lineamientos" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">
              Lineamientos
            </a>
            <a href="#transparencia" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">
              Transparencia
              <ChevronDown class="h-4 w-4" />
            </a>
            <a href="#contacto" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">
              Contacto
            </a>
          </nav>

          <div class="flex items-center gap-2">
            <a
              href="#consultas"
              class="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <Search class="h-5 w-5" />
              <span class="sr-only">Buscar</span>
            </a>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted lg:hidden"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <X v-if="mobileMenuOpen" class="h-5 w-5" />
              <Menu v-else class="h-5 w-5" />
              <span class="sr-only">Menú</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="border-b border-border bg-white lg:hidden">
      <nav class="mx-auto max-w-7xl space-y-1 px-4 py-4">
        <a href="/" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]" @click="mobileMenuOpen = false">Inicio</a>
        <a href="#consultas" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]" @click="mobileMenuOpen = false">Consultas</a>
        <a href="#lineamientos" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]" @click="mobileMenuOpen = false">Lineamientos</a>
        <a href="#transparencia" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]" @click="mobileMenuOpen = false">Transparencia</a>
        <a href="#contacto" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]" @click="mobileMenuOpen = false">Contacto</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue"
import { Menu, X, ChevronDown, Search } from "lucide-vue-next"

const mobileMenuOpen = ref(false)
</script>
