<template>
  <footer class="bg-[#235B4E] text-white">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded bg-white/10">
              <svg viewBox="0 0 40 40" class="h-8 w-8 text-white" fill="currentColor">
                <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6v12l-12 6-12-6V14l12-6z" />
                <circle cx="20" cy="20" r="6" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span class="block text-xl font-bold">TABASCO</span>
              <span class="block text-xs text-white/70">.gob.mx</span>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-white/80">
            Secretaría de la Función Pública del Gobierno del Estado de Tabasco.
            Comprometidos con la transparencia y el combate a la corrupción.
          </p>
        </div>

        <div id="contacto" class="space-y-4">
          <h3 class="text-lg font-semibold">Contacto</h3>
          <ul class="space-y-3 text-sm text-white/80">
            <li class="flex items-start gap-3">
              <MapPin class="mt-0.5 h-4 w-4 shrink-0" />
              <span>Av. Paseo Tabasco #1504 Col. Tabasco 2000, C.P. 86035, Villahermosa, Tabasco, MX</span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="h-4 w-4 shrink-0" />
              <span>+52 (993) 3 10 47 80 Ext. 5090</span>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="h-4 w-4 shrink-0" />
              <a href="mailto:contacto@tabasco.gob.mx" class="hover:underline">
                contacto@tabasco.gob.mx
              </a>
            </li>
          </ul>
        </div>

        <div id="transparencia" class="space-y-4">
          <h3 class="text-lg font-semibold">Transparencia</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="https://transparencia.tabasco.gob.mx/"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portal de Transparencia
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://itaip.org.mx/"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ITAIP
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.infomextabasco.org.mx/"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Infomex
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://portalanticorrupcion.tabasco.gob.mx:85/aviso-de-privacidad"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aviso de Privacidad
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Enlaces Rápidos</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="https://www.gob.mx"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                gob.mx
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.gob.mx/curp/"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consulta tu CURP
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Gobierno_Tab"
                class="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter @Gobierno_Tab
                <ExternalLink class="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 bg-[#10312B]">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>{{ year }} Gobierno del Estado de Tabasco. Todos los derechos reservados.</p>
          <div class="flex gap-4">
            <span>Secretaría de la Función Pública</span>
            <span>Unidad de Apoyo Técnico e Informático</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Mail, MapPin, ExternalLink } from "lucide-vue-next"

const year = new Date().getFullYear()
</script>
