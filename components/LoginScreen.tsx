"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { business } from "@/config/business";

export default function LoginScreen() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await login(correo, clave);
    // No navigation call needed — app/page.tsx re-renders the dashboard
    // as soon as `employee` is set in AuthContext.
  }

  return (
    <div className="grid-backdrop flex h-full w-full items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 shadow-accent">
            <span className="font-mono text-sm font-bold text-accent">{business.shortName}</span>
          </div>
          <div>
            <h1 className="font-mono text-lg font-semibold tracking-wide text-ink">
              {business.name}
            </h1>
            <p className="mt-1 text-sm text-ink/50">{business.tagline}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-surface-line bg-surface-panel p-6"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/60">Correo</span>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="empleado@tunegocio.com"
              className="rounded-md border border-surface-line bg-surface-elevated px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-accent/50"
              autoComplete="email"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/60">Clave</span>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              className="rounded-md border border-surface-line bg-surface-elevated px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-accent/50"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-md bg-accent py-2.5 text-sm font-semibold text-surface-base transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-ink/35">
            {business.loginNote}
          </p>
        </form>
      </div>
    </div>
  );
}






























"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { business } from "@/config/business";

export default function LoginScreen() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await login(correo, clave);
    // No navigation call needed — app/page.tsx re-renders the dashboard
    // as soon as `employee` is set in AuthContext.
  }

  return (
    <div className="grid-backdrop flex h-full w-full items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 shadow-accent">
            <span className="font-mono text-sm font-bold text-accent">{business.shortName}</span>
          </div>
          <div>
            <h1 className="font-mono text-lg font-semibold tracking-wide text-ink">
              {business.name}
            </h1>
            <p className="mt-1 text-sm text-ink/50">{business.tagline}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-surface-line bg-surface-panel p-6"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/60">Correo</span>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
