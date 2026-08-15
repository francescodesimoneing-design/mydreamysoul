export const contactReasonOptions = [
  {
    value: "boutique_product_info",
    label: "Informazioni su un capo della Boutique",
  },
  { value: "tailoring", label: "Sartoria su misura" },
  {
    value: "availability_size_materials",
    label: "Disponibilità, taglia o materiali",
  },
  {
    value: "creation_order",
    label: "Ordine o richiesta su una creazione",
  },
  { value: "collaboration", label: "Collaborazioni" },
  { value: "other", label: "Altro" },
] as const;

export type ContactReason = (typeof contactReasonOptions)[number]["value"];

export function isContactReason(value: unknown): value is ContactReason {
  return contactReasonOptions.some((option) => option.value === value);
}

export function getContactReasonLabel(reason: ContactReason) {
  return (
    contactReasonOptions.find((option) => option.value === reason)?.label ?? reason
  );
}

export function parseProductSlug(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const slug = value.trim();

  if (!slug || slug.length > 96 || !/^[^\s/?#\\]+$/u.test(slug)) {
    return null;
  }

  return slug;
}
