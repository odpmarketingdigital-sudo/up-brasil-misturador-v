import Image from "next/image";
import { Blend, MapPin, Settings, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { differentials } from "@/content/landing";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = {
  Blend,
  SlidersHorizontal,
  Settings,
  MapPin,
};

export default function Differentials() {
  return (
    <section
      aria-labelledby="differentials-title"
      className="bg-white py-16 sm:py-24"
    >
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Diferenciais</p>
            <h2
              id="differentials-title"
              className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-graphite sm:text-3xl lg:text-4xl"
            >
              {differentials.title}
            </h2>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {differentials.items.map((item, index) => {
                const Icon = icons[item.icon] ?? Blend;
                return (
                  <Reveal
                    as="li"
                    key={item.title}
                    delay={index * 80}
                    className="card p-5 sm:p-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-graphite">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                      {item.text}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-graphite/10 shadow-card">
              <Image
                src={differentials.image}
                alt={differentials.imageAlt}
                width={900}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
