import { defineField, defineType } from "sanity";

import { imagePositionOptions } from "./imagePosition";

const categories = [
  "Abiti",
  "Gonne",
  "Cappotti",
  "Sartoria su misura",
  "Fiocchi nascita",
];

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio",
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
      description: "Scegli la categoria piu adatta al progetto.",
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
      description: "Carica una foto reale del progetto realizzato.",
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
