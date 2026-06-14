"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { getObjectPosition } from "@/lib/image-position";
import type { PortfolioItem } from "@/types";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <div className="editorial-image relative aspect-[4/5]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          style={{ objectPosition: getObjectPosition(item.imagePosition) }}
        />
      </div>
      <div className="pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-anthracite/45">
          {item.category}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-anthracite">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-anthracite/66">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}
