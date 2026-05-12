<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Acceso Administrador</h1>

      <input v-model="usuario" type="text" class="input" placeholder="Usuario" />
      <input v-model="password" type="password" class="input" placeholder="Contraseña" />

      <button class="btn-login" @click="login">Ingresar</button>

      <p v-if="error" class="error-text">Usuario o contraseña incorrectos.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

definePageMeta({
  layout: false
})

const router = useRouter()

const usuario = ref("")
const password = ref("")
const error = ref(false)

function login() {
  error.value = false

  if (usuario.value === "sabg" && password.value === "123") {
    localStorage.setItem("admin_auth", "true")
    router.push("/admin")
    return
  }

  error.value = true
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f8;
  font-family: Arial, sans-serif;
}

.login-card {
  width: 380px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 28px;
  box-shadow: 0 3px 12px rgba(0,0,0,.08);
}

.login-title {
  margin: 0 0 20px;
  font-size: 28px;
  color: #333;
  text-align: center;
}

.input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.btn-login {
  width: 100%;
  border: none;
  background: #8e1738;
  color: white;
  padding: 11px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.error-text {
  margin-top: 12px;
  color: #b00020;
  text-align: center;
}
</style>