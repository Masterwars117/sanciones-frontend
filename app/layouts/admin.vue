<template>
  <div class="admin-layout">
    <header class="topbar">
      <button class="menu-btn" type="button" @click="toggleMenu">☰</button>
      <div class="topbar-title">Sistema de Sancionados</div>
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
        <button class="logout-card" type="button" @click="logout">
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
            <strong>Cerrar sesión</strong>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const menuAbierto = ref(true)
const esMovil = ref(false)

function verificarPantalla() {
  if (!import.meta.client) return
  esMovil.value = window.innerWidth <= 980

  if (esMovil.value) {
    menuAbierto.value = false
  } else if (menuAbierto.value === false) {
    // conserva el botón para escritorio
  } else {
    menuAbierto.value = true
  }
}

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
}

function esRutaActiva(base) {
  return route.path.startsWith(base)
}

function logout() {
  localStorage.removeItem("admin_auth")
  router.push("/registro")
}

onMounted(() => {
  const auth = localStorage.getItem("admin_auth")
  if (auth !== "true") {
    router.push("/registro")
    return
  }

  verificarPantalla()
  window.addEventListener("resize", verificarPantalla)
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
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid #ece2d6;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
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

.nav-info small {
  color: #746e66;
  margin-top: 2px;
  font-size: 12px;
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

  .content-watermark {
    background-size: min(52vw, 300px);
  }

  .sidebar {
    transform: translateX(-100%);
  }
}
</style>