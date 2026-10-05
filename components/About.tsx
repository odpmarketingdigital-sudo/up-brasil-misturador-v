import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { about } from "@/content/landing";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="bg-gray-50 py-16 sm:py-24"
    >
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">Sobre o equipamento</p>
            <h2
              id="about-title"
              className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-graphite sm:text-3xl lg:text-4xl"
            >
              {about.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-graphite/75 sm:text-lg">
              {about.intro}
            </p>

            <div className="mt-8 space-y-5">
              {about.blocks.map((block) => (
                <div
                  key={block.title}
                  className="card flex gap-4 p-5 sm:p-6"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-dark">
                    <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-graphite">{block.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-graphite/70">
                      {block.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <Image
                src={about.image}
                alt={about.imageAlt}
                width={1000}
                height={800}
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
