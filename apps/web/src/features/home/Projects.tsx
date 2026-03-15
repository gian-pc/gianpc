"use client";

import Image from "next/image";
import { useTheme } from "@/features/theme/ThemeProvider";
import { Language } from "@/features/i18n/LanguageProvider";
import { useLanguage } from "@/features/i18n/LanguageProvider";

type Project = {
  title: Record<Language, string>;
  description: Record<Language, string>;
  preview: string;
  tech: string[];
  href: string;
  media?: {
    light: string;
    dark: string;
  };
  fallbackLabel?: string;
};

const projects: Project[] = [
  {
    title: {
      es: "RetainAI Platform",
      en: "RetainAI Platform",
    },
    description: {
      es: "Plataforma para predicción de churn con backend en Java, servicio ML y visualización geográfica para decisiones comerciales.",
      en: "Churn prediction platform with Java backend, ML service, and geospatial insights for business decisions.",
    },
    preview: "POST /api/v1/churn/predict",
    tech: ["Java", "Spring Boot", "FastAPI", "PostgreSQL", "Mapbox", "ElevenLabs", "Gemini"],
    href: "https://github.com/gian-pc/retainai",
    media: {
      light: "/projects/retainai-light.png",
      dark: "/projects/retainai-dark.png",
    },
  },
  {
    title: {
      es: "Payment Microservice",
      en: "Payment Microservice",
    },
    description: {
      es: "Microservicio desacoplado de pagos con eventos de confirmación, trazabilidad y contratos API orientados a integración empresarial.",
      en: "Decoupled payment microservice with confirmation events, traceability, and API contracts for enterprise integrations.",
    },
    preview: "event -> payment.confirmed",
    tech: ["Spring Boot", "Docker", "AWS"],
    href: "https://github.com/gian-pc/opsbackend-java",
    media: {
      light: "/projects/opsbackend.png",
      dark: "/projects/opsbackend.png",
    },
  },
];

export function Projects() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <section id="projects" className="projects-section">
      <div className="container-shell">
        <div className="projects-header">
          <div>
            <p className="projects-kicker">{language === "es" ? "Proyectos" : "Projects"}</p>
            <h2 className="projects-title">Backend Projects</h2>
          </div>
          <span className="projects-meta">
            {language === "es" ? "APIs · Microservicios · Cloud" : "APIs · Microservices · Cloud"}
          </span>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.href + project.preview} className="project-card">
              <div className="project-media">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-media-link"
                  aria-label={
                    language === "es"
                      ? `Abrir ${project.title[language]} en GitHub`
                      : `Open ${project.title[language]} on GitHub`
                  }
                  title={language === "es" ? "Ver repositorio" : "View repository"}
                >
                  {project.media ? (
                    <Image
                      src={theme === "dark" ? project.media.dark : project.media.light}
                      alt={project.title[language]}
                      fill
                      sizes="(max-width: 960px) 100vw, 50vw"
                      className="project-image"
                    />
                  ) : (
                    <div className="project-fallback">{project.fallbackLabel}</div>
                  )}
                  <span className="project-media-cta">
                    {language === "es" ? "Ver repositorio" : "View repository"} ↗
                  </span>
                </a>
              </div>

              <div className="project-body">
                <div className="project-top-row">
                  <div className="project-tags-inline">
                    {project.tech.map((tech) => (
                      <span key={tech} className="project-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-title-row">
                  <h3 className="project-title">{project.title[language]}</h3>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-icon"
                    aria-label={
                      language === "es"
                        ? `Ver ${project.title[language]} en GitHub`
                        : `View ${project.title[language]} on GitHub`
                    }
                    title="GitHub"
                  >
                    <GitHubIcon />
                  </a>
                </div>
                <p className="project-description">{project.description[language]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-1.03-.02-1.87-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.91-.62.07-.61.07-.61 1 .07 1.54 1.05 1.54 1.05.89 1.58 2.34 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.38-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.89c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.54 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.31.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.24C22 6.59 17.52 2 12 2" />
    </svg>
  );
}
