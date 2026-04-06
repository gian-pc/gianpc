"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/features/i18n/LanguageProvider";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
  icon: ReactNode;
};

export function Footer() {
  const year = new Date().getFullYear();
  const { language } = useLanguage();

  const copy =
    language === "es"
      ? {
          title: "Backend, cloud y sistemas pensados para producción.",
          description:
            "Portfolio personal con foco en APIs, arquitectura moderna y productos listos para escalar.",
          navTitle: "Explorar",
          nav: [
            { href: "/#inicio", label: "Inicio" },
            { href: "/#projects", label: "Proyectos" },
            { href: "/#contact", label: "Contacto" },
          ],
          actionsTitle: "Conectar",
          availability: "Disponible para conversar sobre backend, cloud y oportunidades remotas.",
          location: "Lima, Peru",
          rights: `© ${year} gianpc.com`,
        }
      : {
          title: "Backend, cloud, and systems built for production.",
          description:
            "Personal portfolio focused on APIs, modern architecture, and products ready to scale.",
          navTitle: "Explore",
          nav: [
            { href: "/#inicio", label: "Home" },
            { href: "/#projects", label: "Projects" },
            { href: "/#contact", label: "Contact" },
          ],
          actionsTitle: "Connect",
          availability: "Open to conversations about backend, cloud, and remote opportunities.",
          location: "Lima, Peru",
          rights: `© ${year} gianpc.com`,
        };

  const actions: FooterLink[] = [
    {
      href: "https://www.linkedin.com/in/gian-pc",
      label: "LinkedIn",
      external: true,
      ariaLabel: "LinkedIn",
      icon: <LinkedInIcon />,
    },
    {
      href: "https://github.com/gian-pc",
      label: "GitHub",
      external: true,
      ariaLabel: "GitHub",
      icon: <GitHubIcon />,
    },
    {
      href: "mailto:gpaucarcortez@gmail.com",
      label: language === "es" ? "Correo" : "Email",
      ariaLabel: language === "es" ? "Enviar correo" : "Send email",
      icon: <MailIcon />,
    },
    {
      href: "/CV_GianPaucarCortez.pdf",
      label: "CV",
      download: true,
      ariaLabel: language === "es" ? "Descargar CV" : "Download CV",
      icon: <DownloadIcon />,
    },
  ];

  return (
    <footer className="footer-shell">
      <div className="container-shell">
        <div className="footer-panel">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2 className="footer-title">{copy.title}</h2>
              <p className="footer-description">{copy.description}</p>
            </div>

            <div className="footer-column">
              <p className="footer-column-title">{copy.navTitle}</p>
              <nav className="footer-nav" aria-label={copy.navTitle}>
                {copy.nav.map((item) => (
                  <Link key={item.href} href={item.href} className="footer-nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-column">
              <p className="footer-column-title">{copy.actionsTitle}</p>
              <p className="footer-availability">{copy.availability}</p>
              <div className="footer-icons" aria-label={copy.actionsTitle}>
                {actions.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="footer-icon-link"
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    download={item.download}
                    aria-label={item.ariaLabel ?? item.label}
                    title={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-meta">
            <span className="footer-meta-item mono">{copy.rights}</span>
            <span className="footer-meta-separator" aria-hidden="true" />
            <span className="footer-meta-item">{copy.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-1.03-.02-1.87-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.91-.62.07-.61.07-.61 1 .07 1.54 1.05 1.54 1.05.89 1.58 2.34 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.38-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.89c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.54 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.31.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.24C22 6.59 17.52 2 12 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V19h3.38zM5.24 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94M20.44 12.58c0-3.16-1.69-4.64-3.95-4.64-1.82 0-2.64 1-3.1 1.71V8.5H10V19h3.38v-5.2c0-1.37.26-2.7 1.96-2.7 1.68 0 1.7 1.57 1.7 2.8V19h3.4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
