import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "registro",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const usuario = ref("");
    const password = ref("");
    const error = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-2c23b941><div class="login-card" data-v-2c23b941><h1 class="login-title" data-v-2c23b941>Acceso Administrador</h1><input${ssrRenderAttr("value", usuario.value)} type="text" class="input" placeholder="Usuario" data-v-2c23b941><input${ssrRenderAttr("value", password.value)} type="password" class="input" placeholder="Contraseña" data-v-2c23b941><button class="btn-login" data-v-2c23b941>Ingresar</button>`);
      if (error.value) {
        _push(`<p class="error-text" data-v-2c23b941>Usuario o contraseña incorrectos.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const registro = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c23b941"]]);

export { registro as default };
//# sourceMappingURL=registro-BTxn7_jV.mjs.map
