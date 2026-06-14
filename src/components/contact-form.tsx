"use client";

import { Send, Upload } from "lucide-react";
import { type FormEvent, useState } from "react";

type ContactFormProps = {
  variant?: "contact" | "quote";
};

export function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const isQuote = variant === "quote";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
      aria-label={isQuote ? "Form richiesta preventivo" : "Form contatti"}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-anthracite">
          Nome
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/20"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-anthracite">
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/20"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-anthracite">
        {isQuote ? "Tipo di creazione" : "Oggetto"}
        <input
          required
          name="subject"
          type="text"
          placeholder={isQuote ? "Gonna, abito, fiocco nascita..." : "Come posso aiutarti?"}
          className="rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition placeholder:text-anthracite/36 focus:border-sage focus:ring-4 focus:ring-sage/20"
        />
      </label>

      {isQuote ? (
        <label className="grid gap-2 text-sm font-semibold text-anthracite">
          Immagini di riferimento
          <span className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-anthracite/24 bg-ivory px-4 py-6 text-center text-sm font-normal text-anthracite/58 transition hover:border-sage hover:bg-sage/10">
            <Upload aria-hidden="true" size={22} className="mb-2 text-anthracite" />
            Carica immagini, moodboard o dettagli utili
            <input
              name="references"
              type="file"
              multiple
              accept="image/*,.pdf"
              className="sr-only"
            />
          </span>
        </label>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-anthracite">
        Note
        <textarea
          required
          name="message"
          rows={6}
          placeholder={
            isQuote
              ? "Racconta occasione, misure note, tessuti desiderati e tempi."
              : "Scrivi il tuo messaggio."
          }
          className="resize-y rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition placeholder:text-anthracite/36 focus:border-sage focus:ring-4 focus:ring-sage/20"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-anthracite/52">
          I dati verranno usati solo per rispondere alla tua richiesta.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-anthracite px-7 py-4 text-sm font-semibold text-ivory shadow-soft transition hover:-translate-y-0.5 hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
        >
          {isQuote ? "Invia richiesta" : "Invia messaggio"}
          <Send aria-hidden="true" size={16} />
        </button>
      </div>

      {status === "sent" ? (
        <p className="rounded-sm bg-sage/22 px-4 py-3 text-sm font-semibold text-anthracite">
          Richiesta pronta per essere collegata al futuro backend.
        </p>
      ) : null}
    </form>
  );
}
