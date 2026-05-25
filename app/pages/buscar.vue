<template>
  <div class="flex min-h-screen flex-col bg-background">
    <LandingHeaderGob />

    <main class="flex-1">
      <section class="relative bg-gradient-to-br from-[#691C32] to-[#9F2241] py-10 text-white md:py-14">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgtdnptcm0tNGgydjItMnYtMnptLTR2MmgtMnYtMmgyem0tNCAwaC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div class="relative mx-auto max-w-7xl px-4">
          <div class="mx-auto max-w-3xl text-center">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Shield class="h-4 w-4" />
              Sistema de Consulta Oficial
            </div>
            <h1 class="text-balance text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Servidores Públicos y Particulares Sancionados
            </h1>
            <p class="mt-4 text-pretty text-base leading-relaxed text-white/90 md:text-lg">
              En términos de lo previsto por los artículos 27, 77 y 80 de la Ley General de Responsabilidades Administrativas
            </p>
          </div>
        </div>
      </section>

      <section id="consultas" class="py-12 md:py-16">
        <div class="mx-auto max-w-5xl px-4">
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold text-foreground">
              {{ modo === 'expediente' ? 'Búsqueda por Expediente' : 'Búsqueda por Nombre' }}
            </h2>
            <p class="mt-2 text-muted-foreground">
              Consulte el registro de servidores públicos y particulares sancionados del Estado de Tabasco.
            </p>
          </div>

          <LandingSearchForm
            :standalone="false"
            :tipo="modo"
            :expediente="expediente"
            :paterno="paterno"
            :materno="materno"
            :nombre="nombre"
            @change-tipo="irModo"
            @update:expediente="expediente = $event"
            @update:paterno="paterno = $event"
            @update:materno="materno = $event"
            @update:nombre="nombre = $event"
            @submit="onSubmit"
            @clear="onClear"
          />

          <div v-if="buscado && sinResultados" class="mt-8 rounded-lg border border-[#9F2241]/20 bg-[#9F2241]/5 px-6 py-4 text-center font-medium text-[#9F2241]">
            Sin resultados que mostrar
          </div>

          <div v-if="modo === 'expediente' && resultadosExpediente.length > 0" class="mt-8">
            <h3 class="mb-4 text-lg font-semibold text-foreground">Resultados</h3>
            <div class="overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
              <table class="w-full text-sm">
                <thead class="bg-muted">
                  <tr>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Año</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Sanción ID</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Expediente</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Nombre</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Cargo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in resultadosExpediente"
                    :key="`${item.anio}-${item.sancionid}`"
                    class="border-t border-border hover:bg-muted/50"
                  >
                    <td class="px-4 py-3 text-foreground">{{ item.anio }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.sancionid }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.expediente }}</td>
                    <td class="px-4 py-3 text-foreground">{{ nombreCompletoEstatal(item) }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.cargo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="modo === 'nombre' && resultadosEstatales.length > 0" class="mt-8">
            <h3 class="mb-4 text-lg font-semibold text-foreground">Resultados Estatales</h3>
            <div class="overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
              <table class="w-full text-sm">
                <thead class="bg-muted">
                  <tr>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Año</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Sanción ID</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Nombre</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Dependencia</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Cargo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in resultadosEstatales"
                    :key="`${item.anio}-${item.sancionid}`"
                    class="border-t border-border hover:bg-muted/50"
                  >
                    <td class="px-4 py-3 text-foreground">{{ item.anio }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.sancionid }}</td>
                    <td class="px-4 py-3 text-foreground">{{ nombreCompletoEstatal(item) }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.dependencia }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.cargo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="modo === 'nombre' && resultadosFederales.length > 0" class="mt-8">
            <h3 class="mb-4 text-lg font-semibold text-foreground">Resultados Federales</h3>
            <div class="overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
              <table class="w-full text-sm">
                <thead class="bg-muted">
                  <tr>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">RFC</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Homoclave</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Nombre</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Dependencia</th>
                    <th class="px-4 py-3 text-left font-semibold text-foreground">Cargo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in resultadosFederales"
                    :key="`${item.rfc}-${item.homoclave}`"
                    class="border-t border-border hover:bg-muted/50"
                  >
                    <td class="px-4 py-3 text-foreground">{{ item.rfc }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.homoclave }}</td>
                    <td class="px-4 py-3 text-foreground">{{ nombreCompletoFederal(item) }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.dependencia }}</td>
                    <td class="px-4 py-3 text-foreground">{{ item.cargo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LandingFooterGob />
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Shield } from "lucide-vue-next"

definePageMeta({
  layout: "landing",
})

useHead({
  title: "Resultados de Búsqueda | Sancionados Tabasco",
  meta: [
    {
      name: "description",
      content: "Consulta de resultados de servidores públicos y particulares sancionados del Estado de Tabasco",
    },
  ],
})

const route = useRoute()
const router = useRouter()

const modo = ref("expediente")

const expediente = ref("")
const paterno = ref("")
const materno = ref("")
const nombre = ref("")

const resultadosExpediente = ref([])
const resultadosEstatales = ref([])
const resultadosFederales = ref([])

const buscado = ref(false)

const sinResultados = computed(() => {
  if (modo.value === "expediente") {
    return resultadosExpediente.value.length === 0
  }

  return (
    resultadosEstatales.value.length === 0 &&
    resultadosFederales.value.length === 0
  )
})

function limpiarResultados() {
  resultadosExpediente.value = []
  resultadosEstatales.value = []
  resultadosFederales.value = []
}

function nombreCompletoEstatal(item) {
  return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ")
}

function nombreCompletoFederal(item) {
  return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ")
}

function irModo(nuevoModo) {
  limpiarResultados()
  buscado.value = false

  if (nuevoModo === "nombre") {
    expediente.value = ""
    paterno.value = ""
    materno.value = ""
    nombre.value = ""

    router.push({
      path: "/buscar",
      query: {
        tipo: "nombre",
        paterno: "",
        materno: "",
        nombre: "",
      },
    })
    return
  }

  expediente.value = ""
  paterno.value = ""
  materno.value = ""
  nombre.value = ""

  router.push({
    path: "/buscar",
    query: {
      tipo: "expediente",
      q: "",
    },
  })
}

function onSubmit() {
  if (modo.value === "expediente") {
    buscarExpediente()
    return
  }
  buscarNombre()
}

function onClear() {
  expediente.value = ""
  paterno.value = ""
  materno.value = ""
  nombre.value = ""
  limpiarResultados()
  buscado.value = false
}

async function buscarExpediente() {
  if (!expediente.value.trim()) return

  router.push({
    path: "/buscar",
    query: {
      tipo: "expediente",
      q: expediente.value.trim(),
    },
  })
}

async function buscarNombre() {
  if (!paterno.value.trim() && !materno.value.trim() && !nombre.value.trim()) return

  router.push({
    path: "/buscar",
    query: {
      tipo: "nombre",
      paterno: paterno.value.trim(),
      materno: materno.value.trim(),
      nombre: nombre.value.trim(),
    },
  })
}

async function cargarResultados() {
  const tipo = (route.query.tipo || "").toString()

  limpiarResultados()
  buscado.value = false

  if (!tipo) return

  if (tipo === "expediente") {
    modo.value = "expediente"
    expediente.value = (route.query.q || "").toString().trim()

    paterno.value = ""
    materno.value = ""
    nombre.value = ""

    if (!expediente.value) return

    const res = await buscarService.porExpediente(expediente.value)

    resultadosExpediente.value = res.resultados || []
    buscado.value = true
    return
  }

  if (tipo === "nombre") {
    modo.value = "nombre"
    paterno.value = (route.query.paterno || "").toString().trim()
    materno.value = (route.query.materno || "").toString().trim()
    nombre.value = (route.query.nombre || "").toString().trim()

    expediente.value = ""

    if (!paterno.value && !materno.value && !nombre.value) {
      return
    }

    const res = await buscarService.porNombre({
      paterno: paterno.value,
      materno: materno.value,
      nombre: nombre.value,
    })

    resultadosEstatales.value = res.estatal || []
    resultadosFederales.value = res.federal || []
    buscado.value = true
  }
}

watch(
  () => route.query,
  async () => {
    await cargarResultados()
  },
  { deep: true }
)

onMounted(async () => {
  await cargarResultados()
})
</script>
