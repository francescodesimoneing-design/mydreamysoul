import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { getProducts } from "@/lib/cms";
import type { ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Boutique Artigianale",
  description:
    "Boutique Artigianale MyDreamySoul Handmade: creazioni handmade nate dai cartamodelli di Serena, con tessuti selezionati e cura sartoriale.",
};

const categories: ProductCategory[] = [
  "Gonne",
  "Gonnoni",
  "Fiocchi nascita",
  "Accessori",
  "Idee regalo",
];

export default async function BoutiquePage() {
  const products = await getProducts();

  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-page">
          <AnimatedSection>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/55">
              Boutique Artigianale
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              Boutique Artigianale
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/68">
              Creazioni handmade nate dai cartamodelli di Serena, realizzate
              con tessuti selezionati e cura sartoriale.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-anthracite/14 bg-ivory px-4 py-2 text-sm font-semibold text-anthracite/70"
                >
                  {category}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Boutique"
              title="Creazioni pensate per essere scelte con semplicita"
              description="La Boutique Artigianale raccoglie creazioni pensate per essere acquistate o ordinate con maggiore semplicita rispetto al percorso su misura. Ogni capo mantiene l'identita MyDreamySoul: lavorazione a mano, attenzione ai dettagli e stile femminile senza tempo."
            />
          </AnimatedSection>
          {products.length ? (
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                eyebrow="Sanity Studio"
                title="Aggiungi creazioni da Sanity Studio"
                description="Pubblica almeno una creazione della Boutique Artigianale con immagine reale per mostrarla in questa pagina."
              />
            </div>
          )}
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 border-y border-anthracite/12 py-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <AnimatedSection>
            <p className="font-serif text-4xl font-semibold leading-tight text-anthracite text-balance sm:text-5xl">
              Hai visto una creazione che ti piace?
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-anthracite/68">
              Scrivimi per conoscere disponibilita, varianti e
              personalizzazioni.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:justify-self-end">
            <Link
              href="/contatti"
              className="inline-flex rounded-full bg-anthracite px-7 py-4 text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              Scrivi a Serena
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
