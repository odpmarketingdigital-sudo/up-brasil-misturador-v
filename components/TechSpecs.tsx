"use client";

import { MessageCircle } from "lucide-react";
import { techSpecs } from "@/content/landing";
import { useLeadModal } from "@/components/lead-modal";
import Reveal from "./Reveal";

export default function TechSpecs() {
  const { open } = useLeadModal();

  return (
    <section
      id="ficha-tecnica"
      aria-labelledby="specs-title"
      className="bg-gray-50 py-16 sm:py-24"
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Especificações</p>
          <h2
            id="specs-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl lg:text-4xl"
          >
            {techSpecs.title}
          </h2>
          <p className="mt-4 text-base text-graphite/70">{techSpecs.subtitle}</p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-10 max-w-3xl">
          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <caption className="sr-only">{techSpecs.title}</caption>
              <tbody className="divide-y divide-graphite/10">
                {techSpecs.rows.map((row) => (
                  <tr key={row.label} className="odd:bg-white even:bg-gray-50/70">
                    <th
                      scope="row"
                      className="w-2/5 px-5 py-4 text-sm font-semibold text-graphite sm:px-7 sm:py-5"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-sm text-graphite/75 sm:px-7 sm:py-5">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={150} className="mx-auto mt-8 max-w-3xl text-center">
          <p className="font-semibold text-graphite">{techSpecs.note}</p>
          <button
            type="button"
            onClick={() => open("ficha_tecnica")}
            className="btn-primary mt-5 !py-3.5"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            {techSpecs.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
