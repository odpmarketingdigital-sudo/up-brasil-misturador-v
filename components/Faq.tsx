"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/landing";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-gray-50 py-16 sm:py-24"
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2
            id="faq-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl lg:text-4xl"
          >
            {faq.title}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-10 max-w-3xl">
          <div className="space-y-3">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              const buttonId = `${baseId}-button-${index}`;
              const panelId = `${baseId}-panel-${index}`;

              return (
                <div key={item.question} className="card overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7 sm:py-5"
                    >
                      <span className="font-semibold text-graphite">{item.question}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-brand-dark transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-5 pb-5 sm:px-7 sm:pb-6"
                  >
                    <p className="border-t border-graphite/10 pt-4 text-sm leading-relaxed text-graphite/75">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
