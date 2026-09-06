# Dashboard Control Template

Plantilla de panel de control administrativo en tiempo real, estilo
"launch control" — Next.js 15 + React 19 + TypeScript + Tailwind CSS.
Pensada para clonarse y adaptarse a **cualquier negocio y cualquier
backend/base de datos**: nada en el frontend está atado a un stack, un
proveedor o una paleta de color específica.

## Personalización — solo 2 archivos

1. **`app/globals.css`** (bloque `:root`) — paleta de color completa
   (acento, fondos, texto, estados) vía variables CSS. Todo el UI las usa;
   ningún componente tiene un color escrito a mano.
2. **`config/business.ts`** — nombre del negocio, tagline, iniciales del
   logo, etiquetas de cada sección del menú, y el contenido de ejemplo
   (servicios/productos/nombres) que usa la simulación de datos en vivo.

Guía completa de personalización en [`config/README.md`](./config/README.md),
incluyendo cómo ajustar el modelo de datos (`lib/types.ts`) si tu negocio no
encaja en "citas / ventas / mensajes / usuarios".

## Estado del template

- **Splash de carga** al abrir la app → **login** → dashboard, en una sola
  ruta.
- Login en **modo demo**: "Ingresar" da acceso directo sin validar
  credenciales (bloque de auth real ya escrito y comentado en
  `lib/auth-context.tsx`, listo para activar).
- Dashboard con datos **simulados** (`lib/mockData.ts`) que se refrescan
  solos para dar sensación de tiempo real, hasta que conectes tu backend.
- `lib/api.ts` y `lib/socket.ts` — capa de conexión real, tipada y agnóstica
  de proveedor (habla HTTP/WebSocket con tu API; nunca toca una base de
  datos directamente, así que puedes usar MongoDB, PostgreSQL, MySQL,
  Firebase, lo que sea, sin cambiar el frontend).

## Secciones incluidas

Visión General · Citas (Bookings) · Ventas · Mensajería (multi-canal) ·
Usuarios (ficha completa por cliente: info, citas, compras, mensajes) ·
Conexiones (estado de tus fuentes de datos + variables de entorno).

---

## Correr en local (sin Docker)

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

---

## Correr con Docker

### Desarrollo (con hot-reload)

```bash
cp .env.example .env.local
docker compose -f docker-compose.dev.yml up --build
```

Monta tu código como volumen, así que los cambios se reflejan al instante
dentro del contenedor. Abre `http://localhost:3000`.

### Producción

```bash
cp .env.example .env.local
docker compose up --build -d
```

Esto construye una imagen mínima usando el *standalone output* de Next.js
(`next.config.mjs` ya tiene `output: "standalone"`): sin `node_modules` de
más, sin código fuente completo, corriendo como usuario no-root.

Si tu `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_SOCKET_URL` cambian, hay que
reconstruir la imagen (`docker compose up --build`) — son variables públicas
de Next.js y se incrustan en el bundle del cliente en tiempo de build, no en
tiempo de ejecución.

### Build manual sin compose

```bash
docker build -t dashboard-control \
  --build-arg NEXT_PUBLIC_API_URL=https://tu-backend.com \
  .
docker run -p 3000:3000 dashboard-control
```

### Desplegar tu propio backend en el mismo compose

`docker-compose.yml` incluye ejemplos comentados de un servicio `backend` y
uno de base de datos (`mongo`) para que puedas levantar todo junto si
quieres un despliegue autocontenido. Descoméntalos y ajusta la imagen/puerto
a tu backend real.

---

## Conectar un backend real

1. Define `NEXT_PUBLIC_API_URL` (y `NEXT_PUBLIC_SOCKET_URL` si usas
   WebSockets) en `.env.local` o como `--build-arg` de Docker.
2. En `lib/auth-context.tsx`, cambia el cuerpo de `login()` por la sección
   "REAL MODE" ya escrita (llama a `api.login`).
3. En `components/dashboard/DashboardShell.tsx`, reemplaza los `seed*()` de
   `lib/mockData.ts` por llamadas a `lib/api.ts` (`getBookings`,
   `getMessages`, `getSales`, `getCustomers`).
4. Expón un endpoint `/api/health` que devuelva el estado de cada fuente de
   datos (`{ "primaryDB": "CONNECTED", ... }`) — `api.clusterStatus()` ya lo
   consume y alimenta los indicadores de la barra superior y de la sección
   **Conexiones**.

## Estructura

```
app/                     — App Router (splash + login + shell, una sola ruta)
components/dashboard/    — Sidebar, TopBar, panels/ (una por sección), ui/
config/                  — business.ts (marca + etiquetas), README.md (guía)
lib/                     — types.ts, mockData.ts, api.ts, socket.ts, auth-context.tsx
hooks/                   — useLiveClock
Dockerfile               — build de producción (standalone)
Dockerfile.dev           — build de desarrollo (hot-reload)
docker-compose.yml       — stack de producción
docker-compose.dev.yml   — stack de desarrollo
```
