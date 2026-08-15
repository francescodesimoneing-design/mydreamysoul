import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getQuoteAttachmentError } from "@/lib/contact-attachments";

export const runtime = "nodejs";

type RequestType = "contact" | "quote";

type ContactRequest = {
  requestType: RequestType;
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ParsedRequestBody = {
  payload: unknown;
  files: File[];
};

type EmailAttachment = {
  content: Buffer;
  filename: string;
  contentType: string;
};

const fieldLimits = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxRequestBodySize = 4_400_000;

function getTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : null;
}

function parseRequest(payload: unknown): ContactRequest | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const requestType = record.requestType;
  const name = getTrimmedString(record.name);
  const email = getTrimmedString(record.email);
  const subject = getTrimmedString(record.subject);
  const message = getTrimmedString(record.message);

  if (
    (requestType !== "contact" && requestType !== "quote") ||
    !name ||
    !email ||
    !subject ||
    !message ||
    name.length < 2 ||
    name.length > fieldLimits.name ||
    email.length > fieldLimits.email ||
    !emailPattern.test(email) ||
    subject.length < 2 ||
    subject.length > fieldLimits.subject ||
    message.length < 2 ||
    message.length > fieldLimits.message
  ) {
    return null;
  }

  return {
    requestType,
    name,
    email,
    subject,
    message,
  };
}

function buildEmailText(request: ContactRequest, attachmentCount: number) {
  const subjectLabel =
    request.requestType === "quote" ? "Tipo di creazione" : "Oggetto";

  const lines = [
    request.requestType === "quote"
      ? "Nuova richiesta di sartoria su misura dal sito MyDreamySoul."
      : "Nuovo contatto dal sito MyDreamySoul.",
    "",
    `Nome: ${request.name}`,
    `Email: ${request.email}`,
    `${subjectLabel}: ${request.subject}`,
    "",
    "Messaggio:",
    request.message,
  ];

  if (request.requestType === "quote") {
    lines.push(
      "",
      attachmentCount
        ? `Immagini di riferimento allegate: ${attachmentCount}.`
        : "Immagini di riferimento allegate: nessuna.",
    );
  }

  return lines.join("\n");
}

async function readRequestBody(
  request: Request,
  contentType: string,
): Promise<ParsedRequestBody> {
  if (contentType.includes("application/json")) {
    return {
      payload: await request.json(),
      files: [],
    };
  }

  const formData = await request.formData();
  const referenceEntries = formData.getAll("references");

  if (referenceEntries.some((entry) => !(entry instanceof File))) {
    throw new Error("Invalid attachment entry");
  }

  return {
    payload: {
      requestType: formData.get("requestType"),
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
    },
    files: referenceEntries as File[],
  };
}

function hasPrefix(bytes: Uint8Array, prefix: number[]) {
  return prefix.every((byte, index) => bytes[index] === byte);
}

function hasValidImageSignature(bytes: Uint8Array, mimeType: string) {
  if (mimeType === "image/jpeg") {
    return hasPrefix(bytes, [0xff, 0xd8, 0xff]);
  }

  if (mimeType === "image/png") {
    return hasPrefix(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }

  if (mimeType === "image/webp") {
    return (
      hasPrefix(bytes, [0x52, 0x49, 0x46, 0x46]) &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }

  return false;
}

function sanitizeFilename(filename: string) {
  const basename = filename.split(/[\\/]/).pop() || "immagine";
  const sanitized = basename.replace(/[\u0000-\u001f\u007f]/g, "").trim();

  return (sanitized || "immagine").slice(0, 120);
}

async function prepareAttachments(files: File[]) {
  const attachments: EmailAttachment[] = [];

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());

    if (!hasValidImageSignature(bytes, file.type)) {
      return null;
    }

    attachments.push({
      content: Buffer.from(bytes),
      filename: sanitizeFilename(file.name),
      contentType: file.type,
    });
  }

  return attachments;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const isMultipart = contentType.includes("multipart/form-data");

  if (!isJson && !isMultipart) {
    return NextResponse.json(
      { ok: false, message: "Formato della richiesta non valido." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(contentLength) && contentLength > maxRequestBodySize) {
    return NextResponse.json(
      { ok: false, message: "Le immagini selezionate sono troppo pesanti." },
      { status: 413 },
    );
  }

  let requestBody: ParsedRequestBody;

  try {
    requestBody = await readRequestBody(request, contentType);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Richiesta non valida." },
      { status: 400 },
    );
  }

  const { payload, files } = requestBody;
  const website =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? getTrimmedString((payload as Record<string, unknown>).website)
      : null;

  if (website === null || website) {
    return NextResponse.json(
      { ok: false, message: "Richiesta non valida." },
      { status: 400 },
    );
  }

  const contactRequest = parseRequest(payload);

  if (!contactRequest) {
    return NextResponse.json(
      { ok: false, message: "Controlla i campi e riprova." },
      { status: 400 },
    );
  }

  if (contactRequest.requestType !== "quote" && files.length) {
    return NextResponse.json(
      { ok: false, message: "Gli allegati sono disponibili solo per i preventivi." },
      { status: 400 },
    );
  }

  const attachmentError = getQuoteAttachmentError(files);

  if (attachmentError) {
    return NextResponse.json(
      { ok: false, message: attachmentError },
      { status: 400 },
    );
  }

  const attachments = await prepareAttachments(files);

  if (!attachments) {
    return NextResponse.json(
      {
        ok: false,
        message: "Una delle immagini non e un file JPEG, PNG o WebP valido.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, message: "Servizio email temporaneamente non disponibile." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const emailSubject =
    contactRequest.requestType === "quote"
      ? "Nuova richiesta sartoria su misura - MyDreamySoul"
      : "Nuovo contatto dal sito MyDreamySoul";

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: contactRequest.email,
      subject: emailSubject,
      text: buildEmailText(contactRequest, attachments.length),
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("Resend ha rifiutato una richiesta email dal form contatti.");

      return NextResponse.json(
        { ok: false, message: "Invio non riuscito. Riprova piu tardi." },
        { status: 502 },
      );
    }
  } catch {
    console.error("Errore inatteso durante l'invio del form contatti.");

    return NextResponse.json(
      { ok: false, message: "Invio non riuscito. Riprova piu tardi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Richiesta inviata." });
}
