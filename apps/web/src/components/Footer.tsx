import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "20px 0 26px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          width: "min(1100px, calc(100vw - 48px))",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "grid", gap: 4 }}>
          <span
            className="mono"
            style={{ fontSize: 12, color: "var(--text-secondary)" }}
          >
            © 2026 gianpc.com
          </span>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            Backend Engineer · Java · AWS
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/gian-pc" },
            { label: "LinkedIn", href: "https://linkedin.com/in/gianpc" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text-secondary)",
                textDecoration: "none",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-full)",
                padding: "8px 12px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
