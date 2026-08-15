"use client";

import { Send, Upload, X } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";

import {
  formatAttachmentSize,
  getQuoteAttachmentError,
  quoteAttachmentAccept,
  quoteAttachmentLimits,
} from "@/lib/contact-attachments";
import {
  contactReasonOptions,
  type ContactReason,
} from "@/lib/contact-reasons";

type ContactFormProps = {
  variant?: "contact" | "quote";
  initialReason?: ContactReason;
  productSlug?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const errorMessage =
  "Non siamo riusciti a inviare la richiesta. Riprova oppure contattaci su WhatsApp.";

export function ContactForm({
  variant = "contact",
  initialReason,
  productSlug,
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState(errorMessage);
  const [sentAttachmentCount, setSentAttachmentCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isQuote = variant === "quote";
  const isSubmitting = status === "submitting";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);
    const validationError = getQuoteAttachmentError(files);

    if (validationError) {
      event.currentTarget.value = "";
      setSelectedFiles([]);
      setFileError(validationError);
      return;
    }

    setSelectedFiles(files);
    setFileError(null);
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((files) =>
      files.filter((_, index) => index !== indexToRemove),
    );
    setFileError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (isQuote) {
      const validationError = getQuoteAttachmentError(selectedFiles);

      if (validationError) {
        setFileError(validationError);
        return;
      }

      formData.set("requestType", "quote");
      formData.delete("references");
      selectedFiles.forEach((file) => formData.append("references", file));
    }

    setStatus("submitting");
    setSubmissionError(errorMessage);
    setSentAttachmentCount(0);

    try {
      const response = await fetch(
        "/api/contact",
        isQuote
          ? {
              method: "POST",
              body: formData,
            }
          : {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                requestType: "contact",
                name: formData.get("name"),
                email: formData.get("email"),
                reason: formData.get("reason"),
                subject: formData.get("subject"),
                message: formData.get("message"),
                productSlug: formData.get("productSlug"),
                website: formData.get("website"),
              }),
            },
      );

      const responseBody = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setSubmissionError(
          response.status >= 400 &&
            response.status < 500 &&
            responseBody?.message
            ? responseBody.message
            : errorMessage,
        );
        setStatus("error");
        return;
      }

      setSentAttachmentCount(selectedFiles.length);
      form.reset();
      setSelectedFiles([]);
      setFileError(null);
      setStatus("success");
    } catch {
      setSubmissionError(errorMessage);
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

      {!isQuote && productSlug ? (
        <input name="productSlug" type="hidden" value={productSlug} />
      ) : null}

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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/20"
          />
        </label>
      </div>

      {!isQuote ? (
        <label className="grid gap-2 text-sm font-semibold text-anthracite">
          Motivo della richiesta
          <select
            required
            name="reason"
            defaultValue={initialReason ?? ""}
            disabled={isSubmitting}
            className="rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/20"
          >
            <option value="" disabled>
              Seleziona un motivo
            </option>
            {contactReasonOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-anthracite">
        {isQuote ? "Tipo di creazione" : "Oggetto"}
        <input
          required
          name="subject"
          type="text"
          minLength={2}
          maxLength={150}
          disabled={isSubmitting}
          placeholder={isQuote ? "Gonna, abito, fiocco nascita..." : "Come posso aiutarti?"}
          className="rounded-sm border border-anthracite/14 bg-ivory px-4 py-3 text-base font-normal text-anthracite outline-none transition placeholder:text-anthracite/36 focus:border-sage focus:ring-4 focus:ring-sage/20"
        />
      </label>

      {isQuote ? (
        <div className="grid gap-2 text-sm font-semibold text-anthracite">
          <span>Immagini di riferimento (facoltative)</span>
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-anthracite/24 bg-ivory px-4 py-6 text-center text-sm font-normal text-anthracite/58 transition hover:border-sage hover:bg-sage/10">
            <Upload aria-hidden="true" size={22} className="mb-2 text-anthracite" />
            Scegli immagini, moodboard o dettagli utili
            <span className="mt-1 text-xs text-anthracite/48">
              JPEG, PNG o WebP. Massimo {quoteAttachmentLimits.maxFiles} immagini
              da 2 MB ciascuna.
            </span>
            <input
              ref={fileInputRef}
              name="references"
              type="file"
              multiple
              accept={quoteAttachmentAccept}
              disabled={isSubmitting}
              onChange={handleFileChange}
              aria-describedby="reference-files-help"
              className="sr-only"
            />
          </label>
          <span id="reference-files-help" className="sr-only">
            Puoi allegare fino a due immagini JPEG, PNG o WebP, massimo 2 MB per
            file.
          </span>
          {selectedFiles.length ? (
            <ul className="mt-2 grid gap-2" aria-label="Immagini selezionate">
              {selectedFiles.map((file, index) => (
                <li
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="flex min-w-0 items-center gap-3 rounded-sm border border-anthracite/12 bg-ivory px-4 py-3 text-sm font-normal"
                >
                  <span className="min-w-0 flex-1 truncate text-anthracite">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-xs text-anthracite/50">
                    {formatAttachmentSize(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={isSubmitting}
                    title={`Rimuovi ${file.name}`}
                    aria-label={`Rimuovi ${file.name}`}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-anthracite/60 transition hover:bg-blush/40 hover:text-anthracite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:cursor-wait disabled:opacity-50"
                  >
                    <X aria-hidden="true" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {fileError ? (
            <p className="text-sm font-semibold text-anthracite" role="alert">
              {fileError}
            </p>
          ) : null}
        </div>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-anthracite">
        Note
        <textarea
          required
          name="message"
          rows={6}
          minLength={2}
          maxLength={5000}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          {sentAttachmentCount
            ? "Richiesta inviata correttamente. Le immagini sono state allegate per Serena."
            : "Richiesta inviata correttamente. Serena ti risponderà appena possibile."}
        </p>
      ) : null}

      {status === "error" ? (
        <p
          className="rounded-sm border border-blush bg-blush/25 px-4 py-3 text-sm font-semibold text-anthracite"
          role="alert"
          aria-live="assertive"
        >
          {submissionError}
        </p>
      ) : null}
    </form>
  );
}
