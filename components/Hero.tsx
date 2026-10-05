"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { hero, price } from "@/content/landing";
import { trackCtaClick } from "@/lib/tracking";
import { useLeadModal } from "@/components/lead-modal";

export default function Hero() {
  const { open } = useLeadModal();

  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-gradient-to-b from-graphite-dark via-graphite to-graphite-light pb-16 pt-24 sm:pb-24 sm:pt-32"
      aria-labelledby="hero-title"
    >
      {/* Brilho dourado decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand-light">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
              {hero.badge}
            </p>

            <h1
              id="hero-title"
              className="mt-6 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {hero.title}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
              {hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 sm:inline-flex sm:w-fit sm:flex-row sm:items-baseline sm:gap-3">
              <p className="text-sm text-white/70">{price.prefix}</p>
              <p className="text-2xl font-extrabold text-brand sm:text-3xl">{price.from}</p>
              <p className="text-sm text-white/70">{price.note}</p>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => open("hero")}
                className="btn-primary !py-4 !text-base"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
                {hero.ctaPrimary}
              </button>

              <a
                href={hero.secondaryAnchor}
                onClick={() => trackCtaClick("ver_ficha_tecnica", "hero")}
                className="btn-secondary !border-white/25 !bg-transparent !text-white hover:!border-white/50 hover:!bg-white/10 !py-4 !text-base"
              >
                {hero.ctaSecondary}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-8 text-xs font-medium tracking-wide text-white/60 sm:text-sm">
              {hero.trustBar}
            </p>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 hidden h-28 w-28 rounded-2xl border border-brand/40 bg-graphite-dark/80 backdrop-blur sm:block"
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-brand">100%</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  Aço inox
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
