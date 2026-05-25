<template>
  <div class="rounded-lg border border-border bg-white shadow-sm">
    <div class="flex border-b border-border">
      <button
        type="button"
        class="flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"
        :class="searchType === 'nombre'
          ? 'border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
        @click="searchType = 'nombre'"
      >
        <User class="h-4 w-4" />
        Buscar por Nombre
      </button>
      <button
        type="button"
        class="flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"
        :class="searchType === 'expediente'
          ? 'border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
        @click="searchType = 'expediente'"
      >
        <FileText class="h-4 w-4" />
        Buscar por Expediente
      </button>
    </div>

    <form class="p-6" @submit.prevent="handleSubmit">
      <div v-if="searchType === 'nombre'" class="space-y-6">
        <div class="grid gap-6 sm:grid-cols-3">
          <div class="space-y-2">
            <label for="apellido-paterno" class="text-sm font-medium text-foreground">
              Apellido Paterno <span class="text-[#9F2241]">*</span>
            </label>
            <input
              id="apellido-paterno"
              v-model="paterno"
              type="text"
              placeholder="Ej. García"
              required
              class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
            />
          </div>
          <div class="space-y-2">
            <label for="apellido-materno" class="text-sm font-medium text-foreground">
              Apellido Materno <span class="text-[#9F2241]">*</span>
            </label>
            <input
              id="apellido-materno"
              v-model="materno"
              type="text"
              placeholder="Ej. López"
              required
              class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
            />
          </div>
          <div class="space-y-2">
            <label for="nombre" class="text-sm font-medium text-foreground">
              Nombre(s) <span class="text-[#9F2241]">*</span>
            </label>
            <input
              id="nombre"
              v-model="nombre"
              type="text"
              placeholder="Ej. Juan Carlos"
              required
              class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
            />
          </div>
        </div>
      </div>

      <div v-else class="space-y-6">
        <div class="space-y-2">
          <label for="expediente" class="text-sm font-medium text-foreground">
            Número de Expediente <span class="text-[#9F2241]">*</span>
          </label>
          <input
            id="expediente"
            v-model="expediente"
            type="text"
            placeholder="Ej. EXP-2024-001234"
            required
            class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
          />
          <p class="text-xs text-muted-foreground">
            Ingrese el número de expediente completo para realizar la búsqueda.
          </p>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          class="rounded border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          @click="limpiar"
        >
          Limpiar
        </button>
        <button
          type="submit"
          class="inline-flex items-center rounded bg-[#9F2241] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#691C32]"
        >
          <Search class="mr-2 h-4 w-4" />
          Buscar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Search, User, FileText } from "lucide-vue-next"

const router = useRouter()

const searchType = ref("nombre")
const expediente = ref("")
const paterno = ref("")
const materno = ref("")
const nombre = ref("")

function limpiar() {
  expediente.value = ""
  paterno.value = ""
  materno.value = ""
  nombre.value = ""
}

function handleSubmit() {
  if (searchType.value === "expediente") {
    const exp = expediente.value.trim()
    if (!exp) return

    router.push({
      path: "/buscar",
      query: { tipo: "expediente", q: exp },
    })
    return
  }

  const pat = paterno.value.trim()
  const mat = materno.value.trim()
  const nom = nombre.value.trim()

  if (!pat && !mat && !nom) return

  router.push({
    path: "/buscar",
    query: {
      tipo: "nombre",
      paterno: pat,
      materno: mat,
      nombre: nom,
    },
  })
}
</script>
