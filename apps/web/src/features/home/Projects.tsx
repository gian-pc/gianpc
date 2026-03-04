"use client";

import { useTheme } from "@/features/theme/ThemeProvider";

type Project = {
  emoji: string;
  gradient: string;
  accent: string;
  title: string;
  description: string;
  tags: string[];
  highlights: { icon: string; text: string }[];
  href: string;
  coverByTheme?: {
    light: string;
    dark: string;
  };
  coverPosition?: string;
};

const projects: Project[] = [
  {
    emoji: "🤖",
    gradient: "linear-gradient(135deg,#16181F 0%,#1a1f35 100%)",
    accent: "#6366f1",
    title: "RetainAI",
    description:
      "Sistema de predicción de churn con ML y visualización geográfica. Finalista Oracle Hackathon.",
    tags: ["Java", "Spring Boot", "Python", "AWS"],
    highlights: [
      { icon: "🧠", text: "Predicción de churn con ML" },
      { icon: "🗺️", text: "Mapa de riesgo por distritos" },
      { icon: "🏆", text: "Finalista Oracle Hackathon" },
    ],
    href: "https://github.com/gian-pc/retainai",
    coverByTheme: {
      light: "/projects/retainai-light.png",
      dark: "/projects/retainai-dark.png",
    },
    coverPosition: "center 15%",
  },
  {
    emoji: "🏠",
    gradient: "linear-gradient(135deg,#16181F 0%,#1a2820 100%)",
    accent: "#22c55e",
    title: "PropChat",
    description:
      "Plataforma inmobiliaria con búsqueda conversacional, Mapbox y Gemini AI como motor de recomendaciones.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Gemini"],
    highlights: [
      { icon: "🤖", text: "Motor de recomendaciones con Gemini" },
      { icon: "📍", text: "Ubicación y capas geográficas con Mapbox" },
      { icon: "⚡", text: "API rápida para matching de propiedades" },
    ],
    href: "https://github.com/gian-pc/propchat",
  },
];

export function Projects() {
  const { theme } = useTheme();

  return (
    <section style={{ padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: 24,
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
                    height: 260,
                    background: p.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                    position: "relative",
                  }}
                >
                  {p.coverByTheme ? (
                    <img
                      src={theme === "dark" ? p.coverByTheme.dark : p.coverByTheme.light}
                      alt={`${p.title} preview`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: p.coverPosition ?? "center",
                      }}
                    />
                  ) : (
                    <span style={{ position: "relative", zIndex: 1 }}>{p.emoji}</span>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0) 72%)",
                      zIndex: 1,
                    }}
                  />
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
                      marginBottom: 14,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      minHeight: "4.8em",
                    }}
                  >
                    {p.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono"
                        style={{
                          padding: "4px 9px",
                          borderRadius: "var(--radius-full)",
                          border: "1px solid var(--border)",
                          background: "rgba(0,0,0,0.02)",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--text-secondary)",
                          letterSpacing: 0.2,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: 12,
                      display: "grid",
                      gap: 6,
                      marginTop: "auto",
                    }}
                  >
                    {p.highlights.map((item) => (
                      <div
                        key={item.text}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "var(--text-secondary)",
                          fontSize: 12,
                          lineHeight: 1.45,
                        }}
                      >
                        <span style={{ width: 16, textAlign: "center" }}>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
