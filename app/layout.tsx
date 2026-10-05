import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site, price, techSpecs } from "@/content/landing";
import { LeadModalProvider } from "@/components/lead-modal";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/google-tag-manager";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const baseUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.productName} | UP Brasil`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "misturador em V",
    "misturador inox 50 L",
    "homogeneizador em V",
    "misturador pós e granulados",
    "equipamento aço inox",
    "misturador painel digital",
    "UP Brasil",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: site.name,
    title: `${site.productName} | ${site.name}`,
    description: site.description,
    images: [
      {
        url: "/images/misturador321__1_.webp",
        width: 1200,
        height: 630,
        alt: "Misturador em V Inox 50 L com Painel Digital — UP Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.productName} | ${site.name}`,
    description: site.description,
    images: ["/images/misturador321__1_.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B2430",
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: site.productName,
  description: site.description,
  brand: { "@type": "Brand", name: site.name },
  manufacturer: { "@type": "Organization", name: site.name },
  image: [
    `${baseUrl}/images/misturador321__1_.webp`,
    `${baseUrl}/images/mist2__1_.webp`,
    `${baseUrl}/images/painel__1_.webp`,
  ],
  category: "Equipamentos industriais de mistura",
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    price: "27990",
    availability: "https://schema.org/InStock",
    url: baseUrl,
    seller: { "@type": "Organization", name: site.name },
  },
  additionalProperty: techSpecs.rows.map((row) => ({
    "@type": "PropertyValue",
    name: row.label,
    value: row.value,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">
        <GoogleTagManager />
        <GoogleTagManagerNoScript />

        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-graphite-dark"
        >
          Pular para o conteúdo
        </a>

        <LeadModalProvider>{children}</LeadModalProvider>

        <script
          type="application/ld+json"
          // JSON-LD estático gerado no servidor a partir do conteúdo central.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </body>
    </html>
  );
}
