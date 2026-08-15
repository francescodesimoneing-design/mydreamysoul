import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { SectionTitle } from "@/components/section-title";
import { Timeline } from "@/components/timeline";
import { processSteps } from "@/data/services";
import { getSiteSettings, getTailoringPageContent } from "@/lib/cms";
import { getObjectPosition } from "@/lib/image-position";

export const metadata: Metadata = {
  title: "Sartoria Su Misura",
  description:
    "Percorso sartoriale premium su misura: consulenza dedicata, misure personalizzate, cartamodello dedicato, scelta tessuti, prove e rifiniture.",
};

export default async function SartoriaSuMisuraPage() {
  const [page, settings] = await Promise.all([
    getTailoringPageContent(),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <AnimatedSection>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/55">
              Sartoria su misura
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              Sartoria su misura, progettata esclusivamente per te
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/68">
              Un percorso premium per chi desidera una realizzazione studiata
              sulle proprie misure, sul proprio stile e sull&apos;occasione da
              vivere.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="relative min-h-[28rem] overflow-hidden border-y border-anthracite/12">
              {page.introImage ? (
                <Image
                  src={page.introImage}
                  alt={page.introImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  style={{
                    objectPosition: getObjectPosition(page.introImagePosition),
                  }}
                />
              ) : null}
              <div
                className={`relative z-10 flex min-h-[28rem] flex-col p-7 sm:p-10 ${
                  page.introImage
                    ? "justify-end bg-gradient-to-t from-ivory via-ivory/88 to-transparent"
                    : "justify-between bg-sage/16"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/48">
                  Percorso
                </p>
                <p className="mt-8 font-serif text-4xl font-semibold leading-tight text-anthracite text-balance sm:text-5xl">
                  Consulenza dedicata, misure personalizzate e cartamodello
                  dedicato.
                </p>
                <p className="mt-6 max-w-sm text-sm leading-7 text-anthracite/62">
                  Modello, proporzioni, tessuti, vestibilita e finiture vengono
                  studiati insieme a Serena.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y subtle-grid">
        <div className="container-page">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Timeline"
              title="Un percorso sartoriale fatto di ascolto e precisione"
              description="Dalla consulenza iniziale alle prove, ogni fase valorizza il rapporto diretto con Serena e la cura artigianale del capo."
            />
          </AnimatedSection>
          <div className="mt-14">
            <Timeline steps={processSteps} />
          </div>
          {page.processImage ? (
            <AnimatedSection className="mt-16" delay={0.1}>
              <div className="editorial-image relative aspect-[4/3] sm:aspect-[16/7]">
                <Image
                  src={page.processImage}
                  alt={page.processImageAlt}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                  style={{
                    objectPosition: getObjectPosition(page.processImagePosition),
                  }}
                />
              </div>
            </AnimatedSection>
          ) : null}
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Preventivo"
              title="Racconta il capo che immagini"
              description="Invia una richiesta con note, occasione d'uso e immagini di riferimento. Serena potra valutare modello, proporzioni, tessuti, tempi e rifiniture."
            />
            <div className="mt-8 border-t border-anthracite/14 pt-6 text-sm leading-7 text-anthracite/64">
              <p>
                Puoi allegare moodboard, foto di ispirazione, palette colore o
                dettagli tecnici. Serena ti rispondera con una prima valutazione
                e i prossimi step.
              </p>
              <p className="mt-6 font-semibold text-anthracite">
                Preferisci scrivere direttamente? Contatta Serena anche su
                WhatsApp o Instagram.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={settings.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-anthracite/20 px-5 py-3 font-semibold text-anthracite transition hover:border-sage hover:bg-sage/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                >
                  <MessageCircle aria-hidden="true" size={17} />
                  WhatsApp
                </a>
                <a
                  href={settings.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-anthracite/20 px-5 py-3 font-semibold text-anthracite transition hover:border-blush hover:bg-blush/22 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                >
                  <Instagram aria-hidden="true" size={17} />
                  Instagram
                </a>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-blush/25 p-5 sm:p-8">
              <ContactForm variant="quote" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
