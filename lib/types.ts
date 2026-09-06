// Domain types for this dashboard template.
// These are intentionally generic (booking / sale / message / customer) so
// the mock layer in lib/mockData.ts can be swapped for real API responses
// with no shape changes, regardless of what backend or database powers it.
// Rename fields here to match your own schema if it differs.

export type AppointmentStatus = "pendiente" | "cumplida" | "cancelada";

export interface Appointment {
  id: string;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  servicio: string;
  fecha: string; // ISO date
  hora: string;
  status: AppointmentStatus;
  notas?: string;
  creadoEn: string; // ISO datetime
}

export type PaymentStatus = "aprobado" | "pendiente" | "rechazado";

export interface SaleTransaction {
  id: string;
  cliente: string;
  monto: number;
  moneda: "COP" | "USD";
  metodo: string;
  status: PaymentStatus;
  producto: string;
  fecha: string; // ISO datetime
}

export type MessageChannel = "web" | "whatsapp" | "chatbot";

export interface Message {
  id: string;
  canal: MessageChannel;
  remitente: string;
  contacto: string;
  contenido: string;
  leido: boolean;
  fecha: string; // ISO datetime
}

export interface Purchase {
  id: string;
  producto: string;
  monto: number;
  fecha: string;
  status: PaymentStatus;
}

export interface AppUser {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  registradoEn: string; // ISO date
  activo: boolean;
  citas: Appointment[];
  compras: Purchase[];
  mensajes: Message[];
}

export interface ClusterStatus {
  name: string;
  label: string;
  state: "connected" | "connecting" | "error";
  latencyMs: number;
}

export interface Employee {
  nombre: string;
  correo: string;
  rol: string;
}
