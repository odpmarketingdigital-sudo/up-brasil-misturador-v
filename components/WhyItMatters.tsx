"use client";

import { MessageCircle } from "lucide-react";
import { whyItMatters } from "@/content/landing";
import { useLeadModal } from "@/components/lead-modal";
import Reveal from "./Reveal";

export default function WhyItMatters() {
  const { open } = useLeadModal();

  return (
    <section
      aria-labelledby="why-title"
      className="section-dark relative overflow-hidden bg-graphite-dark py-16 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow !text-brand">Por que isso importa</p>
          <h2
            id="why-title"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {whyItMatters.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
            {whyItMatters.text}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            {whyItMatters.text2}
          </p>

          <button
            type="button"
            onClick={() => open("por_que_importa")}
            className="btn-primary mt-9 !py-4 !text-base"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            {whyItMatters.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
