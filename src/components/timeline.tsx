"use client";

import { motion } from "framer-motion";

import type { TimelineStep } from "@/types";

type TimelineProps = {
  steps: TimelineStep[];
};

export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-0">
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
          className="relative border-l border-anthracite/16 pl-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8"
        >
          <span className="absolute -left-[0.62rem] top-1 flex size-5 items-center justify-center rounded-full bg-sage ring-8 ring-ivory lg:-top-[0.62rem] lg:left-0">
            <span className="size-2 rounded-full bg-anthracite" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-anthracite/45">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-anthracite">
            {step.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-anthracite/66 lg:pr-8">
            {step.description}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
