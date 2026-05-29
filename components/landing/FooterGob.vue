<template>
  <footer id="contacto" class="mt-auto bg-[#BC955C] text-white">
    <div class="mx-auto max-w-7xl px-4 py-10">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Marca -->
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="footer-logo-wrap">
              <img
                src="/images/logo-gobmx.png"
                alt="Logo gob.mx"
                class="footer-logo"
              />
            </div>

            <div class="leading-tight">
              <div class="text-3xl font-bold uppercase tracking-tight">TABASCO</div>
              <div class="text-sm text-white/90">.gob.mx</div>
            </div>
          </div>

          <p class="max-w-xs text-sm leading-7 text-white/95">
            Secretaría Anticorrupción y Buen Gobierno del Gobierno del Estado de Tabasco.
            Portal de consulta pública orientado a la transparencia, integridad y control administrativo.
          </p>
        </div>

        <!-- Contacto -->
        <div>
          <h4 class="mb-4 text-xl font-bold">Contacto</h4>

          <div class="space-y-3 text-sm leading-7 text-white/95">
            <p>Av. Paseo Tabasco #1504 Col. Tabasco 2000, C.P. 86035, Villahermosa, Tabasco, MX</p>
            <p>+52 (993) 3 10 47 80 Ext. 5090</p>
            <a
              href="mailto:contacto@tabasco.gob.mx"
              class="inline-block transition hover:text-[#235B4E]"
            >
              contacto@tabasco.gob.mx
            </a>
          </div>
        </div>

        <!-- Transparencia -->
        <div>
          <h4 class="mb-4 text-xl font-bold">Transparencia</h4>

          <div class="flex flex-col gap-3 text-sm">
            <a
              href="https://transparencia.tabasco.gob.mx/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              Portal de Transparencia
            </a>

            <a
              href="https://itaip.org.mx/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              ITAIP
            </a>

            <a
              href="https://www.infomextabasco.org.mx/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              Infomex
            </a>

            <a
              href="https://portalanticorrupcion.tabasco.gob.mx:85/aviso-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              Aviso de Privacidad
            </a>
          </div>
        </div>

        <!-- Enlaces rápidos -->
        <div>
          <h4 class="mb-4 text-xl font-bold">Enlaces Rápidos</h4>

          <div class="flex flex-col gap-3 text-sm">
            <a
              href="https://www.gob.mx/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              gob.mx
            </a>

            <a
              href="https://www.gob.mx/curp/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              Consulta tu CURP
            </a>

            <a
              href="https://twitter.com/Gobierno_Tab"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              Twitter @Gobierno_Tab
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-white/15 bg-[#b58d54]">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/95 md:flex-row md:items-center md:justify-between">
        <span>GOBIERNO DEL ESTADO DE TABASCO © DERECHOS RESERVADOS</span>
        <div class="flex flex-col md:flex-row md:gap-6">
          <span>SECRETARÍA ANTICORRUPCIÓN Y BUEN GOBIERNO</span>
          <span>UNIDAD DE APOYO TÉCNICO E INFORMÁTICO</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 132px;
  height: 76px;
  padding: 8px 10px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eadbbd 0%, #d8c19a 100%);
  box-shadow: inset 0 0 0 1px rgba(105, 28, 50, 0.08);
  flex-shrink: 0;
}

.footer-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.footer-link {
  color: rgba(255, 255, 255, 0.96);
  text-decoration: none;
  transition: color 0.18s ease;
}

.footer-link:hover {
  color: #235b4e;
}

@media (max-width: 640px) {
  .footer-logo-wrap {
    width: 112px;
    height: 66px;
    padding: 6px 8px;
  }
}
</style>