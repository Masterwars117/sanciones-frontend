import { _ as __nuxt_component_0 } from './nuxt-link-CGf6ZVPU.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const menuAbierto = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-409ffd6e><header class="topbar" data-v-409ffd6e><button class="menu-btn" data-v-409ffd6e>☰</button><div class="topbar-title" data-v-409ffd6e>Sistema de Sancionados</div></header><aside class="${ssrRenderClass([{ collapsed: !menuAbierto.value }, "sidebar"])}" data-v-409ffd6e><div class="sidebar-header" data-v-409ffd6e><div class="sidebar-title" data-v-409ffd6e>Administración</div></div><nav class="sidebar-nav" data-v-409ffd6e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/estatal",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sanciones Estatales `);
          } else {
            return [
              createTextVNode(" Sanciones Estatales ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/federal",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sanciones Federales `);
          } else {
            return [
              createTextVNode(" Sanciones Federales ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-item logout" data-v-409ffd6e> Cerrar sesión </button></nav></aside><main class="${ssrRenderClass([{ expanded: !menuAbierto.value }, "content"])}" data-v-409ffd6e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-409ffd6e"]]);

export { admin as default };
//# sourceMappingURL=admin-BSEV0pfH.mjs.map
