"use client";

import { CostControlCard } from "./CostControlCard";
import { useLanguage } from "@/features/i18n/LanguageProvider";

export function Hero() {
  const { language } = useLanguage();
  const copy =
    language === "es"
      ? {
          kicker: "Backend Developer",
          titleLine: "Backend",
          titleAccent: "Developer",
          description:
            "Desarrollo APIs robustas y sistemas backend escalables utilizando Java, Spring Boot y arquitectura moderna orientada a productos.",
          ctaProjects: "Ver proyectos",
          ctaCv: "Descargar CV",
        }
      : {
          kicker: "Backend Developer",
          titleLine: "Backend",
          titleAccent: "Developer",
          description:
            "I build robust APIs and scalable backend systems with Java, Spring Boot, and modern product-oriented architecture.",
          ctaProjects: "View projects",
          ctaCv: "Download CV",
        };

  return (
    <section id="inicio" className="hero-section">
      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <span className="hero-kicker">{copy.kicker}</span>

          <h1 className="hero-title">
            <span className="hero-title-line">{copy.titleLine}</span>
            <span className="hero-title-accent">{copy.titleAccent}</span>
          </h1>

          <p className="hero-description">{copy.description}</p>

          <div className="hero-actions">
            <a href="#projects" className="hero-btn hero-btn-primary">
              {copy.ctaProjects}
            </a>
            <a href="/cv/CV_GianPaucar_JavaBackend.pdf" download className="hero-btn hero-btn-secondary">
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
