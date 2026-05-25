import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { a as api } from './api-C_eT-WN3.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const buscarService = {
  porExpediente(q) {
    return api("/buscar-expediente", {
      query: { q }
    });
  },
  porNombre(params) {
    return api("/buscar-nombre", {
      query: params
    });
  }
};
const _sfc_main = {
  __name: "buscar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const modo = ref("expediente");
    const expediente = ref("");
    const paterno = ref("");
    const materno = ref("");
    const nombre = ref("");
    const resultadosExpediente = ref([]);
    const resultadosEstatales = ref([]);
    const resultadosFederales = ref([]);
    const buscado = ref(false);
    const sinResultados = computed(() => {
      if (modo.value === "expediente") {
        return resultadosExpediente.value.length === 0;
      }
      return resultadosEstatales.value.length === 0 && resultadosFederales.value.length === 0;
    });
    function limpiarResultados() {
      resultadosExpediente.value = [];
      resultadosEstatales.value = [];
      resultadosFederales.value = [];
    }
    function nombreCompletoEstatal(item) {
      return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ");
    }
    function nombreCompletoFederal(item) {
      return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ");
    }
    async function cargarResultados() {
      const tipo = (route.query.tipo || "").toString();
      limpiarResultados();
      buscado.value = false;
      if (!tipo) return;
      if (tipo === "expediente") {
        modo.value = "expediente";
        expediente.value = (route.query.q || "").toString().trim();
        paterno.value = "";
        materno.value = "";
        nombre.value = "";
        if (!expediente.value) return;
        const res = await buscarService.porExpediente(expediente.value);
        resultadosExpediente.value = res.resultados || [];
        buscado.value = true;
        return;
      }
      if (tipo === "nombre") {
        modo.value = "nombre";
        paterno.value = (route.query.paterno || "").toString().trim();
        materno.value = (route.query.materno || "").toString().trim();
        nombre.value = (route.query.nombre || "").toString().trim();
        expediente.value = "";
        if (!paterno.value && !materno.value && !nombre.value) {
          return;
        }
        const res = await buscarService.porNombre({
          paterno: paterno.value,
          materno: materno.value,
          nombre: nombre.value
        });
        resultadosEstatales.value = res.estatal || [];
        resultadosFederales.value = res.federal || [];
        buscado.value = true;
      }
    }
    watch(
      () => route.query,
      async () => {
        await cargarResultados();
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "site-wrapper" }, _attrs))} data-v-6f6b847c><header class="header" data-v-6f6b847c><div class="header-left" data-v-6f6b847c>tabasco.gob.mx</div><div class="header-center" data-v-6f6b847c>SERVIDORES PÚBLICOS Y PARTICULARES SANCIONADOS</div><div class="header-right" data-v-6f6b847c><button type="button" class="btn-nav" data-v-6f6b847c>Buscar por Nombre</button><button type="button" class="btn-nav" data-v-6f6b847c>Buscar por Expediente</button></div></header><main class="main-content" data-v-6f6b847c><div class="legal-text" data-v-6f6b847c> EN TÉRMINOS DE LO PREVISTO POR LOS ARTÍCULOS 27, 77 Y 80 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS </div><div class="container" data-v-6f6b847c><div class="color-bar" data-v-6f6b847c><div class="bar-blue-dark" data-v-6f6b847c></div><div class="bar-blue-light" data-v-6f6b847c></div><div class="bar-orange" data-v-6f6b847c></div></div><div class="content-flex" data-v-6f6b847c><div class="search-area" data-v-6f6b847c><h3 class="search-title" data-v-6f6b847c>${ssrInterpolate(modo.value === "expediente" ? "BÚSQUEDA POR EXPEDIENTE" : "BÚSQUEDA POR NOMBRE")}</h3>`);
      if (modo.value === "expediente") {
        _push(`<div class="form-group" data-v-6f6b847c><div class="input-row" data-v-6f6b847c><input${ssrRenderAttr("value", expediente.value)} type="text" class="input-field" data-v-6f6b847c><button type="button" class="btn-search" data-v-6f6b847c>Buscar</button></div><span class="input-label" data-v-6f6b847c>*Expediente</span></div>`);
      } else {
        _push(`<div class="form-group-name" data-v-6f6b847c><div class="name-grid" data-v-6f6b847c><div class="field-block" data-v-6f6b847c><input${ssrRenderAttr("value", paterno.value)} class="input-field" data-v-6f6b847c><span class="input-label" data-v-6f6b847c>*Apellido Paterno</span></div><div class="field-block" data-v-6f6b847c><input${ssrRenderAttr("value", materno.value)} class="input-field" data-v-6f6b847c><span class="input-label" data-v-6f6b847c>*Apellido Materno</span></div><div class="field-block" data-v-6f6b847c><input${ssrRenderAttr("value", nombre.value)} class="input-field" data-v-6f6b847c><span class="input-label" data-v-6f6b847c>*Nombre</span></div><button type="button" class="btn-search mt-10" data-v-6f6b847c>Buscar</button></div></div>`);
      }
      if (buscado.value && sinResultados.value) {
        _push(`<div class="no-results" data-v-6f6b847c> SIN RESULTADOS QUE MOSTRAR </div>`);
      } else {
        _push(`<!---->`);
      }
      if (modo.value === "expediente" && resultadosExpediente.value.length > 0) {
        _push(`<div class="results-wrap" data-v-6f6b847c><table class="results-table" data-v-6f6b847c><thead data-v-6f6b847c><tr data-v-6f6b847c><th data-v-6f6b847c>AÑO</th><th data-v-6f6b847c>SANCIÓN ID</th><th data-v-6f6b847c>EXPEDIENTE</th><th data-v-6f6b847c>NOMBRE</th><th data-v-6f6b847c>CARGO</th></tr></thead><tbody data-v-6f6b847c><!--[-->`);
        ssrRenderList(resultadosExpediente.value, (item) => {
          _push(`<tr data-v-6f6b847c><td data-v-6f6b847c>${ssrInterpolate(item.anio)}</td><td data-v-6f6b847c>${ssrInterpolate(item.sancionid)}</td><td data-v-6f6b847c>${ssrInterpolate(item.expediente)}</td><td data-v-6f6b847c>${ssrInterpolate(nombreCompletoEstatal(item))}</td><td data-v-6f6b847c>${ssrInterpolate(item.cargo)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      if (modo.value === "nombre" && resultadosEstatales.value.length > 0) {
        _push(`<div class="results-wrap" data-v-6f6b847c><h4 class="results-title" data-v-6f6b847c>RESULTADOS ESTATALES</h4><table class="results-table" data-v-6f6b847c><thead data-v-6f6b847c><tr data-v-6f6b847c><th data-v-6f6b847c>AÑO</th><th data-v-6f6b847c>SANCIÓN ID</th><th data-v-6f6b847c>NOMBRE</th><th data-v-6f6b847c>DEPENDENCIA</th><th data-v-6f6b847c>CARGO</th></tr></thead><tbody data-v-6f6b847c><!--[-->`);
        ssrRenderList(resultadosEstatales.value, (item) => {
          _push(`<tr data-v-6f6b847c><td data-v-6f6b847c>${ssrInterpolate(item.anio)}</td><td data-v-6f6b847c>${ssrInterpolate(item.sancionid)}</td><td data-v-6f6b847c>${ssrInterpolate(nombreCompletoEstatal(item))}</td><td data-v-6f6b847c>${ssrInterpolate(item.dependencia)}</td><td data-v-6f6b847c>${ssrInterpolate(item.cargo)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      if (modo.value === "nombre" && resultadosFederales.value.length > 0) {
        _push(`<div class="results-wrap" data-v-6f6b847c><h4 class="results-title" data-v-6f6b847c>RESULTADOS FEDERALES</h4><table class="results-table" data-v-6f6b847c><thead data-v-6f6b847c><tr data-v-6f6b847c><th data-v-6f6b847c>RFC</th><th data-v-6f6b847c>HOMOCLAVE</th><th data-v-6f6b847c>NOMBRE</th><th data-v-6f6b847c>DEPENDENCIA</th><th data-v-6f6b847c>CARGO</th></tr></thead><tbody data-v-6f6b847c><!--[-->`);
        ssrRenderList(resultadosFederales.value, (item) => {
          _push(`<tr data-v-6f6b847c><td data-v-6f6b847c>${ssrInterpolate(item.rfc)}</td><td data-v-6f6b847c>${ssrInterpolate(item.homoclave)}</td><td data-v-6f6b847c>${ssrInterpolate(nombreCompletoFederal(item))}</td><td data-v-6f6b847c>${ssrInterpolate(item.dependencia)}</td><td data-v-6f6b847c>${ssrInterpolate(item.cargo)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="sidebar" data-v-6f6b847c><div class="lineamientos" data-v-6f6b847c><p class="lin-title" data-v-6f6b847c>LINEAMIENTOS</p><p class="lin-file" data-v-6f6b847c>Archivo .PDF</p><p class="lin-size" data-v-6f6b847c>2.53 MB</p></div></div></div></div></main><footer class="footer" data-v-6f6b847c><div class="footer-top" data-v-6f6b847c><div class="footer-logo" data-v-6f6b847c><img src="https://tabasco.gob.mx/sites/default/files/logo-footer-tabasco_2019.png" alt="Escudo Tabasco" class="escudo" data-v-6f6b847c></div><div class="footer-col" data-v-6f6b847c><h4 class="col-title" data-v-6f6b847c>CONTACTO</h4><p class="col-text" data-v-6f6b847c>SECRETARÍA DE LA FUNCIÓN PÚBLICA</p><p class="col-text" data-v-6f6b847c>Av. Paseo Tabasco #1504 Col. Tabasco 2000,</p><p class="col-text" data-v-6f6b847c>C.P. 86035,</p><p class="col-text" data-v-6f6b847c>Villahermosa, Tabasco, MX</p><p class="col-text" data-v-6f6b847c>Tel. +52 (993) 3 10 47 80 Ext. 5090</p><a href="https://www.gob.mx/curp/" class="footer-link-gold" target="_blank" data-v-6f6b847c> Consulta tu CURP aquí</a></div><div class="footer-col" data-v-6f6b847c><h4 class="col-title" data-v-6f6b847c>TRANSPARENCIA</h4><a href="https://transparencia.tabasco.gob.mx/" class="footer-link" data-v-6f6b847c> Portal Transparencia</a><a href="https://itaip.org.mx/" class="footer-link" data-v-6f6b847c>ITAIP</a><a href="https://www.infomextabasco.org.mx/" class="footer-link" data-v-6f6b847c>Infomex</a><a href="https://portalanticorrupcion.tabasco.gob.mx:85/aviso-de-privacidad" class="footer-link" data-v-6f6b847c>Aviso de Privacidad</a></div><div class="footer-col" data-v-6f6b847c><h4 class="col-title" data-v-6f6b847c>TWITTER</h4><a href="https://twitter.com/Gobierno_Tab" class="footer-link-gold" target="_blank" data-v-6f6b847c>Tweets by Gobierno_Tab</a></div></div><div class="footer-bottom" data-v-6f6b847c><div class="bottom-content" data-v-6f6b847c><span data-v-6f6b847c>GOBIERNO DEL ESTADO DE TABASCO © DERECHOS RESERVADOS</span><div class="bottom-right" data-v-6f6b847c><span data-v-6f6b847c>SECRETARÍA DE LA FUNCIÓN PÚBLICA</span><span data-v-6f6b847c>UNIDAD DE APOYO TÉCNICO E INFORMÁTICO</span></div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/buscar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const buscar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f6b847c"]]);

export { buscar as default };
//# sourceMappingURL=buscar-DBXCYBh3.mjs.map
