"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/features/theme/ThemeProvider";
import { useLanguage } from "@/features/i18n/LanguageProvider";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const navLinks =
    language === "es"
      ? [
          { label: "Inicio", href: "/" },
          { label: "Proyectos", href: "/#projects" },
          { label: "Contacto", href: "/#contact" },
        ]
      : [
          { label: "Home", href: "/" },
          { label: "Projects", href: "/#projects" },
          { label: "Contact", href: "/#contact" },
        ];

  return (
    <header className="nav-shell">
      <div className="container-shell nav-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label={language === "es" ? "Ir al inicio" : "Go to home"}
        >
          <img src="/avatar.png" alt="gianpc" className="brand-avatar" />
          <span className="brand-name">gianpc</span>
        </Link>

        <div className="nav-right">
          <nav className="nav-links" aria-label="Principal">
            {navLinks.map((link) => {
              const isActive = link.href === "/" && pathname === "/";
              return (
                <Link key={link.href} href={link.href} className={isActive ? "nav-link is-active" : "nav-link"}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-controls">
            <button
              onClick={toggleLanguage}
              className="lang-toggle"
              aria-label={language === "es" ? "Cambiar idioma" : "Change language"}
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={language === "es" ? "Cambiar tema" : "Change theme"}
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1.75v2.1M12 20.15v2.1M4.22 4.22l1.49 1.49M18.29 18.29l1.49 1.49M1.75 12h2.1M20.15 12h2.1M4.22 19.78l1.49-1.49M18.29 5.71l1.49-1.49" />
    </svg>
  );
}
