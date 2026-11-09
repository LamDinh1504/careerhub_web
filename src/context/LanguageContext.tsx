"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export type AppLocale = "en" | "vi";

export interface LocaleOption {
  code: AppLocale;
  label: string;
}

const LANGUAGE_STORAGE_KEY = "locale";

export const SUPPORTED_LOCALES: LocaleOption[] = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
];

interface LanguageContextType {
  locale: AppLocale;
  locales: LocaleOption[];
  setLocale: (locale: AppLocale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isSupportedLocale = (value: string | null): value is AppLocale => {
  return !!value && SUPPORTED_LOCALES.some((locale) => locale.code === value);
};

export function LanguageProvider({ children, lng }: { children: ReactNode, lng: string }) {
  const [locale, setLocaleState] = useState<AppLocale>(() => {
    if (typeof window === "undefined") {
      return lng as AppLocale;
    }

    const storedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLocale(storedLocale) ? storedLocale : (lng as AppLocale);
  });
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (nextLocale: AppLocale) => {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
      setLocaleState(nextLocale);

      // Navigate to the new locale path
      // Extract the current path without the locale prefix
      const pathSegments = pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && SUPPORTED_LOCALES.some(l => l.code === pathSegments[0])) {
        // Remove the current locale from the path
        pathSegments.shift();
      }

      // Build the new path with the new locale
      const newPath = `/${nextLocale}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
      router.push(newPath);
    },
    [pathname, router]
  );

  const value = useMemo(
    () => ({
      locale,
      locales: SUPPORTED_LOCALES,
      setLocale,
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
