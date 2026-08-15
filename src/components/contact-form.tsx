"use client";

import { Send, Upload } from "lucide-react";
import { type FormEvent, useState } from "react";

type ContactFormProps = {
  variant?: "contact" | "quote";
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const errorMessage =
  "Non siamo riusciti a inviare la richiesta. Riprova oppure contattaci su WhatsApp.";

export function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [hasUnsentReferences, setHasUnsentReferences] = useState(false);
  const isQuote = variant === "quote";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedReferences = formData
      .getAll("references")
      .some((value) => value instanceof File && value.size > 0);

    setStatus("submitting");
    setHasUnsentReferences(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: isQuote ? "quote" : "contact",
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setHasUnsentReferences(selectedReferences);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
      aria-label={isQuote ? "Form richiesta preventivo" : "Form contatti"}
      aria-busy={status === "submitting"}
    >
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${variant}-website`}>Sito web</label>
        <input
          id={`${variant}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-anthracite">
          Nome
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
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
            maxLength={254}
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
          minLength={2}
          maxLength={150}
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
          minLength={2}
          maxLength={5000}
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
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-anthracite px-7 py-4 text-sm font-semibold text-ivory shadow-soft transition hover:-translate-y-0.5 hover:bg-anthracite/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "submitting"
            ? "Invio in corso..."
            : isQuote
              ? "Invia richiesta"
              : "Invia messaggio"}
          <Send aria-hidden="true" size={16} />
        </button>
      </div>

      {status === "success" ? (
        <p
          className="rounded-sm bg-sage/22 px-4 py-3 text-sm font-semibold text-anthracite"
          role="status"
          aria-live="polite"
        >
          {hasUnsentReferences
            ? "Richiesta inviata. Le immagini selezionate non sono state allegate: condividile con Serena su WhatsApp."
            : "Richiesta inviata correttamente. Serena ti rispondera appena possibile."}
        </p>
      ) : null}

      {status === "error" ? (
        <p
          className="rounded-sm border border-blush bg-blush/25 px-4 py-3 text-sm font-semibold text-anthracite"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
