"use client";

// SpaceX-style pre-launch loading sequence, shown once on first mount before
// the login screen appears.

import { useEffect, useState } from "react";
import { business } from "@/config/business";

const STEPS = [
  "Estableciendo enlace seguro...",
  "Sincronizando cluster de usuarios...",
  "Sincronizando cluster de citas...",
  "Verificando integridad del sistema...",
  "Listo.",
];

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 420);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="grid-backdrop fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-base">
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin rounded-full border-2 border-surface-line border-t-accent" />
          <div className="absolute h-12 w-12 animate-spin rounded-full border-2 border-surface-line border-b-accent [animation-duration:1.4s] [animation-direction:reverse]" />
          <span className="font-mono text-xs font-semibold text-accent">{business.shortName}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/80">
            {business.name}
          </p>
          <p className="font-mono text-sm text-ink/70" aria-live="polite">
            {STEPS[stepIndex]}
          </p>
        </div>

        <div className="h-1 w-64 overflow-hidden rounded-full bg-surface-line">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[11px] text-ink/40">{progress}%</p>
      </div>
    </div>
  );
}
