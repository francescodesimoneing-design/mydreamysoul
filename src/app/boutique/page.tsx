import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { getProducts } from "@/lib/cms";
import type { ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Boutique vetrina MyDreamySoul Handmade: gonne, gonne a ruota, gonnoni, fiocchi nascita, accessori e idee regalo su ordinazione.",
};

const categories: ProductCategory[] = [
  "Gonne",
  "Gonne a ruota",
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
              Boutique
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              Una vetrina sartoriale, pronta per diventare ecommerce
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/68">
              Prodotti su ordinazione, categorie chiare e card modulari: nessun
              checkout industriale, solo una boutique elegante e personale.
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
              title="Creazioni ordinabili su richiesta"
              description="Le schede pubblicate qui arrivano da Sanity Studio e possono diventare la base del futuro ecommerce."
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
                title="Aggiungi prodotti da Sanity Studio"
                description="Pubblica almeno un prodotto Boutique con immagine reale per mostrarlo in questa pagina."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
