import { defineField, defineType } from "sanity";

import { imagePositionOptions } from "./imagePosition";

const categories = [
  "Gonne",
  "Gonnoni",
  "Fiocchi nascita",
  "Accessori",
  "Idee regalo",
];

const statuses = [
  { title: "Disponibile", value: "available" },
  { title: "Venduto", value: "sold" },
  { title: "Su richiesta", value: "madeToOrder" },
  { title: "Archiviato", value: "archived" },
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
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 4,
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
      name: "images",
      title: "Foto",
      type: "array",
      description:
        "Carica una o piu fotografie della creazione. La prima fotografia viene usata come immagine principale nella Boutique.",
      of: [
        defineField({
          name: "productImage",
          title: "Foto",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Testo alternativo",
              type: "string",
              description: "Descrivi la foto in modo semplice.",
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
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "price",
      title: "Prezzo",
      type: "number",
      description: "Inserisci solo il numero. Il sito formattera il prezzo.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "size",
      title: "Taglia",
      type: "string",
      description: "Esempio: S, M, taglia unica o su misura.",
    }),
    defineField({
      name: "materials",
      title: "Materiali",
      type: "string",
      description: "Esempio: cotone, lino, broccato, velluto.",
    }),
    defineField({
      name: "status",
      title: "Stato",
      type: "string",
      description:
        "Scegli se la creazione e disponibile, venduta, su richiesta o archiviata.",
      options: {
        list: statuses,
        layout: "radio",
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "sourceTelegramMessageId",
      title: "ID messaggio Telegram",
      type: "string",
      description:
        "Campo tecnico opzionale per future automazioni. Non viene mostrato sul sito.",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      status: "status",
      media: "images.0",
    },
    prepare: ({ title, category, status, media }) => {
      const statusLabel =
        statuses.find((item) => item.value === status)?.title || "Visibile";

      return {
        title,
        subtitle: category ? `${category} - ${statusLabel}` : statusLabel,
        media,
      };
    },
  },
});
