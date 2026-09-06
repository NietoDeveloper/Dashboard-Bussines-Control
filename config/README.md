# Cómo adaptar este template a otro negocio

Solo hay **dos lugares** que normalmente necesitas tocar:

1. **`app/globals.css`** (bloque `:root` al inicio) — la paleta de color.
   Todo el UI usa variables CSS (`--color-accent`, `--color-ink`,
   `--color-surface-*`, `--color-status-*`); ningún componente tiene colores
   escritos directamente. Cambia los números RGB y toda la app cambia de
   marca.

2. **`config/business.ts`** — el nombre del negocio, el tagline, las
   iniciales del logo, y las etiquetas de cada sección del menú (Citas,
   Ventas, Mensajería, Usuarios...). También aquí está el contenido de
   ejemplo (`sampleContent`) que usan los datos simulados en
   `lib/mockData.ts` — cámbialo por tus propios servicios/productos para que
   la demo se sienta como tu negocio desde el día uno.

## Adaptar el modelo de datos

Si tu negocio no encaja exactamente en "citas / ventas / mensajes /
usuarios" (por ejemplo, un e-commerce sin citas, o una clínica sin
"ventas"), edita:

- `lib/types.ts` — los tipos (`Appointment`, `SaleTransaction`, `Message`,
  `AppUser`) y sus campos. Puedes renombrarlos o agregar campos propios.
- `lib/mockData.ts` — los generadores de datos de ejemplo, para que
  coincidan con los tipos que ajustaste.
- `components/dashboard/panels/*` — cada panel consume esos tipos
  directamente; si cambias un campo, TypeScript te va a señalar dónde
  actualizar el panel correspondiente.
- `components/dashboard/Sidebar.tsx` — si quitas o agregas una sección
  completa (por ejemplo, quitar "Citas" para un negocio sin agenda), quita
  también su entrada en `DashboardShell.tsx`.

## Conectar tu backend real

`lib/api.ts` y `lib/socket.ts` ya están escritos y tipados, sin depender de
ningún proveedor de base de datos — solo hacen `fetch`/WebSocket a las rutas
de tu API. Define `NEXT_PUBLIC_API_URL` (y opcionalmente
`NEXT_PUBLIC_SOCKET_URL`) y reemplaza los `seed*()` de `DashboardShell.tsx`
por las funciones de `lib/api.ts`.
