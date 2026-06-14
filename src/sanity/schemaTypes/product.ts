import { defineField, defineType } from "sanity";

import { imagePositionOptions } from "./imagePosition";

const categories = [
  "Gonne",
  "Gonnoni",
  "Fiocchi nascita",
  "Accessori",
  "Idee regalo",
];

export const product = defineType({
  name: "product",
  title: "Boutique Artigianale",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      description: "Scegli la categoria boutique piu adatta.",
      options: { list: categories.map((title) => ({ title, value: title })) },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      description: "Carica una foto reale del prodotto o della creazione.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagePosition",
      title: "Posizione immagine",
      description:
        "Usa questo campo se la foto viene tagliata male nella card.",
      type: "string",
      options: {
        list: imagePositionOptions,
        layout: "radio",
      },
      initialValue: "center",
    }),
    defineField({
      name: "priceFrom",
      title: "Prezzo da",
      type: "string",
      description: "Esempio: Da 120 euro",
    }),
    defineField({
      name: "availableOnRequest",
      title: "Disponibile su richiesta",
      description: "Attiva se il prodotto viene realizzato dopo la richiesta.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      description: "In evidenza: mostra questo contenuto nella homepage.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
