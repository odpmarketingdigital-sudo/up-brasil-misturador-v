import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import About from "@/components/About";
import WhyItMatters from "@/components/WhyItMatters";
import Differentials from "@/components/Differentials";
import Applications from "@/components/Applications";
import HowItWorks from "@/components/HowItWorks";
import TechSpecs from "@/components/TechSpecs";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { faq } from "@/content/landing";

/** JSON-LD FAQPage — espelha os itens do acordeão em components/Faq.tsx. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Numbers />
        <About />
        <WhyItMatters />
        <Differentials />
        <Applications />
        <HowItWorks />
        <TechSpecs />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
