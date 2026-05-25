import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, reactive, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const mensaje = ref("");
    const error = ref("");
    ref("");
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-453c839d><div class="head" data-v-453c839d><div data-v-453c839d><h1 class="title" data-v-453c839d>Editar registro federal</h1><p class="subtitle" data-v-453c839d>Tabla: INHABILIFEDERAL</p></div>`);
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
      _push(`</div><div class="card" data-v-453c839d>`);
      if (cargandoDetalle.value) {
        _push(`<div class="empty" data-v-453c839d> Cargando registro... </div>`);
      } else {
        _push(`<!--[--><div class="form-sections" data-v-453c839d><section class="section-card" data-v-453c839d><div class="section-head" data-v-453c839d><h2 class="section-title" data-v-453c839d>Identificación del registro</h2><p class="section-text" data-v-453c839d>Datos base del registro federal.</p></div><div class="grid" data-v-453c839d><div class="field" data-v-453c839d><label data-v-453c839d>Dependencia</label><input${ssrRenderAttr("value", form.dependencia)} class="input" placeholder="Nombre de la dependencia" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>RFC base *</label><input${ssrRenderAttr("value", form.rfc)} class="input input-disabled upper" maxlength="10" disabled placeholder="3 o 4 letras + 6 números" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Homoclave</label><input${ssrRenderAttr("value", form.homoclave)} class="input upper" maxlength="3" placeholder="3 caracteres" data-v-453c839d></div></div></section><section class="section-card" data-v-453c839d><div class="section-head" data-v-453c839d><h2 class="section-title" data-v-453c839d>Datos de la persona</h2><p class="section-text" data-v-453c839d>Información personal y laboral del sancionado.</p></div><div class="grid" data-v-453c839d><div class="field" data-v-453c839d><label data-v-453c839d>Apellido paterno</label><input${ssrRenderAttr("value", form.apaterno)} class="input" placeholder="Apellido paterno" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Apellido materno</label><input${ssrRenderAttr("value", form.amaterno)} class="input" placeholder="Apellido materno" data-v-453c839d></div><div class="field wide" data-v-453c839d><label data-v-453c839d>Nombres</label><input${ssrRenderAttr("value", form.nombres)} class="input" placeholder="Nombre o nombres" data-v-453c839d></div><div class="field wide" data-v-453c839d><label data-v-453c839d>Autoridad sancionadora</label><input${ssrRenderAttr("value", form.autsanc)} class="input" placeholder="Autoridad que impone la sanción" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Cargo</label><input${ssrRenderAttr("value", form.cargo)} class="input" placeholder="Cargo o puesto" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Periodo</label><input${ssrRenderAttr("value", form.periodo)} class="input" placeholder="Ej. 6 meses / 1 año" data-v-453c839d></div></div></section><section class="section-card" data-v-453c839d><div class="section-head" data-v-453c839d><h2 class="section-title" data-v-453c839d>Fechas de la sanción</h2><p class="section-text" data-v-453c839d>Fechas principales del registro federal.</p></div><div class="grid" data-v-453c839d><div class="field" data-v-453c839d><label data-v-453c839d>Fecha resolución</label><input${ssrRenderAttr("value", form.fechares)} type="date" class="input" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Fecha notificación</label><input${ssrRenderAttr("value", form.fechanot)} type="date" class="input" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Fecha inicio inhabilitación</label><input${ssrRenderAttr("value", form.deinhabil)} type="date" class="input" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Fecha fin inhabilitación</label><input${ssrRenderAttr("value", form.ainhabil)} type="date" class="input" data-v-453c839d></div><div class="field" data-v-453c839d><label data-v-453c839d>Fecha informe</label><input${ssrRenderAttr("value", form.fechainf)} type="date" class="input" data-v-453c839d></div></div></section></div><div class="actions" data-v-453c839d><button class="btn-primary"${ssrIncludeBooleanAttr(guardando.value) ? " disabled" : ""} data-v-453c839d>${ssrInterpolate(guardando.value ? "Actualizando..." : "Actualizar registro")}</button></div>`);
        if (mensaje.value) {
          _push(`<div class="ok-box" data-v-453c839d>${ssrInterpolate(mensaje.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (error.value) {
          _push(`<div class="error-box" data-v-453c839d>${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/federal/editar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const editar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-453c839d"]]);

export { editar as default };
//# sourceMappingURL=editar-C8Tifnky.mjs.map
