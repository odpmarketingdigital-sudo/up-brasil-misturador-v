import {
  Beaker,
  Dna,
  FlaskConical,
  Leaf,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { applications } from "@/content/landing";
import Reveal from "./Reveal";

const segmentIcons: Record<string, LucideIcon> = {
  "Farmacêutico": Dna,
  "Alimentício": Wheat,
  "Cosmético": Leaf,
  "Químico": FlaskConical,
  "Suplementos": Beaker,
};

export default function Applications() {
  return (
    <section
      aria-labelledby="applications-title"
      className="bg-gray-50 py-16 sm:py-24"
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Aplicações</p>
          <h2
            id="applications-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl lg:text-4xl"
          >
            {applications.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-graphite/70">
            {applications.subtitle}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.items.map((item, index) => {
            const Icon = segmentIcons[item.segment] ?? FlaskConical;
            return (
              <Reveal
                as="li"
                key={item.segment}
                delay={index * 70}
                className="card flex flex-col items-start p-6 transition-shadow hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-graphite text-brand">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-graphite">{item.segment}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/70">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
