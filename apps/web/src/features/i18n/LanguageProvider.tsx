"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "es",
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "es";
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "es";
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const value = { language, toggleLanguage, setLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
