<template>
  <div class="redirecting">
    Cargando módulo...
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

definePageMeta({
  layout: "admin"
})

const router = useRouter()

onMounted(() => {
  router.replace("/admin/estatal")
})
</script>

<style scoped>
.redirecting {
  color: #666;
  font-family: Arial, sans-serif;
}
</style>