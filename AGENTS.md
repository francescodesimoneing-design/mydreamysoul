# AGENTS.md

Memoria tecnica stabile per sessioni Codex future. Il codice e lo stato reale del repository restano la fonte primaria di verita.

## Project Intent

MyDreamySoul Handmade e' un sito premium per atelier sartoriale artigianale italiano fondato da Serena Manna. Le scelte tecniche devono sostenere un posizionamento da atelier, non da ecommerce industriale.

Il sito comunica due percorsi dello stesso valore artigianale:

- Boutique Artigianale: creazioni gia progettate da Serena, ordinabili o richiedibili con maggiore semplicita.
- Sartoria su misura: percorso premium con consulenza, misure, cartamodello, tessuti, prove e rifiniture.

Il progetto e' predisposto per un futuro ecommerce, ma attualmente non include checkout, carrello, pagamenti o gestione ordini.

## Stack

- Next.js 15 App Router.
- React 19.
- TypeScript con `strict: true`.
- Tailwind CSS v4 con PostCSS.
- Framer Motion per animazioni leggere e interazioni.
- Sanity CMS con `next-sanity`, `sanity`, `groq` e `@sanity/image-url`.
- `next/image` per immagini ottimizzate.
- `lucide-react` per icone UI.
- ESLint 9 con configurazione Next core web vitals e TypeScript.

## Architettura

- `src/app` contiene le route App Router, i metadata SEO e lo Studio embedded.
- `src/app/layout.tsx` recupera le impostazioni sito via CMS per metadata, Navbar, Footer e WhatsApp flottante.
- `src/lib/sanity.ts` configura il client Sanity, `groq` e `sanityFetch`.
- `src/lib/cms.ts` contiene query GROQ, mapping verso i tipi applicativi e fallback neutri.
- `src/lib/image.ts` costruisce URL immagini Sanity.
- `src/lib/image-position.ts` converte i valori CMS in `object-position` CSS.
- `src/app/globals.css` importa Tailwind, definisce i token `@theme`, helper globali e reset HTML locali.
- `sanity.config.ts` configura Sanity Studio con `basePath: "/studio"`.
- `src/app/studio/[[...tool]]/page.tsx` monta `NextStudio`.
- I componenti con animazioni o stato locale sono client component (`"use client"`); le pagine restano prevalentemente server component.

## Struttura Cartelle

- `src/app`: pagine pubbliche, layout globale, CSS globale, Studio route.
- `src/components`: componenti riutilizzabili UI.
- `src/data`: dati locali statici. Al momento `services.ts` contiene servizi e timeline; `portfolio.ts`, `products.ts` e `testimonials.ts` sono array vuoti per compatibilita strutturale.
- `src/lib`: client Sanity, query CMS, helper immagini e configurazione brand.
- `src/sanity`: schema documenti e struttura Studio.
- `src/types`: tipi condivisi tra CMS, pagine e componenti.
- `src/styles`: token riutilizzabili.
- `public` e `src/public`: placeholder asset.
- `foto`: immagini locali tracciate in Git ma attualmente non referenziate dal codice.

## File Principali

- `src/app/page.tsx`: homepage, hero CMS, sezione "Due modi di vivere la sartoria", servizi, processo, portfolio in evidenza e CTA.
- `src/app/boutique/page.tsx`: pagina Boutique Artigianale, prodotti da Sanity e stato vuoto.
- `src/app/sartoria-su-misura/page.tsx`: percorso premium e form preventivo.
- `src/app/chi-sono/page.tsx`: contenuti Serena/atelier da Sanity con fallback neutro.
- `src/app/portfolio/page.tsx`: galleria filtrabile da Sanity.
- `src/app/contatti/page.tsx`: canali contatto da site settings e form.
- `src/components/hero.tsx`: hero fullscreen con immagine Sanity opzionale, gradient caldo e CTA.
- `src/components/portfolio-gallery.tsx`: filtro categoria client-side.
- `src/components/portfolio-card.tsx` e `src/components/product-card.tsx`: card immagine con `next/image` e `imagePosition`.
- `src/components/contact-form.tsx`: form solo UI, senza backend collegato.

## Sanity CMS

Sanity e' l'integrazione principale per contenuti aggiornabili da Serena.

Documenti singleton nello Studio:

- `homepage`: hero title, subtitle, hero image, hero image position, CTA, portfolio in evidenza.
- `about`: contenuto Chi sono, testo, immagine e image position.
- `siteSettings`: WhatsApp, email, Instagram, indirizzo, SEO principale.

Documenti ripetibili:

- `portfolioItem`: titolo, slug, categoria, descrizione, immagine, image position, featured, order.
- `product`: titolo, slug, categoria, descrizione, immagine, price from, available on request, featured, order.
- `testimonial`: nome, testo, tipo prodotto, featured.

Categorie portfolio consolidate:

- Abiti
- Gonne
- Cappotti
- Fiocchi nascita
- Accessori
- Sartoria su misura

Categorie Boutique consolidate:

- Gonne
- Gonnoni
- Fiocchi nascita
- Accessori
- Idee regalo

Valori `imagePosition` consolidati:

- `center`
- `top`
- `bottom`
- `left`
- `right`

Se si cambia una categoria o un campo CMS, aggiornare insieme:

- schema Sanity in `src/sanity/schemaTypes`
- tipi in `src/types/index.ts`
- query e mapper in `src/lib/cms.ts`
- filtri o chip UI nelle pagine/componenti coinvolti

## Data Policy

- Portfolio, Boutique e Testimonianze non devono usare dati demo inventati.
- Se Sanity non e' configurato o non restituisce documenti validi, il sito deve mostrare stati vuoti neutri.
- Non reintrodurre immagini stock, URL Unsplash o contenuti fashion generici.
- Un documento portfolio/prodotto viene scartato dal mapper se manca titolo, descrizione, immagine valida o categoria riconosciuta.
- Homepage e Chi sono hanno fallback testuali neutri e nessuna immagine di fallback.
- `siteSettings` ricade su `siteConfig` se Sanity non e' disponibile.

## Integrazioni

- Sanity Content Lake via `next-sanity`, `groq` e CDN pubblico.
- Sanity Studio embedded su `/studio`.
- `next.config.ts` abilita immagini remote da `cdn.sanity.io`.
- Git remote verificato: `origin` punta a `https://github.com/francescodesimoneing-design/mydreamysoul.git`.
- `.vercel` e `.sanity` sono ignorate da Git. Non modificare configurazioni Vercel, GitHub o Sanity senza richiesta esplicita.

## Variabili Ambiente

Non leggere o committare `.env.local`. Usare `.env.example` come riferimento. Variabili necessarie:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

Tutte sono configurazioni pubbliche client-side. Non inserire token Sanity o segreti in variabili `NEXT_PUBLIC_*`.

## Comandi

- Installazione: `npm install`
- Sviluppo sito: `npm run dev`
- Studio embedded: avviare il sito e aprire `/studio`
- Studio separato: `npm run studio`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build produzione: `npm run build`
- Deploy Studio Sanity separato: `npm run deploy:studio`

Non esiste uno script `test` nel `package.json` attuale.

## Convenzioni

- Usare import alias `@/*` verso `src/*`.
- Mantenere TypeScript strict e tipi condivisi in `src/types`.
- Preferire server component per pagine e data fetching; usare client component solo dove servono stato, Framer Motion o interazioni.
- Usare `next/image` per immagini renderizzate nel sito.
- Usare `getSanityImageUrl` o `urlFor` per sorgenti Sanity.
- Mantenere alt text obbligatorio negli schemi immagine Sanity.
- Usare Tailwind e token esistenti: ivory, blush, warm-beige, sage, anthracite.
- Con Tailwind v4, le regole CSS globali che resettano elementi HTML devono stare nel layer appropriato, di norma `@layer base`, per non scavalcare le utility come `text-ivory` o `text-anthracite`.
- Mantenere un tono editoriale, artigianale e non industriale nei testi UI.
- Aggiornare `AGENTS.md` e `PROJECT_LOG.md` solo quando richiesto esplicitamente.

## Aree Delicate

- Versioni Sanity/Next: `package.json` usa `next-sanity` 11.x, `sanity` 4.x, Next 15 e React 19. Il motivo storico esatto dei pin non e' ricostruibile solo dal repository; trattarli come baseline funzionante e testarli prima di aggiornarli.
- `src/app/layout.tsx` fa data fetching CMS anche per metadata. Le failure Sanity devono continuare a ricadere su fallback neutri.
- `sanityFetch` usa `useCdn: true`, `perspective: "published"` e `revalidate` default a 60 secondi.
- `/studio/[[...tool]]` e' dinamica e pesante rispetto alle pagine pubbliche; non ottimizzarla come una pagina marketing.
- Il reset globale degli anchor in `src/app/globals.css` deve restare dentro `@layer base`. Se viene lasciato fuori layer, in Tailwind v4 puo' finire dopo le utility colore nel CSS compilato e rendere invisibile il testo dei CTA scuri basati su `Link`/`a`.
- `ContactForm` non invia dati a un backend: mostra solo stato UI locale.
- La predisposizione ecommerce e' solo strutturale: evitare di aggiungere checkout o pagamenti senza richiesta esplicita.

## Informazioni Non Ricostruibili Dal Repository

- Il contenuto testuale dei PDF strategici presenti in root non e' stato estratto: non era disponibile `pdftotext` nell'ambiente.
- Lo stato reale remoto su GitHub/Vercel non e' stato verificato via rete in questa analisi; sono stati verificati solo remote e riferimenti Git locali.
- Il contenuto pubblicato in Sanity non e' parte del repository e va considerato fonte esterna.
