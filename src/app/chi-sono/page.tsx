import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { SectionTitle } from "@/components/section-title";
import { getAboutContent } from "@/lib/cms";
import { getObjectPosition } from "@/lib/image-position";

export const metadata: Metadata = {
  title: "Chi Sono",
  description:
    "Scopri la storia di Serena Manna, fondatrice di MyDreamySoul Handmade, e la filosofia sartoriale dell'atelier.",
};

export default async function ChiSonoPage() {
  const about = await getAboutContent();
  const bodyParagraphs = about.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-page grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <AnimatedSection className="pb-0 lg:pb-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/55">
              Serena Manna
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              {about.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/68">
              {about.subtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="editorial-image relative aspect-[4/5]">
              {about.image ? (
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: getObjectPosition(about.imagePosition) }}
                />
              ) : (
                <div className="flex h-full min-h-[28rem] items-center justify-center bg-blush/25 p-8 text-center">
                  <p className="max-w-sm font-serif text-3xl font-semibold leading-tight text-anthracite">
                    Aggiungi un&apos;immagine reale da Sanity Studio
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <AnimatedSection>
            <SectionTitle
              eyebrow="La mia storia"
              title="Un percorso nato tra creativita e precisione"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid gap-7 text-base leading-8 text-anthracite/70">
              {bodyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 border-y border-anthracite/12 py-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/48">
              Sartoria su misura
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-serif text-3xl leading-snug text-anthracite sm:text-4xl">
              Il percorso sartoriale viene raccontato e aggiornato nella sezione dedicata.
            </p>
            <Link
              href="/sartoria-su-misura"
              className="mt-8 inline-flex rounded-full bg-anthracite px-7 py-4 text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              Scopri il percorso su misura
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
