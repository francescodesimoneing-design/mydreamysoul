import { defineField, defineType } from "sanity";

import { imagePositionOptions } from "./imagePosition";

export const about = defineType({
  name: "about",
  title: "Chi sono",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sottotitolo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Testo principale",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      description: "Carica una foto reale di Serena, dell'atelier o dei dettagli di lavoro.",
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
      name: "imagePosition",
      title: "Posizione immagine",
      description:
        "Usa questo campo se la foto viene tagliata male nella pagina Chi sono.",
      type: "string",
      options: {
        list: imagePositionOptions,
        layout: "radio",
      },
      initialValue: "center",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Chi sono",
      subtitle: "Storia e filosofia di Serena",
    }),
  },
});
