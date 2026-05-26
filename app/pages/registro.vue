<template>
  <div class="login-page">
    <div class="login-shell">
      
      <div class="login-brand">
        <div class="brand-logo-wrap">
          <img
            src="/images/logo-gobmx.png"
            alt="Logo gob.mx"
            class="brand-logo"
          />
        </div>
        <div class="brand-text">
          <div class="brand-secretaria">Secretaría Anticorrupción</div>
          <div class="brand-secretaria strong">y Buen Gobierno</div>
        </div>
      </div>

      <div class="login-card">
        <div class="card-header">
          <h1 class="login-title">Acceso Administrador</h1>
          <p class="login-subtitle">
            Ingrese sus credenciales para acceder al panel.
          </p>
        </div>

        <form @submit.prevent="login" class="login-form">
          
          <div class="form-group">
            <label class="label">Usuario</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                v-model="usuario"
                type="text"
                class="input"
                placeholder="Ej. admin123"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="label">Contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                v-model="password"
                :type="mostrarPassword ? 'text' : 'password'"
                class="input input-password"
                placeholder="••••••••"
              />
              <button
                type="button"
                class="toggle-password"
                @click="mostrarPassword = !mostrarPassword"
                :aria-label="mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <svg v-if="!mostrarPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="error" class="error-alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Usuario o contraseña incorrectos.</span>
          </div>

          <button
            type="submit"
            class="btn-login"
            :disabled="!usuario.trim() || !password.trim()"
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
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
const mostrarPassword = ref(false)

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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(247, 244, 238, 0.94) 0%,
    rgba(247, 244, 238, 0.90) 55%,
    rgba(247, 244, 238, 0.82) 100%
  );
  font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
}

.login-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("/images/fondo.png") center center / cover no-repeat;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.login-shell {
  width: 100%;
  max-width: 440px;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
}

.login-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.brand-logo-wrap {
  width: 150px;
  height: 72px;
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f0e6d2 0%, #d8c19a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(105, 28, 50, 0.08);
}

.brand-logo {
  width: 130%;
  height: 130%;
  object-fit: contain;
}

.brand-text {
  line-height: 1.2;
}

.brand-tabasco {
  color: #9f2241;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand-sub {
  color: #6f7271;
  font-size: 12px;
  font-weight: 500;
}

.brand-secretaria {
  color: #235b4e;
  font-size: 14px;
  margin-top: 4px;
}

.brand-secretaria.strong {
  font-weight: 700;
}

.login-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(227, 215, 199, 0.6);
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
}

.card-header {
  margin-bottom: 28px;
  text-align: center;
}

.login-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.login-subtitle {
  margin: 8px 0 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #333;
  font-size: 13px;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #888;
  transition: color 0.3s ease;
}

.input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px 12px 42px;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  background: #fcfcfc;
  transition: all 0.2s ease;
}

.input::placeholder {
  color: #aaa;
}

.input:focus {
  background: #fff;
  border-color: #9f2241;
  box-shadow: 0 0 0 4px rgba(159, 34, 65, 0.1);
}

.input:focus + .input-icon,
.input-wrapper:focus-within .input-icon {
  color: #9f2241;
}

.input-password {
  padding-right: 48px;
}

.toggle-password {
  position: absolute;
  right: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #888;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-password:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #333;
}

.toggle-password svg {
  width: 18px;
  height: 18px;
}

.btn-login {
  width: 100%;
  border: none;
  background: #9f2241;
  color: white;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  font-size: 15px;
  margin-top: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(159, 34, 65, 0.2);
}

.btn-login:hover:not(:disabled) {
  background: #811a33;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(159, 34, 65, 0.3);
}

.btn-login:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(159, 34, 65, 0.2);
}

.btn-login:disabled {
  background: #d4a5b1;
  box-shadow: none;
  cursor: not-allowed;
}

.error-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fdf0f0;
  border-left: 4px solid #d32f2f;
  padding: 12px 16px;
  border-radius: 8px;
  color: #d32f2f;
  font-size: 13px;
  font-weight: 500;
  animation: slideUp 0.3s ease;
}

.error-alert svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .login-page {
    padding: 16px;
  }

  .login-page::before {
    background-position: center center;
  }

  .login-brand {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .login-card {
    padding: 28px 24px;
  }

  .brand-logo-wrap {
    width: 126px;
    height: 76px;
  }
}


</style>
