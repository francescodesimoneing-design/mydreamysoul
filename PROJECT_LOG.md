# PROJECT_LOG.md

Memoria operativa per continuare il lavoro tra sessioni Codex. Aggiornato il 2026-08-14 dopo verifica dello stato reale del repository.

## Fonti Verificate

- File system e Git locale.
- `AGENTS.md`, `README.md`, `package.json`, configurazioni Next/Tailwind/ESLint/Sanity.
- Codice in `src/app`, `src/components`, `src/lib`, `src/data`, `src/sanity`, `src/types`, `src/styles`.
- Diff e statistiche dei commit locali recenti.
- Ricerca di pattern CSS e classi Tailwind per CTA scuri.

Non leggere `.env.local`: contiene configurazione locale e deve rimanere fuori dai commit.

## Stato Git e Repository

- Branch corrente verificato: `main`.
- Remote locale verificato: `origin` punta a `https://github.com/francescodesimoneing-design/mydreamysoul.git`.
- Commit rilevanti gia presenti:
  - `7628430 fix: improve home spacing and dark CTA contrast`
  - `bc022d9 Add Codex project memory`
  - `36073aa Riposizionamento strategico MyDreamySoul`
  - `0f97c30 Prima versione sito MyDreamySoul`
- Prima di aggiornare questa memoria il worktree risultava pulito.
- File ignorati locali attesi: `.env.local`, `.next/`, `node_modules/`, `tsconfig.tsbuildinfo`, `appunti.txt`.
- `appunti.txt` e' personale locale, ignorato da Git e non va letto/committato salvo richiesta esplicita.
- Non e' stato eseguito push automatico.

## Stato Implementativo

- Sito Next.js 15 App Router con pagine pubbliche:
  - `/`
  - `/chi-sono`
  - `/sartoria-su-misura`
  - `/boutique`
  - `/portfolio`
  - `/contatti`
  - `/studio/[[...tool]]`
- Sanity Studio embedded su `/studio`.
- Sanity e' fonte primaria per homepage, Chi sono, site settings, portfolio, boutique e testimonianze.
- Portfolio, Boutique e Testimonianze non usano dati demo: gli array locali sono vuoti e i mapper CMS scartano item incompleti.
- I fallback senza Sanity sono neutri, senza immagini stock.
- `src/data/services.ts` resta locale per servizi e timeline; non esiste schema CMS per modificarli da Studio.
- Form contatti/preventivo presenti solo lato UI; non inviano dati a backend, email o Sanity.
- Boutique resta vetrina/contatto, senza carrello, checkout, pagamenti o gestione ordini.

## Lavoro Completato Di Recente

### Memoria progetto

- Creati `AGENTS.md` e `PROJECT_LOG.md` con commit `bc022d9 Add Codex project memory`.
- Aggiunto `appunti.txt` a `.gitignore` per mantenerlo locale/personale.
- I due documenti devono essere aggiornati solo su richiesta esplicita.

### Home: densita verticale

- Nel commit `7628430`, la prima sezione dopo la Hero non usa piu' `section-y`.
- Prima: `section-y bg-ivory`.
- Ora: `bg-ivory pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28`.
- Motivo: la Hero e' intenzionalmente fullscreen (`min-h-[100svh]` in `src/components/hero.tsx`), quindi applicare subito dopo il padding globale `section-y` (`clamp(4.5rem, 8vw, 8rem)`) creava una transizione visivamente troppo lunga.
- La modifica e' locale a `src/app/page.tsx` e non cambia Hero, layout globale, CMS, routing o design system.

### CTA scuri invisibili

- Problema osservato: diversi CTA con `bg-anthracite` apparivano con sfondo corretto ma testo invisibile.
- Causa verificata nel CSS compilato: `src/app/globals.css` definiva `a { color: inherit; text-decoration: none; }` fuori dai layer Tailwind. Con Tailwind v4 quella regola finiva dopo le utility, quindi poteva prevalere su classi come `text-ivory` nei componenti `Link`/`a`.
- Effetto: i CTA scuri basati su link ereditavano il colore del contenitore invece di usare `text-ivory`; in molti casi il testo diventava antracite su sfondo antracite.
- Fix implementato in `src/app/globals.css`: il reset anchor e' stato spostato dentro `@layer base`.
- Questo mantiene il reset globale ma lascia alle utility Tailwind (`text-ivory`, `text-anthracite`, hover/focus) la precedenza corretta.
- Non modificare questo reset riportandolo fuori layer.

### Copy tecnico Home

- Rimossa dalla sezione Portfolio in Home la frase tecnica rivolta all'utente.
- Prima: `Una selezione di progetti pubblicati da Sanity Studio.`
- Ora: `Una selezione di creazioni realizzate a mano da Serena.`
- Motivo: evitare riferimenti a CMS/implementazione nell'interfaccia pubblica.

## Decisioni Implementative Utili

- La Hero fullscreen e' una scelta progettuale intenzionale; non considerarla automaticamente un problema.
- Preferire fix locali per spacing e composizione della Home invece di cambiare `.section-y` globalmente.
- Per bug CSS condivisi, verificare il CSS compilato e la cascata Tailwind v4 prima di duplicare classi sui singoli pulsanti.
- Non introdurre immagini stock o demo.
- Non modificare schema Sanity, query, routing, design system globale o dipendenze senza necessita' esplicita.
- Se si cambiano categorie o campi CMS, aggiornare insieme schema, tipi, query/mapping e UI.

## Verifiche Effettuate

Per il commit `7628430` sono state eseguite:

- `git diff --check` - passato, con solo warning LF/CRLF di Git su Windows.
- `npm run lint` - passato.
- `npm run typecheck` - passato.
- `npm run build` - passato.

Risultato build rilevante:

- Next.js build riportata: `15.5.19`.
- La build legge `.env.local`, ma il file non e' stato aperto manualmente.
- Pagine pubbliche prerenderizzate staticamente con revalidate `1m`.
- `/studio/[[...tool]]` resta dinamica e pesante, comportamento atteso per Studio embedded.

Non esiste una suite Playwright/visuale installata.

## Problemi Aperti e Rischi

- Serve verifica manuale su `localhost:3000` dei CTA scuri nelle pagine pubbliche dopo il fix CSS:
  - Hero
  - Navbar desktop
  - menu mobile
  - Home, Boutique, Chi sono
  - form contatti/preventivo
  - filtri Portfolio attivi
- La prima sezione Home ha spacing locale ridotto; va controllata visivamente su desktop, tablet e mobile per confermare che resti premium e non compressa.
- Il contenuto effettivo pubblicato su Sanity non e' ricostruibile dal repository e va verificato in Studio o sul sito live quando necessario.
- I PDF strategici in root non sono stati analizzati: `pdftotext` non era disponibile nell'ambiente precedente.
- Le versioni Sanity/next-sanity sono baseline funzionante; la motivazione storica dei pin non e' documentata nel repository.
- Vercel e configurazione deploy non sono nel repository, salvo `.vercel` ignorato. Non modificare setup Vercel/GitHub/Sanity senza richiesta esplicita.
- I form non inviano dati reali; per produzione commerciale serve una integrazione dedicata.

## Tentativi Falliti o Da Non Ripetere

- Non duplicare fix `text-ivory` su tutti i CTA scuri prima di controllare la cascata CSS: il problema era condiviso nel reset globale degli anchor.
- Non spostare il reset `a { color: inherit; text-decoration: none; }` fuori da `@layer base`.
- Non risolvere problemi di densita' Home cambiando subito `.section-y` globale: avrebbe effetto su piu' pagine e maggiore rischio di regressione.

## Prossimo Punto Concreto

Per una nuova sessione Codex:

1. Leggere `AGENTS.md`, `PROJECT_LOG.md`, `README.md`, `src/app/globals.css`, `src/app/page.tsx`, `src/components/hero.tsx` e il file interessato dal task.
2. Controllare `git status --short` prima di modificare file.
3. Verificare manualmente su `localhost:3000` la leggibilita' dei CTA scuri e la transizione Hero -> prima sezione.
4. Se il risultato visivo e' approvato, eventualmente preparare un commit/push secondo richiesta dell'utente.
5. Dopo modifiche codice, rieseguire almeno `git diff --check`, `npm run lint`, `npm run typecheck` e, per cambi UI/CSS, `npm run build`.
6. Aggiornare questi due documenti solo quando richiesto esplicitamente.
