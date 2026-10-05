"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { leadModal } from "@/content/landing";
import { useLeadModal } from "./lead-modal-context";
import LeadModalForm from "./lead-modal-form";

/**
 * Shell do modal: overlay, painel (bottom sheet no mobile / centralizado no
 * desktop), focus trap, ESC, clique no overlay e botão X para fechar.
 */
export default function LeadModal() {
  const { isOpen, close } = useLeadModal();
  const panelRef = useRef<HTMLDivElement>(null);

  // Foco automático no primeiro campo ao abrir.
  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input")?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  // ESC fecha o modal.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  /** Focus trap: mantém Tab/Shift+Tab dentro do modal. */
  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null && el.tabIndex >= 0);

    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-[70]" onKeyDown={trapFocus}>
      {/* Overlay escuro com blur — clique fecha */}
      <div
        aria-hidden="true"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="absolute inset-0 animate-fade-up bg-graphite-dark/70 backdrop-blur-[3px]"
      />

      {/* Painel: bottom sheet no mobile, centralizado no desktop */}
      <div className="absolute inset-0 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          aria-describedby="lead-modal-desc"
          className="relative w-full max-w-lg animate-fade-up rounded-t-3xl bg-white p-6 shadow-card sm:rounded-3xl sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label={leadModal.closeLabel}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-graphite/60 transition-colors hover:bg-graphite/10 hover:text-graphite focus-visible:ring-2 focus-visible:ring-graphite"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <h2
            id="lead-modal-title"
            className="pr-12 text-xl font-extrabold tracking-tight text-graphite sm:text-2xl"
          >
            {leadModal.title}
          </h2>
          <p id="lead-modal-desc" className="mt-2 text-sm text-graphite/70">
            {leadModal.subtitle}
          </p>

          <LeadModalForm />
        </div>
      </div>
    </div>
  );
}
