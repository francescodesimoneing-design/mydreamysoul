import { NextResponse } from "next/server";
import { Resend } from "resend";

type RequestType = "contact" | "quote";

type ContactRequest = {
  requestType: RequestType;
  name: string;
  email: string;
  subject: string;
  message: string;
};

const fieldLimits = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function buildEmailText(request: ContactRequest) {
  const subjectLabel =
    request.requestType === "quote" ? "Tipo di creazione" : "Oggetto";

  return [
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
  ].join("\n");
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Formato della richiesta non valido." },
      { status: 415 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Richiesta non valida." },
      { status: 400 },
    );
  }

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
      text: buildEmailText(contactRequest),
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
