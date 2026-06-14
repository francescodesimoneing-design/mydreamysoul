import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { Hero } from "@/components/hero";
import { PortfolioCard } from "@/components/portfolio-card";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Timeline } from "@/components/timeline";
import { processSteps, services } from "@/data/services";
import {
  getHomepageContent,
  getPortfolioItems,
  getTestimonials,
} from "@/lib/cms";

export default async function HomePage() {
  const [homepage, portfolioItems, testimonials] = await Promise.all([
    getHomepageContent(),
    getPortfolioItems(),
    getTestimonials(),
  ]);
  const featuredPortfolio = homepage.featuredPortfolio.length
    ? homepage.featuredPortfolio
    : portfolioItems.filter((item) => item.featured).slice(0, 3);
  const visibleFeaturedPortfolio = featuredPortfolio.length
    ? featuredPortfolio
    : portfolioItems.slice(0, 3);

  return (
    <>
      <Hero
        title={homepage.heroTitle}
        subtitle={homepage.heroSubtitle}
        image={homepage.heroImage}
        imageAlt={homepage.heroImageAlt}
        imagePosition={homepage.heroImagePosition}
        ctaPrimary={homepage.ctaPrimary}
        ctaSecondary={homepage.ctaSecondary}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedSection>
            <div className="flex min-h-[28rem] flex-col justify-between border-y border-anthracite/12 bg-blush/20 p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/48">
                Atelier
              </p>
              <p className="font-serif text-4xl font-semibold leading-tight text-anthracite text-balance sm:text-5xl">
                Mani, cartamodelli, tessuti reali e dettagli scelti con cura.
              </p>
              <p className="max-w-sm text-sm leading-7 text-anthracite/62">
                Le immagini del sito arrivano ora solo dai contenuti pubblicati
                in Sanity Studio.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <SectionTitle
              eyebrow="Atelier"
              title="Un luogo dove il capo prende forma lentamente"
              description="MyDreamySoul Handmade nasce dal gesto sartoriale, dalla modellistica e dalla ricerca di una femminilita personale. Ogni creazione e pensata per valorizzare chi la indossa, con proporzioni, tessuti e dettagli scelti senza fretta."
            />
            <div className="mt-8 grid gap-5 border-y border-anthracite/12 py-7 sm:grid-cols-3">
              {["Made in Italy", "Handmade", "Su misura"].map((value) => (
                <p
                  key={value}
                  className="font-serif text-2xl font-semibold text-anthracite"
                >
                  {value}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="container-page">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Servizi"
              title="Creazioni sartoriali per momenti da ricordare"
              description="Dalla gonna perfetta al fiocco nascita personalizzato, ogni servizio mantiene un approccio intimo, artigianale e su misura."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y subtle-grid">
        <div className="container-page">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Processo sartoriale"
              title="Dal primo incontro al capo finito"
              description="Un percorso trasparente, fatto di ascolto, tecnica e prove, per trasformare un desiderio in un capo unico."
            />
          </AnimatedSection>
          <div className="mt-14">
            <Timeline steps={processSteps} />
          </div>
        </div>
      </section>

      {visibleFeaturedPortfolio.length ? (
        <section className="section-y">
          <div className="container-page">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <AnimatedSection>
                <SectionTitle
                  eyebrow="Portfolio"
                  title="Creazioni in evidenza"
                  description="Una selezione di progetti pubblicati da Sanity Studio."
                />
              </AnimatedSection>
              <Link
                href="/portfolio"
                className="inline-flex w-fit rounded-full border border-anthracite/16 px-5 py-3 text-sm font-semibold text-anthracite transition hover:border-sage hover:bg-sage/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
              >
                Guarda la galleria
              </Link>
            </div>
            <div className="mt-12 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
              {visibleFeaturedPortfolio.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="section-y bg-blush/35">
          <div className="container-page">
            <AnimatedSection>
              <SectionTitle
                eyebrow="Testimonianze"
                title="Parole di chi ha scelto una creazione personale"
                align="center"
              />
            </AnimatedSection>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-y">
        <div className="container-page grid gap-10 bg-anthracite px-6 py-12 text-ivory sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <AnimatedSection>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-ivory/52">
              Su misura
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Racconta la tua idea, la trasformiamo in un capo unico.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:justify-self-end">
            <Link
              href="/contatti"
              className="inline-flex rounded-full bg-ivory px-7 py-4 text-sm font-semibold text-anthracite transition hover:-translate-y-0.5 hover:bg-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              Prenota una consulenza
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
