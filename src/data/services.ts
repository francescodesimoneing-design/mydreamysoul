import type { Service, TimelineStep } from "@/types";

export const services: Service[] = [
  {
    title: "Capi su misura",
    description:
      "Abiti, gonne e capi speciali progettati sul corpo, sul gusto personale e sull'occasione da vivere.",
    icon: "ruler",
    href: "/sartoria-su-misura",
  },
  {
    title: "Gonne sartoriali",
    description:
      "Gonne a ruota, gonnoni e modelli femminili con volumi calibrati, finiture curate e tessuti scelti insieme.",
    icon: "scissors",
    href: "/boutique",
  },
  {
    title: "Accessori handmade",
    description:
      "Accessori coordinati, dettagli romantici e piccoli pezzi unici pensati per completare ogni creazione.",
    icon: "sparkles",
    href: "/boutique",
  },
  {
    title: "Fiocchi nascita",
    description:
      "Creazioni dolci e personalizzate per annunciare una nuova nascita con delicatezza artigianale.",
    icon: "flower",
    href: "/boutique",
  },
];

export const processSteps: TimelineStep[] = [
  {
    title: "Consulenza",
    description:
      "Ascolto delle esigenze, dell'occasione e dell'immaginario estetico per definire stile, volumi e dettagli.",
  },
  {
    title: "Cartamodello",
    description:
      "Studio tecnico del modello e adattamento delle proporzioni per ottenere una vestibilita precisa.",
  },
  {
    title: "Scelta tessuti",
    description:
      "Selezione di tessuti, texture, fodere e finiture in armonia con il progetto sartoriale.",
  },
  {
    title: "Realizzazione",
    description:
      "Taglio, confezione e rifiniture eseguite a mano o con tecniche sartoriali controllate in atelier.",
  },
  {
    title: "Capo finito",
    description:
      "Ultima verifica, consegna e consigli di cura per preservare forma, mano e bellezza della creazione.",
  },
];
