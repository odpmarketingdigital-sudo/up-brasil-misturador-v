"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { gallery } from "@/content/landing";
import Reveal from "./Reveal";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setActiveIndex((i) => ((i ?? 0) + 1) % gallery.images.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (i) => ((i ?? 0) - 1 + gallery.images.length) % gallery.images.length
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close]);

  return (
    <section aria-labelledby="gallery-title" className="bg-white py-16 sm:py-24">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Galeria</p>
          <h2
            id="gallery-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl lg:text-4xl"
          >
            {gallery.title}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.images.map((image, index) => (
            <Reveal as="li" key={image.src} delay={index * 80}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-graphite/10 shadow-soft transition-shadow hover:shadow-card"
                aria-label={`Ampliar imagem: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-graphite-dark/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-graphite">
                    Ampliar
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery.images[activeIndex].alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-graphite-dark/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar imagem"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>

          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={gallery.images[activeIndex].src}
              alt={gallery.images[activeIndex].alt}
              width={1400}
              height={1050}
              priority
              className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {gallery.images[activeIndex].alt}
            </figcaption>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + gallery.images.length) % gallery.images.length
                  )
                }
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                aria-label="Imagem anterior"
              >
                ← Anterior
              </button>
              <span className="text-sm text-white/70" aria-live="polite">
                {activeIndex + 1} / {gallery.images.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % gallery.images.length)}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                aria-label="Próxima imagem"
              >
                Próxima →
              </button>
            </div>
          </figure>
        </div>
      )}
    </section>
  );
}
