"use client";

import { useLanguage } from "@/features/i18n/LanguageProvider";
import { ContactWorldMap } from "./ContactWorldMap";

export function ContactSection() {
  const { language } = useLanguage();

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
          note: "Formulario UI (siguiente paso: conectar Lambda + SES)",
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
          note: "UI only for now (next: connect Lambda + SES)",
          mapTitle: "Base location",
          mapSubtitle: "Lima, Peru · remote-friendly",
          mapTimezone: "UTC-5 · Lima",
        };

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

            <form className="contact-form" aria-label={copy.formTitle}>
              <label className="contact-label">
                <span>{copy.name}</span>
                <input type="text" name="name" placeholder={copy.namePlaceholder} autoComplete="name" />
              </label>

              <label className="contact-label">
                <span>{copy.email}</span>
                <input type="email" name="email" placeholder={copy.emailPlaceholder} autoComplete="email" />
              </label>

              <label className="contact-label">
                <span>{copy.message}</span>
                <textarea name="message" rows={6} placeholder={copy.messagePlaceholder} />
              </label>

              <div className="contact-actions">
                <button type="button" className="contact-submit">
                  {copy.cta}
                </button>
                <p>{copy.note}</p>
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
