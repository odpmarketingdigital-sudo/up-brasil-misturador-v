"use client";

import { MessageCircle } from "lucide-react";
import { finalCta } from "@/content/landing";
import { useLeadModal } from "@/components/lead-modal";
import Reveal from "./Reveal";

/**
 * CTA final enxuta: título, subtítulo e um único botão grande que abre o
 * modal de captura de lead.
 */
export default function FinalCta() {
  const { open } = useLeadModal();

  return (
    <section aria-labelledby="final-cta-title" className="bg-gray-50 py-16 sm:py-24">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Orçamento</p>
          <h2
            id="final-cta-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl lg:text-4xl"
          >
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-graphite/70">
            {finalCta.subtitle}
          </p>

          <button
            type="button"
            onClick={() => open("cta_final")}
            className="btn-primary mt-8 !px-8 !py-4 !text-base"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            {finalCta.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
