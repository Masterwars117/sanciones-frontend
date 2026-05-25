import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, reactive, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const mensaje = ref("");
    const error = ref("");
    const form = reactive({
      dependencia: "",
      rfc: "",
      homoclave: "",
      apaterno: "",
      amaterno: "",
      nombres: "",
      autsanc: "",
      cargo: "",
      periodo: "",
      fechares: "",
      fechanot: "",
      deinhabil: "",
      ainhabil: "",
      fechainf: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a5ca076f><div class="head" data-v-a5ca076f><div data-v-a5ca076f><h1 class="title" data-v-a5ca076f>Nuevo registro federal</h1><p class="subtitle" data-v-a5ca076f>Tabla: INHABILIFEDERAL</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/federal",
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
      _push(`</div><div class="card" data-v-a5ca076f><div class="form-sections" data-v-a5ca076f><section class="section-card" data-v-a5ca076f><div class="section-head" data-v-a5ca076f><h2 class="section-title" data-v-a5ca076f>Identificación del registro</h2><p class="section-text" data-v-a5ca076f>Datos base para alta del registro federal.</p></div><div class="grid" data-v-a5ca076f><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Dependencia</label><input${ssrRenderAttr("value", form.dependencia)} class="input" placeholder="Nombre de la dependencia" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>RFC base *</label><input${ssrRenderAttr("value", form.rfc)} class="input upper" maxlength="10" placeholder="3 o 4 letras + 6 números" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Homoclave</label><input${ssrRenderAttr("value", form.homoclave)} class="input upper" maxlength="3" placeholder="3 caracteres" data-v-a5ca076f></div></div></section><section class="section-card" data-v-a5ca076f><div class="section-head" data-v-a5ca076f><h2 class="section-title" data-v-a5ca076f>Datos de la persona</h2><p class="section-text" data-v-a5ca076f>Información personal y laboral del sancionado.</p></div><div class="grid" data-v-a5ca076f><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Apellido paterno</label><input${ssrRenderAttr("value", form.apaterno)} class="input" placeholder="Apellido paterno" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Apellido materno</label><input${ssrRenderAttr("value", form.amaterno)} class="input" placeholder="Apellido materno" data-v-a5ca076f></div><div class="field wide" data-v-a5ca076f><label data-v-a5ca076f>Nombres</label><input${ssrRenderAttr("value", form.nombres)} class="input" placeholder="Nombre o nombres" data-v-a5ca076f></div><div class="field wide" data-v-a5ca076f><label data-v-a5ca076f>Autoridad sancionadora</label><input${ssrRenderAttr("value", form.autsanc)} class="input" placeholder="Autoridad que impone la sanción" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Cargo</label><input${ssrRenderAttr("value", form.cargo)} class="input" placeholder="Cargo o puesto" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Periodo</label><input${ssrRenderAttr("value", form.periodo)} class="input" placeholder="Ej. 6 meses / 1 año" data-v-a5ca076f></div></div></section><section class="section-card" data-v-a5ca076f><div class="section-head" data-v-a5ca076f><h2 class="section-title" data-v-a5ca076f>Fechas de la sanción</h2><p class="section-text" data-v-a5ca076f>Fechas principales del registro federal.</p></div><div class="grid" data-v-a5ca076f><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Fecha resolución</label><input${ssrRenderAttr("value", form.fechares)} type="date" class="input" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Fecha notificación</label><input${ssrRenderAttr("value", form.fechanot)} type="date" class="input" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Fecha inicio inhabilitación</label><input${ssrRenderAttr("value", form.deinhabil)} type="date" class="input" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Fecha fin inhabilitación</label><input${ssrRenderAttr("value", form.ainhabil)} type="date" class="input" data-v-a5ca076f></div><div class="field" data-v-a5ca076f><label data-v-a5ca076f>Fecha informe</label><input${ssrRenderAttr("value", form.fechainf)} type="date" class="input" data-v-a5ca076f></div></div></section></div><div class="actions" data-v-a5ca076f><button class="btn-primary"${ssrIncludeBooleanAttr(guardando.value) ? " disabled" : ""} data-v-a5ca076f>${ssrInterpolate(guardando.value ? "Guardando..." : "Guardar registro")}</button></div>`);
      if (mensaje.value) {
        _push(`<div class="ok-box" data-v-a5ca076f>${ssrInterpolate(mensaje.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="error-box" data-v-a5ca076f>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/federal/nuevo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const nuevo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a5ca076f"]]);

export { nuevo as default };
//# sourceMappingURL=nuevo-DHxtXcRf.mjs.map
