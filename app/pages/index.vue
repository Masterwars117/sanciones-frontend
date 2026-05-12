<template>
  <div class="site-wrapper">
    <header class="header">
      <div class="header-left">tabasco.gob.mx</div>
      <div class="header-center">SERVIDORES PÚBLICOS Y PARTICULARES SANCIONADOS</div>
      <div class="header-right">
        <button type="button" class="btn-nav" @click="cambiarModo('nombre')">
  Buscar por Nombre
</button>

<button type="button" class="btn-nav" @click="cambiarModo('expediente')">
  Buscar por Expediente
</button>
      </div>
    </header>

    <main class="main-content">
      <div class="legal-text">
        EN TÉRMINOS DE LO PREVISTO POR LOS ARTÍCULOS 27, 77 Y 80 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS
      </div>

      <div class="container">
        <div class="color-bar">
          <div class="bar-blue-dark"></div>
          <div class="bar-blue-light"></div>
          <div class="bar-orange"></div>
        </div>

        <div class="content-flex">
          <div class="search-area">
            <h3 class="search-title">
              {{ modo === 'expediente' ? 'BÚSQUEDA POR EXPEDIENTE' : 'BÚSQUEDA POR NOMBRE' }}
            </h3>
            
            <div v-if="modo === 'expediente'" class="form-group">
              <div class="input-row">
                <input v-model="expediente" type="text" class="input-field" @keyup.enter="buscarExpediente" />
                <button type="button" @click="buscarExpediente" class="btn-search">Buscar</button>
              </div>
              <span class="input-label">*Expediente</span>
            </div>

            <div v-else class="form-group-name">
              <div class="name-grid">
                <input v-model="paterno" placeholder="Apellido Paterno" class="input-field" />
                <input v-model="materno" placeholder="Apellido Materno" class="input-field" />
                <input v-model="nombre" placeholder="Nombre" class="input-field" />
              </div>
              <button type="button" @click="buscarNombre" class="btn-search mt-10">Buscar</button>
            </div>
          </div>

          <div class="sidebar">
            <div class="lineamientos">
              <p class="lin-title">LINEAMIENTOS</p>
              <p class="lin-file">Archivo .PDF</p>
              <p class="lin-size">2.53 MB</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-top">
        <div class="footer-logo">
          <img src="https://tabasco.gob.mx/sites/default/files/logo-footer-tabasco_2019.png" alt="Escudo Tabasco" class="escudo" />
        </div>
        
        <div class="footer-col">
          <h4 class="col-title">CONTACTO</h4>
          <p class="col-text">SECRETARÍA DE LA FUNCIÓN PÚBLICA</p>
          <p class="col-text">Av. Paseo Tabasco #1504 Col. Tabasco 2000,</p>
          <p class="col-text">C.P. 86035,</p>
          <p class="col-text">Villahermosa, Tabasco, MX</p>
          <p class="col-text">Tel. +52 (993) 3 10 47 80 Ext. 5090</p>
          <a href="https://www.gob.mx/curp/" class="footer-link-gold" target="_blank"> Consulta tu CURP aquí</a>
        </div>

        <div class="footer-col">
          <h4 class="col-title">TRANSPARENCIA</h4>
          <a href="https://transparencia.tabasco.gob.mx/" class="footer-link"> Portal Transparencia</a>
          <a href="https://itaip.org.mx/" class="footer-link">ITAIP</a>
          <a href="https://www.infomextabasco.org.mx/" class="footer-link">Infomex</a>
          <a href="https://portalanticorrupcion.tabasco.gob.mx:85/aviso-de-privacidad" class="footer-link">Aviso de Privacidad</a>
        </div>

        <div class="footer-col">
          <h4 class="col-title">TWITTER</h4>
          <a href="https://twitter.com/Gobierno_Tab" class="footer-link-gold" target="_blank">Tweets by Gobierno_Tab</a>
        </div>
        </div>
      
      <div class="footer-bottom">
        <div class="bottom-content">
          <span>GOBIERNO DEL ESTADO DE TABASCO © DERECHOS RESERVADOS</span>
          <div class="bottom-right">
             <span>SECRETARÍA DE LA FUNCIÓN PÚBLICA</span>
             <span>UNIDAD DE APOYO TÉCNICO E INFORMÁTICO</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const modo = ref("expediente")

const expediente = ref("")
const paterno = ref("")
const materno = ref("")
const nombre = ref("")

function cambiarModo(nuevoModo) {
  modo.value = nuevoModo

  if (nuevoModo === "nombre") {
    expediente.value = ""
    return
  }

  paterno.value = ""
  materno.value = ""
  nombre.value = ""
}

function buscarExpediente() {
  const exp = expediente.value.trim()
  if (!exp) return

  router.push({
    path: "/buscar",
    query: {
      tipo: "expediente",
      q: exp
    }
  })
}

function buscarNombre() {
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
      nombre: nom
    }
  })
}
</script>

<style scoped>
/* Estilos Base */
.site-wrapper {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: #9e1b32;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px;
}

.header-center {
  font-weight: bold;
  font-size: 1.1rem;
}

.btn-nav {
  background: white;
  color: #555;
  border: none;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-nav:hover {
  background: #f0f0f0;
}

/* Main */
.main-content {
  flex: 1;
  background: white;
}

.legal-text {
  text-align: center;
  padding: 25px 0;
  font-weight: bold;
  font-size: 1.1rem;
  max-width: 90%;
  margin: 0 auto;
}

.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* Franja de colores */
.color-bar {
  width: 25px;
  display: flex;
  flex-direction: column;
}
.bar-blue-dark { background: #334d82; height: 50px; }
.bar-blue-light { background: #0099cc; height: 50px; }
.bar-orange { background: #d9534f; height: 50px; }

.content-flex {
  display: flex;
  width: 100%;
  padding: 20px 40px;
}

.search-area {
  flex: 1;
}

.search-title {
  color: #444;
  font-size: 1rem;
  margin-bottom: 20px;
}

/* Formulario */
.input-row { display: flex; align-items: center; }
.input-field {
  border: 1px solid #ccc;
  padding: 8px;
  width: 300px;
  border-radius: 4px;
}
.btn-search {
  background: #f5f5f5;
  border: 1px solid #ccc;
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
}
.input-label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-top: 5px;
}

.name-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.name-grid .input-field { width: auto; }
.mt-10 { margin-top: 10px; }

/* Sidebar Lineamientos */
.sidebar { width: 150px; text-align: right; }
.lin-title { font-weight: bold; font-size: 0.75rem; margin: 0; }
.lin-file { font-size: 0.75rem; margin: 2px 0; }
.lin-size { font-size: 0.75rem; font-weight: bold; margin: 0; }

/* Footer */
.footer {
  background: #2c2c2e;
  color: white;
  padding-top: 50px;
}

.footer-top {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding-bottom: 50px;
}

.escudo { width: 45px; opacity: 0.8; }

.col-title { color: #bc955c; font-size: 0.9rem; margin-bottom: 15px; }
.col-text { font-size: 0.75rem; margin: 3px 0; line-height: 1.4; color: #ccc; }
.footer-link { color: #ccc; text-decoration: none; display: block; font-size: 0.75rem; margin-bottom: 8px; border-bottom: 1px solid #444; padding-bottom: 5px; }
.footer-link-gold { color: #bc955c; text-decoration: none; font-size: 0.75rem; }

.footer-bottom {
  background: #242426;
  padding: 20px;
  font-size: 0.7rem;
  border-top: 1px solid #333;
}

.bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-right { text-align: right; display: flex; flex-direction: column; }
</style>