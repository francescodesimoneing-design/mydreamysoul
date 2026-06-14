"use client";

import { motion } from "framer-motion";

import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="border-t border-anthracite/14 py-7"
    >
      <blockquote className="font-serif text-2xl leading-snug text-anthracite">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-sm text-anthracite/62">
        <span className="font-semibold text-anthracite">{testimonial.name}</span>
        <span className="mx-2 text-anthracite/30">/</span>
        {testimonial.role}
      </figcaption>
    </motion.figure>
  );
}
