"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";

type WhatsAppButtonProps = {
  href?: string;
};

export function WhatsAppButton({ href = siteConfig.links.whatsapp }: WhatsAppButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Scrivi su WhatsApp"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.7 }}
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-sage text-anthracite shadow-editorial transition hover:-translate-y-1 hover:bg-warm-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anthracite"
    >
      <MessageCircle aria-hidden="true" size={24} />
    </motion.a>
  );
}
