"use client";

const projects = [
  {
    emoji: "🤖",
    gradient: "linear-gradient(135deg,#16181F 0%,#1a1f35 100%)",
    accent: "#6366f1",
    title: "RetainAI",
    description:
      "Sistema de predicción de churn con ML y visualización geográfica. Finalista Oracle Hackathon.",
    tags: ["Java", "Spring Boot", "Python", "AWS"],
    href: "https://github.com/gian-pc/retainai",
  },
  {
    emoji: "🏠",
    gradient: "linear-gradient(135deg,#16181F 0%,#1a2820 100%)",
    accent: "#22c55e",
    title: "PropChat",
    description:
      "Plataforma inmobiliaria con búsqueda conversacional, Mapbox y Gemini AI como motor de recomendaciones.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Gemini"],
    href: "https://github.com/gian-pc/propchat",
  },
];

export function Projects() {
  return (
    <section style={{ padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: -0.5,
            }}
          >
            Proyectos
          </h2>
          <div
            style={{
              width: 32,
              height: 3,
              background: "var(--accent)",
              borderRadius: 99,
              marginTop: 8,
            }}
          />
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "block",
                height: "100%",
              }}
            >
              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform var(--duration-fast), box-shadow var(--duration-fast)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 16px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Cover */}
                <div
                  style={{
                    height: 120,
                    background: p.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                    position: "relative",
                  }}
                >
                  {p.emoji}
                  {/* Tech tags en cover */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 12,
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#fff",
                          letterSpacing: 0.5,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "16px 20px 20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {p.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
