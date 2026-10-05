"use client";

import Image from "next/image";
import { header, site } from "@/content/landing";
import { useLeadModal } from "@/components/lead-modal";

export default function Header() {
  const { open } = useLeadModal();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-graphite/10 bg-white/90 backdrop-blur-md">
      <div className="container-px flex h-16 items-center justify-between sm:h-[72px]">
        <a
          href="#topo"
          className="flex items-center gap-3 rounded-lg"
          aria-label={`${site.name} — início`}
        >
          <Image
            src={site.logo}
            alt={`Logotipo ${site.name}`}
            width={132}
            height={40}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <button
          type="button"
          onClick={() => open("header")}
          className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
        >
          {header.cta}
        </button>

        <button
          type="button"
          onClick={() => open("header")}
          className="btn-primary !px-4 !py-2 text-xs sm:hidden"
        >
          {header.cta}
        </button>
      </div>
    </header>
  );
}
