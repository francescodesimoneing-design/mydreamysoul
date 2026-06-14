"use client";

import { Flower2, Gift, Heart, Ruler, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

import type { Service, ServiceIcon } from "@/types";

const iconMap: Record<ServiceIcon, ComponentType<{ size?: number }>> = {
  scissors: Scissors,
  sparkles: Sparkles,
  ruler: Ruler,
  gift: Gift,
  flower: Flower2,
  heart: Heart,
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col border-t border-anthracite/14 bg-ivory/60 px-1 py-7"
    >
      <div className="mb-8 inline-flex size-12 items-center justify-center rounded-full bg-blush/75 text-anthracite">
        <Icon size={22} />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-anthracite">
        {service.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-anthracite/66">
        {service.description}
      </p>
      <Link
        href={service.href}
        className="mt-7 inline-flex w-fit items-center rounded-full text-sm font-semibold text-anthracite underline decoration-sage/60 underline-offset-8 transition group-hover:decoration-anthracite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
      >
        Approfondisci
      </Link>
    </motion.article>
  );
}
