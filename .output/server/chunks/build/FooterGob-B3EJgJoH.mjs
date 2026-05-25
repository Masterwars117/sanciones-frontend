import { ref, mergeProps, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { ChevronDown, Search, X, Menu, User, FileText, MapPin, Phone, Mail, ExternalLink } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const _sfc_main$2 = {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/HeaderGob.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "LandingSearchForm",
  __ssrInlineRender: true,
  props: {
    standalone: { type: Boolean, default: true },
    tipo: { type: String, default: "nombre" },
    expediente: { type: String, default: "" },
    paterno: { type: String, default: "" },
    materno: { type: String, default: "" },
    nombre: { type: String, default: "" }
  },
  emits: [
    "update:tipo",
    "update:expediente",
    "update:paterno",
    "update:materno",
    "update:nombre",
    "submit",
    "clear",
    "change-tipo"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useRouter();
    const internalTipo = ref("nombre");
    const internalExpediente = ref("");
    const internalPaterno = ref("");
    const internalMaterno = ref("");
    const internalNombre = ref("");
    const searchType = computed({
      get: () => props.standalone ? internalTipo.value : props.tipo,
      set: (value) => {
        if (props.standalone) {
          internalTipo.value = value;
          return;
        }
        emit("update:tipo", value);
      }
    });
    const expediente = computed(() => props.standalone ? internalExpediente.value : props.expediente);
    const paterno = computed(() => props.standalone ? internalPaterno.value : props.paterno);
    const materno = computed(() => props.standalone ? internalMaterno.value : props.materno);
    const nombre = computed(() => props.standalone ? internalNombre.value : props.nombre);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-lg border border-border bg-white shadow-sm" }, _attrs))}><div class="flex border-b border-border"><button type="button" class="${ssrRenderClass([searchType.value === "nombre" ? "border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"])}">`);
      _push(ssrRenderComponent(unref(User), { class: "h-4 w-4" }, null, _parent));
      _push(` Buscar por Nombre </button><button type="button" class="${ssrRenderClass([searchType.value === "expediente" ? "border-b-2 border-[#9F2241] bg-[#9F2241]/5 text-[#9F2241]" : "text-muted-foreground hover:bg-muted hover:text-foreground", "flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors"])}">`);
      _push(ssrRenderComponent(unref(FileText), { class: "h-4 w-4" }, null, _parent));
      _push(` Buscar por Expediente </button></div><form class="p-6">`);
      if (searchType.value === "nombre") {
        _push(`<div class="space-y-6"><div class="grid gap-6 sm:grid-cols-3"><div class="space-y-2"><label for="apellido-paterno" class="text-sm font-medium text-foreground"> Apellido Paterno <span class="text-[#9F2241]">*</span></label><input id="apellido-paterno"${ssrRenderAttr("value", paterno.value)} type="text" placeholder="Ej. García" class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"></div><div class="space-y-2"><label for="apellido-materno" class="text-sm font-medium text-foreground"> Apellido Materno <span class="text-[#9F2241]">*</span></label><input id="apellido-materno"${ssrRenderAttr("value", materno.value)} type="text" placeholder="Ej. López" class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"></div><div class="space-y-2"><label for="nombre" class="text-sm font-medium text-foreground"> Nombre(s) <span class="text-[#9F2241]">*</span></label><input id="nombre"${ssrRenderAttr("value", nombre.value)} type="text" placeholder="Ej. Juan Carlos" class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"></div></div></div>`);
      } else {
        _push(`<div class="space-y-6"><div class="space-y-2"><label for="expediente" class="text-sm font-medium text-foreground"> Número de Expediente <span class="text-[#9F2241]">*</span></label><input id="expediente"${ssrRenderAttr("value", expediente.value)} type="text" placeholder="Ej. EXP-2024-001234" class="w-full rounded border border-border px-3 py-2 text-sm focus:border-[#9F2241] focus:outline-none focus:ring-1 focus:ring-[#9F2241]"><p class="text-xs text-muted-foreground"> Ingrese el número de expediente completo para realizar la búsqueda. </p></div></div>`);
      }
      _push(`<div class="mt-6 flex items-center justify-end gap-4"><button type="button" class="rounded border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"> Limpiar </button><button type="submit" class="inline-flex items-center rounded bg-[#9F2241] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#691C32]">`);
      _push(ssrRenderComponent(unref(Search), { class: "mr-2 h-4 w-4" }, null, _parent));
      _push(` Buscar </button></div></form></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/SearchForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/FooterGob.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main$1 as a, _sfc_main as b };
//# sourceMappingURL=FooterGob-B3EJgJoH.mjs.map
