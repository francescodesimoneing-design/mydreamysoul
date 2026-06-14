import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { getObjectPosition } from "@/lib/image-position";
import type { ImagePosition } from "@/types";

type HeroProps = {
  title: string;
  subtitle: string;
  image: string | null;
  imageAlt: string;
  imagePosition: ImagePosition;
  ctaPrimary: string;
  ctaSecondary: string;
};

export function Hero({
  title,
  subtitle,
  image,
  imageAlt,
  imagePosition,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ivory pt-20">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: getObjectPosition(imagePosition) }}
        />
      ) : (
        <div className="absolute inset-0 subtle-grid bg-ivory" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/58 to-transparent md:from-ivory/94 md:via-ivory/42 md:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ivory/95 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[62%] bg-[linear-gradient(90deg,rgba(250,247,242,0.78),rgba(220,200,160,0.18),transparent)]" />

      <div className="container-page relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-16">
        <AnimatedSection className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-anthracite/60">
            Atelier sartoriale italiano
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.02] text-anthracite text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/72 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sartoria-su-misura"
              className="inline-flex items-center justify-center rounded-full bg-anthracite px-7 py-4 text-sm font-semibold text-ivory shadow-editorial transition hover:-translate-y-0.5 hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-anthracite/28 bg-ivory/95 px-7 py-4 text-sm font-semibold text-anthracite shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-anthracite/45 hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              {ctaSecondary}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
