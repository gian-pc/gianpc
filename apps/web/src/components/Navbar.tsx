"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/features/theme/ThemeProvider";
import { useLanguage } from "@/features/i18n/LanguageProvider";

type NavKey = "inicio" | "projects" | "contact";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<NavKey | null>(null);
  const navLinks =
    language === "es"
      ? [
          { key: "inicio" as const, label: "Inicio", href: "/#inicio" },
          { key: "projects" as const, label: "Proyectos", href: "/#projects" },
          { key: "contact" as const, label: "Contacto", href: "/#contact" },
        ]
      : [
          { key: "inicio" as const, label: "Home", href: "/#inicio" },
          { key: "projects" as const, label: "Projects", href: "/#projects" },
          { key: "contact" as const, label: "Contact", href: "/#contact" },
        ];

  useEffect(() => {
    const resolveActiveSection = () => {
      if (pathname !== "/") {
        setActiveSection(null);
        return;
      }

      const hash = window.location.hash.toLowerCase();
      if (hash === "#projects") setActiveSection("projects");
      else if (hash === "#contact") setActiveSection("contact");
      else setActiveSection("inicio");
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      const result = originalPushState.apply(window.history, args);
      window.dispatchEvent(new Event("locationchange"));
      return result;
    };

    window.history.replaceState = function (...args) {
      const result = originalReplaceState.apply(window.history, args);
      window.dispatchEvent(new Event("locationchange"));
      return result;
    };

    resolveActiveSection();
    window.addEventListener("hashchange", resolveActiveSection);
    window.addEventListener("popstate", resolveActiveSection);
    window.addEventListener("locationchange", resolveActiveSection);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("hashchange", resolveActiveSection);
      window.removeEventListener("popstate", resolveActiveSection);
      window.removeEventListener("locationchange", resolveActiveSection);
    };
  }, [pathname]);

  return (
    <header className="nav-shell">
      <div className="container-shell nav-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label={language === "es" ? "Ir al inicio" : "Go to home"}
        >
          <Image src="/avatar.png" alt="gianpc" width={44} height={44} className="brand-avatar" />
          <span className="brand-name">gianpc</span>
        </Link>

        <div className="nav-right">
          <nav className="nav-links" aria-label="Principal">
            {navLinks.map((link) => {
              const isActive = pathname === "/" && activeSection === link.key;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "nav-link is-active" : "nav-link"}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveSection(link.key)}
                >
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
