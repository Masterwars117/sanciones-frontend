import { _ as _sfc_main$2, a as _sfc_main$1, b as _sfc_main$3 } from './FooterGob-B3EJgJoH.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { Shield, Scale, Users, AlertTriangle, FileText, Download } from 'lucide-vue-next';
import { u as useHead } from './composables-BZA10jju.mjs';
import 'vue-router';
import './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Servidores Públicos y Particulares Sancionados | Tabasco",
      meta: [
        {
          name: "description",
          content: "Sistema de consulta de servidores públicos y particulares sancionados del Estado de Tabasco"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LandingHeaderGob = _sfc_main$2;
      const _component_LandingSearchForm = _sfc_main$1;
      const _component_LandingFooterGob = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col bg-background" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_LandingHeaderGob, null, null, _parent));
      _push(`<main class="flex-1"><section class="relative bg-gradient-to-br from-[#691C32] to-[#9F2241] py-16 text-white md:py-24"><div class="absolute inset-0 bg-[url(&#39;data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgtdnptcm0tNGgydjItMnYtMnptLTR2MmgtMnYtMmgyem0tNCAwaC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=&#39;)] opacity-50"></div><div class="relative mx-auto max-w-7xl px-4"><div class="mx-auto max-w-3xl text-center"><div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">`);
      _push(ssrRenderComponent(unref(Shield), { class: "h-4 w-4" }, null, _parent));
      _push(` Sistema de Consulta Oficial </div><h1 class="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"> Servidores Públicos y Particulares Sancionados </h1><p class="mt-6 text-pretty text-lg leading-relaxed text-white/90"> En términos de lo previsto por los artículos 27, 77 y 80 de la Ley General de Responsabilidades Administrativas </p></div></div></section><section id="consultas" class="py-12 md:py-16"><div class="mx-auto max-w-4xl px-4"><div class="mb-8 text-center"><h2 class="text-2xl font-bold text-foreground">Búsqueda de Sancionados</h2><p class="mt-2 text-muted-foreground"> Consulte el registro de servidores públicos y particulares sancionados del Estado de Tabasco. </p></div>`);
      _push(ssrRenderComponent(_component_LandingSearchForm, null, null, _parent));
      _push(`</div></section><section class="bg-muted py-12 md:py-16"><div class="mx-auto max-w-7xl px-4"><div class="grid gap-6 md:grid-cols-3"><div class="rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"><div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F2241]/10">`);
      _push(ssrRenderComponent(unref(Scale), { class: "h-6 w-6 text-[#9F2241]" }, null, _parent));
      _push(`</div><h3 class="mb-2 text-lg font-semibold text-foreground">Marco Legal</h3><p class="text-sm leading-relaxed text-muted-foreground"> Fundamento en la Ley General de Responsabilidades Administrativas y normatividad estatal aplicable. </p></div><div class="rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"><div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#235B4E]/10">`);
      _push(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-[#235B4E]" }, null, _parent));
      _push(`</div><h3 class="mb-2 text-lg font-semibold text-foreground">Transparencia</h3><p class="text-sm leading-relaxed text-muted-foreground"> Acceso público a la información de sanciones para promover la rendición de cuentas. </p></div><div class="rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"><div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#BC955C]/10">`);
      _push(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-[#BC955C]" }, null, _parent));
      _push(`</div><h3 class="mb-2 text-lg font-semibold text-foreground">Prevención</h3><p class="text-sm leading-relaxed text-muted-foreground"> Herramienta para verificar antecedentes antes de contrataciones y nombramientos públicos. </p></div></div></div></section><section id="lineamientos" class="py-12 md:py-16"><div class="mx-auto max-w-4xl px-4"><div class="mb-8 text-center"><h2 class="text-2xl font-bold text-foreground">Documentos y Lineamientos</h2><p class="mt-2 text-muted-foreground"> Descargue los documentos oficiales relacionados con el sistema de sancionados. </p></div><div class="space-y-4"><div class="flex items-center justify-between rounded-lg border border-border bg-white p-4"><div class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#9F2241]/10">`);
      _push(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-[#9F2241]" }, null, _parent));
      _push(`</div><div><h4 class="font-medium text-foreground">Lineamientos del Sistema de Sancionados</h4><p class="text-sm text-muted-foreground">Archivo PDF • 2.53 MB</p></div></div><div class="flex items-center gap-2 text-sm text-[#9F2241]">`);
      _push(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent));
      _push(`<span class="hidden sm:inline">Descargar</span></div></div><div class="flex items-center justify-between rounded-lg border border-border bg-white p-4"><div class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#235B4E]/10">`);
      _push(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-[#235B4E]" }, null, _parent));
      _push(`</div><div><h4 class="font-medium text-foreground">Ley General de Responsabilidades Administrativas</h4><p class="text-sm text-muted-foreground">Archivo PDF • 1.85 MB</p></div></div><div class="flex items-center gap-2 text-sm text-[#9F2241]">`);
      _push(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent));
      _push(`<span class="hidden sm:inline">Descargar</span></div></div><div class="flex items-center justify-between rounded-lg border border-border bg-white p-4"><div class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#BC955C]/10">`);
      _push(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-[#BC955C]" }, null, _parent));
      _push(`</div><div><h4 class="font-medium text-foreground">Manual de Usuario del Sistema</h4><p class="text-sm text-muted-foreground">Archivo PDF • 845 KB</p></div></div><div class="flex items-center gap-2 text-sm text-[#9F2241]">`);
      _push(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent));
      _push(`<span class="hidden sm:inline">Descargar</span></div></div></div></div></section><section class="bg-[#235B4E] py-12 text-white md:py-16"><div class="mx-auto max-w-4xl px-4 text-center"><h2 class="text-2xl font-bold md:text-3xl">¿Tienes alguna duda?</h2><p class="mt-4 text-pretty text-lg text-white/90"> Si requieres más información o asistencia, nuestro equipo está disponible para ayudarte. </p><div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"><a href="#contacto" class="inline-flex items-center justify-center rounded bg-white px-6 py-3 font-medium text-[#235B4E] transition-colors hover:bg-white/90"> Contáctanos </a><a href="#" class="inline-flex items-center justify-center rounded border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"> Ver preguntas frecuentes </a></div></div></section></main>`);
      _push(ssrRenderComponent(_component_LandingFooterGob, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ClKvmNbq.mjs.map
