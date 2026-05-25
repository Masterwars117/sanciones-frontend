import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, reactive, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
  __name: "nuevo",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const guardando = ref(false);
    const cargandoCatalogos = ref(true);
    const mensaje = ref("");
    const error = ref("");
    const tipoEntidadSancionadora = ref("");
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
      dependencias: [],
      dependencias_por_tipo: {}
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
    const dependenciasFiltradas = computed(() => {
      if (!tipoEntidadSancionadora.value) {
        return catalogos.dependencias;
      }
      return catalogos.dependencias_por_tipo?.[tipoEntidadSancionadora.value] || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-19094607><div class="head" data-v-19094607><div data-v-19094607><h1 class="title" data-v-19094607>Nuevo registro estatal</h1><p class="subtitle" data-v-19094607>Tabla: INHABILITADOS</p></div>`);
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
      _push(`</div><div class="card" data-v-19094607>`);
      if (cargandoCatalogos.value) {
        _push(`<div class="empty" data-v-19094607> Cargando catálogos... </div>`);
      } else {
        _push(`<!--[--><div class="form-sections" data-v-19094607><section class="section-card" data-v-19094607><div class="section-head" data-v-19094607><h2 class="section-title" data-v-19094607>Identificación del registro</h2><p class="section-text" data-v-19094607>Datos base para alta del registro estatal.</p></div><div class="grid" data-v-19094607><div class="field" data-v-19094607><label data-v-19094607>Año *</label><input${ssrRenderAttr("value", form.anio)} class="input" maxlength="4" placeholder="Ej. 2025" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Sanción ID *</label><input${ssrRenderAttr("value", form.sancionid)} class="input" maxlength="6" placeholder="Ej. 000123" data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Entidad que sanciona</label><div class="radio-grid" data-v-19094607><!--[-->`);
        ssrRenderList(catalogos.tipos_entidad_sancionadora, (item) => {
          _push(`<button type="button" class="${ssrRenderClass([{ active: tipoEntidadSancionadora.value === String(item.clave) }, "radio-like"])}" data-v-19094607>${ssrInterpolate(item.descripcion)}</button>`);
        });
        _push(`<!--]--></div></div><div class="field wide" data-v-19094607><label data-v-19094607>Dependencia / Institución</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.dependencia) ? ssrLooseContain(form.dependencia, "") : ssrLooseEqual(form.dependencia, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(dependenciasFiltradas.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.dependencia) ? ssrLooseContain(form.dependencia, item.clave) : ssrLooseEqual(form.dependencia, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Clave entidad labora</label><input${ssrRenderAttr("value", form.cve_entidad_labora)} class="input" readonly placeholder="Se completa automáticamente" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Entidad labora</label><input${ssrRenderAttr("value", form.entidad_labora)} class="input" readonly placeholder="Se completa automáticamente" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Expediente</label><input${ssrRenderAttr("value", form.expediente)} class="input" placeholder="Ej. EXP-2025-001" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>ID SESEA</label><input${ssrRenderAttr("value", form.idsesea)} class="input" placeholder="Identificador interno" data-v-19094607></div></div></section><section class="section-card" data-v-19094607><div class="section-head" data-v-19094607><h2 class="section-title" data-v-19094607>Datos de la persona</h2><p class="section-text" data-v-19094607>Información personal y laboral del sancionado.</p></div><div class="grid" data-v-19094607><div class="field" data-v-19094607><label data-v-19094607>Apellido paterno</label><input${ssrRenderAttr("value", form.apaterno)} class="input" placeholder="Apellido paterno" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Apellido materno</label><input${ssrRenderAttr("value", form.amaterno)} class="input" placeholder="Apellido materno" data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Nombres</label><input${ssrRenderAttr("value", form.nombres)} class="input" placeholder="Nombre o nombres" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>RFC</label><input${ssrRenderAttr("value", form.rfc)} class="input upper" maxlength="13" placeholder="RFC de 12 o 13 caracteres" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>CURP</label><input${ssrRenderAttr("value", form.curp)} class="input upper" maxlength="18" placeholder="CURP de 18 caracteres" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Género</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.genero) ? ssrLooseContain(form.genero, "") : ssrLooseEqual(form.genero, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.generos, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.genero) ? ssrLooseContain(form.genero, item.clave) : ssrLooseEqual(form.genero, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Cargo</label><input${ssrRenderAttr("value", form.cargo)} class="input" placeholder="Cargo o puesto" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Nivel categoría</label><input${ssrRenderAttr("value", form.nivelcateg)} class="input" placeholder="Nivel o categoría" data-v-19094607></div></div></section><section class="section-card" data-v-19094607><div class="section-head" data-v-19094607><h2 class="section-title" data-v-19094607>Resolución y sanción</h2><p class="section-text" data-v-19094607>Datos jurídicos y vigencia de la sanción.</p></div><div class="grid" data-v-19094607><div class="field" data-v-19094607><label data-v-19094607>Oficio</label><input${ssrRenderAttr("value", form.oficio)} class="input" placeholder="Número o referencia de oficio" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Fecha oficio</label><input${ssrRenderAttr("value", form.f_oficio)} type="date" class="input" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Fecha resolución</label><input${ssrRenderAttr("value", form.f_resolucion)} type="date" class="input" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Periodo</label><input${ssrRenderAttr("value", form.periodo)} class="input" placeholder="Ej. 6 meses / 1 año" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Tipo sanción 1</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion) ? ssrLooseContain(form.tiposancion, "") : ssrLooseEqual(form.tiposancion, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion) ? ssrLooseContain(form.tiposancion, item.clave) : ssrLooseEqual(form.tiposancion, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Tipo sanción 2</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion2) ? ssrLooseContain(form.tiposancion2, "") : ssrLooseEqual(form.tiposancion2, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion2) ? ssrLooseContain(form.tiposancion2, item.clave) : ssrLooseEqual(form.tiposancion2, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Estatus sanción 1</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.statussanc1) ? ssrLooseContain(form.statussanc1, "") : ssrLooseEqual(form.statussanc1, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.estatus_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.statussanc1) ? ssrLooseContain(form.statussanc1, item.clave) : ssrLooseEqual(form.statussanc1, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Estatus sanción 2</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.statussanc2) ? ssrLooseContain(form.statussanc2, "") : ssrLooseEqual(form.statussanc2, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.estatus_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.statussanc2) ? ssrLooseContain(form.statussanc2, item.clave) : ssrLooseEqual(form.statussanc2, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Tipo falta</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tipofalta) ? ssrLooseContain(form.tipofalta, "") : ssrLooseEqual(form.tipofalta, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_falta, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tipofalta) ? ssrLooseContain(form.tipofalta, item.clave) : ssrLooseEqual(form.tipofalta, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Gravedad</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.gravedad) ? ssrLooseContain(form.gravedad, "") : ssrLooseEqual(form.gravedad, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.niveles_gravedad, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.gravedad) ? ssrLooseContain(form.gravedad, item.clave) : ssrLooseEqual(form.gravedad, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Fecha inicio inhabilitación</label><input${ssrRenderAttr("value", form.deinhabil)} type="date" class="input" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Fecha término inhabilitación</label><input${ssrRenderAttr("value", form.ainhabil)} type="date" class="input" data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Motivo</label><textarea class="input textarea" placeholder="Descripción del motivo de la sanción" data-v-19094607>${ssrInterpolate(form.motivo)}</textarea></div></div></section><section class="section-card" data-v-19094607><div class="section-head" data-v-19094607><h2 class="section-title" data-v-19094607>Montos y ejecución</h2><p class="section-text" data-v-19094607>Fechas de ejecución y montos relacionados.</p></div><div class="grid" data-v-19094607><div class="field" data-v-19094607><label data-v-19094607>Fecha ejecución 1</label><input${ssrRenderAttr("value", form.fejec1)} type="date" class="input" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Fecha ejecución 2</label><input${ssrRenderAttr("value", form.fejec2)} type="date" class="input" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Monto 1</label><input${ssrRenderAttr("value", form.monto1)} class="input" placeholder="Monto textual o libre" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Monto 2</label><input${ssrRenderAttr("value", form.monto2)} class="input" placeholder="Monto textual o libre" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Monto API 1</label><input${ssrRenderAttr("value", form.montoapi1)} type="number" step="any" class="input" placeholder="0.00" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Monto API 2</label><input${ssrRenderAttr("value", form.montoapi2)} type="number" step="any" class="input" placeholder="0.00" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Clave moneda 1</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda1) ? ssrLooseContain(form.cve_moneda1, "") : ssrLooseEqual(form.cve_moneda1, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.monedas, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda1) ? ssrLooseContain(form.cve_moneda1, item.clave) : ssrLooseEqual(form.cve_moneda1, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Clave moneda 2</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda2) ? ssrLooseContain(form.cve_moneda2, "") : ssrLooseEqual(form.cve_moneda2, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.monedas, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda2) ? ssrLooseContain(form.cve_moneda2, item.clave) : ssrLooseEqual(form.cve_moneda2, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Fecha registro</label><input${ssrRenderAttr("value", form.fechareg)} type="date" class="input" data-v-19094607></div><div class="field" data-v-19094607><label data-v-19094607>Particular</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.particular) ? ssrLooseContain(form.particular, "") : ssrLooseEqual(form.particular, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.opciones_particular, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.particular) ? ssrLooseContain(form.particular, item.clave) : ssrLooseEqual(form.particular, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div></div></section><section class="section-card" data-v-19094607><div class="section-head" data-v-19094607><h2 class="section-title" data-v-19094607>Documento y observaciones</h2><p class="section-text" data-v-19094607>Enlaces, referencia documental y notas finales.</p></div><div class="grid" data-v-19094607><div class="field" data-v-19094607><label data-v-19094607>Tipo documento</label><select class="input" data-v-19094607><option value="" data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tipo_docto) ? ssrLooseContain(form.tipo_docto, "") : ssrLooseEqual(form.tipo_docto, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_docto, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-19094607${ssrIncludeBooleanAttr(Array.isArray(form.tipo_docto) ? ssrLooseContain(form.tipo_docto, item.clave) : ssrLooseEqual(form.tipo_docto, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-19094607><label data-v-19094607>Fecha documento</label><input${ssrRenderAttr("value", form.fecha_docto)} type="date" class="input" data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Título documento</label><input${ssrRenderAttr("value", form.titulo_docto)} class="input" placeholder="Título o nombre del documento" data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Descripción documento</label><input${ssrRenderAttr("value", form.descripcion_docto)} class="input" placeholder="Breve descripción documental" data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Resolución URL</label><input${ssrRenderAttr("value", form.resolucionurl)} class="input" placeholder="https://..." data-v-19094607></div><div class="field wide" data-v-19094607><label data-v-19094607>Observaciones</label><textarea class="input textarea" placeholder="Notas u observaciones adicionales" data-v-19094607>${ssrInterpolate(form.observaciones)}</textarea></div></div></section></div><div class="actions" data-v-19094607><button class="btn-primary"${ssrIncludeBooleanAttr(guardando.value) ? " disabled" : ""} data-v-19094607>${ssrInterpolate(guardando.value ? "Guardando..." : "Guardar registro")}</button></div>`);
        if (mensaje.value) {
          _push(`<div class="ok-box" data-v-19094607>${ssrInterpolate(mensaje.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (error.value) {
          _push(`<div class="error-box" data-v-19094607>${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/estatal/nuevo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const nuevo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19094607"]]);

export { nuevo as default };
//# sourceMappingURL=nuevo-CteqgaaB.mjs.map
