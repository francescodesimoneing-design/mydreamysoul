import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { SectionTitle } from "@/components/section-title";
import { getPortfolioItems } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Le mie realizzazioni",
  description:
    "Le mie realizzazioni MyDreamySoul Handmade: capi su misura, pezzi unici e creazioni gia realizzate da Serena.",
};

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-page">
          <AnimatedSection>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/55">
              Le mie realizzazioni
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              Lavori gia realizzati, dettagli e progetti su misura
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Galleria"
              title="Creazioni gia realizzate, organizzate per tipologia"
              description="Una raccolta di capi su misura, pezzi unici e lavori consegnati che raccontano stile, tecnica e cura sartoriale di Serena."
            />
          </AnimatedSection>
          <div className="mt-12">
            <PortfolioGallery items={portfolioItems} />
          </div>
        </div>
      </section>
    </>
  );
}
