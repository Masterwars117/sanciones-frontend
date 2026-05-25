<template>
  <div class="rounded-lg border border-border bg-white shadow-sm">
    <div class="flex border-b border-border">
      <button
        type="button"
        class="flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"
        :class="searchType === 'nombre'
          ? 'border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
        @click="setSearchType('nombre')"
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
        @click="setSearchType('expediente')"
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
              :value="paterno"
              type="text"
              placeholder="Ej. García"
              class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
              @input="updateField('paterno', $event.target.value)"
            />
          </div>
          <div class="space-y-2">
            <label for="apellido-materno" class="text-sm font-medium text-foreground">
              Apellido Materno <span class="text-[#9F2241]">*</span>
            </label>
            <input
              id="apellido-materno"
              :value="materno"
              type="text"
              placeholder="Ej. López"
              class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
              @input="updateField('materno', $event.target.value)"
            />
          </div>
          <div class="space-y-2">
            <label for="nombre" class="text-sm font-medium text-foreground">
              Nombre(s) <span class="text-[#9F2241]">*</span>
            </label>
            <input
              id="nombre"
              :value="nombre"
              type="text"
              placeholder="Ej. Juan Carlos"
              class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
              @input="updateField('nombre', $event.target.value)"
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
            :value="expediente"
            type="text"
            placeholder="Ej. EXP-2024-001234"
            class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"
            @input="updateField('expediente', $event.target.value)"
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
          @click="handleClear"
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
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { Search, User, FileText } from "lucide-vue-next"

const props = defineProps({
  standalone: { type: Boolean, default: true },
  tipo: { type: String, default: "nombre" },
  expediente: { type: String, default: "" },
  paterno: { type: String, default: "" },
  materno: { type: String, default: "" },
  nombre: { type: String, default: "" },
})

const emit = defineEmits([
  "update:tipo",
  "update:expediente",
  "update:paterno",
  "update:materno",
  "update:nombre",
  "submit",
  "clear",
  "change-tipo",
])

const router = useRouter()

const internalTipo = ref("nombre")
const internalExpediente = ref("")
const internalPaterno = ref("")
const internalMaterno = ref("")
const internalNombre = ref("")

const searchType = computed({
  get: () => (props.standalone ? internalTipo.value : props.tipo),
  set: (value) => {
    if (props.standalone) {
      internalTipo.value = value
      return
    }
    emit("update:tipo", value)
  },
})

const expediente = computed(() => (props.standalone ? internalExpediente.value : props.expediente))
const paterno = computed(() => (props.standalone ? internalPaterno.value : props.paterno))
const materno = computed(() => (props.standalone ? internalMaterno.value : props.materno))
const nombre = computed(() => (props.standalone ? internalNombre.value : props.nombre))

function updateField(field, value) {
  if (props.standalone) {
    if (field === "expediente") internalExpediente.value = value
    if (field === "paterno") internalPaterno.value = value
    if (field === "materno") internalMaterno.value = value
    if (field === "nombre") internalNombre.value = value
    return
  }
  emit(`update:${field}`, value)
}

function setSearchType(tipo) {
  if (props.standalone) {
    searchType.value = tipo
    return
  }
  emit("change-tipo", tipo)
}

function handleClear() {
  if (props.standalone) {
    internalExpediente.value = ""
    internalPaterno.value = ""
    internalMaterno.value = ""
    internalNombre.value = ""
    return
  }
  emit("clear")
}

function handleSubmit() {
  if (!props.standalone) {
    emit("submit")
    return
  }

  if (searchType.value === "expediente") {
    const exp = internalExpediente.value.trim()
    if (!exp) return

    router.push({
      path: "/buscar",
      query: { tipo: "expediente", q: exp },
    })
    return
  }

  const pat = internalPaterno.value.trim()
  const mat = internalMaterno.value.trim()
  const nom = internalNombre.value.trim()

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
