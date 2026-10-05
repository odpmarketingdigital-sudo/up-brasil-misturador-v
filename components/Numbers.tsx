import { numbers } from "@/content/landing";
import Reveal from "./Reveal";

export default function Numbers() {
  return (
    <section aria-label="Números do equipamento" className="bg-white py-14 sm:py-20">
      <div className="container-px">
        <ul className="grid gap-5 sm:grid-cols-3">
          {numbers.map((item, index) => (
            <Reveal
              as="li"
              key={item.value}
              delay={index * 90}
              className="card flex flex-col items-center px-6 py-8 text-center sm:px-6"
            >
              <p className="text-4xl font-extrabold tracking-tight text-graphite sm:text-5xl">
                {item.value}
              </p>
              <span aria-hidden="true" className="my-4 h-1 w-10 rounded-full bg-brand" />
              <p className="text-sm leading-relaxed text-graphite/70">{item.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
