# 🏢 RH | Gestion Documental

Sistema de gestión de CFDI desarrollado con **Vue 3** y **Vuetify 3**.

## 📋 Descripción

Este sistema permite gestionar de manera eficiente todos los aspectos relacionados con CFDIs

## 🚀 Características

- **Vue 3** con Composition API
- **Vuetify 3** para UI/UX moderna
- **Pinia** para gestión de estado
- **Vue Router 4** para navegación
- **Axios** para comunicación HTTP
- **OAuth 2.0 + PKCE** para autenticación segura
- **Diseño Responsivo** (móviles, tablets, escritorio)
- **Configuración con .env**
- **Código modular y bien documentado**

## 📦 Stack Tecnológico

| Tecnología | Versión | Propósito                   |
| ---------- | ------- | --------------------------- |
| Vue.js     | ^3.5.18 | Framework frontend          |
| Vuetify    | ^3.9.4  | Componentes Material Design |
| Pinia      | ^3.0.3  | Gestión de estado           |
| Vue Router | ^4.5.1  | Enrutamiento SPA            |
| Axios      | ^1.11.0 | Cliente HTTP                |
| Vite       | ^7.0.6  | Build tool y dev server     |

## 🏗️ Arquitectura del Proyecto

```
src/
├── assets/           # Recursos estáticos
├── components/       # Componentes reutilizables
│   └── AppOverlay.vue
├── layouts/          # Layouts de páginas
│   └── DefaultLayout.vue
├── views/            # Páginas/Vistas
│   ├── HomeView.vue
│   ├── OverlayTestView.vue
│   ├── EmpleadosView.vue
│   ├── DepartamentosView.vue
│   ├── NominaView.vue
│   ├── ReportesView.vue
│   ├── PerfilView.vue
│   ├── ConfiguracionView.vue
│   ├── AuthCallbackView.vue
│   └── NotFoundView.vue
├── router/           # Configuración de rutas
│   └── index.js
├── store/           # Stores de Pinia
│   └── auth.js
├── services/        # Servicios y APIs
│   ├── api.js
│   └── authService.js
├── plugins/         # Plugins de Vue
│   └── vuetify.js
├── utils/           # Utilidades (existentes)
│   ├── alerts.js
│   ├── fechas.js
│   └── numeros.js
├── App.vue         # Componente raíz
└── main.js         # Punto de entrada
```

## ⚙️ Configuración Inicial

### 1. Clonar y configurar el proyecto

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### 2. Configurar variables de entorno

Edita el archivo `.env` con los valores de tu entorno:

```env
# API Backend
VITE_API_URL=http://api:/api

# OAuth 2.0 Configuration
VITE_OAUTH_CLIENT_ID=tu_client_id
VITE_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_OAUTH_AUTH_URL=https://provider.example.com/oauth/authorize
VITE_OAUTH_TOKEN_URL=https://provider.example.com/oauth/token
VITE_OAUTH_SCOPE=read:user profile:read

# App Configuration
VITE_APP_NAME=RH | CFDI
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

### 3. Configuración OAuth 2.0

El sistema implementa **OAuth 2.0 con PKCE** (Proof Key for Code Exchange) para autenticación segura.

#### Proveedores soportados:

- Google OAuth
- Microsoft Azure AD
- Auth0
- Cualquier proveedor compatible con OAuth 2.0 + PKCE

#### Configuración ejemplo para Google:

```env
VITE_OAUTH_CLIENT_ID=tu-client-id.apps.googleusercontent.com
VITE_OAUTH_AUTH_URL=https://accounts.google.com/o/oauth2/v2/auth
VITE_OAUTH_TOKEN_URL=https://oauth2.googleapis.com/token
VITE_OAUTH_SCOPE=openid profile email
```

## 🖥️ Comandos de Desarrollo

```bash
# Desarrollo con hot-reload
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Formatear código
npm run format
```

## 🎨 Diseño y UI

### Layout Principal

El sistema utiliza un layout responsivo con:

- **Header**: Logo/título + botón de menú
- **Navigation Drawer**: Menú lateral derecho
- **Main Content**: Área de contenido dinámico
- **Footer**: Información del sistema

### Componentes Principales

#### AppOverlay

Componente reutilizable para overlays con múltiples configuraciones:

```vue
<!-- Overlay básico -->
<AppOverlay v-model:visible="showOverlay" message="Cargando datos..." />

<!-- Overlay con progreso -->
<AppOverlay
  v-model:visible="showProgress"
  message="Procesando..."
  :indeterminate="false"
  :progress="progressValue"
/>

<!-- Overlay con icono personalizado -->
<AppOverlay
  v-model:visible="showSuccess"
  message="¡Operación exitosa!"
  :show-progress="false"
  icon="mdi-check-circle"
  color="success"
/>
```

### Tema de Colores

```javascript
// Colores corporativos personalizables
colors: {
  primary: '#1976D2',      // Azul corporativo principal
  secondary: '#424242',    // Gris corporativo secundario
  accent: '#82B1FF',       // Azul claro para acentos
  success: '#4CAF50',      // Verde éxito
  error: '#FF5252',        // Rojo para errores
  warning: '#FFC107',      // Amarillo advertencia
  info: '#2196F3',         // Azul información
}
```

## 🔐 Autenticación

### Flujo OAuth 2.0 + PKCE

1. **Inicio de sesión**: Click en "Iniciar Sesión"
2. **Redirección**: Usuario es redirigido al proveedor OAuth
3. **Autorización**: Usuario autoriza la aplicación
4. **Callback**: Regreso con código de autorización
5. **Intercambio**: Código por tokens usando PKCE
6. **Almacenamiento**: Tokens seguros en localStorage
7. **Autenticación**: Usuario autenticado en el sistema

### Funcionalidades de Seguridad

- **PKCE** (Proof Key for Code Exchange) para mayor seguridad
- **State parameter** para prevención de CSRF
- **Refresh tokens** para renovación automática
- **Interceptores HTTP** para gestión automática de tokens
- **Guards de navegación** para proteger rutas

## 📱 Responsividad

El sistema está optimizado para:

- **📱 Móviles**: < 600px
- **📟 Tablets**: 600px - 960px
- **🖥️ Escritorio**: > 960px

### Características responsivas:

- Navigation drawer adaptativo
- Cards flexibles
- Botones que se adaptan al espacio
- Texto y iconos escalables
- Footer adaptativo en móviles

## 🧪 Testing y Ejemplos

### Página de Prueba del Overlay

Visita `/prueba-overlay` para ver ejemplos interactivos del componente AppOverlay:

- Overlay básico con spinner
- Overlay con progreso determinado
- Overlay con iconos personalizados
- Overlay interactivo con botones
- Simulación de operaciones asíncronas

## 🔧 Extensibilidad

### Agregar Nuevos Módulos

1. **Crear Vista**: Agregar archivo en `src/views/`
2. **Agregar Ruta**: Configurar en `src/router/index.js`
3. **Store (opcional)**: Crear store en `src/store/`
4. **Servicios**: Agregar servicios en `src/services/`

### Ejemplo de nuevo módulo:

```javascript
// 1. Ruta en router/index.js
{
  path: '/nuevo-modulo',
  name: 'nuevo-modulo',
  component: () => import('@/views/NuevoModuloView.vue'),
  meta: {
    title: 'Nuevo Módulo - RH',
    requiresAuth: true
  }
}

// 2. Entrada en menú (DefaultLayout.vue)
{
  title: 'Nuevo Módulo',
  icon: 'mdi-new-box',
  to: '/nuevo-modulo'
}
```

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

### Variables de Entorno de Producción

Crear `.env.production`:

```env
VITE_API_URL=https://api.tudominio.com
VITE_OAUTH_CLIENT_ID=tu_client_id_production
VITE_OAUTH_REDIRECT_URI=https://tudominio.com/auth/callback
VITE_APP_ENVIRONMENT=production
VITE_DEBUG_MODE=false
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:

- 📧 Email: soporte@rh-sistema.com
- 📱 Teléfono: +52 (555) 123-4567
- 🌐 Documentación: [docs.rh-sistema.com](https://docs.rh-sistema.com)

## 🔄 Versionado

Usamos [SemVer](http://semver.org/) para el versionado.

**Versión Actual**: 1.0.0

### Changelog

#### [1.0.0] - 2025-01-XX

- ✨ Primera versión del sistema
- 🔐 Implementación de OAuth 2.0 + PKCE
- 🎨 Layout responsivo con Vuetify 3
- 📱 Componente AppOverlay reutilizable
- 🏗️ Arquitectura modular base
- 📚 Documentación completa

---

⭐ **¡Dale una estrella al proyecto si te resultó útil!**
