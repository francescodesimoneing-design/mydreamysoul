"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/sartoria-su-misura", label: "Sartoria su misura" },
  { href: "/boutique", label: "Boutique Artigianale" },
  { href: "/portfolio", label: "Le mie realizzazioni" },
  { href: "/contatti", label: "Contatti" },
];

const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
};

type NavbarProps = {
  whatsappUrl?: string;
};

export function Navbar({ whatsappUrl = siteConfig.links.whatsapp }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-anthracite/10 bg-ivory/88 backdrop-blur-xl">
      <nav
        aria-label="Navigazione principale"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-serif text-xl font-semibold tracking-normal text-anthracite sm:text-2xl">
            MyDreamySoul
          </span>
          <span className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-anthracite/60">
            Handmade Atelier
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative isolate rounded-full px-4 py-2 text-sm font-medium text-anthracite/72 transition hover:text-anthracite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
              >
                <span>{item.label}</span>
                {active ? (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-blush/70"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contatti"
          className="hidden rounded-full bg-anthracite px-5 py-3 text-sm font-semibold text-ivory shadow-soft transition hover:-translate-y-0.5 hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage lg:inline-flex"
        >
          Richiedi consulenza
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="inline-flex size-11 items-center justify-center rounded-full border border-anthracite/15 bg-ivory text-anthracite transition hover:border-anthracite/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-t border-anthracite/10 bg-ivory px-5 py-5 shadow-soft lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => {
                const active = isActiveRoute(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-3 text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${
                      active
                        ? "bg-blush text-anthracite"
                        : "text-anthracite/72 hover:bg-blush/55 hover:text-anthracite"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-anthracite px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                onClick={() => setIsOpen(false)}
              >
                Richiedi una creazione
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
