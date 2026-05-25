import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { ref, computed, watch, nextTick, useSSRContext } from 'vue';
import { _ as _export_sfc } from './server.mjs';
import { a as api } from './api-C_eT-WN3.mjs';

const _sfc_main = {
  __name: "TablaPaginada",
  __ssrInlineRender: true,
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: Function,
      required: true
    },
    getDisplayName: {
      type: Function,
      default: null
    },
    getSortDate: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: "Cargando registros..."
    },
    emptyText: {
      type: String,
      default: "No hay registros."
    },
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100, 200]
    },
    defaultItemsPerPage: {
      type: Number,
      default: 50
    },
    maxPageSize: {
      type: Number,
      default: 200
    },
    defaultSort: {
      type: String,
      default: "reciente"
    },
    showSelection: {
      type: Boolean,
      default: true
    },
    showTopActions: {
      type: Boolean,
      default: true
    },
    showSelectionCount: {
      type: Boolean,
      default: true
    },
    storageKey: {
      type: String,
      default: ""
    },
    serverSide: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    hasNext: {
      type: Boolean,
      default: false
    },
    hasPrevious: {
      type: Boolean,
      default: false
    },
    totalCount: {
      type: Number,
      default: null
    }
  },
  emits: [
    "view-selected",
    "edit-selected",
    "delete-selected",
    "selection-change",
    "page-change"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const paginaActual = ref(1);
    const porPagina = ref(props.defaultItemsPerPage);
    const orden = ref(props.defaultSort);
    const selectedIds = ref([]);
    const paginaDestino = ref("");
    const headerCheckbox = ref(null);
    computed(() => {
      return props.storageKey ? `tabla-paginada:${props.storageKey}` : "";
    });
    function getKey(row) {
      return props.rowKey(row);
    }
    function limpiarSeleccion() {
      selectedIds.value = [];
    }
    function obtenerNombre(row) {
      if (!props.getDisplayName) return "";
      return (props.getDisplayName(row) || "").toString().trim();
    }
    function obtenerTiempoFecha(row) {
      if (!props.getSortDate) return 0;
      const raw = props.getSortDate(row);
      if (!raw) return 0;
      const fecha = new Date(raw);
      const tiempo = fecha.getTime();
      return Number.isNaN(tiempo) ? 0 : tiempo;
    }
    function normalizarTexto(value) {
      return (value || "").toString().trim().toLowerCase();
    }
    function formatearValor(columna, fila) {
      if (typeof columna.format === "function") {
        return columna.format(fila);
      }
      const valor = fila[columna.key];
      return valor ?? "-";
    }
    function normalizarPorPagina(valor) {
      const numero = Math.min(props.maxPageSize, Math.max(1, Number(valor)));
      if (props.itemsPerPageOptions.includes(numero)) {
        return numero;
      }
      return props.defaultItemsPerPage;
    }
    const filasOrdenadas = computed(() => {
      if (props.serverSide) {
        return props.rows;
      }
      const lista = [...props.rows];
      if (orden.value === "nombre_asc") {
        return lista.sort(
          (a, b) => normalizarTexto(obtenerNombre(a)).localeCompare(normalizarTexto(obtenerNombre(b)), "es")
        );
      }
      if (orden.value === "nombre_desc") {
        return lista.sort(
          (a, b) => normalizarTexto(obtenerNombre(b)).localeCompare(normalizarTexto(obtenerNombre(a)), "es")
        );
      }
      if (orden.value === "antiguo") {
        return lista.sort((a, b) => obtenerTiempoFecha(a) - obtenerTiempoFecha(b));
      }
      return lista.sort((a, b) => obtenerTiempoFecha(b) - obtenerTiempoFecha(a));
    });
    const paginaVisible = computed(() => {
      return props.serverSide ? props.page : paginaActual.value;
    });
    const totalPaginas = computed(() => {
      if (props.serverSide) {
        return props.totalPages > 0 ? props.totalPages : 1;
      }
      const total = filasOrdenadas.value.length;
      return total > 0 ? Math.ceil(total / porPagina.value) : 1;
    });
    const inicioPagina = computed(() => {
      return (paginaVisible.value - 1) * porPagina.value;
    });
    const finPagina = computed(() => {
      return inicioPagina.value + porPagina.value;
    });
    const filasPaginadas = computed(() => {
      if (props.serverSide) {
        return filasOrdenadas.value;
      }
      return filasOrdenadas.value.slice(inicioPagina.value, finPagina.value);
    });
    const totalResultados = computed(() => {
      if (props.serverSide && props.totalCount != null) {
        return props.totalCount;
      }
      return filasOrdenadas.value.length;
    });
    const textoTotalResultados = computed(() => {
      if (props.serverSide && props.totalCount == null) {
        return `Resultados en esta página: ${filasPaginadas.value.length}`;
      }
      return `Total resultados: ${totalResultados.value}`;
    });
    const textoRango = computed(() => {
      if (props.serverSide) {
        const count = filasPaginadas.value.length;
        if (count === 0) return "0 registros";
        return `${count} registro${count === 1 ? "" : "s"} en esta página`;
      }
      const total = totalResultados.value;
      if (total === 0) return "0-0 de 0";
      const inicio = inicioPagina.value + 1;
      const fin = Math.min(finPagina.value, total);
      return `${inicio}-${fin} de ${total}`;
    });
    const puedeIrAtras = computed(() => {
      return props.serverSide ? props.hasPrevious : paginaVisible.value > 1;
    });
    const puedeIrAdelante = computed(() => {
      return props.serverSide ? props.hasNext : paginaVisible.value < totalPaginas.value;
    });
    const idsPaginaActual = computed(() => {
      return filasPaginadas.value.map((fila) => getKey(fila));
    });
    const todosSeleccionadosEnPagina = computed(() => {
      if (idsPaginaActual.value.length === 0) return false;
      return idsPaginaActual.value.every((id) => selectedIds.value.includes(id));
    });
    const algunosSeleccionadosEnPagina = computed(() => {
      if (idsPaginaActual.value.length === 0) return false;
      const seleccionados = idsPaginaActual.value.filter((id) => selectedIds.value.includes(id)).length;
      return seleccionados > 0 && seleccionados < idsPaginaActual.value.length;
    });
    const mostrarSaltoPagina = computed(() => totalPaginas.value > 1);
    const selectedRows = computed(() => {
      return props.rows.filter((row) => selectedIds.value.includes(getKey(row)));
    });
    watch(selectedRows, (rows) => {
      emit("selection-change", rows);
    });
    function emitPageChange(page) {
      emit("page-change", {
        page,
        pageSize: porPagina.value,
        sort: orden.value
      });
    }
    watch(
      () => props.rows,
      () => {
        selectedIds.value = [];
        paginaDestino.value = "";
        if (!props.serverSide) {
          paginaActual.value = 1;
        }
      }
    );
    watch(porPagina, (nuevoValor) => {
      const normalizado = normalizarPorPagina(nuevoValor);
      if (normalizado !== nuevoValor) {
        porPagina.value = normalizado;
        return;
      }
      paginaDestino.value = "";
      limpiarSeleccion();
      if (props.serverSide) {
        emitPageChange(1);
        return;
      }
      paginaActual.value = 1;
    });
    watch(orden, () => {
      paginaDestino.value = "";
      limpiarSeleccion();
      if (props.serverSide) {
        emitPageChange(1);
        return;
      }
      paginaActual.value = 1;
    });
    watch(filasOrdenadas, () => {
      if (props.serverSide) return;
      if (paginaActual.value > totalPaginas.value) {
        paginaActual.value = totalPaginas.value;
      }
    });
    watch(
      [todosSeleccionadosEnPagina, algunosSeleccionadosEnPagina],
      async () => {
        await nextTick();
        if (headerCheckbox.value) {
          headerCheckbox.value.indeterminate = algunosSeleccionadosEnPagina.value;
        }
      },
      { immediate: true }
    );
    function estaSeleccionado(row) {
      return selectedIds.value.includes(getKey(row));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a1e62ec8>`);
      if (__props.showTopActions) {
        _push(`<div class="controls-row" data-v-a1e62ec8><div class="left-controls" data-v-a1e62ec8><button class="action-top action-view"${ssrIncludeBooleanAttr(selectedRows.value.length !== 1) ? " disabled" : ""}${ssrRenderAttr("title", selectedRows.value.length !== 1 ? "Selecciona 1 registro para ver" : "")} data-v-a1e62ec8> Ver </button><button class="action-top action-edit"${ssrIncludeBooleanAttr(selectedRows.value.length !== 1) ? " disabled" : ""}${ssrRenderAttr("title", selectedRows.value.length !== 1 ? "Selecciona 1 registro para editar" : "")} data-v-a1e62ec8> Editar </button><button class="action-top action-delete"${ssrIncludeBooleanAttr(selectedRows.value.length === 0) ? " disabled" : ""}${ssrRenderAttr("title", selectedRows.value.length === 0 ? "Selecciona al menos 1 registro para eliminar" : "")} data-v-a1e62ec8> Eliminar </button><button class="action-top action-clear"${ssrIncludeBooleanAttr(selectedRows.value.length === 0) ? " disabled" : ""} data-v-a1e62ec8> Limpiar selección </button></div><div class="right-controls" data-v-a1e62ec8><div class="filter-item" data-v-a1e62ec8><label data-v-a1e62ec8>Ordenar por</label><select class="input select-small" data-v-a1e62ec8><option value="reciente" data-v-a1e62ec8${ssrIncludeBooleanAttr(Array.isArray(orden.value) ? ssrLooseContain(orden.value, "reciente") : ssrLooseEqual(orden.value, "reciente")) ? " selected" : ""}>Más reciente</option><option value="antiguo" data-v-a1e62ec8${ssrIncludeBooleanAttr(Array.isArray(orden.value) ? ssrLooseContain(orden.value, "antiguo") : ssrLooseEqual(orden.value, "antiguo")) ? " selected" : ""}>Más antiguo</option><option value="nombre_asc" data-v-a1e62ec8${ssrIncludeBooleanAttr(Array.isArray(orden.value) ? ssrLooseContain(orden.value, "nombre_asc") : ssrLooseEqual(orden.value, "nombre_asc")) ? " selected" : ""}>Nombre A-Z</option><option value="nombre_desc" data-v-a1e62ec8${ssrIncludeBooleanAttr(Array.isArray(orden.value) ? ssrLooseContain(orden.value, "nombre_desc") : ssrLooseEqual(orden.value, "nombre_desc")) ? " selected" : ""}>Nombre Z-A</option></select></div><div class="filter-item" data-v-a1e62ec8><label data-v-a1e62ec8>Items por página</label><select class="input select-small" data-v-a1e62ec8><!--[-->`);
        ssrRenderList(__props.itemsPerPageOptions, (opcion) => {
          _push(`<option${ssrRenderAttr("value", opcion)} data-v-a1e62ec8${ssrIncludeBooleanAttr(Array.isArray(porPagina.value) ? ssrLooseContain(porPagina.value, opcion) : ssrLooseEqual(porPagina.value, opcion)) ? " selected" : ""}>${ssrInterpolate(opcion)}</option>`);
        });
        _push(`<!--]--></select></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="meta" data-v-a1e62ec8><span data-v-a1e62ec8>${ssrInterpolate(textoTotalResultados.value)}</span>`);
      if (__props.showSelectionCount) {
        _push(`<span data-v-a1e62ec8>Seleccionados: ${ssrInterpolate(selectedRows.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.loading) {
        _push(`<div class="empty" data-v-a1e62ec8><div class="mini-spinner" data-v-a1e62ec8></div><span data-v-a1e62ec8>${ssrInterpolate(__props.loadingText)}</span></div>`);
      } else if (filasOrdenadas.value.length === 0) {
        _push(`<div class="empty" data-v-a1e62ec8>${ssrInterpolate(__props.emptyText)}</div>`);
      } else {
        _push(`<!--[--><div class="table-wrap" data-v-a1e62ec8><table class="table" data-v-a1e62ec8><thead data-v-a1e62ec8><tr data-v-a1e62ec8>`);
        if (__props.showSelection) {
          _push(`<th class="col-check" data-v-a1e62ec8><input type="checkbox"${ssrIncludeBooleanAttr(todosSeleccionadosEnPagina.value) ? " checked" : ""} data-v-a1e62ec8></th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(__props.columns, (columna) => {
          _push(`<th class="${ssrRenderClass(columna.class || "")}" data-v-a1e62ec8>${ssrInterpolate(columna.label)}</th>`);
        });
        _push(`<!--]--></tr></thead><tbody data-v-a1e62ec8><!--[-->`);
        ssrRenderList(filasPaginadas.value, (fila) => {
          _push(`<tr class="${ssrRenderClass({ selectedRow: estaSeleccionado(fila) })}" data-v-a1e62ec8>`);
          if (__props.showSelection) {
            _push(`<td data-v-a1e62ec8><input type="checkbox"${ssrIncludeBooleanAttr(estaSeleccionado(fila)) ? " checked" : ""} data-v-a1e62ec8></td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(__props.columns, (columna) => {
            _push(`<td class="${ssrRenderClass(columna.class || "")}" data-v-a1e62ec8>`);
            ssrRenderSlot(_ctx.$slots, `cell-${columna.key}`, {
              row: fila,
              value: fila[columna.key]
            }, () => {
              _push(`${ssrInterpolate(formatearValor(columna, fila))}`);
            }, _push, _parent);
            _push(`</td>`);
          });
          _push(`<!--]--></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-a1e62ec8><div class="footer-left" data-v-a1e62ec8><span class="footer-label" data-v-a1e62ec8>Items por página:</span><select class="footer-select" data-v-a1e62ec8><!--[-->`);
        ssrRenderList(__props.itemsPerPageOptions, (opcion) => {
          _push(`<option${ssrRenderAttr("value", opcion)} data-v-a1e62ec8${ssrIncludeBooleanAttr(Array.isArray(porPagina.value) ? ssrLooseContain(porPagina.value, opcion) : ssrLooseEqual(porPagina.value, opcion)) ? " selected" : ""}>${ssrInterpolate(opcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="footer-center" data-v-a1e62ec8><span data-v-a1e62ec8>${ssrInterpolate(textoRango.value)}</span><span class="page-info" data-v-a1e62ec8>Página ${ssrInterpolate(paginaVisible.value)} de ${ssrInterpolate(totalPaginas.value)}</span></div><div class="footer-right" data-v-a1e62ec8><button class="pager-btn"${ssrIncludeBooleanAttr(!puedeIrAtras.value) ? " disabled" : ""} title="Primera página" data-v-a1e62ec8> « </button><button class="pager-btn"${ssrIncludeBooleanAttr(!puedeIrAtras.value) ? " disabled" : ""} title="Página anterior" data-v-a1e62ec8> ‹ </button>`);
        if (mostrarSaltoPagina.value) {
          _push(`<div class="jump-box" data-v-a1e62ec8><span class="jump-label" data-v-a1e62ec8>Ir a</span><input${ssrRenderAttr("value", paginaDestino.value)} type="number" min="1"${ssrRenderAttr("max", totalPaginas.value)} class="jump-input" data-v-a1e62ec8><button class="jump-btn" data-v-a1e62ec8> OK </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="pager-btn"${ssrIncludeBooleanAttr(!puedeIrAdelante.value) ? " disabled" : ""} title="Página siguiente" data-v-a1e62ec8> › </button><button class="pager-btn"${ssrIncludeBooleanAttr(!puedeIrAdelante.value) ? " disabled" : ""} title="Última página" data-v-a1e62ec8> » </button></div></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TablaPaginada.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-a1e62ec8"]]), { __name: "TablaPaginada" });
const sancionadosService = {
  listarEstatales(params = {}) {
    return api("/sancionados", {
      query: { ...params, tipo: "estatal" }
    });
  },
  listarFederales(params = {}) {
    return api("/sancionados", {
      query: { ...params, tipo: "federal" }
    });
  }
};

export { __nuxt_component_1 as _, sancionadosService as s };
//# sourceMappingURL=sancionadosService-DAnU8xhf.mjs.map
