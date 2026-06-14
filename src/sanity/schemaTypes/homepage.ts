import { defineField, defineType } from "sanity";

import { imagePositionOptions } from "./imagePosition";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Titolo hero",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sottotitolo hero",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Immagine hero",
      type: "image",
      description:
        "Carica una foto reale dell'atelier o di una creazione. Evita immagini stock.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "heroImagePosition",
      title: "Posizione immagine",
      description:
        "Usa questo campo se la foto viene tagliata male nella hero.",
      type: "string",
      options: {
        list: imagePositionOptions,
        layout: "radio",
      },
      initialValue: "center",
    }),
    defineField({
      name: "ctaPrimary",
      title: "CTA primaria",
      type: "string",
      initialValue: "Richiedi una creazione su misura",
    }),
    defineField({
      name: "ctaSecondary",
      title: "CTA secondaria",
      type: "string",
      initialValue: "Scopri il portfolio",
    }),
    defineField({
      name: "featuredPortfolio",
      title: "Portfolio in evidenza",
      type: "array",
      of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Homepage",
      subtitle: "Hero, CTA e portfolio in evidenza",
    }),
  },
});
