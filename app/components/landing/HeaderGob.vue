<template>
  <header class="w-full">
    <!-- Franja superior -->
    <div class="bg-[#9F2241] text-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-sm">
        <div class="font-semibold">gob.mx</div>

        <div class="hidden items-center gap-5 md:flex">
          <a href="https://www.gob.mx/index.xhtml" class="hover:underline">Trámites</a>
          <a href="https://www.gob.mx/gobierno" class="hover:underline">Gobierno</a>
        </div>
      </div>
    </div>

    <!-- Barra principal -->
    <div class="border-b border-[#c9a96b] bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex min-h-[86px] items-center justify-between gap-4 py-4">
          <!-- Izquierda -->
          <div class="flex min-w-0 items-center gap-4">
            <button
              type="button"
              class="rounded-md p-2 text-[#545454] hover:bg-muted lg:hidden"
              @click="menuAbierto = !menuAbierto"
            >
              <Menu v-if="!menuAbierto" class="h-5 w-5" />
              <X v-else class="h-5 w-5" />
            </button>

            <NuxtLink to="/" class="flex min-w-0 items-center gap-4">
              <div class="logo-wrap">
                <img
                  src="/images/logo-gobmx.png"
                  alt="Logo gob.mx"
                  class="logo-gobmx"
                />
              </div>

              <div class="flex min-w-0 items-center gap-3">
                <div class="leading-tight">
                  <div class="text-[15px] font-bold text-[#9F2241] sm:text-[16px]">
                    tabasco
                  </div>
                  <div class="text-xs text-[#6F7271]">.gob.mx</div>
                </div>

                <div class="hidden h-10 w-px bg-[#d9d9d9] sm:block"></div>

                <div class="min-w-0 leading-tight">
                  <div class="text-sm font-medium text-[#235B4E] sm:text-[15px]">
                    Secretaría Anticorrupción
                  </div>
                  <div class="text-sm font-bold text-[#235B4E] sm:text-[15px]">
                    y Buen Gobierno
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Derecha escritorio -->
<div class="hidden items-center gap-8 lg:flex">
  <NuxtLink to="/" class="nav-link">Inicio</NuxtLink>

  <a href="#consultas" class="nav-link inline-flex items-center gap-1">
    Consultas
  </a>

  <a href="#lineamientos" class="nav-link">Lineamientos</a>

  <a href="#contacto" class="nav-link">Contacto</a>

  <!-- Lupa -->
  <a
    href="#consultas"
    class="rounded-md p-2 text-[#6F7271] transition hover:bg-muted hover:text-[#9F2241]"
    aria-label="Buscar"
  >
    <Search class="h-5 w-5" />
  </a>
</div>
          </div>
        

        <!-- Menú móvil -->
        <div v-if="menuAbierto" class="border-t border-border pb-4 pt-4 lg:hidden">
          <nav class="flex flex-col gap-3">
            <NuxtLink to="/" class="mobile-link" @click="menuAbierto = false">Inicio</NuxtLink>
            <a href="#consultas" class="mobile-link" @click="menuAbierto = false">Consultas</a>
            <a href="#lineamientos" class="mobile-link" @click="menuAbierto = false">Lineamientos</a>
            <a href="#transparencia" class="mobile-link" @click="menuAbierto = false">Transparencia</a>
            <a href="#contacto" class="mobile-link" @click="menuAbierto = false">Contacto</a>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue"
import { ChevronDown, Menu, Search, X } from "lucide-vue-next"

const menuAbierto = ref(false)
</script>

<style scoped>
.logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 82px;
  padding: 8px 10px;
  border-radius: 12px;
  background: linear-gradient(180deg, #d7bf93 0%, #c7a36c 100%);
  box-shadow: inset 0 0 0 1px rgba(105, 28, 50, 0.08);
  flex-shrink: 0;
}

.logo-gobmx {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 640px) {
  .logo-wrap {
    width: 118px;
    height: 68px;
    padding: 6px 8px;
  }
}

.nav-link {
  color: #545454;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #9f2241;
}

.mobile-link {
  color: #545454;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 4px;
  border-radius: 8px;
}

.mobile-link:hover {
  background: #f5f5f5;
  color: #9f2241;
}

@media (max-width: 640px) {
  .logo-wrap {
    width: 74px;
    height: 50px;
    padding: 6px 8px;
  }
}
</style>