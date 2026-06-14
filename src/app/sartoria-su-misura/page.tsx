import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { SectionTitle } from "@/components/section-title";
import { Timeline } from "@/components/timeline";
import { processSteps } from "@/data/services";

export const metadata: Metadata = {
  title: "Sartoria Su Misura",
  description:
    "Percorso sartoriale premium su misura: consulenza dedicata, misure personalizzate, cartamodello dedicato, scelta tessuti, prove e rifiniture.",
};

export default function SartoriaSuMisuraPage() {
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
            <div className="flex min-h-[28rem] flex-col justify-between border-y border-anthracite/12 bg-sage/16 p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/48">
                Percorso
              </p>
              <p className="font-serif text-4xl font-semibold leading-tight text-anthracite text-balance sm:text-5xl">
                Consulenza dedicata, misure personalizzate e cartamodello
                dedicato.
              </p>
              <p className="max-w-sm text-sm leading-7 text-anthracite/62">
                Modello, proporzioni, tessuti, vestibilita e finiture vengono
                studiati insieme a Serena.
              </p>
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
