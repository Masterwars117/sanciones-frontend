import { mergeProps, unref, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Shield, Scale, Users, AlertTriangle, FileText, Download, ChevronDown, Search, X, Menu, User, MapPin, Phone, Mail, ExternalLink } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { u as useHead } from './composables-BZA10jju.mjs';
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

const _sfc_main$3 = {
  __name: "LandingHeaderGob",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="bg-[#9F2241] text-white"><div class="mx-auto max-w-7xl px-4"><div class="flex h-10 items-center justify-between text-sm"><div class="flex items-center gap-6"><a href="https://www.gob.mx" class="flex items-center gap-2 hover:underline" target="_blank" rel="noopener noreferrer"><span class="font-semibold">gob.mx</span></a></div><div class="hidden items-center gap-4 md:flex"><a href="https://www.gob.mx/tramites" class="hover:underline" target="_blank" rel="noopener noreferrer">Trámites</a><a href="https://www.gob.mx/gobierno" class="hover:underline" target="_blank" rel="noopener noreferrer">Gobierno</a><a href="#contacto" class="hover:underline">Contacto</a></div></div></div></div><div class="border-b border-border bg-white"><div class="mx-auto max-w-7xl px-4"><div class="flex h-20 items-center justify-between"><div class="flex items-center gap-4"><div class="flex flex-col"><div class="flex items-center gap-2"><div class="flex h-12 w-12 items-center justify-center rounded bg-[#691C32]"><svg viewBox="0 0 40 40" class="h-8 w-8 text-white" fill="currentColor"><path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6v12l-12 6-12-6V14l12-6z"></path><circle cx="20" cy="20" r="6" fill="currentColor"></circle></svg></div><div><span class="block text-xl font-bold text-[#691C32]">tabasco</span><span class="block text-xs text-muted-foreground">.gob.mx</span></div></div></div><div class="hidden h-12 w-px bg-border lg:block"></div><div class="hidden lg:block"><p class="text-sm font-medium text-[#235B4E]">Secretaría de la</p><p class="text-sm font-bold text-[#235B4E]">Función Pública</p></div></div><nav class="hidden items-center gap-1 lg:flex"><a href="/" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]"> Inicio </a><a href="#consultas" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]"> Consultas `);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent));
      _push(`</a><a href="#lineamientos" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]"> Lineamientos </a><a href="#transparencia" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]"> Transparencia `);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent));
      _push(`</a><a href="#contacto" class="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]"> Contacto </a></nav><div class="flex items-center gap-2"><a href="#consultas" class="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-5 w-5" }, null, _parent));
      _push(`<span class="sr-only">Buscar</span></a><button type="button" class="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted lg:hidden">`);
      if (mobileMenuOpen.value) {
        _push(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Menu), { class: "h-5 w-5" }, null, _parent));
      }
      _push(`<span class="sr-only">Menú</span></button></div></div></div></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="border-b border-border bg-white lg:hidden"><nav class="mx-auto max-w-7xl space-y-1 px-4 py-4"><a href="/" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">Inicio</a><a href="#consultas" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">Consultas</a><a href="#lineamientos" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">Lineamientos</a><a href="#transparencia" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">Transparencia</a><a href="#contacto" class="block rounded px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-[#9F2241]">Contacto</a></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/HeaderGob.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "LandingSearchForm",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const searchType = ref("nombre");
    const expediente = ref("");
    const paterno = ref("");
    const materno = ref("");
    const nombre = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-lg border border-border bg-white shadow-sm" }, _attrs))}><div class="flex border-b border-border"><button type="button" class="${ssrRenderClass([searchType.value === "nombre" ? "border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"])}">`);
      _push(ssrRenderComponent(unref(User), { class: "h-4 w-4" }, null, _parent));
      _push(` Buscar por Nombre </button><button type="button" class="${ssrRenderClass([searchType.value === "expediente" ? "border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"])}">`);
      _push(ssrRenderComponent(unref(FileText), { class: "h-4 w-4" }, null, _parent));
      _push(` Buscar por Expediente </button></div><form class="p-6">`);
      if (searchType.value === "nombre") {
        _push(`<div class="space-y-6"><div class="grid gap-6 sm:grid-cols-3"><div class="space-y-2"><label for="apellido-paterno" class="text-sm font-medium text-foreground"> Apellido Paterno <span class="text-[#9F2241]">*</span></label><input id="apellido-paterno"${ssrRenderAttr("value", paterno.value)} type="text" placeholder="Ej. García" required class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"></div><div class="space-y-2"><label for="apellido-materno" class="text-sm font-medium text-foreground"> Apellido Materno <span class="text-[#9F2241]">*</span></label><input id="apellido-materno"${ssrRenderAttr("value", materno.value)} type="text" placeholder="Ej. López" required class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"></div><div class="space-y-2"><label for="nombre" class="text-sm font-medium text-foreground"> Nombre(s) <span class="text-[#9F2241]">*</span></label><input id="nombre"${ssrRenderAttr("value", nombre.value)} type="text" placeholder="Ej. Juan Carlos" required class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"></div></div></div>`);
      } else {
        _push(`<div class="space-y-6"><div class="space-y-2"><label for="expediente" class="text-sm font-medium text-foreground"> Número de Expediente <span class="text-[#9F2241]">*</span></label><input id="expediente"${ssrRenderAttr("value", expediente.value)} type="text" placeholder="Ej. EXP-2024-001234" required class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"><p class="text-xs text-muted-foreground"> Ingrese el número de expediente completo para realizar la búsqueda. </p></div></div>`);
      }
      _push(`<div class="mt-6 flex items-center justify-end gap-4"><button type="button" class="rounded border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"> Limpiar </button><button type="submit" class="inline-flex items-center rounded bg-[#9F2241] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#691C32]">`);
      _push(ssrRenderComponent(unref(Search), { class: "mr-2 h-4 w-4" }, null, _parent));
      _push(` Buscar </button></div></form></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/SearchForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "LandingFooterGob",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-[#235B4E] text-white" }, _attrs))}><div class="mx-auto max-w-7xl px-4 py-12"><div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4"><div class="space-y-4"><div class="flex items-center gap-3"><div class="flex h-12 w-12 items-center justify-center rounded bg-white/10"><svg viewBox="0 0 40 40" class="h-8 w-8 text-white" fill="currentColor"><path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6v12l-12 6-12-6V14l12-6z"></path><circle cx="20" cy="20" r="6" fill="currentColor"></circle></svg></div><div><span class="block text-xl font-bold">TABASCO</span><span class="block text-xs text-white/70">.gob.mx</span></div></div><p class="text-sm leading-relaxed text-white/80"> Secretaría de la Función Pública del Gobierno del Estado de Tabasco. Comprometidos con la transparencia y el combate a la corrupción. </p></div><div id="contacto" class="space-y-4"><h3 class="text-lg font-semibold">Contacto</h3><ul class="space-y-3 text-sm text-white/80"><li class="flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "mt-0.5 h-4 w-4 shrink-0" }, null, _parent));
      _push(`<span>Av. Paseo Tabasco #1504 Col. Tabasco 2000, C.P. 86035, Villahermosa, Tabasco, MX</span></li><li class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Phone), { class: "h-4 w-4 shrink-0" }, null, _parent));
      _push(`<span>+52 (993) 3 10 47 80 Ext. 5090</span></li><li class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Mail), { class: "h-4 w-4 shrink-0" }, null, _parent));
      _push(`<a href="mailto:contacto@tabasco.gob.mx" class="hover:underline"> contacto@tabasco.gob.mx </a></li></ul></div><div id="transparencia" class="space-y-4"><h3 class="text-lg font-semibold">Transparencia</h3><ul class="space-y-2 text-sm"><li><a href="https://transparencia.tabasco.gob.mx/" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> Portal de Transparencia `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li><li><a href="https://itaip.org.mx/" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> ITAIP `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li><li><a href="https://www.infomextabasco.org.mx/" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> Infomex `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li><li><a href="https://portalanticorrupcion.tabasco.gob.mx:85/aviso-de-privacidad" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> Aviso de Privacidad `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li></ul></div><div class="space-y-4"><h3 class="text-lg font-semibold">Enlaces Rápidos</h3><ul class="space-y-2 text-sm"><li><a href="https://www.gob.mx" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> gob.mx `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li><li><a href="https://www.gob.mx/curp/" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> Consulta tu CURP `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li><li><a href="https://twitter.com/Gobierno_Tab" class="flex items-center gap-2 text-white/80 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer"> Twitter @Gobierno_Tab `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent));
      _push(`</a></li></ul></div></div></div><div class="border-t border-white/10 bg-[#10312B]"><div class="mx-auto max-w-7xl px-4 py-4"><div class="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/60 sm:flex-row sm:text-left"><p>${ssrInterpolate(unref(year))} Gobierno del Estado de Tabasco. Todos los derechos reservados.</p><div class="flex gap-4"><span>Secretaría de la Función Pública</span><span>Unidad de Apoyo Técnico e Informático</span></div></div></div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/FooterGob.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      const _component_LandingHeaderGob = _sfc_main$3;
      const _component_LandingSearchForm = _sfc_main$2;
      const _component_LandingFooterGob = _sfc_main$1;
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
//# sourceMappingURL=index-4CrYuoIY.mjs.map
