<template>
  <div class="flex min-h-screen flex-col bg-background">
    <LandingHeaderGob />

    <main class="flex-1">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-[#691C32] to-[#9F2241] py-16 text-white md:py-24">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgtdnptcm0tNGgydjItMnYtMnptLTR2MmgtMnYtMmgyem0tNCAwaC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div class="relative mx-auto max-w-7xl px-4">
          <div class="mx-auto max-w-4xl text-center">
            <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Shield class="h-4 w-4" />
              Portal de Consulta Pública
            </div>

            <h1 class="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Servidores Públicos y Particulares Sancionados
            </h1>

            <p class="mt-6 text-pretty text-lg leading-relaxed text-white/90">
              Sistema de consulta pública de la
              <span class="font-semibold text-white">Secretaría Anticorrupción y Buen Gobierno</span>
              del Estado de Tabasco, en términos de la Ley General de Responsabilidades Administrativas.
            </p>

            <p class="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
              Consulte registros por expediente o por nombre, con fines de transparencia, control administrativo e integridad pública.
            </p>
          </div>
        </div>
      </section>

      <!-- Search Section -->
      <section id="consultas" class="py-12 md:py-16">
        <div class="mx-auto max-w-4xl px-4">
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold text-foreground">Consulta Pública de Sancionados</h2>
            <p class="mt-2 text-muted-foreground">
              Realice búsquedas en el registro estatal y federal de personas sancionadas.
            </p>
          </div>

          <LandingSearchForm />
        </div>
      </section>

      <!-- Info Cards Section -->
      <section class="bg-muted py-12 md:py-16">
        <div class="mx-auto max-w-7xl px-4">
          <div class="mb-10 text-center">
            <h2 class="text-2xl font-bold text-foreground">Información Institucional</h2>
            <p class="mt-2 text-muted-foreground">
              Este portal fortalece la transparencia, la prevención y la consulta ciudadana.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            <div class="rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F2241]/10">
                <Scale class="h-6 w-6 text-[#9F2241]" />
              </div>
              <h3 class="mb-2 text-lg font-semibold text-foreground">Marco normativo</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                Consulta sustentada en la Ley General de Responsabilidades Administrativas y demás disposiciones aplicables.
              </p>
            </div>

            <div class="rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#235B4E]/10">
                <Users class="h-6 w-6 text-[#235B4E]" />
              </div>
              <h3 class="mb-2 text-lg font-semibold text-foreground">Transparencia institucional</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                Herramienta pública orientada a la rendición de cuentas y al acceso abierto a información de interés administrativo.
              </p>
            </div>

            <div class="rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#BC955C]/10">
                <AlertTriangle class="h-6 w-6 text-[#BC955C]" />
              </div>
              <h3 class="mb-2 text-lg font-semibold text-foreground">Integridad pública</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                Facilita la verificación de antecedentes para fortalecer decisiones institucionales y prevenir riesgos administrativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Documents Section -->
      <section id="lineamientos" class="py-12 md:py-16">
        <div class="mx-auto max-w-4xl px-4">
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold text-foreground">Documentos Oficiales</h2>
            <p class="mt-2 text-muted-foreground">
              Consulte lineamientos, disposiciones normativas y materiales de apoyo vinculados al sistema.
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F2241]/10">
                  <FileText class="h-6 w-6 text-[#9F2241]" />
                </div>
                <div>
                  <h4 class="font-medium text-foreground">Lineamientos del Sistema de Sancionados</h4>
                  <p class="text-sm text-muted-foreground">Archivo PDF • 2.53 MB</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#9F2241]">
                <Download class="h-4 w-4" />
                <span class="hidden sm:inline">Descargar</span>
              </div>
            </div>

            <div class="flex items-center justify-between rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#235B4E]/10">
                  <FileText class="h-6 w-6 text-[#235B4E]" />
                </div>
                <div>
                  <h4 class="font-medium text-foreground">Ley General de Responsabilidades Administrativas</h4>
                  <p class="text-sm text-muted-foreground">Archivo PDF • 1.85 MB</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#9F2241]">
                <Download class="h-4 w-4" />
                <span class="hidden sm:inline">Descargar</span>
              </div>
            </div>

            <div class="flex items-center justify-between rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#BC955C]/10">
                  <FileText class="h-6 w-6 text-[#BC955C]" />
                </div>
                <div>
                  <h4 class="font-medium text-foreground">Guía de uso del sistema</h4>
                  <p class="text-sm text-muted-foreground">Archivo PDF • 845 KB</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#9F2241]">
                <Download class="h-4 w-4" />
                <span class="hidden sm:inline">Descargar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-[#235B4E] py-12 text-white md:py-16">
        <div class="mx-auto max-w-4xl px-4 text-center">
          <h2 class="text-2xl font-bold md:text-3xl">Atención y orientación institucional</h2>
          <p class="mt-4 text-pretty text-lg text-white/90">
            Para información adicional sobre el portal, procedimientos o criterios de consulta, comuníquese con la Secretaría Anticorrupción y Buen Gobierno.
          </p>
          <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contacto"
              class="inline-flex items-center justify-center rounded bg-white px-6 py-3 font-medium text-[#235B4E] transition-colors hover:bg-white/90"
            >
              Contacto institucional
            </a>
            <a
              href="#lineamientos"
              class="inline-flex items-center justify-center rounded border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Ver documentos oficiales
            </a>
          </div>
        </div>
      </section>
    </main>

    <LandingFooterGob />
  </div>
</template>

<script setup>
import {
  FileText,
  Download,
  Scale,
  Shield,
  Users,
  AlertTriangle,
} from "lucide-vue-next"

definePageMeta({
  layout: "landing",
})

useHead({
  title: "Servidores Públicos y Particulares Sancionados | Tabasco",
  meta: [
    {
      name: "description",
      content: "Sistema de consulta pública de servidores públicos y particulares sancionados del Estado de Tabasco",
    },
  ],
})
</script>