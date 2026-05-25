import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, reactive, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ce9f3a9e><div class="head" data-v-ce9f3a9e><div data-v-ce9f3a9e><h1 class="title" data-v-ce9f3a9e>Detalle del registro federal</h1><p class="subtitle" data-v-ce9f3a9e>Tabla: INHABILIFEDERAL</p></div><div class="head-actions" data-v-ce9f3a9e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/federal/editar?rfc=${encodeURIComponent(form.rfc)}`,
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
      _push(`</div></div><div class="card" data-v-ce9f3a9e>`);
      if (cargandoDetalle.value) {
        _push(`<div class="empty" data-v-ce9f3a9e> Cargando registro... </div>`);
      } else {
        _push(`<!--[--><div class="form-sections" data-v-ce9f3a9e><section class="section-card" data-v-ce9f3a9e><div class="section-head" data-v-ce9f3a9e><h2 class="section-title" data-v-ce9f3a9e>Identificación del registro</h2><p class="section-text" data-v-ce9f3a9e>Datos base del registro federal.</p></div><div class="grid" data-v-ce9f3a9e><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Dependencia</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.dependencia))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>RFC base</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.rfc))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Homoclave</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.homoclave))}</div></div></div></section><section class="section-card" data-v-ce9f3a9e><div class="section-head" data-v-ce9f3a9e><h2 class="section-title" data-v-ce9f3a9e>Datos de la persona</h2><p class="section-text" data-v-ce9f3a9e>Información personal y laboral del sancionado.</p></div><div class="grid" data-v-ce9f3a9e><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Apellido paterno</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.apaterno))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Apellido materno</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.amaterno))}</div></div><div class="field wide" data-v-ce9f3a9e><label data-v-ce9f3a9e>Nombres</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.nombres))}</div></div><div class="field wide" data-v-ce9f3a9e><label data-v-ce9f3a9e>Autoridad sancionadora</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.autsanc))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Cargo</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.cargo))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Periodo</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(mostrar(form.periodo))}</div></div></div></section><section class="section-card" data-v-ce9f3a9e><div class="section-head" data-v-ce9f3a9e><h2 class="section-title" data-v-ce9f3a9e>Fechas de la sanción</h2><p class="section-text" data-v-ce9f3a9e>Fechas principales del registro federal.</p></div><div class="grid" data-v-ce9f3a9e><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Fecha resolución</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(formatearFecha(form.fechares))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Fecha notificación</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(formatearFecha(form.fechanot))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Fecha inicio inhabilitación</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(formatearFecha(form.deinhabil))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Fecha fin inhabilitación</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(formatearFecha(form.ainhabil))}</div></div><div class="field" data-v-ce9f3a9e><label data-v-ce9f3a9e>Fecha informe</label><div class="value-box" data-v-ce9f3a9e>${ssrInterpolate(formatearFecha(form.fechainf))}</div></div></div></section></div>`);
        if (error.value) {
          _push(`<div class="error-box" data-v-ce9f3a9e>${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/federal/ver.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ver = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ce9f3a9e"]]);

export { ver as default };
//# sourceMappingURL=ver-_WrlAfVu.mjs.map
