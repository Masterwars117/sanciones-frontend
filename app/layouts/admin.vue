<template>
  <div class="admin-layout">
    <header class="topbar">
      <button class="menu-btn" @click="menuAbierto = !menuAbierto">☰</button>
      <div class="topbar-title">Sistema de Sancionados</div>
    </header>

    <aside class="sidebar" :class="{ collapsed: !menuAbierto }">
      <div class="sidebar-header">
        <div class="sidebar-title">Administración</div>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink to="/admin/estatal" class="nav-item">
          Sanciones Estatales
        </NuxtLink>

        <NuxtLink to="/admin/federal" class="nav-item">
          Sanciones Federales
        </NuxtLink>

        <button class="nav-item logout" @click="logout">
          Cerrar sesión
        </button>
      </nav>
    </aside>

    <main class="content" :class="{ expanded: !menuAbierto }">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// abierto por defecto
const menuAbierto = ref(true)

onMounted(() => {
  const auth = localStorage.getItem("admin_auth")
  if (auth !== "true") {
    router.push("/registro")
  }
})

function logout() {
  localStorage.removeItem("admin_auth")
  router.push("/registro")
}
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
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
  position: sticky;
  top: 0;
  z-index: 30;
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
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,.08);
  z-index: 20;
  transition: transform 0.25s ease;
  border-right: 1px solid #e5e5e5;
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid #ececec;
}

.sidebar-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 8px;
}

.nav-item {
  text-align: left;
  text-decoration: none;
  color: #333;
  background: #f3f3f3;
  border: none;
  padding: 12px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.nav-item:hover {
  background: #e9e9e9;
}

.logout {
  color: #8e1738;
  font-weight: 700;
}

.content {
  padding: 24px;
  margin-left: 250px;
  transition: margin-left 0.25s ease;
}

.content.expanded {
  margin-left: 0;
}
</style>