import { Instagram, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import type { SiteSettings } from "@/types";

const footerLinks = [
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/sartoria-su-misura", label: "Sartoria su misura" },
  { href: "/boutique", label: "Boutique" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contatti", label: "Contatti" },
];

type FooterProps = {
  settings?: SiteSettings;
};

export function Footer({ settings = siteConfig }: FooterProps) {
  return (
    <footer className="border-t border-anthracite/10 bg-anthracite text-ivory">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-semibold">
              MyDreamySoul Handmade
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-ivory/68">
            Atelier sartoriale artigianale fondato da Serena Manna. Creazioni
            su misura, accessori e dettagli handmade realizzati in Italia.
          </p>
        </div>

        <nav aria-label="Link footer" className="grid gap-3 text-sm text-ivory/72">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="grid content-start gap-4 text-sm text-ivory/72">
          <a
            href={settings.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 transition hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            <MessageCircle aria-hidden="true" size={18} />
            WhatsApp
          </a>
          <a
            href={settings.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 transition hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            <Instagram aria-hidden="true" size={18} />
            Instagram
          </a>
          <a
            href={settings.links.email}
            className="inline-flex items-center gap-3 transition hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            <Mail aria-hidden="true" size={18} />
            {settings.email}
          </a>
        </div>
      </div>

      <div className="container-page border-t border-ivory/10 py-5 text-xs text-ivory/52">
        <p>
          {new Date().getFullYear()} MyDreamySoul Handmade. Tutti i diritti
          riservati.
        </p>
      </div>
    </footer>
  );
}
