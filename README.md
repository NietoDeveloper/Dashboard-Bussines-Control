

Readme · MD
<div align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=DASHBOARD%20CONTROL&fontSize=80&fontColor=FFD700&fontAlignY=42&desc=⚡%20Launch%20Control%20Style%20Admin%20Panel%20·%20Real-Time%20·%20Backend%20Agnostic&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>
Typing SVG

<br/> <p align="center"> <img src="https://img.shields.io/badge/Status-Template_Ready-00D26A?style=for-the-badge&logo=checkmarx&logoColor=white"/> <img src="https://img.shields.io/badge/Backend-Agnostic-FF9900?style=for-the-badge&logoColor=white"/> <img src="https://img.shields.io/badge/Auth-Demo_Mode-DCDCDC?style=for-the-badge&logoColor=000000"/> </p> <p align="center"> <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=FFD700"/> <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000"/> <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-Dev_%26_Prod-2496ED?style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/WebSockets-Live_Data-010101?style=for-the-badge&logo=socket.io&logoColor=white"/> </p> <br/>
Dashboard Control: Plantilla de panel de control administrativo en tiempo real, estilo "launch control", pensada para clonarse y adaptarse a cualquier negocio y cualquier backend/base de datos.

🎛️ Nada en el frontend está atado a un stack, un proveedor o una paleta de color específica. Toda la personalización de marca vive en 2 archivos, y la capa de datos habla HTTP/WebSocket con tu API — nunca toca una base de datos directamente — así que puedes usar MongoDB, PostgreSQL, MySQL, Firebase o lo que necesites, sin tocar el frontend.

Modular · Agnóstico de Backend · Listo para Producción

</div>
🎨 Personalización — solo 2 archivos
<div align="center">
Archivo	Controla
app/globals.css (bloque :root)	Paleta de color completa (acento, fondos, texto, estados) vía variables CSS — ningún componente tiene un color escrito a mano
config/business.ts	Nombre del negocio, tagline, iniciales del logo, etiquetas del menú, y el contenido de ejemplo usado por la simulación de datos en vivo
</div>
Guía completa en config/README.md, incluyendo cómo ajustar el modelo de datos (lib/types.ts) si tu negocio no encaja en "citas / ventas / mensajes / usuarios".

📋 Estado del template
<div align="center">
Módulo	Estado
🚀 Flujo de entrada	Splash de carga → Login → Dashboard, en una sola ruta
🔑 Login	Modo demo (acceso directo sin validar credenciales) · bloque de auth real ya escrito y comentado en lib/auth-context.tsx
📊 Dashboard	Datos simulados (lib/mockData.ts) que se refrescan solos para dar sensación de tiempo real
🔌 Capa de conexión	lib/api.ts y lib/socket.ts — tipada y agnóstica de proveedor (HTTP/WebSocket)
</div>
🧭 Secciones incluidas
<div align="center">
Sección	Descripción
📈 Visión General	KPIs y resumen general del negocio
📅 Citas (Bookings)	Gestión de reservas
💰 Ventas	Seguimiento de ventas
💬 Mensajería	Multi-canal
👤 Usuarios	Ficha completa por cliente: info, citas, compras, mensajes
🔗 Conexiones	Estado de tus fuentes de datos + variables de entorno
</div>
🏗️ Arquitectura de conexión
Tipado y Agnóstico
Tiempo Real
HTTP
WebSocket
/api/health
🖥️ Dashboard UI
lib/api.ts
lib/socket.ts
🔌 Tu Backend
MongoDB · PostgreSQL ·MySQL · Firebase · lo quesea
Indicadores TopBar +Sección Conexiones
🐳 Correr en local (sin Docker)
bash
npm install
cp .env.example .env.local
npm run dev
Abre http://localhost:3000.

Desarrollo (con hot-reload)
bash
cp .env.example .env.local
docker compose -f docker-compose.dev.yml up --build
Monta tu código como volumen, así que los cambios se reflejan al instante dentro del contenedor. Abre http://localhost:3000.

Producción
bash
cp .env.example .env.local
docker compose up --build -d
Construye una imagen mínima usando el standalone output de Next.js (next.config.mjs ya tiene output: "standalone"): sin node_modules de más, sin código fuente completo, corriendo como usuario no-root.

⚠️ Si tu NEXT_PUBLIC_API_URL / NEXT_PUBLIC_SOCKET_URL cambian, hay que reconstruir la imagen (docker compose up --build) — son variables públicas de Next.js y se incrustan en el bundle del cliente en tiempo de build, no en tiempo de ejecución.

Build manual sin compose
bash
docker build -t dashboard-control \
  --build-arg NEXT_PUBLIC_API_URL=https://tu-backend.com \
  .
docker run -p 3000:3000 dashboard-control
Desplegar tu propio backend en el mismo compose
docker-compose.yml incluye ejemplos comentados de un servicio backend y uno de base de datos (mongo) para que puedas levantar todo junto si quieres un despliegue autocontenido. Descoméntalos y ajusta la imagen/puerto a tu backend real.

🔌 Conectar un backend real
<div align="center">
Paso	Acción
1	Define NEXT_PUBLIC_API_URL (y NEXT_PUBLIC_SOCKET_URL si usas WebSockets) en .env.local o como --build-arg de Docker
2	En lib/auth-context.tsx, cambia el cuerpo de login() por la sección "REAL MODE" ya escrita (llama a api.login)
3	En components/dashboard/DashboardShell.tsx, reemplaza los seed*() de lib/mockData.ts por llamadas a lib/api.ts (getBookings, getMessages, getSales, getCustomers)
4	Expón un endpoint /api/health que devuelva { "primaryDB": "CONNECTED", ... } — api.clusterStatus() ya lo consume y alimenta los indicadores de la TopBar y la sección Conexiones
</div>
📂 Estructura
text
app/                     — App Router (splash + login + shell, una sola ruta)
components/dashboard/    — Sidebar, TopBar, panels/ (una por sección), ui/
config/                  — business.ts (marca + etiquetas), README.md (guía)
lib/                     — types.ts, mockData.ts, api.ts, socket.ts, auth-context.tsx
hooks/                   — useLiveClock
Dockerfile               — build de producción (standalone)
Dockerfile.dev           — build de desarrollo (hot-reload)
docker-compose.yml       — stack de producción
docker-compose.dev.yml   — stack de desarrollo
🎨 Design Tokens
css
/* app/globals.css — bloque :root */
:root {
  --accent: #FFD700;        /* 🟡 Acento principal */
  --background: #DCDCDC;    /* 🩶 Fondo base */
  --surface: #111111;       /* ⚫ Superficies oscuras */
  --text: #000000;          /* ⚫ Tipografía */
}
<div align="center">
Token	Hex	Rol
--accent	
#FFD700	CTAs · Highlights de marca
--background	
#DCDCDC	Fondo base · Bordes
--surface	
#111111	Paneles y tarjetas en modo oscuro
--text	
#000000	Tipografía principal
</div> <div align="center">
╔══════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   "Clónalo, cámbiale la paleta y las etiquetas,                   ║
║    y ya tienes un dashboard listo para cualquier negocio."        ║
║                                                                    ║
╚══════════════════════════════════════════════════════════════════╝
Dashboard Control — plantilla base del ecosistema Software DT

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/> </div>

