import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "Numero WhatsApp",
      type: "string",
      description: "Formato internazionale senza +, esempio: 393331234567",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "instagramUrl",
      title: "URL Instagram",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "string",
    }),
    defineField({
      name: "seoTitle",
      title: "Titolo SEO",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Impostazioni sito",
      subtitle: "Contatti, social e SEO principale",
    }),
  },
});
