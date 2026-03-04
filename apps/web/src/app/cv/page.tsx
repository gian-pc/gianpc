import React from "react";

const skills = {
  "Backend": ["Java 17", "Spring Boot", "Spring MVC", "Spring Security", "REST APIs", "Microservices"],
  "Cloud": ["AWS Lambda", "API Gateway", "S3", "Docker", "CI/CD"],
  "Data": ["PostgreSQL", "MySQL", "JPA / Hibernate"],
  "Tools": ["Git", "GitHub Actions", "Maven", "Linux"],
};

const experience = [
  {
    role: "Cloud & Backend Engineer",
    company: "RetainAI",
    period: "2025 — Actualidad",
    bullets: [
      "Arquitectura serverless con SST v3 sobre AWS (Lambda + API Gateway + SES).",
      "APIs de inferencia ML para predicción de churn de clientes.",
      "Pipelines event-driven con EventBridge y automatización con IaC.",
      "Finalista Oracle Hackathon — sistema con visualización geográfica en tiempo real.",
    ],
  },
  {
    role: "Especialista en Geomática y Datos Espaciales",
    company: "Sector Minero / GIS",
    period: "2016 — 2024",
    bullets: [
      "8+ años gestionando bases de datos geoespaciales y análisis de datos geológicos.",
      "Automatización de flujos de datos con Python y scripting para reportes técnicos.",
      "Trabajo con sistemas de información geográfica a escala industrial.",
    ],
  },
];

export default function CvPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header centrado */}
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          marginBottom: 48,
        }}>
          {/* Texto izquierda */}
          <div style={{ flex: "1 1 300px" }}>
            <span className="mono" style={{
              fontSize: 11, color: "var(--accent)",
              letterSpacing: 2, textTransform: "uppercase",
              display: "block", marginBottom: 12,
            }}>
              gianpc.com/cv
            </span>

            <h1 style={{
              fontSize: 28, fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: -0.5, marginBottom: 14,
            }}>
              Gian Carlos Paucar Cortez
            </h1>

            {/* Headline tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {["Java", "Spring Boot", "AWS Serverless", "Next.js", "Python"].map((tech) => (
                <span key={tech} className="mono" style={{
                  fontSize: 11, padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(246,38,77,0.08)",
                  border: "1px solid rgba(246,38,77,0.2)",
                  color: "var(--accent)", fontWeight: 700, letterSpacing: 0.5,
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Contacto */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "github.com/gian-pc", href: "https://github.com/gian-pc" },
                { label: "linkedin.com/in/gianpc", href: "https://linkedin.com/in/gianpc" },
                { label: "Lima, Perú", href: null },
              ].map((item) =>
                item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="mono" style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>
                    {item.label}
                  </a>
                ) : (
                  <span key={item.label} className="mono"
                    style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Foto derecha */}
          <img
            src="/avatar.png"
            alt="Gian Carlos Paucar Cortez"
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Perfil */}
        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Perfil</SectionTitle>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)" }}>
            Backend Engineer con foco en arquitecturas serverless sobre AWS y sistemas
            Java/Spring Boot de alta disponibilidad. Combino 8+ años de experiencia
            profesional en análisis de datos con formación intensiva en ingeniería de
            software moderna. Construyo APIs limpias, observables y desplegadas con IaC.
          </p>
        </div>

        {/* Experiencia */}
        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Experiencia</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {experience.map((exp) => (
              <div
                key={exp.role}
                style={{
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  padding: "20px 24px",
                }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: 8,
                  marginBottom: 4,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                    {exp.role}
                  </h3>
                  <span className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{
                  fontSize: 12, fontWeight: 600,
                  color: "var(--accent)", marginBottom: 12,
                }}>
                  {exp.company}
                </p>
                <ul style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {exp.bullets.map((b) => (
                    <li key={b} style={{
                      fontSize: 13, lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "baseline" }}>
                <span className="mono" style={{
                  fontSize: 11, color: "var(--accent)",
                  fontWeight: 700, letterSpacing: 1,
                  textTransform: "uppercase", minWidth: 80,
                  flexShrink: 0,
                }}>
                  {category}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="mono"
                      style={{
                        fontSize: 12, padding: "4px 10px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        background: "var(--surface)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formación */}
        <div style={{ marginBottom: 48 }}>
          <SectionTitle>Formación</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "Java Backend Developer — Digital House", detail: "1568h · Globant / Mercado Libre · 2024" },
              { title: "Spring Boot & Microservices — Joedayz", detail: "2024" },
              { title: "AWS Cloud Practitioner prep — ATL Academy", detail: "2024" },
              { title: "Técnico en Geomática — TECSUP", detail: "Lima, Perú" },
            ].map((item) => (
              <div key={item.title} style={{
                display: "flex", justifyContent: "space-between",
                flexWrap: "wrap", gap: 4,
                paddingBottom: 12,
                borderBottom: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>
                  {item.title}
                </span>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="mailto:gian@gianpc.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700, fontSize: 13,
              boxShadow: "0 8px 24px rgba(246,38,77,0.3)",
            }}
          >
            Contactar → gian@gianpc.com
          </a>
        </div>

      </div>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{
        fontSize: 18, fontWeight: 800,
        color: "var(--text-primary)", letterSpacing: -0.3,
      }}>
        {children}
      </h2>
      <div style={{
        width: 24, height: 3,
        background: "var(--accent)",
        borderRadius: 99, marginTop: 6,
      }} />
    </div>
  );
}