"use client";

import { useMemo, useState } from "react";
import type { Message, MessageChannel } from "@/lib/types";
import SectionHeader from "../ui/SectionHeader";

const CHANNELS: { key: MessageChannel | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "web", label: "Formulario Web" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "chatbot", label: "Chatbot" },
];

export default function MessagingPanel({
  messages,
  onMarkRead,
}: {
  messages: Message[];
  onMarkRead: (id: string) => void;
}) {
  const [channel, setChannel] = useState<MessageChannel | "todos">("todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const filtered = useMemo(
    () =>
      [...messages]
        .filter((m) => channel === "todos" || m.canal === channel)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()),
    [messages, channel]
  );

  const selected = messages.find((m) => m.id === selectedId) ?? filtered[0] ?? null;

  function openThread(id: string) {
    setSelectedId(id);
    onMarkRead(id);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <SectionHeader
        title="Mensajería en Vivo"
        subtitle="Formulario web, WhatsApp y chatbot en una sola bandeja"
        action={
          <div className="flex gap-1 rounded-md border border-surface-line bg-surface-elevated p-0.5">
            {CHANNELS.map((c) => (
              <button
                key={c.key}
                onClick={() => setChannel(c.key)}
                className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  channel === c.key ? "bg-accent text-surface-base" : "text-ink/50 hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="min-h-0 overflow-y-auto rounded-lg border border-surface-line bg-surface-panel">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => openThread(m.id)}
              className={`flex w-full items-start gap-3 border-b border-surface-line/60 px-4 py-3 text-left last:border-b-0 hover:bg-surface-elevated ${
                selected?.id === m.id ? "bg-surface-elevated" : ""
              }`}
            >
              {!m.leido && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
              {m.leido && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-transparent" />}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-ink">{m.remitente}</p>
                  <span className="shrink-0 font-mono text-[10px] uppercase text-accent/70">
                    {m.canal}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-ink/45">{m.contenido}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex min-h-0 flex-col rounded-lg border border-surface-line bg-surface-panel">
          {!selected ? (
            <p className="p-6 text-sm text-ink/40">Selecciona una conversación.</p>
          ) : (
            <>
              <div className="border-b border-surface-line px-4 py-3">
                <p className="text-sm font-medium text-ink">{selected.remitente}</p>
                <p className="font-mono text-xs text-ink/40">
                  {selected.contacto} · vía {selected.canal}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-md rounded-lg rounded-tl-none border border-surface-line bg-surface-elevated px-3 py-2 text-sm text-ink/85">
                  {selected.contenido}
                </div>
              </div>
              <div className="border-t border-surface-line p-3">
                <div className="flex gap-2">
                  <input
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Escribir respuesta..."
                    className="flex-1 rounded-md border border-surface-line bg-surface-elevated px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-accent/50"
                  />
                  <button
                    onClick={() => setReply("")}
                    className="rounded-md bg-accent px-4 py-2 text-xs font-semibold text-surface-base hover:bg-accent/90"
                  >
                    Enviar
                  </button>
                </div>
                <p className="mt-1.5 text-[10px] text-ink/30">
                  El envío se conectará al canal de origen ({selected.canal}) cuando la
                  integración esté activa.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
