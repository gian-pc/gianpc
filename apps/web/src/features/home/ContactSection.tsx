"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/features/i18n/LanguageProvider";
import { ContactWorldMap } from "./ContactWorldMap";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "";

export function ContactSection() {
  const { language } = useLanguage();
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const copy =
    language === "es"
      ? {
          kicker: "Contacto",
          title: "Hablemos",
          subtitle: "Cuéntame en qué proyecto estás trabajando y te respondo por correo.",
          formTitle: "Envíame un mensaje",
          name: "Nombre",
          email: "Correo",
          message: "Mensaje",
          namePlaceholder: "Tu nombre",
          emailPlaceholder: "tu@email.com",
          messagePlaceholder: "Cuéntame brevemente qué necesitas",
          cta: "Enviar mensaje",
          ctaSending: "Enviando...",
          note: "Respuesta estimada: dentro de 24 horas.",
          success: "Mensaje enviado. Te responderé por correo.",
          error: "No se pudo enviar. Intenta nuevamente en unos minutos.",
          invalid: "Completa nombre, correo válido y mensaje.",
          missingConfig: "Falta configurar el endpoint de contacto.",
          mapTitle: "Ubicación base",
          mapSubtitle: "Lima, Perú · trabajo remoto",
          mapTimezone: "UTC-5 · Lima",
        }
      : {
          kicker: "Contact",
          title: "Let's work together",
          subtitle: "Tell me about your project and I will reply by email.",
          formTitle: "Send me a message",
          name: "Name",
          email: "Email",
          message: "Message",
          namePlaceholder: "Your name",
          emailPlaceholder: "you@email.com",
          messagePlaceholder: "Tell me briefly what you need",
          cta: "Send message",
          ctaSending: "Sending...",
          note: "Estimated response time: within 24 hours.",
          success: "Message sent. I will reply by email.",
          error: "Message failed. Please try again in a few minutes.",
          invalid: "Please provide name, valid email and message.",
          missingConfig: "Contact endpoint is not configured.",
          mapTitle: "Base location",
          mapSubtitle: "Lima, Peru · remote-friendly",
          mapTimezone: "UTC-5 · Lima",
        };

  const noteText = useMemo(() => {
    if (status === "success") return statusMessage || copy.success;
    if (status === "error") return statusMessage || copy.error;
    return copy.note;
  }, [copy.error, copy.note, copy.success, status, statusMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setStatusMessage(copy.invalid);
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setStatus("error");
      setStatusMessage(copy.missingConfig);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website: form.website,
        }),
      });

      if (!response.ok) {
        throw new Error("Contact API returned non-success status");
      }

      setStatus("success");
      setStatusMessage(copy.success);
      setForm({
        name: "",
        email: "",
        message: "",
        website: "",
      });
    } catch {
      setStatus("error");
      setStatusMessage(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container-shell">
        <div className="contact-header">
          <p className="contact-kicker">{copy.kicker}</p>
          <h2 className="contact-title">{copy.title}</h2>
          <p className="contact-subtitle">{copy.subtitle}</p>
        </div>

        <div className="contact-grid">
          <article className="contact-panel">
            <h3 className="contact-panel-title">{copy.formTitle}</h3>

            <form className="contact-form" aria-label={copy.formTitle} onSubmit={handleSubmit}>
              <label className="contact-label contact-honeypot" aria-hidden="true">
                <span>Website</span>
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.website}
                  onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                />
              </label>

              <label className="contact-label">
                <span>{copy.name}</span>
                <input
                  type="text"
                  name="name"
                  placeholder={copy.namePlaceholder}
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>

              <label className="contact-label">
                <span>{copy.email}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={copy.emailPlaceholder}
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>

              <label className="contact-label">
                <span>{copy.message}</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder={copy.messagePlaceholder}
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                />
              </label>

              <div className="contact-actions">
                <button type="submit" className="contact-submit" disabled={isSubmitting}>
                  {isSubmitting ? copy.ctaSending : copy.cta}
                </button>
                <p className={`contact-status contact-status-${status}`}>{noteText}</p>
              </div>
            </form>
          </article>

          <article className="contact-panel">
            <div className="contact-map-head">
              <h3 className="contact-panel-title">{copy.mapTitle}</h3>
              <p>{copy.mapSubtitle}</p>
            </div>

            <div className="contact-map-wrap">
              <ContactWorldMap timezoneLabel={copy.mapTimezone} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
