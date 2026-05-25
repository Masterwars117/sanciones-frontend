import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { _ as __nuxt_component_1, s as sancionadosService } from './sancionadosService-DAnU8xhf.mjs';
import { ref, watch, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { b as apiUpload, a as api } from './api-C_eT-WN3.mjs';
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

const federalService = {
  obtenerDetalle(rfc) {
    return api("/federal/detalle", {
      query: { rfc }
    });
  },
  crear(registro) {
    return api("/federal/crear", {
      method: "POST",
      body: registro
    });
  },
  editar(payload) {
    return api("/federal/editar", {
      method: "POST",
      body: payload
    });
  },
  eliminar(rfc) {
    return api("/federal/eliminar", {
      method: "POST",
      body: { rfc }
    });
  },
  cargarExcel(file) {
    const formData = new FormData();
    formData.append("file", file);
    return apiUpload("/federal/cargar-excel", formData);
  }
};
const MAX_PAGE_SIZE = 200;
const STORAGE_KEY = "federal";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200];
    const busqueda = ref("");
    const registros = ref([]);
    const cargando = ref(false);
    const pagina = ref(1);
    const totalPaginas = ref(1);
    const tieneSiguiente = ref(false);
    const tieneAnterior = ref(false);
    const itemsPorPagina = ref(50);
    const subiendo = ref(false);
    function normalizarPageSize(valor) {
      const numero = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(valor)));
      if (PAGE_SIZE_OPTIONS.includes(numero)) {
        return numero;
      }
      return 50;
    }
    const error = ref("");
    const mensajeCarga = ref("");
    let debounceTimer = null;
    function limpiarDebounce() {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    }
    function limpiarMensajes() {
      error.value = "";
      mensajeCarga.value = "";
    }
    function mostrarError(texto) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: texto,
        confirmButtonColor: "#8e1738"
      });
    }
    function mostrarExito(texto) {
      Swal.fire({
        icon: "success",
        title: "Correcto",
        text: texto,
        confirmButtonColor: "#8e1738"
      });
    }
    function getItemKey(item) {
      return item.rfc || "";
    }
    function nombreCompleto(item) {
      return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ").trim();
    }
    function obtenerFechaOrden(item) {
      return item?.fechares || null;
    }
    function formatearFecha(value) {
      if (!value) return "-";
      const fecha = new Date(value);
      if (Number.isNaN(fecha.getTime())) return value;
      const dia = String(fecha.getDate()).padStart(2, "0");
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    }
    const columnas = [
      { key: "rfc", label: "RFC", class: "col-md" },
      { key: "homoclave", label: "Homoclave", class: "col-sm" },
      {
        key: "nombre",
        label: "Nombre",
        class: "col-lg",
        format: (row) => nombreCompleto(row) || "-"
      },
      { key: "dependencia", label: "Dependencia", class: "col-lg" },
      { key: "autsanc", label: "Autoridad sancionadora", class: "col-lg" },
      { key: "cargo", label: "Cargo", class: "col-lg" },
      { key: "periodo", label: "Periodo", class: "col-md" },
      {
        key: "fechares",
        label: "Fecha resolución",
        class: "col-md",
        format: (row) => formatearFecha(row.fechares)
      }
    ];
    async function cargarRegistros(opciones = {}) {
      limpiarDebounce();
      error.value = "";
      if (opciones.resetPage) {
        pagina.value = 1;
      }
      if (typeof opciones.page === "number") {
        pagina.value = opciones.page;
      }
      if (typeof opciones.pageSize === "number") {
        itemsPorPagina.value = normalizarPageSize(opciones.pageSize);
      }
      cargando.value = true;
      try {
        const res = await sancionadosService.listarFederales({
          q: busqueda.value.trim() || void 0,
          page: pagina.value,
          page_size: itemsPorPagina.value
        });
        registros.value = res.results || [];
        pagina.value = res.page ?? pagina.value;
        totalPaginas.value = res.total_pages ?? 1;
        tieneSiguiente.value = Boolean(res.next);
        tieneAnterior.value = Boolean(res.previous);
        if (typeof res.page_size === "number") {
          itemsPorPagina.value = normalizarPageSize(res.page_size);
        }
      } catch (e) {
        error.value = "No se pudieron cargar los registros federales.";
        registros.value = [];
        pagina.value = 1;
        totalPaginas.value = 1;
        tieneSiguiente.value = false;
        tieneAnterior.value = false;
        mostrarError("No se pudieron cargar los registros federales.");
      } finally {
        cargando.value = false;
      }
    }
    function onPageChange({ page, pageSize }) {
      cargarRegistros({ page, pageSize });
    }
    watch(busqueda, (nuevoValor, valorAnterior) => {
      const nuevo = nuevoValor.trim();
      const anterior = (valorAnterior || "").trim();
      if (nuevo === anterior) return;
      limpiarDebounce();
      debounceTimer = setTimeout(async () => {
        await cargarRegistros({ resetPage: true });
      }, 350);
    });
    function verSeleccionado(item) {
      if (!item) return;
      router.push(`/admin/federal/ver?rfc=${encodeURIComponent(item.rfc)}`);
    }
    function editarSeleccionado(item) {
      if (!item) return;
      router.push(`/admin/federal/editar?rfc=${encodeURIComponent(item.rfc)}`);
    }
    async function eliminarSeleccionados(items) {
      limpiarMensajes();
      if (!items?.length) return;
      const texto = items.length === 1 ? "¿Eliminar el registro seleccionado?" : `¿Eliminar los ${items.length} registros seleccionados?`;
      const resultado = await Swal.fire({
        title: "Confirmar eliminación",
        text: texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
      if (!resultado.isConfirmed) return;
      try {
        for (const item of items) {
          await federalService.eliminar(item.rfc);
        }
        await cargarRegistros();
        const textoExito = items.length === 1 ? "Registro eliminado correctamente." : "Registros eliminados correctamente.";
        mensajeCarga.value = textoExito;
        mostrarExito(textoExito);
      } catch (e) {
        const textoError = e?.data?.error || "No se pudo eliminar uno o más registros.";
        error.value = textoError;
        mostrarError(textoError);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_TablaPaginada = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-eba13d24><div class="head" data-v-eba13d24><div data-v-eba13d24><h1 class="title" data-v-eba13d24>Sanciones Federales</h1><p class="subtitle" data-v-eba13d24>Tabla: INHABILIFEDERAL</p></div><div class="head-actions" data-v-eba13d24><label class="btn-upload" data-v-eba13d24> Cargar Excel <input type="file" accept=".xlsx,.xls" class="hidden-file" data-v-eba13d24></label>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/federal/nuevo",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Nuevo registro federal `);
          } else {
            return [
              createTextVNode(" Nuevo registro federal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="card" data-v-eba13d24><div class="search-row" data-v-eba13d24><input${ssrRenderAttr("value", busqueda.value)} type="text" class="input search-input" placeholder="Buscar por nombre, RFC, dependencia o cargo" data-v-eba13d24><button class="btn-dark" data-v-eba13d24>Buscar</button></div>`);
      if (subiendo.value) {
        _push(`<div class="info-box" data-v-eba13d24> Cargando archivo Excel... </div>`);
      } else {
        _push(`<!---->`);
      }
      if (mensajeCarga.value) {
        _push(`<div class="ok-box" data-v-eba13d24>${ssrInterpolate(mensajeCarga.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="error-box" data-v-eba13d24>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_TablaPaginada, {
        rows: registros.value,
        columns: columnas,
        "row-key": getItemKey,
        "get-display-name": nombreCompleto,
        "get-sort-date": obtenerFechaOrden,
        loading: cargando.value,
        "loading-text": "Cargando registros...",
        "empty-text": "No hay registros federales capturados todavía.",
        "items-per-page-options": PAGE_SIZE_OPTIONS,
        "default-items-per-page": 50,
        "max-page-size": MAX_PAGE_SIZE,
        "default-sort": "reciente",
        "storage-key": STORAGE_KEY,
        "server-side": "",
        page: pagina.value,
        "total-pages": totalPaginas.value,
        "has-next": tieneSiguiente.value,
        "has-previous": tieneAnterior.value,
        onPageChange,
        onViewSelected: verSeleccionado,
        onEditSelected: editarSeleccionado,
        onDeleteSelected: eliminarSeleccionados
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/federal/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eba13d24"]]);

export { index as default };
//# sourceMappingURL=index-Cai3oXWQ.mjs.map
