"use client";

import Link from "next/link";
import { useTheme } from "@/features/theme/ThemeProvider";

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 8px 8px 16px",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--border)",
        background: theme === "dark"
          ? "rgba(22,24,31,0.85)"
          : "rgba(240,241,245,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg,#F6264D,#fb923c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 14, color: "#fff",
          marginRight: 8,
        }}>
          G
        </div>
      </Link>

      {/* Links */}
      {[
        { label: "Blog", href: "/blog" },
        { label: "CV", href: "/cv" },
      ].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            padding: "6px 12px",
            borderRadius: "var(--radius-full)",
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            textDecoration: "none",
            color: "var(--text-secondary)",
          }}
        >
          {link.label}
        </Link>
      ))}

      {/* Toggle idioma */}
      <button
        style={{
          padding: "6px 12px",
          borderRadius: "var(--radius-full)",
          fontSize: 12,
          fontWeight: 700,
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--text-secondary)",
          cursor: "pointer",
          letterSpacing: 1,
        }}
      >
        ES
      </button>

      {/* Toggle tema */}
      <button
        onClick={toggle}
        style={{
          width: 32, height: 32,
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--border)",
          background: "transparent",
          cursor: "pointer",
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-secondary)",
        }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
