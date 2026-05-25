import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, reactive, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
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
  __name: "editar",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const guardando = ref(false);
    const cargandoDetalle = ref(false);
    const cargandoCatalogos = ref(true);
    const mensaje = ref("");
    const error = ref("");
    ref("");
    ref("");
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-01f9aa3f><div class="head" data-v-01f9aa3f><div data-v-01f9aa3f><h1 class="title" data-v-01f9aa3f>Editar registro estatal</h1><p class="subtitle" data-v-01f9aa3f>Tabla: INHABILITADOS</p></div>`);
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
      _push(`</div><div class="card" data-v-01f9aa3f>`);
      if (cargandoDetalle.value || cargandoCatalogos.value) {
        _push(`<div class="empty" data-v-01f9aa3f>${ssrInterpolate(cargandoCatalogos.value ? "Cargando catálogos..." : "Cargando registro...")}</div>`);
      } else {
        _push(`<!--[--><div class="form-sections" data-v-01f9aa3f><section class="section-card" data-v-01f9aa3f><div class="section-head" data-v-01f9aa3f><h2 class="section-title" data-v-01f9aa3f>Identificación del registro</h2><p class="section-text" data-v-01f9aa3f>Datos base del registro estatal.</p></div><div class="grid" data-v-01f9aa3f><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Año *</label><input${ssrRenderAttr("value", form.anio)} class="input input-disabled" disabled data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Sanción ID *</label><input${ssrRenderAttr("value", form.sancionid)} class="input input-disabled" disabled data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Entidad que sanciona</label><div class="radio-grid" data-v-01f9aa3f><!--[-->`);
        ssrRenderList(catalogos.tipos_entidad_sancionadora, (item) => {
          _push(`<button type="button" class="${ssrRenderClass([{ active: tipoEntidadSancionadora.value === String(item.clave) }, "radio-like"])}" data-v-01f9aa3f>${ssrInterpolate(item.descripcion)}</button>`);
        });
        _push(`<!--]--></div></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Dependencia / Institución</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.dependencia) ? ssrLooseContain(form.dependencia, "") : ssrLooseEqual(form.dependencia, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(dependenciasFiltradas.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.dependencia) ? ssrLooseContain(form.dependencia, item.clave) : ssrLooseEqual(form.dependencia, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Clave entidad labora</label><input${ssrRenderAttr("value", form.cve_entidad_labora)} class="input" readonly placeholder="Se completa automáticamente" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Entidad labora</label><input${ssrRenderAttr("value", form.entidad_labora)} class="input" readonly placeholder="Se completa automáticamente" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Expediente</label><input${ssrRenderAttr("value", form.expediente)} class="input" placeholder="Ej. EXP-2025-001" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>ID SESEA</label><input${ssrRenderAttr("value", form.idsesea)} class="input" placeholder="Identificador interno" data-v-01f9aa3f></div></div></section><section class="section-card" data-v-01f9aa3f><div class="section-head" data-v-01f9aa3f><h2 class="section-title" data-v-01f9aa3f>Datos de la persona</h2><p class="section-text" data-v-01f9aa3f>Información personal y laboral del sancionado.</p></div><div class="grid" data-v-01f9aa3f><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Apellido paterno</label><input${ssrRenderAttr("value", form.apaterno)} class="input" placeholder="Apellido paterno" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Apellido materno</label><input${ssrRenderAttr("value", form.amaterno)} class="input" placeholder="Apellido materno" data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Nombres</label><input${ssrRenderAttr("value", form.nombres)} class="input" placeholder="Nombre o nombres" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>RFC</label><input${ssrRenderAttr("value", form.rfc)} class="input upper" maxlength="13" placeholder="RFC de 12 o 13 caracteres" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>CURP</label><input${ssrRenderAttr("value", form.curp)} class="input upper" maxlength="18" placeholder="CURP de 18 caracteres" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Género</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.genero) ? ssrLooseContain(form.genero, "") : ssrLooseEqual(form.genero, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.generos, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.genero) ? ssrLooseContain(form.genero, item.clave) : ssrLooseEqual(form.genero, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Cargo</label><input${ssrRenderAttr("value", form.cargo)} class="input" placeholder="Cargo o puesto" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Nivel categoría</label><input${ssrRenderAttr("value", form.nivelcateg)} class="input" placeholder="Nivel o categoría" data-v-01f9aa3f></div></div></section><section class="section-card" data-v-01f9aa3f><div class="section-head" data-v-01f9aa3f><h2 class="section-title" data-v-01f9aa3f>Resolución y sanción</h2><p class="section-text" data-v-01f9aa3f>Datos jurídicos y vigencia de la sanción.</p></div><div class="grid" data-v-01f9aa3f><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Oficio</label><input${ssrRenderAttr("value", form.oficio)} class="input" placeholder="Número o referencia de oficio" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha oficio</label><input${ssrRenderAttr("value", form.f_oficio)} type="date" class="input" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha resolución</label><input${ssrRenderAttr("value", form.f_resolucion)} type="date" class="input" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Periodo</label><input${ssrRenderAttr("value", form.periodo)} class="input" placeholder="Ej. 6 meses / 1 año" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Tipo sanción 1</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion) ? ssrLooseContain(form.tiposancion, "") : ssrLooseEqual(form.tiposancion, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion) ? ssrLooseContain(form.tiposancion, item.clave) : ssrLooseEqual(form.tiposancion, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Tipo sanción 2</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion2) ? ssrLooseContain(form.tiposancion2, "") : ssrLooseEqual(form.tiposancion2, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tiposancion2) ? ssrLooseContain(form.tiposancion2, item.clave) : ssrLooseEqual(form.tiposancion2, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Estatus sanción 1</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.statussanc1) ? ssrLooseContain(form.statussanc1, "") : ssrLooseEqual(form.statussanc1, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.estatus_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.statussanc1) ? ssrLooseContain(form.statussanc1, item.clave) : ssrLooseEqual(form.statussanc1, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Estatus sanción 2</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.statussanc2) ? ssrLooseContain(form.statussanc2, "") : ssrLooseEqual(form.statussanc2, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.estatus_sancion, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.statussanc2) ? ssrLooseContain(form.statussanc2, item.clave) : ssrLooseEqual(form.statussanc2, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Tipo falta</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tipofalta) ? ssrLooseContain(form.tipofalta, "") : ssrLooseEqual(form.tipofalta, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_falta, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tipofalta) ? ssrLooseContain(form.tipofalta, item.clave) : ssrLooseEqual(form.tipofalta, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Gravedad</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.gravedad) ? ssrLooseContain(form.gravedad, "") : ssrLooseEqual(form.gravedad, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.niveles_gravedad, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.gravedad) ? ssrLooseContain(form.gravedad, item.clave) : ssrLooseEqual(form.gravedad, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha inicio inhabilitación</label><input${ssrRenderAttr("value", form.deinhabil)} type="date" class="input" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha término inhabilitación</label><input${ssrRenderAttr("value", form.ainhabil)} type="date" class="input" data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Motivo</label><textarea class="input textarea" placeholder="Descripción del motivo de la sanción" data-v-01f9aa3f>${ssrInterpolate(form.motivo)}</textarea></div></div></section><section class="section-card" data-v-01f9aa3f><div class="section-head" data-v-01f9aa3f><h2 class="section-title" data-v-01f9aa3f>Montos y ejecución</h2><p class="section-text" data-v-01f9aa3f>Fechas de ejecución y montos relacionados.</p></div><div class="grid" data-v-01f9aa3f><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha ejecución 1</label><input${ssrRenderAttr("value", form.fejec1)} type="date" class="input" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha ejecución 2</label><input${ssrRenderAttr("value", form.fejec2)} type="date" class="input" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Monto 1</label><input${ssrRenderAttr("value", form.monto1)} class="input" placeholder="Monto textual o libre" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Monto 2</label><input${ssrRenderAttr("value", form.monto2)} class="input" placeholder="Monto textual o libre" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Monto API 1</label><input${ssrRenderAttr("value", form.montoapi1)} type="number" step="any" class="input" placeholder="0.00" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Monto API 2</label><input${ssrRenderAttr("value", form.montoapi2)} type="number" step="any" class="input" placeholder="0.00" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Clave moneda 1</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda1) ? ssrLooseContain(form.cve_moneda1, "") : ssrLooseEqual(form.cve_moneda1, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.monedas, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda1) ? ssrLooseContain(form.cve_moneda1, item.clave) : ssrLooseEqual(form.cve_moneda1, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Clave moneda 2</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda2) ? ssrLooseContain(form.cve_moneda2, "") : ssrLooseEqual(form.cve_moneda2, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.monedas, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.cve_moneda2) ? ssrLooseContain(form.cve_moneda2, item.clave) : ssrLooseEqual(form.cve_moneda2, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha registro</label><input${ssrRenderAttr("value", form.fechareg)} type="date" class="input" data-v-01f9aa3f></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Particular</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.particular) ? ssrLooseContain(form.particular, "") : ssrLooseEqual(form.particular, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.opciones_particular, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.particular) ? ssrLooseContain(form.particular, item.clave) : ssrLooseEqual(form.particular, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.clave)} - ${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div></div></section><section class="section-card" data-v-01f9aa3f><div class="section-head" data-v-01f9aa3f><h2 class="section-title" data-v-01f9aa3f>Documento y observaciones</h2><p class="section-text" data-v-01f9aa3f>Enlaces, referencia documental y notas finales.</p></div><div class="grid" data-v-01f9aa3f><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Tipo documento</label><select class="input" data-v-01f9aa3f><option value="" data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tipo_docto) ? ssrLooseContain(form.tipo_docto, "") : ssrLooseEqual(form.tipo_docto, "")) ? " selected" : ""}>Seleccione una opción</option><!--[-->`);
        ssrRenderList(catalogos.tipos_docto, (item) => {
          _push(`<option${ssrRenderAttr("value", item.clave)} data-v-01f9aa3f${ssrIncludeBooleanAttr(Array.isArray(form.tipo_docto) ? ssrLooseContain(form.tipo_docto, item.clave) : ssrLooseEqual(form.tipo_docto, item.clave)) ? " selected" : ""}>${ssrInterpolate(item.descripcion)}</option>`);
        });
        _push(`<!--]--></select></div><div class="field" data-v-01f9aa3f><label data-v-01f9aa3f>Fecha documento</label><input${ssrRenderAttr("value", form.fecha_docto)} type="date" class="input" data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Título documento</label><input${ssrRenderAttr("value", form.titulo_docto)} class="input" placeholder="Título o nombre del documento" data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Descripción documento</label><input${ssrRenderAttr("value", form.descripcion_docto)} class="input" placeholder="Breve descripción documental" data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Resolución URL</label><input${ssrRenderAttr("value", form.resolucionurl)} class="input" placeholder="https://..." data-v-01f9aa3f></div><div class="field wide" data-v-01f9aa3f><label data-v-01f9aa3f>Observaciones</label><textarea class="input textarea" placeholder="Notas u observaciones adicionales" data-v-01f9aa3f>${ssrInterpolate(form.observaciones)}</textarea></div></div></section></div><div class="actions" data-v-01f9aa3f><button class="btn-primary"${ssrIncludeBooleanAttr(guardando.value) ? " disabled" : ""} data-v-01f9aa3f>${ssrInterpolate(guardando.value ? "Actualizando..." : "Actualizar registro")}</button></div>`);
        if (mensaje.value) {
          _push(`<div class="ok-box" data-v-01f9aa3f>${ssrInterpolate(mensaje.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (error.value) {
          _push(`<div class="error-box" data-v-01f9aa3f>${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/estatal/editar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const editar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-01f9aa3f"]]);

export { editar as default };
//# sourceMappingURL=editar-82EcM-Wt.mjs.map
