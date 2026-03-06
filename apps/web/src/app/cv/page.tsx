import type { ReactNode } from "react";

const skills = {
  "Backend Java": [
    "Java",
    "Spring Boot",
    "Spring Cloud",
    "Microservicios",
    "REST APIs",
    "Maven",
    "Spring Security",
  ],
  "Backend Python": ["Python", "FastAPI", "REST APIs", "Pandas", "ETL"],
  "IA e Integracion": ["GitHub Copilot", "OpenAI API", "LangChain", "RAG"],
  "Bases de Datos": ["MySQL", "PostgreSQL", "SQL Server"],
  "DevOps y Herramientas": ["Docker", "Git", "GitHub Actions", "Linux/Bash", "AWS (basico)"],
  Metodologias: ["Scrum", "Dailys", "Trabajo colaborativo en equipos agiles"],
};

const experience = [
  {
    role: "Backend Developer - Java & AI",
    company: "Hackathon Oracle ONE / No Country - Proyecto RetainAI (ChurnInsight)",
    period: "2026",
    bullets: [
      "Desarrollo de arquitectura de microservicios con backend en Java (Spring Boot) y APIs REST.",
      "Implementacion de seguridad con Spring Security y persistencia con MySQL HeatWave.",
      "Integracion de servicio de prediccion en Python (FastAPI) consumido desde backend Java via APIs REST.",
      "Integracion de APIs de IA para generar insights automatizados y asistente conversacional.",
      "Uso de herramientas de asistencia basadas en IA para apoyo en desarrollo y revision de codigo.",
      "Coordinacion tecnica de equipo de 8 personas bajo metodologia Scrum.",
    ],
  },
  {
    role: "Analista de Datos Geologicos",
    company: "Compania Minera Lincuna S.A.",
    period: "2018 - 2020",
    bullets: [
      "Automatizacion de limpieza, validacion y reporte de datos mediante scripts en Python.",
      "Gestion y analisis de datos de exploracion asegurando trazabilidad y calidad de informacion.",
      "Desarrollo de dashboards en Power BI integrados con consultas SQL.",
    ],
  },
  {
    role: "Analista de Datos GIS / Especialista en SIG",
    company: "SENAMHI (Servicio Nacional de Meteorologia e Hidrologia del Peru)",
    period: "2015 - 2017",
    bullets: [
      "Automatizacion de procesos de analisis de datos utilizando Python.",
      "Procesamiento y analisis de datos geoespaciales para cartografia tematica.",
      "Administracion de bases de datos en SQL Server.",
    ],
  },
  {
    role: "Especialista en Datos LiDAR",
    company: "Fugro - Sede Peru",
    period: "2013 - 2014",
    bullets: [
      "Procesamiento de datos LiDAR para generacion de modelos digitales de terreno.",
      "Desarrollo de herramientas en Python para optimizar flujos de control de calidad.",
    ],
  },
];

const certifications = [
  "Professional Developer - Digital House (Beca Mercado Libre & Globant), 2025",
  "Working with the OpenAI API - DataCamp, 2025",
  "Data Science Specialization - Oracle Next Education (ONE) / Alura, 2025",
  "OCI Foundations Associate - Oracle Cloud, 2025",
  "Java: Spring Boot y Spring Cloud - JOEDAYZ, 2024",
];

const education = [
  {
    title: "Ingenieria de Sistemas - Universidad Peruana de Ciencias Aplicadas (en curso)",
    detail: "2023 - Presente",
  },
  {
    title: "Certified Tech Developer - Professional Developer - Digital House",
    detail: "2023 - 2025",
  },
  {
    title: "Oracle Next Education (ONE) - Especializacion en Data Science - Alura",
    detail: "2025",
  },
  {
    title: "Programador Web Full Stack (Bootcamp) - TECSUP",
    detail: "Python, Django, React, Docker, APIs REST, testing",
  },
  {
    title: "Profesional Tecnico en Operaciones Mineras - TECSUP (Titulado)",
    detail: "Formacion tecnica",
  },
  {
    title: "Profesional Tecnico en Geomatica - SENCICO (Titulado)",
    detail: "Formacion tecnica",
  },
];

export default function CvPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <span
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: 2,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              gianpc.com/cv
            </span>

            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: -0.5,
                marginBottom: 14,
              }}
            >
              Gian Carlos Paucar Cortez
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {["Java", "Spring Boot", "Spring Cloud", "FastAPI", "Microservicios", "AI APIs"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="mono"
                    style={{
                      fontSize: 11,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(246,38,77,0.08)",
                      border: "1px solid rgba(246,38,77,0.2)",
                      color: "var(--accent)",
                      fontWeight: 700,
                      letterSpacing: 0.5,
                    }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "github.com/gian-pc", href: "https://github.com/gian-pc" },
                { label: "linkedin.com/in/gian-pc", href: "https://linkedin.com/in/gian-pc" },
                { label: "gpaucarcortez@gmail.com", href: "mailto:gpaucarcortez@gmail.com" },
                { label: "+51 993 126 645", href: null },
                { label: "Lima, Peru", href: null },
              ].map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span key={item.label} className="mono" style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>

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

        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Perfil</SectionTitle>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)" }}>
            Backend Developer con formacion en Java (Spring Boot, Spring Cloud y arquitectura de
            microservicios) y Python (FastAPI) para construccion de APIs REST. Tengo mas de 8 anos
            de experiencia en entornos de produccion basados en datos (mineria, meteorologia y
            geomensura), aplicando Python para automatizacion de procesos y SQL para gestion de bases
            de datos.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", marginTop: 12 }}>
            Integrando esa base tecnica con desarrollo backend moderno, me enfoco en calidad,
            escalabilidad y mantenibilidad. Trabajo de forma colaborativa bajo metodologias agiles
            (Scrum, dailys), con interes en seguir creciendo como Java backend developer en entornos
            corporativos de microservicios.
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Experiencia</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {experience.map((exp) => (
              <div
                key={`${exp.role}-${exp.period}`}
                style={{
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  padding: "20px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{exp.role}</h3>
                  <span className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 12 }}>
                  {exp.company}
                </p>
                <ul style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {exp.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Habilidades Tecnicas</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "baseline" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    minWidth: 150,
                    flexShrink: 0,
                  }}
                >
                  {category}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="mono"
                      style={{
                        fontSize: 12,
                        padding: "4px 10px",
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

        <div style={{ marginBottom: 40 }}>
          <SectionTitle>Certificaciones</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {certifications.map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <SectionTitle>Formacion</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {education.map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 4,
                  paddingBottom: 12,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>{item.title}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href="mailto:gpaucarcortez@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 13,
              boxShadow: "0 8px 24px rgba(246,38,77,0.3)",
            }}
          >
            Contactar {"->"} gpaucarcortez@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "var(--text-primary)",
          letterSpacing: -0.3,
        }}
      >
        {children}
      </h2>
      <div
        style={{
          width: 24,
          height: 3,
          background: "var(--accent)",
          borderRadius: 99,
          marginTop: 6,
        }}
      />
    </div>
  );
}
