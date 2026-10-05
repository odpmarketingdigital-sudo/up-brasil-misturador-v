import Image from "next/image";
import { footer, site } from "@/content/landing";

export default function Footer() {
  return (
    <footer className="bg-graphite-dark py-10 text-white">
      <div className="container-px flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <Image
          src={site.logo}
          alt={`Logotipo ${site.name}`}
          width={120}
          height={36}
          className="h-8 w-auto opacity-90"
          loading="lazy"
        />
        <p className="text-center text-sm text-white/65 sm:text-right">{footer.text}</p>
      </div>
    </footer>
  );
}
