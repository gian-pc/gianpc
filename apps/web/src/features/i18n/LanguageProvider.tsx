"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const next = saved === "en" ? "en" : "es";
    setLanguageState(next);
    document.documentElement.lang = next;
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const value = useMemo(
    () => ({ language, toggleLanguage, setLanguage }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
