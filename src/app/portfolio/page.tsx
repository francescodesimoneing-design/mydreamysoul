import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { SectionTitle } from "@/components/section-title";
import { getPortfolioItems } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Galleria portfolio MyDreamySoul Handmade con abiti, gonne, cappotti, sartoria su misura e fiocchi nascita.",
};

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-page">
          <AnimatedSection>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/55">
              Portfolio
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              Una galleria di capi, dettagli e storie sartoriali
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Galleria"
              title="Ispirazione editoriale, categorie chiare"
              description="Filtra le creazioni per tipologia e scopri il linguaggio visivo dell'atelier."
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
