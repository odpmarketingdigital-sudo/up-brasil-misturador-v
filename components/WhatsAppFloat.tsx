"use client";

import { MessageCircle } from "lucide-react";
import { floating } from "@/content/landing";
import { useLeadModal } from "@/components/lead-modal";

/**
 * - Botão flutuante de WhatsApp: desktop/tablet (escondido no mobile, onde a
 *   barra fixa do rodapé aparece).
 * - Barra fixa de CTA no rodapé: apenas mobile (< sm).
 * Ambos abrem o modal de captura de lead.
 */
export default function WhatsAppFloat() {
  const { open } = useLeadModal();

  return (
    <>
      {/* Botão flutuante (desktop / tablet) */}
      <button
        type="button"
        onClick={() => open("whatsapp_flutuante")}
        aria-label={floating.whatsappLabel}
        className="fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105 sm:inline-flex md:bottom-8"
      >
        <MessageCircle aria-hidden="true" className="h-7 w-7" strokeWidth={2.2} />
      </button>

      {/* Barra fixa de CTA no rodapé (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-graphite/10 bg-white/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => open("barra_mobile")}
            aria-label={floating.whatsappLabel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white"
          >
            <MessageCircle aria-hidden="true" className="h-6 w-6" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => open("barra_mobile")}
            className="btn-primary h-11 flex-1 !py-0"
          >
            {floating.mobileBarCta}
          </button>
        </div>
      </div>

      {/* Espaço para a barra fixa não cobrir o conteúdo no mobile */}
      <div aria-hidden="true" className="h-16 sm:hidden" />
    </>
  );
}
