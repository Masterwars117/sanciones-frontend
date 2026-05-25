import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { _ as __nuxt_component_1, s as sancionadosService } from './sancionadosService-DAnU8xhf.mjs';
import { ref, watch, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
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

const estatalService = {
  obtenerDetalle(anio, sancionid) {
    return api("/estatal/detalle", {
      query: { anio, sancionid }
    });
  },
  crear(registro) {
    return api("/estatal/crear", {
      method: "POST",
      body: registro
    });
  },
  editar(payload) {
    return api("/estatal/editar", {
      method: "POST",
      body: payload
    });
  },
  eliminar(anio, sancionid) {
    return api("/estatal/eliminar", {
      method: "POST",
      body: { anio, sancionid }
    });
  }
};
const MAX_PAGE_SIZE = 200;
const STORAGE_KEY = "estatal";
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
    let debounceTimer = null;
    function normalizarPageSize(valor) {
      const numero = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(valor)));
      if (PAGE_SIZE_OPTIONS.includes(numero)) {
        return numero;
      }
      return 50;
    }
    function limpiarDebounce() {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    }
    function getItemKey(item) {
      return `${item.anio}-${item.sancionid}`;
    }
    function nombreCompleto(item) {
      return [item.nombres, item.apaterno, item.amaterno].filter(Boolean).join(" ").trim();
    }
    function obtenerFechaOrden(item) {
      return item?.fechareg || null;
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
      { key: "anio", label: "Año", class: "col-sm" },
      { key: "sancionid", label: "Sanción ID", class: "col-sm" },
      { key: "expediente", label: "Expediente", class: "col-md" },
      {
        key: "nombre",
        label: "Nombre",
        class: "col-lg",
        format: (row) => nombreCompleto(row) || "-"
      },
      { key: "rfc", label: "RFC", class: "col-md" },
      { key: "curp", label: "CURP", class: "col-lg" },
      { key: "cargo", label: "Cargo", class: "col-lg" },
      { key: "dependencia", label: "Dependencia", class: "col-md" },
      {
        key: "fechareg",
        label: "Fecha registro",
        class: "col-md",
        format: (row) => formatearFecha(row.fechareg)
      }
    ];
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
    async function cargarRegistros(opciones = {}) {
      limpiarDebounce();
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
        const res = await sancionadosService.listarEstatales({
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
        registros.value = [];
        pagina.value = 1;
        totalPaginas.value = 1;
        tieneSiguiente.value = false;
        tieneAnterior.value = false;
        mostrarError("No se pudieron cargar los registros estatales.");
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
      router.push(
        `/admin/estatal/ver?anio=${encodeURIComponent(item.anio)}&sancionid=${encodeURIComponent(item.sancionid)}`
      );
    }
    function editarSeleccionado(item) {
      if (!item) return;
      router.push(
        `/admin/estatal/editar?anio=${encodeURIComponent(item.anio)}&sancionid=${encodeURIComponent(item.sancionid)}`
      );
    }
    async function eliminarSeleccionados(items) {
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
          await estatalService.eliminar(item.anio, item.sancionid);
        }
        await cargarRegistros();
        mostrarExito(
          items.length === 1 ? "Registro eliminado correctamente." : "Registros eliminados correctamente."
        );
      } catch (e) {
        mostrarError(e?.data?.error || "No se pudo eliminar uno o más registros.");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_TablaPaginada = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3d1f5ed8><div class="head" data-v-3d1f5ed8><div data-v-3d1f5ed8><h1 class="title" data-v-3d1f5ed8>Sanciones Estatales</h1><p class="subtitle" data-v-3d1f5ed8>Tabla: INHABILITADOS</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/estatal/nuevo",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Nuevo registro estatal `);
          } else {
            return [
              createTextVNode(" Nuevo registro estatal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card" data-v-3d1f5ed8><div class="search-row" data-v-3d1f5ed8><input${ssrRenderAttr("value", busqueda.value)} type="text" class="input search-input" placeholder="Buscar por expediente, nombre, RFC o CURP" data-v-3d1f5ed8><button class="btn-dark" data-v-3d1f5ed8>Buscar</button></div>`);
      _push(ssrRenderComponent(_component_TablaPaginada, {
        rows: registros.value,
        columns: columnas,
        "row-key": getItemKey,
        "get-display-name": nombreCompleto,
        "get-sort-date": obtenerFechaOrden,
        loading: cargando.value,
        "loading-text": "Cargando registros...",
        "empty-text": "No hay registros estatales capturados todavía.",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/estatal/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d1f5ed8"]]);

export { index as default };
//# sourceMappingURL=index-D9cJsV49.mjs.map
