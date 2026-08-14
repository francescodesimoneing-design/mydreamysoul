"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { PortfolioCard } from "@/components/portfolio-card";
import type { PortfolioCategory, PortfolioItem } from "@/types";

type ActiveCategory = "Tutti" | PortfolioCategory;

const categories: ActiveCategory[] = [
  "Tutti",
  "Abiti",
  "Gonne",
  "Cappotti",
  "Fiocchi nascita",
  "Accessori",
  "Sartoria su misura",
];

type PortfolioGalleryProps = {
  items: PortfolioItem[];
};

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("Tutti");

  const filteredItems = useMemo(() => {
    if (activeCategory === "Tutti") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  if (!items.length) {
    return (
      <EmptyState
        eyebrow="Sanity Studio"
        title="Aggiungi contenuti da Sanity Studio"
        description="Pubblica almeno una realizzazione con immagine reale per mostrarla in questa galleria."
      />
    );
  }

  return (
    <div>
      <div
        className="mb-10 flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Filtra le realizzazioni per categoria"
      >
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${
                active
                  ? "border-anthracite bg-anthracite text-ivory"
                  : "border-anthracite/14 bg-ivory text-anthracite/70 hover:border-sage hover:text-anthracite"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
      {!filteredItems.length ? (
        <div className="mt-10">
          <EmptyState
            title="Nessun contenuto in questa categoria"
            description="Pubblica o ricategorizza una realizzazione da Sanity Studio per popolare questo filtro."
          />
        </div>
      ) : null}
    </div>
  );
}
