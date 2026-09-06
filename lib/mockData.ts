// ---------------------------------------------------------------------------
// MOCK DATA LAYER — DEMO ONLY
// ---------------------------------------------------------------------------
// Everything in this file simulates live activity so the dashboard feels
// alive before a real backend is connected. Replace calls to these
// generators with the corresponding functions in lib/api.ts once your
// backend is wired in — the shapes in lib/types.ts are generic (booking /
// sale / message / customer), so panels won't need to change when you swap
// the data source or the underlying database.
//
// The sample content (service names, product names, customer names) comes
// from config/business.ts — edit it there, not here, so the demo reflects
// your business out of the box.
// ---------------------------------------------------------------------------

import { sampleContent } from "@/config/business";
import type {
  Appointment,
  AppUser,
  ClusterStatus,
  Message,
  SaleTransaction,
} from "./types";

const servicios = sampleContent.services;
const nombres = sampleContent.customerNames;
const productos = sampleContent.products;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function id(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function randomPastDate(maxDaysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * maxDaysAgo));
  return d.toISOString();
}

export function seedAppointments(count = 14): Appointment[] {
  const statuses: Appointment["status"][] = ["pendiente", "cumplida", "cancelada"];
  return Array.from({ length: count }).map((_, i) => {
    const cliente = pick(nombres);
    return {
      id: id("cita"),
      clienteNombre: cliente,
      clienteEmail: cliente.toLowerCase().replace(" ", ".") + "@gmail.com",
      clienteTelefono: "300" + Math.floor(1000000 + Math.random() * 8999999),
      servicio: pick(servicios),
      fecha: new Date(Date.now() + (i - 4) * 86400000).toISOString().slice(0, 10),
      hora: `${8 + (i % 9)}:00`,
      status: i < 5 ? "pendiente" : pick(statuses),
      notas: i % 3 === 0 ? "Cliente solicita confirmación por WhatsApp." : undefined,
      creadoEn: randomPastDate(10),
    };
  });
}

export function seedSales(count = 16): SaleTransaction[] {
  const statuses: SaleTransaction["status"][] = ["aprobado", "pendiente", "rechazado"];
  const metodos = ["Tarjeta de Crédito", "PSE", "Nequi", "Transferencia AWS Pay"];
  return Array.from({ length: count }).map(() => ({
    id: id("venta"),
    cliente: pick(nombres),
    monto: Math.round((Math.random() * 4500000 + 80000) / 1000) * 1000,
    moneda: "COP",
    metodo: pick(metodos),
    status: pick(statuses),
    producto: pick(productos),
    fecha: randomPastDate(6),
  }));
}

export function seedMessages(count = 18): Message[] {
  const canales: Message["canal"][] = ["web", "whatsapp", "chatbot"];
  const contenidos = [
    "Hola, quisiera agendar una cita para revisión de sensores.",
    "¿Cuál es el estado de mi pedido?",
    "Necesito soporte con el dashboard de mi cuenta.",
    "¿Tienen disponibilidad esta semana?",
    "Gracias por la atención, quedo pendiente.",
    "¿El dron incluye garantía extendida?",
  ];
  return Array.from({ length: count }).map((_, i) => ({
    id: id("msg"),
    canal: pick(canales),
    remitente: pick(nombres),
    contacto: "+57 3" + Math.floor(10000000 + Math.random() * 89999999),
    contenido: pick(contenidos),
    leido: i > 4,
    fecha: randomPastDate(3),
  }));
}

export function seedUsers(count = 12): AppUser[] {
  return Array.from({ length: count }).map((_, i) => {
    const nombre = nombres[i % nombres.length] + (i >= nombres.length ? ` ${i}` : "");
    return {
      id: id("user"),
      nombre,
      email: nombre.toLowerCase().replace(/\s+/g, ".") + "@gmail.com",
      telefono: "300" + Math.floor(1000000 + Math.random() * 8999999),
      registradoEn: randomPastDate(240).slice(0, 10),
      activo: Math.random() > 0.2,
      citas: seedAppointments(Math.ceil(Math.random() * 3)),
      compras: seedSales(Math.ceil(Math.random() * 3)).map((s) => ({
        id: s.id,
        producto: s.producto,
        monto: s.monto,
        fecha: s.fecha,
        status: s.status,
      })),
      mensajes: seedMessages(Math.ceil(Math.random() * 2)),
    };
  });
}

export function seedClusters(): ClusterStatus[] {
  return [
    { name: "primaryDB", label: "Base de Datos Principal", state: "connected", latencyMs: 42 },
    { name: "secondaryDB", label: "Base de Datos Secundaria", state: "connected", latencyMs: 57 },
  ];
}
