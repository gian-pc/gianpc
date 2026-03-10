const topStack = ["Java Backend", "Spring Boot", "REST APIs", "Microservices", "Docker", "AWS"];

const profile = [
  "Backend Java Developer enfocado en APIs REST, arquitectura limpia y servicios escalables con Spring Boot.",
  "Traigo más de 8 años de experiencia previa en análisis de datos técnicos y automatización en sectores de operación real.",
  "Hoy combino criterio analítico + desarrollo backend para construir soluciones mantenibles orientadas a producto.",
];

const experience = [
  {
    role: "Backend Developer - RetainAI",
    company: "Finalista Hackathon ChurnInsight / Oracle + Alura",
    period: "2026",
    bullets: [
      "APIs REST con Java 21, Spring Boot y Spring Security.",
      "Integración backend Java + servicio FastAPI + MySQL.",
      "Flujo de predicción end-to-end para dashboard de negocio.",
    ],
    tags: ["Java 21", "Spring Boot", "Spring Security", "MySQL", "FastAPI", "Docker"],
  },
  {
    role: "Transición profesional hacia Backend Development",
    company: "Proceso de reconversión técnica",
    period: "2023 - Actualidad",
    bullets: [
      "Formación y proyectos en Java, Spring Boot y APIs REST.",
      "Bases de datos relacionales, Docker y fundamentos cloud.",
      "Python y datos como complemento para integración técnica.",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "Docker", "AWS", "SQL"],
  },
  {
    role: "Analista de Datos Geológicos",
    company: "Compañía Minera Lincuna S.A.",
    period: "2018 - 2021",
    bullets: [
      "Automatización de validación y procesamiento con Python.",
      "Mejora de trazabilidad y control de calidad de datos.",
      "Soporte de información crítica para operación.",
    ],
    tags: ["Python", "SQL", "Power BI", "Excel"],
  },
];

const certifications = [
  "OCI Foundations Associate - Oracle (2025)",
  "Desarrollador Java FullStack - JOEDAYZ (2024)",
  "Spring Boot y Spring Cloud - JOEDAYZ (2024)",
  "Programación Java 17+ - JOEDAYZ (2024)",
  "Bootcamp Java Backend Developer - ATL Academy (2023)",
  "Sistemas Operativos y Linux - Coursera (2023)",
];

export default function CvPage() {
  return (
    <main className="cv-page">
      <div className="container-shell cv-layout">
        <section className="cv-hero-card">
          <div className="cv-hero-main">
            <p className="cv-kicker">CV premium</p>
            <h1 className="cv-title">Gian Carlos Paucar Cortez</h1>
            <p className="cv-subtitle">Java Backend Developer · gpaucarcortez@gmail.com</p>

            <div className="cv-pill-row">
              {topStack.map((item) => (
                <span key={item} className="cv-pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="cv-hero-actions">
              <a className="hero-btn hero-btn-primary" href="/cv/CV_GianPaucar_JavaBackend.pdf" download>
                Descargar CV
              </a>
              <a className="cv-icon-btn" href="https://github.com/gian-pc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a className="cv-icon-btn" href="https://www.linkedin.com/in/gian-pc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a className="cv-icon-btn" href="mailto:gpaucarcortez@gmail.com" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>

          <aside className="cv-hero-aside">
            <img src="/avatar.png" alt="gianpc" className="cv-avatar" />
            <span className="cv-handle mono">@gianpc</span>
          </aside>
        </section>

        <section className="cv-section">
          <header className="cv-section-head">
            <p>Perfil profesional</p>
          </header>
          <div className="cv-section-body">
            {profile.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <header className="cv-section-head">
            <p>Experiencia</p>
          </header>
          <div className="cv-experience-list">
            {experience.map((item) => (
              <article key={item.role} className="cv-exp-card">
                <div className="cv-exp-top">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.period}</span>
                </div>

                <ul>
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="cv-pill-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="cv-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <header className="cv-section-head">
            <p>Certificaciones</p>
          </header>
          <div className="cv-cert-grid">
            {certifications.map((cert) => (
              <div key={cert} className="cv-cert-card">
                {cert}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-1.03-.02-1.87-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.91-.62.07-.61.07-.61 1 .07 1.54 1.05 1.54 1.05.89 1.58 2.34 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.38-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.89c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.54 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.31.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.24C22 6.59 17.52 2 12 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M6.94 8.5H3.56V19h3.38zM5.24 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94M20.44 12.58c0-3.16-1.69-4.64-3.95-4.64-1.82 0-2.64 1-3.1 1.71V8.5H10V19h3.38v-5.2c0-1.37.26-2.7 1.96-2.7 1.68 0 1.7 1.57 1.7 2.8V19h3.4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
