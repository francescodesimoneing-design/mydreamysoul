# MyDreamySoul Handmade

Sito premium per atelier sartoriale artigianale italiano, realizzato con Next.js 15, TypeScript, Tailwind CSS, Framer Motion e Sanity CMS.

## Avvio sito

```bash
npm install
npm run dev
```

Il sito sara disponibile su:

```bash
http://localhost:3000
```

## Configurazione Sanity

Crea un progetto Sanity e copia le variabili:

```bash
cp .env.example .env.local
```

Su PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Compila `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
NEXT_PUBLIC_SITE_URL=https://mydreamysoulhandmade.it
```

Senza queste variabili il sito continua a funzionare con stati vuoti neutri, senza immagini stock o contenuti inventati.

## Sanity Studio

Con il sito avviato:

```bash
npm run dev
```

apri lo Studio embedded:

```bash
http://localhost:3000/studio
```

In alternativa puoi avviare lo Studio separato:

```bash
npm run studio
```

## Contenuti da creare

Nello Studio crea e pubblica:

- `Homepage`: hero title, subtitle, immagine, CTA e portfolio in evidenza.
- `Chi sono`: titolo, sottotitolo, testo principale e immagine.
- `Impostazioni sito`: WhatsApp, email, Instagram, indirizzo e SEO principale.
- `Portfolio`: progetti con titolo, categoria, descrizione, immagine, featured e ordine.
- `Boutique Artigianale`: creazioni con categoria, immagine, prezzo da e disponibilita su richiesta.
- `Testimonianze`: nome, testo, tipo prodotto e featured.

Le modifiche pubblicate vengono lette dal sito tramite GROQ. Se Sanity non e configurato o non contiene documenti validi, il sito mostra stati vuoti neutri e non usa immagini stock.

## Pubblicare modifiche

Per aggiornare contenuti:

1. Apri `/studio`.
2. Modifica o crea il documento.
3. Premi `Publish`.
4. Attendi la rigenerazione del sito. Le query sono impostate con revalidate a 60 secondi.

Per deployare uno Studio Sanity separato:

```bash
npm run deploy:studio
```

## Script

```bash
npm run lint
npm run typecheck
npm run build
npm run studio
```

## Struttura

- `src/app`: pagine App Router, route `/studio` e metadata SEO.
- `src/components`: componenti riutilizzabili.
- `src/data`: array vuoti mantenuti solo come compatibilita strutturale.
- `src/lib`: client Sanity, query CMS, image builder e configurazione brand.
- `src/sanity`: schema e struttura dello Studio.
- `src/types`: tipi condivisi.
- `src/styles`: token riutilizzabili.
- `public` e `src/public`: cartelle asset predisposte.
