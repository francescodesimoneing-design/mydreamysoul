import { defineField, defineType } from "sanity";

import { imagePositionOptions } from "./imagePosition";

export const tailoringPage = defineType({
  name: "tailoringPage",
  title: "Sartoria su misura",
  type: "document",
  fields: [
    defineField({
      name: "introImage",
      title: "Immagine iniziale",
      description:
        "Carica una foto reale di Serena al lavoro, con un cartamodello, un tessuto o durante una prova.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          description: "Descrivi brevemente cosa mostra la fotografia.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "introImagePosition",
      title: "Posizione immagine iniziale",
      description:
        "Usa questo campo se la foto viene tagliata male nella parte iniziale della pagina.",
      type: "string",
      options: {
        list: imagePositionOptions,
        layout: "radio",
      },
      initialValue: "center",
    }),
    defineField({
      name: "processImage",
      title: "Immagine tra processo e preventivo",
      description:
        "Carica un dettaglio reale di tessuto, cucitura, cartamodello o capo in lavorazione.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          description: "Descrivi brevemente cosa mostra la fotografia.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "processImagePosition",
      title: "Posizione immagine di processo",
      description:
        "Usa questo campo se il dettaglio viene tagliato male nella pagina.",
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
      title: "Sartoria su misura",
      subtitle: "Immagini della pagina",
    }),
  },
});
