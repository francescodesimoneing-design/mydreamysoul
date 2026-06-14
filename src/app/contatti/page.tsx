import type { Metadata } from "next";
import { Instagram, Mail, MessageCircle } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { SectionTitle } from "@/components/section-title";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta MyDreamySoul Handmade via WhatsApp, Instagram, email o form per richiedere una creazione sartoriale artigianale.",
};

export default async function ContattiPage() {
  const settings = await getSiteSettings();
  const contactLinks = [
    {
      label: "WhatsApp",
      value: "Scrivi per una consulenza",
      href: settings.links.whatsapp,
      icon: MessageCircle,
    },
    {
      label: "Instagram",
      value: "@mydreamysoulhandmade",
      href: settings.links.instagram,
      icon: Instagram,
    },
    {
      label: "Email",
      value: settings.email,
      href: settings.links.email,
      icon: Mail,
    },
  ];

  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-page">
          <AnimatedSection>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/55">
              Contatti
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight text-anthracite text-balance sm:text-6xl">
              Inizia da un messaggio, poi costruiamo il capo insieme
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/68">
              Racconta occasione, stile e tempi. Serena ti rispondera per
              valutare la creazione piu adatta.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Canali"
              title="Scegli il modo piu comodo per contattare l'atelier"
            />
            <div className="mt-9 grid gap-4">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center gap-4 border-t border-anthracite/14 py-5 transition hover:border-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-blush/70 text-anthracite transition group-hover:bg-sage">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-anthracite">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm text-anthracite/62">
                        {item.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-blush/25 p-5 sm:p-8">
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
