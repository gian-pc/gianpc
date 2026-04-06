"use client";

import { CostControlCard } from "./CostControlCard";
import { useLanguage } from "@/features/i18n/LanguageProvider";

export function Hero() {
  const { language } = useLanguage();
  const copy =
    language === "es"
      ? {
          titleLine: "Software",
          titleAccent: "Developer",
          description: "Construyo software que resuelve problemas reales, integrando Inteligencia Artificial en arquitecturas modernas y escalables.",
          ctaProjects: "Ver proyectos",
          ctaCv: "Descargar CV",
          tags: ["Backend", "Microservices", "CI/CD", "Cloud", "IA"],
        }
      : {
          titleLine: "Software",
          titleAccent: "Developer",
          description: "I build software that solves real problems, integrating Artificial Intelligence into modern and scalable architectures.",
          ctaProjects: "View projects",
          ctaCv: "Download CV",
          tags: ["Backend", "Microservices", "CI/CD", "Cloud", "AI"],
        };

  return (
    <section id="inicio" className="hero-section">
      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="hero-title-line">{copy.titleLine}</span>
            <span className="hero-title-accent">{copy.titleAccent}</span>
          </h1>

          <div className="hero-kickers" aria-label={language === "es" ? "Especialidades" : "Specialties"}>
            {copy.tags.map((tag) => (
              <span key={tag} className="hero-kicker">
                {tag}
              </span>
            ))}
          </div>

          <p className="hero-description">{copy.description}</p>

          <div className="hero-actions">
            <a href="#projects" className="hero-btn hero-btn-primary">
              {copy.ctaProjects}
            </a>
            <a href="/CV_GianPaucarCortez.pdf" download className="hero-btn hero-btn-secondary">
              {copy.ctaCv}
            </a>
          </div>

        </div>

        <div className="hero-terminal-wrap">
          <div className="hero-terminal-spot hero-terminal-spot-left" />
          <div className="hero-terminal-spot hero-terminal-spot-right" />
          <CostControlCard />
        </div>
      </div>
    </section>
  );
}
