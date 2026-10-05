import { howItWorks } from "@/content/landing";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-title"
      className="bg-white py-16 sm:py-24"
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Passo a passo</p>
          <h2
            id="how-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl lg:text-4xl"
          >
            {howItWorks.title}
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step}
              delay={index * 100}
              className="relative card p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-graphite-dark"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 font-bold leading-snug text-graphite">{step}</h3>
              {index < howItWorks.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-brand sm:block"
                >
                  →
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
