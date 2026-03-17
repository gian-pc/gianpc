import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

function resolveAllowOrigin(requestOrigin) {
  if (!requestOrigin) return ALLOWED_ORIGINS[0] || "*";
  if (!ALLOWED_ORIGINS.length) return "*";
  return ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGINS[0];
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": resolveAllowOrigin(origin),
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "300",
    "Content-Type": "application/json",
  };
}

function json(statusCode, body, origin) {
  return {
    statusCode,
    headers: corsHeaders(origin),
    body: JSON.stringify(body),
  };
}

function isValidEmail(value) {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function sanitize(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export async function handler(event) {
  const origin = event?.headers?.origin || event?.headers?.Origin || "";
  const method = event?.requestContext?.http?.method || event?.httpMethod || "POST";

  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: "",
    };
  }

  if (!FROM_EMAIL || !TO_EMAIL) {
    return json(
      500,
      { ok: false, message: "Server contact config is missing (FROM_EMAIL/TO_EMAIL)." },
      origin,
    );
  }

  let payload;
  try {
    payload = event?.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { ok: false, message: "Invalid JSON payload." }, origin);
  }

  const name = sanitize(payload?.name, 120);
  const email = sanitize(payload?.email, 160);
  const message = sanitize(payload?.message, 3000);
  const website = sanitize(payload?.website, 200); // honeypot

  // Bot submission: return success-like response to avoid signal.
  if (website) {
    return json(200, { ok: true }, origin);
  }

  if (!name || !isValidEmail(email) || !message) {
    return json(400, { ok: false, message: "Invalid form fields." }, origin);
  }

  const now = new Date().toISOString();
  const subject = `[Portfolio] Nuevo mensaje de ${name}`;

  const textBody = [
    "Nuevo mensaje desde gianpc.com",
    "",
    `Fecha UTC: ${now}`,
    `Nombre: ${name}`,
    `Email: ${email}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  const htmlBody = `
    <h2>Nuevo mensaje desde gianpc.com</h2>
    <p><strong>Fecha UTC:</strong> ${now}</p>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${message}</pre>
  `;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [TO_EMAIL] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Charset: "UTF-8", Data: subject },
          Body: {
            Text: { Charset: "UTF-8", Data: textBody },
            Html: { Charset: "UTF-8", Data: htmlBody },
          },
        },
      }),
    );

    return json(200, { ok: true }, origin);
  } catch (error) {
    console.error("SES send failed", error);
    return json(500, { ok: false, message: "Message delivery failed." }, origin);
  }
}
