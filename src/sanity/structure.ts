import type { StructureResolver } from "sanity/structure";

const singletonTypes = ["homepage", "about", "siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MyDreamySoul")
    .items([
      S.listItem()
        .title("Homepage")
        .schemaType("homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage"),
        ),
      S.listItem()
        .title("Chi sono")
        .schemaType("about")
        .child(
          S.document()
            .schemaType("about")
            .documentId("about")
            .title("Chi sono"),
        ),
      S.listItem()
        .title("Impostazioni sito")
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Impostazioni sito"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !singletonTypes.includes(id) : true;
      }),
    ]);
