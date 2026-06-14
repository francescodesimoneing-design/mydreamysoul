import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { SectionTitle } from "@/components/section-title";
import { Timeline } from "@/components/timeline";
import { processSteps } from "@/data/services";

export const metadata: Metadata = {
  title: "Sartoria Su Misura",
  description:
    "Percorso cliente per capi sartoriali su misura: consulenza, cartamodello, scelta tessuti, realizzazione e capo finito.",
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
              Un percorso sartoriale costruito intorno a te
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/68">
              Dalla prima conversazione alla consegna, ogni fase serve a
              trasformare un&apos;idea in un capo personale, proporzionato e curato.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex min-h-[28rem] flex-col justify-between border-y border-anthracite/12 bg-sage/16 p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/48">
                Percorso
              </p>
              <p className="font-serif text-4xl font-semibold leading-tight text-anthracite text-balance sm:text-5xl">
                Una creazione nasce dal dialogo, poi prende forma con tecnica e
                misura.
              </p>
              <p className="max-w-sm text-sm leading-7 text-anthracite/62">
                Le immagini di progetto vengono gestite dal portfolio Sanity,
                senza fotografie stock.
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
              title="Cinque passaggi, una creazione unica"
              description="Il processo resta chiaro dall'inizio, con decisioni condivise e attenzione tecnica a ogni passaggio."
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
              description="Invia una richiesta con note, occasione d'uso e immagini di riferimento. Il form e gia predisposto per un futuro flusso ecommerce o CRM."
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
