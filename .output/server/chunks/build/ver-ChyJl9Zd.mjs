import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, reactive, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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

const _sfc_main = {
  __name: "ver",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const cargandoDetalle = ref(false);
    const error = ref("");
    const catalogos = reactive({
      generos: [],
      tipos_sancion: [],
      monedas: [],
      niveles_gravedad: [],
      tipos_falta: [],
      tipos_docto: [],
      estatus_sancion: [],
      opciones_particular: [],
      tipos_entidad_sancionadora: [],
      dependencias: []
    });
    const form = reactive({
      anio: "",
      sancionid: "",
      oficio: "",
      f_oficio: "",
      expediente: "",
      f_resolucion: "",
      apaterno: "",
      amaterno: "",
      nombres: "",
      dependencia: "",
      cargo: "",
      entidad_labora: "",
      tiposancion: "",
      tiposancion2: "",
      periodo: "",
      deinhabil: "",
      ainhabil: "",
      motivo: "",
      statussanc1: "",
      statussanc2: "",
      rfc: "",
      fejec1: "",
      fejec2: "",
      monto1: "",
      monto2: "",
      curp: "",
      fechareg: "",
      genero: "",
      idsesea: "",
      cve_entidad_labora: "",
      tipofalta: "",
      nivelcateg: "",
      resolucionurl: "",
      observaciones: "",
      cve_moneda1: "",
      cve_moneda2: "",
      tipo_docto: "",
      titulo_docto: "",
      descripcion_docto: "",
      fecha_docto: "",
      particular: "",
      montoapi1: "",
      montoapi2: "",
      gravedad: ""
    });
    function mostrar(valor) {
      if (valor === null || valor === void 0 || valor === "") return "-";
      return String(valor);
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
    function buscarDescripcion(lista, clave, campoDescripcion = "descripcion") {
      if (!clave) return "-";
      const item = lista.find((x) => String(x.clave) === String(clave));
      return item ? `${item.clave} - ${item[campoDescripcion]}` : String(clave);
    }
    const descripcionGenero = computed(
      () => buscarDescripcion(catalogos.generos, form.genero)
    );
    const descripcionTipoSancion1 = computed(
      () => buscarDescripcion(catalogos.tipos_sancion, form.tiposancion)
    );
    const descripcionTipoSancion2 = computed(
      () => buscarDescripcion(catalogos.tipos_sancion, form.tiposancion2)
    );
    const descripcionEstatus1 = computed(
      () => buscarDescripcion(catalogos.estatus_sancion, form.statussanc1)
    );
    const descripcionEstatus2 = computed(
      () => buscarDescripcion(catalogos.estatus_sancion, form.statussanc2)
    );
    const descripcionTipoFalta = computed(
      () => buscarDescripcion(catalogos.tipos_falta, form.tipofalta)
    );
    const descripcionGravedad = computed(
      () => buscarDescripcion(catalogos.niveles_gravedad, form.gravedad)
    );
    const descripcionMoneda1 = computed(
      () => buscarDescripcion(catalogos.monedas, form.cve_moneda1)
    );
    const descripcionMoneda2 = computed(
      () => buscarDescripcion(catalogos.monedas, form.cve_moneda2)
    );
    const descripcionTipoDocto = computed(
      () => buscarDescripcion(catalogos.tipos_docto, form.tipo_docto, "descripcion")
    );
    const descripcionParticular = computed(
      () => buscarDescripcion(catalogos.opciones_particular, form.particular)
    );
    const descripcionTipoEntidad = computed(() => {
      const dep = catalogos.dependencias.find(
        (item) => String(item.clave) === String(form.dependencia || form.cve_entidad_labora)
      );
      if (!dep) return "-";
      const tipo = catalogos.tipos_entidad_sancionadora.find(
        (item) => String(item.clave) === String(dep.tipo)
      );
      return tipo ? `${tipo.clave} - ${tipo.descripcion}` : String(dep.tipo);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-2b49ec0d><div class="head" data-v-2b49ec0d><div data-v-2b49ec0d><h1 class="title" data-v-2b49ec0d>Detalle del registro estatal</h1><p class="subtitle" data-v-2b49ec0d>Tabla: INHABILITADOS</p></div><div class="head-actions" data-v-2b49ec0d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/estatal/editar?anio=${encodeURIComponent(form.anio)}&sancionid=${encodeURIComponent(form.sancionid)}`,
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Editar `);
          } else {
            return [
              createTextVNode(" Editar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/estatal",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Volver `);
          } else {
            return [
              createTextVNode(" Volver ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="card" data-v-2b49ec0d>`);
      if (cargandoDetalle.value) {
        _push(`<div class="empty" data-v-2b49ec0d> Cargando registro... </div>`);
      } else {
        _push(`<!--[--><div class="form-sections" data-v-2b49ec0d><section class="section-card" data-v-2b49ec0d><div class="section-head" data-v-2b49ec0d><h2 class="section-title" data-v-2b49ec0d>Identificación del registro</h2><p class="section-text" data-v-2b49ec0d>Datos base del registro estatal.</p></div><div class="grid" data-v-2b49ec0d><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Año</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.anio))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Sanción ID</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.sancionid))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Tipo entidad sancionadora</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionTipoEntidad.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Dependencia</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.dependencia))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Clave entidad labora</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.cve_entidad_labora))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Entidad labora</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.entidad_labora))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Expediente</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.expediente))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>ID SESEA</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.idsesea))}</div></div></div></section><section class="section-card" data-v-2b49ec0d><div class="section-head" data-v-2b49ec0d><h2 class="section-title" data-v-2b49ec0d>Datos de la persona</h2><p class="section-text" data-v-2b49ec0d>Información personal y laboral del sancionado.</p></div><div class="grid" data-v-2b49ec0d><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Apellido paterno</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.apaterno))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Apellido materno</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.amaterno))}</div></div><div class="field wide" data-v-2b49ec0d><label data-v-2b49ec0d>Nombres</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.nombres))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>RFC</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.rfc))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>CURP</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.curp))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Género</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionGenero.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Cargo</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.cargo))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Nivel categoría</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.nivelcateg))}</div></div></div></section><section class="section-card" data-v-2b49ec0d><div class="section-head" data-v-2b49ec0d><h2 class="section-title" data-v-2b49ec0d>Resolución y sanción</h2><p class="section-text" data-v-2b49ec0d>Datos jurídicos y vigencia de la sanción.</p></div><div class="grid" data-v-2b49ec0d><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Oficio</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.oficio))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha oficio</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.f_oficio))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha resolución</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.f_resolucion))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Periodo</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.periodo))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Tipo sanción 1</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionTipoSancion1.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Tipo sanción 2</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionTipoSancion2.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Estatus sanción 1</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionEstatus1.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Estatus sanción 2</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionEstatus2.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Tipo falta</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionTipoFalta.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Gravedad</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionGravedad.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha inicio inhabilitación</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.deinhabil))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha término inhabilitación</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.ainhabil))}</div></div><div class="field wide" data-v-2b49ec0d><label data-v-2b49ec0d>Motivo</label><div class="value-box multiline" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.motivo))}</div></div></div></section><section class="section-card" data-v-2b49ec0d><div class="section-head" data-v-2b49ec0d><h2 class="section-title" data-v-2b49ec0d>Montos y ejecución</h2><p class="section-text" data-v-2b49ec0d>Fechas de ejecución y montos relacionados.</p></div><div class="grid" data-v-2b49ec0d><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha ejecución 1</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.fejec1))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha ejecución 2</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.fejec2))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Monto 1</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.monto1))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Monto 2</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.monto2))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Monto API 1</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.montoapi1))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Monto API 2</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.montoapi2))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Clave moneda 1</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionMoneda1.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Clave moneda 2</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionMoneda2.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha registro</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.fechareg))}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Particular</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionParticular.value)}</div></div></div></section><section class="section-card" data-v-2b49ec0d><div class="section-head" data-v-2b49ec0d><h2 class="section-title" data-v-2b49ec0d>Documento y observaciones</h2><p class="section-text" data-v-2b49ec0d>Enlaces, referencia documental y notas finales.</p></div><div class="grid" data-v-2b49ec0d><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Tipo documento</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(descripcionTipoDocto.value)}</div></div><div class="field" data-v-2b49ec0d><label data-v-2b49ec0d>Fecha documento</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(formatearFecha(form.fecha_docto))}</div></div><div class="field wide" data-v-2b49ec0d><label data-v-2b49ec0d>Título documento</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.titulo_docto))}</div></div><div class="field wide" data-v-2b49ec0d><label data-v-2b49ec0d>Descripción documento</label><div class="value-box" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.descripcion_docto))}</div></div><div class="field wide" data-v-2b49ec0d><label data-v-2b49ec0d>Resolución URL</label><div class="value-box url-box" data-v-2b49ec0d>`);
        if (form.resolucionurl) {
          _push(`<a${ssrRenderAttr("href", form.resolucionurl)} target="_blank" rel="noopener noreferrer" class="url-link" data-v-2b49ec0d>${ssrInterpolate(form.resolucionurl)}</a>`);
        } else {
          _push(`<span data-v-2b49ec0d>-</span>`);
        }
        _push(`</div></div><div class="field wide" data-v-2b49ec0d><label data-v-2b49ec0d>Observaciones</label><div class="value-box multiline" data-v-2b49ec0d>${ssrInterpolate(mostrar(form.observaciones))}</div></div></div></section></div>`);
        if (error.value) {
          _push(`<div class="error-box" data-v-2b49ec0d>${ssrInterpolate(error.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/estatal/ver.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ver = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b49ec0d"]]);

export { ver as default };
//# sourceMappingURL=ver-ChyJl9Zd.mjs.map
