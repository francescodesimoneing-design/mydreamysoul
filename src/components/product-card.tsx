"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { getObjectPosition } from "@/lib/image-position";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const statusLabel =
    product.status === "sold"
      ? "Venduto"
      : product.status === "madeToOrder"
        ? "Su richiesta"
        : null;
  const details = [product.size, product.materials].filter(
    (detail): detail is string => Boolean(detail),
  );

  if (!primaryImage) {
    return null;
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col"
    >
      <div className="editorial-image relative aspect-[4/5]">
        <Image
          src={primaryImage.image}
          alt={primaryImage.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          style={{ objectPosition: getObjectPosition(primaryImage.imagePosition) }}
        />
        {statusLabel ? (
          <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold text-anthracite shadow-soft backdrop-blur">
            {statusLabel}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-anthracite/45">
              {product.category}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-anthracite">
              {product.name}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-blush/70 px-3 py-1 text-xs font-semibold text-anthracite">
            {product.priceLabel}
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-7 text-anthracite/66">
          {product.description}
        </p>
        {details.length ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-anthracite/45">
            {details.join(" / ")}
          </p>
        ) : null}
        <Link
          href="/contatti"
          className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-anthracite underline decoration-sage/70 underline-offset-8 transition hover:decoration-anthracite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
        >
          Richiedi dettagli
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
