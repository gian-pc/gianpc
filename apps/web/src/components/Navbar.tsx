"use client";

import Link from "next/link";
import { useTheme } from "@/features/theme/ThemeProvider";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const links = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "CV", href: "/cv" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "min(1100px, calc(100vw - 48px))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 14px",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--border)",
        background: theme === "dark"
          ? "rgba(22,24,31,0.85)"
          : "rgba(240,241,245,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 148 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 15, color: "#fff",
          }}>
            G
          </div>
        </Link>
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: -0.6,
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          gianpc
        </span>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          flex: 1,
        }}
      >
        {/* Links */}
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "7px 13px",
              borderRadius: "var(--radius-full)",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.1,
              textDecoration: "none",
              color: "var(--text-secondary)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 148, justifyContent: "flex-end" }}>
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
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDark ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.2v2.1M12 19.7v2.1M4.3 4.3l1.5 1.5M18.2 18.2l1.5 1.5M2.2 12h2.1M19.7 12h2.1M4.3 19.7l1.5-1.5M18.2 5.8l1.5-1.5" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
