// /Users/admin/Desktop/projects/portfolio/apps/web/src/features/home/Hero.tsx
import { HeroMapBackground } from "./HeroMapBackground";
import { TerminalPreview } from "./TerminalPreview";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "140px 24px 80px",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: 48,
        alignItems: "center",
      }}
    >
      <HeroMapBackground />

      <div style={{ flex: "1 1 340px", position: "relative", zIndex: 1 }}>
        {/* Preserva el espacio del avatar eliminado para mantener el layout original */}
        <div aria-hidden="true" style={{ height: 56, marginBottom: 28 }} />

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            background: "rgba(217,31,78,0.08)",
            border: "1px solid rgba(217,31,78,0.22)",
            fontSize: 11,
            fontWeight: 700,
            color: "#d91f4e",
            marginBottom: 24,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
          }}
        >
          ● Backend Engineer
        </div>

        {/* Título */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 20,
            letterSpacing: -1,
            color: "var(--text-primary)",
          }}
        >
          Construyo APIs
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#d91f4e,#ef476f,#d91f4e)",
              backgroundSize: "180%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            que escalan.
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 400,
            color: "var(--text-secondary)",
          }}
        >
          Especialista en arquitecturas Serverless sobre AWS. Transformo lógica
          compleja en sistemas escalables, rápidos y seguros usando Java, Spring
          Boot e IaC.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="/blog"
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              boxShadow: "0 8px 18px rgba(217,31,78,0.2)",
            }}
          >
            Ver artículos →
          </a>
          <a
            href="#contact"
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-full)",
              background: "transparent",
              fontWeight: 600,
              fontSize: 13,
              border: "1px solid var(--border)",
              textDecoration: "none",
              color: "var(--text-primary)",
            }}
          >
            Contacto
          </a>
        </div>
      </div>

      <div style={{ flex: "1 1 360px", minWidth: 0, position: "relative", zIndex: 1 }}>
        <TerminalPreview />
      </div>
    </section>
  );
}
