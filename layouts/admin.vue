<template>
  <div class="admin-layout">
    <template v-if="authLoading">
      <div class="auth-loading">
        <div class="auth-loading-card">
          <div class="auth-spinner"></div>
          <h2>Validando acceso</h2>
          <p>Espere un momento mientras se verifica su sesión.</p>
        </div>
      </div>
    </template>

    <template v-else>
      <header class="topbar">
        <button class="menu-btn" type="button" @click="toggleMenu">☰</button>
        <div class="topbar-title">Sistema de Sancionados</div>

        <div class="topbar-user" v-if="authStore.userFullName">
          {{ authStore.userFullName }}
        </div>
      </header>

      <div
        v-if="menuAbierto && esMovil"
        class="sidebar-overlay"
        @click="menuAbierto = false"
      ></div>

      <aside
        class="sidebar"
        :class="{
          collapsed: !menuAbierto && !esMovil,
          mobileOpen: menuAbierto && esMovil
        }"
      >
        <div class="sidebar-header">
          <div class="sidebar-title">Administración</div>
          <div v-if="authStore.userDisplayInfo?.email" class="sidebar-user-email">
            {{ authStore.userDisplayInfo.email }}
          </div>
        </div>

        <nav class="sidebar-nav">
          <NuxtLink
            to="/admin/estatal"
            class="nav-card"
            :class="{ active: esRutaActiva('/admin/estatal') }"
          >
            <span class="nav-icon estatal">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 20h16M6 18V8m4 10V8m4 10V8m4 10V8M3 8l9-4 9 4"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
              </svg>
            </span>
            <span class="nav-info">
              <strong>Sanciones Estatales</strong>
            </span>
          </NuxtLink>

          <NuxtLink
            to="/admin/federal"
            class="nav-card"
            :class="{ active: esRutaActiva('/admin/federal') }"
          >
            <span class="nav-icon federal">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 3l7 3v5c0 4.5-2.7 7.8-7 10-4.3-2.2-7-5.5-7-10V6l7-3Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
                <path
                  d="M9 12h6M12 9v6"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.8"
                />
              </svg>
            </span>
            <span class="nav-info">
              <strong>Sanciones Federales</strong>
            </span>
          </NuxtLink>
        </nav>

        <div class="sidebar-separator"></div>

        <div class="sidebar-bottom">
          <button
            class="logout-card"
            type="button"
            :disabled="logoutLoading"
            @click="logout"
          >
            <span class="nav-icon logout">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 17l5-5-5-5M20 12H9"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
                <path
                  d="M13 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
              </svg>
            </span>
            <span class="nav-info">
              <strong>{{ logoutLoading ? "Cerrando sesión..." : "Cerrar sesión" }}</strong>
            </span>
          </button>
        </div>
      </aside>

      <main class="content" :class="{ expanded: !menuAbierto && !esMovil }">
        <div class="content-watermark"></div>
        <div class="content-inner">
          <slot />
        </div>
      </main>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "~/stores/auth"

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const menuAbierto = ref(true)
const esMovil = ref(false)
const authLoading = ref(true)
const logoutLoading = ref(false)

function verificarPantalla() {
  if (!import.meta.client) return

  esMovil.value = window.innerWidth <= 980

  if (esMovil.value) {
    menuAbierto.value = false
  } else if (menuAbierto.value !== false) {
    menuAbierto.value = true
  }
}

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
}

function esRutaActiva(base) {
  return route.path.startsWith(base)
}

async function asegurarSesion() {
  try {
    await authStore.initialize()

    if (!authStore.isAuthenticated) {
      await authStore.login()
      return
    }

    if (!authStore.user && !authStore.userInfoLoading) {
      await authStore.fetchUserInfo(true)
    }
  } catch (error) {
    console.error("Error al validar sesión:", error)
    await router.push("/")
  } finally {
    authLoading.value = false
  }
}

async function logout() {
  logoutLoading.value = true

  try {
    await authStore.logout()
    await router.push("/")
  } finally {
    logoutLoading.value = false
  }
}

onMounted(async () => {
  verificarPantalla()
  window.addEventListener("resize", verificarPantalla)
  await asegurarSesion()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", verificarPantalla)
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f5f6f8;
  font-family: Arial, sans-serif;
}

.auth-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f7f4ee;
}

.auth-loading-card {
  min-width: 320px;
  max-width: 420px;
  padding: 28px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e4d6da;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.auth-loading-card h2 {
  margin: 0 0 10px;
  color: #333;
  font-size: 22px;
}

.auth-loading-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.auth-spinner {
  width: 42px;
  height: 42px;
  margin: 0 auto 18px;
  border: 4px solid #ead7dd;
  border-top-color: #8e1738;
  border-radius: 50%;
  animation: spin 0.85s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.topbar {
  height: 60px;
  background: #8e1738;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  position: sticky;
  top: 0;
  z-index: 40;
}

.menu-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 26px;
  cursor: pointer;
  line-height: 1;
}

.topbar-title {
  font-size: 18px;
  font-weight: 700;
}

.topbar-user {
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.92;
}

.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background: #f8f6f2;
  border-right: 1px solid #ddd6c8;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
  z-index: 30;
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar.mobileOpen {
  transform: translateX(0);
}

.sidebar-header {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 18px;
  border-bottom: 1px solid #ece2d6;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.sidebar-user-email {
  margin-top: 4px;
  font-size: 12px;
  color: #746e66;
  word-break: break-word;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 10px;
}

.nav-card,
.logout-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  text-decoration: none;
  border: 1px solid #e4d6da;
  background: #fff;
  color: #333;
  padding: 12px 14px;
  border-radius: 14px;
  cursor: pointer;
  transition: 0.18s ease;
}

.nav-card:hover,
.logout-card:hover {
  background: #faf7f8;
  box-shadow: 0 8px 18px rgba(74, 48, 32, 0.08);
}

.nav-card.active {
  border-color: #c88b9c;
  background: linear-gradient(180deg, #fff7f9 0%, #f8e6eb 100%);
}

.logout-card:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-icon {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 22px;
  height: 22px;
}

.nav-icon.estatal {
  background: #f4e4e8;
  color: #8e1738;
}

.nav-icon.federal {
  background: #ece6dc;
  color: #6f4f2b;
}

.nav-icon.logout {
  background: #f9e9ec;
  color: #a11c3f;
}

.nav-info {
  display: flex;
  flex-direction: column;
}

.nav-info strong {
  font-size: 15px;
  line-height: 1.2;
}

.sidebar-separator {
  margin: 8px 14px 12px;
  border-top: 1px dashed #d8cfc1;
}

.sidebar-bottom {
  margin-top: auto;
  padding: 0 14px 14px;
}

.logout-card {
  color: #9e1b32;
}

.content {
  min-height: calc(100vh - 60px);
  margin-left: 250px;
  padding: 24px;
  transition: margin-left 0.25s ease;
  background: #f7f4ee;
  position: relative;
  overflow: hidden;
}

.content.expanded {
  margin-left: 0;
}

.content-inner {
  position: relative;
  z-index: 1;
}

.sidebar-overlay {
  position: fixed;
  inset: 60px 0 0 0;
  background: rgba(0, 0, 0, 0.28);
  z-index: 25;
}

@media (max-width: 980px) {
  .content {
    margin-left: 0;
    padding: 18px;
  }

  .sidebar {
    transform: translateX(-100%);
  }

  .topbar-user {
    display: none;
  }
}
</style>