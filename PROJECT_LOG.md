# PROJECT_LOG.md

Memoria operativa per continuare il lavoro tra sessioni Codex. Aggiornato il 2026-08-14 dopo analisi locale del repository.

## Fonti Verificate

- File system del repository con `rg --files`, escludendo `.env.local`, `.next`, `node_modules` e file generati.
- Configurazioni: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, `sanity.config.ts`, `sanity.cli.ts`, `.env.example`, `.gitignore`.
- Codice in `src/app`, `src/components`, `src/lib`, `src/data`, `src/sanity`, `src/types`, `src/styles`.
- README attuale.
- Git locale: branch, remote, status, ultimi commit e statistiche commit.
- Ricerca TODO/FIXME/stock/demo/riferimenti immagini.

Non sono stati letti segreti locali. `.env.local` non e' stato aperto.

## Stato Git Attuale

- Branch corrente: `main`.
- Remote locale verificato: `origin` punta a `https://github.com/francescodesimoneing-design/mydreamysoul.git`.
- Ultimo commit locale: `36073aa Riposizionamento strategico MyDreamySoul`.
- Commit precedente: `0f97c30 Prima versione sito MyDreamySoul`.
- `git status --short` prima della creazione di questi documenti mostrava solo `?? appunti.txt`.
- `appunti.txt` e' non tracciato e non e' stato letto ne modificato.
- Il riferimento locale `origin/main` punta a `36073aa`; non e' stato eseguito fetch/push e quindi lo stato remoto reale non e' verificato in questa sessione.

## Cosa E' Implementato

- Sito Next.js 15 App Router con pagine:
  - `/`
  - `/chi-sono`
  - `/sartoria-su-misura`
  - `/boutique`
  - `/portfolio`
  - `/contatti`
  - `/studio/[[...tool]]`
- Design system Tailwind con palette avorio, rosa cipria, beige caldo, verde salvia e antracite.
- Font Google in `layout.tsx`: Playfair Display per headings e Inter per body.
- Layout globale con Navbar, Footer e pulsante WhatsApp flottante.
- Sanity Studio embedded su `/studio` e script Studio separato.
- Query GROQ e mapper in `src/lib/cms.ts`.
- Fallback neutri se Sanity non e' configurato o non restituisce contenuti validi.
- Portfolio e Boutique leggono solo contenuti Sanity validi; gli array demo locali sono vuoti.
- Hero, portfolio, boutique e Chi sono supportano posizionamento immagine configurabile.
- Filtri portfolio client-side per categoria.
- Form contatti e form preventivo presenti, ma solo lato UI.
- Metadata SEO globali e per pagina.

## Modifiche Recenti Ricostruibili

Il commit `36073aa Riposizionamento strategico MyDreamySoul` ha modificato 15 file e ha consolidato il posizionamento:

- Homepage: aggiunta sezione "Due modi di vivere la sartoria" subito dopo la hero.
- Menu e footer: voce "Boutique Artigianale" e ordine navigazione aggiornati.
- Boutique: pagina rinominata concettualmente come Boutique Artigianale, con testi meno ecommerce e stato vuoto Sanity.
- Sartoria su misura: rinforzato il posizionamento premium e la timeline con prove/rifiniture.
- Chi sono: rafforzata Serena come modellista sartoriale, con enfasi su vestibilita, cartamodello e proporzioni.
- Portfolio: categorie riallineate a Abiti, Gonne, Cappotti, Fiocchi nascita, Accessori, Sartoria su misura.
- Dati CMS/tipi/schema: categorie e testi coerenti con il nuovo posizionamento.

Dal repository attuale non e' possibile separare in commit distinti l'integrazione Sanity dalla prima versione del sito: nel commit iniziale `0f97c30` sono gia presenti App Router, Sanity, Studio, CMS helpers, schema, componenti e dati.

## Decisioni Implementative Utili

- Sanity e' fonte primaria per portfolio, prodotti, testimonianze, homepage, Chi sono e contatti principali.
- I fallback non devono simulare contenuti reali: meglio uno stato vuoto chiaro che card inventate.
- Gli item Sanity incompleti vengono filtrati nei mapper invece di essere renderizzati parzialmente.
- `imagePosition` evita modifiche CSS puntuali quando Serena carica foto tagliate male.
- Servizi e timeline restano locali in `src/data/services.ts`; non esiste ancora uno schema CMS per modificarli da Studio.
- La Boutique e' solo vetrina/contatto: `ProductCard` porta a `/contatti`, non a un checkout.
- I form non hanno integrazione backend: lo stato "sent" e' solo conferma visuale.

## Verifiche Effettuate

Eseguite il 2026-08-14 sullo stato corrente prima della creazione di questi documenti:

- `npm run lint` - passato.
- `npm run typecheck` - passato.
- `npm run build` - passato.

Output build rilevante:

- Next.js build riportata: `15.5.19`.
- Ambiente letto dalla build: `.env.local` presente, ma non aperto manualmente.
- Pagine pubbliche prerenderizzate staticamente con revalidate `1m`.
- `/studio/[[...tool]]` risulta dinamica, con first load JS molto superiore alle pagine pubbliche, comportamento atteso per Studio embedded.

Non esiste suite di test automatica dedicata oltre a lint, typecheck e build.

## Ricerche e Controlli

- Nessun `TODO`, `FIXME`, `HACK` o `XXX` trovato nelle sorgenti escluse dipendenze/generati.
- Nessun URL Unsplash o riferimento a immagini stock trovato nel codice.
- Le immagini in `foto/` sono tracciate ma non referenziate da codice o pagine.
- `next.config.ts` consente immagini remote solo da `cdn.sanity.io`.
- `.gitignore` esclude `node_modules`, `.next`, `out`, `dist`, env locali, `.vercel`, `.sanity` e `*.tsbuildinfo`.

## Problemi Aperti e Rischi

- Il contenuto effettivo pubblicato su Sanity non e' ricostruibile dal repository. Va verificato in Studio o sul sito live quando serve.
- Il contenuto dei PDF `MyDreamySoul_Masterplan_Sito_Web.pdf`, `MyDreamySoul_Strategia_Sito.pdf` e `report f12 chrome.pdf` non e' stato analizzato: `pdftotext` non era disponibile nell'ambiente.
- `appunti.txt` e' un file locale non tracciato. Non committarlo senza richiesta esplicita e senza verificarne la natura.
- Le versioni esatte Sanity/next-sanity sono una baseline funzionante. La motivazione storica dei pin non e' documentata nel repository.
- Vercel e configurazione deploy non sono nel repository, salvo `.vercel` ignorato. Non modificare setup Vercel/GitHub/Sanity senza richiesta esplicita.
- I form non inviano email, messaggi WhatsApp o record a Sanity. Per produzione commerciale reale serve una integrazione form.
- La predisposizione ecommerce non include ancora carrello, checkout, stock, pagamenti o ordini.

## Tentativi Falliti o Workaround

- Non sono emersi tentativi tecnici falliti documentati nel repository.
- Non sono emersi workaround commentati nel codice, oltre al fallback neutro Sanity gestito in `sanityFetch` e nei mapper CMS.
- Qualsiasi motivazione non visibile in Git, README o codice deve essere trattata come non ricostruibile e verificata prima di agire.

## Prossimo Punto Concreto

Per una nuova sessione Codex:

1. Partire leggendo `AGENTS.md`, `PROJECT_LOG.md`, `README.md`, `src/lib/cms.ts`, `src/lib/sanity.ts` e la pagina interessata.
2. Controllare `git status --short` prima di modificare file.
3. Ignorare `appunti.txt` salvo richiesta esplicita.
4. Se si toccano contenuti CMS, aggiornare schema, tipi, query e UI insieme.
5. Dopo modifiche codice, rieseguire almeno `npm run lint`, `npm run typecheck` e `npm run build`.
6. Aggiornare questi due documenti solo quando richiesto esplicitamente.
