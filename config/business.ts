// ---------------------------------------------------------------------------
// BUSINESS CONFIG — the second file to edit when adapting this template
// (the first is the color palette in app/globals.css). Everything the UI
// shows in text form is read from here: business name, logo initials, and
// the labels for each dashboard section. Swap these for your own business
// vocabulary (a clinic might say "Citas" / "Pacientes", a restaurant might
// say "Reservas" / "Clientes", a store might say "Pedidos" / "Compradores")
// — no component code needs to change.
// ---------------------------------------------------------------------------

export const business = {
  name: "Tu Negocio",
  shortName: "TN",
  tagline: "Panel de control administrativo en tiempo real",
  loginNote:
    "Modo demo: el botón «Ingresar» da acceso directo al dashboard sin validar registro todavía.",
};

export const labels = {
  nav: {
    overview: "Visión General",
    bookings: "Citas",
    sales: "Ventas",
    messaging: "Mensajería",
    customers: "Usuarios",
    connections: "Conexiones",
  },
  entities: {
    bookingSingular: "Cita",
    bookingPlural: "Citas",
    customerSingular: "Cliente",
    customerPlural: "Usuarios",
    saleSingular: "Venta",
    salePlural: "Ventas",
  },
  bookingStatus: {
    pending: "pendiente",
    completed: "cumplida",
    cancelled: "cancelada",
  },
  saleStatus: {
    approved: "aprobado",
    pending: "pendiente",
    rejected: "rechazado",
  },
  messageChannels: {
    web: "Formulario Web",
    whatsapp: "WhatsApp",
    chatbot: "Chatbot",
  },
} as const;

// Sample data pool used only by lib/mockData.ts to simulate live activity
// before a real backend is connected. Replace with your own service /
// product names so the demo reflects your business from the start.
export const sampleContent = {
  services: [
    "Consulta inicial",
    "Servicio estándar",
    "Mantenimiento",
    "Instalación",
    "Soporte técnico",
    "Revisión programada",
  ],
  products: [
    "Plan Básico",
    "Plan Pro",
    "Producto Premium",
    "Paquete Anual",
    "Kit de Inicio",
  ],
  customerNames: [
    "Laura Gómez",
    "Andrés Rojas",
    "Camila Torres",
    "Julián Peña",
    "Valentina Ruiz",
    "Santiago Cárdenas",
    "Mariana López",
    "David Suárez",
    "Isabella Moreno",
    "Felipe Castro",
  ],
};
