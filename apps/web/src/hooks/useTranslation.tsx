"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/translations/en.json';
import it from '@/translations/it.json';
import es from '@/translations/es.json';
import fr from '@/translations/fr.json';
import ja from '@/translations/ja.json';

type Translations = Record<string, any>;

const translations: Record<string, Translations> = { en, it, es, fr, ja };

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('app-locale');
    if (stored && translations[stored]) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((newLocale: string) => {
    if (!translations[newLocale]) newLocale = 'en';
    setLocaleState(newLocale);
    localStorage.setItem('app-locale', newLocale);
  }, []);

  const t = useCallback((key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let value: any = translations[locale];
    for (const k of keys) {
      if (value == null) break;
      value = value[k];
    }
    if (typeof value !== 'string') return key; // fallback to key
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) => (params[name] != null ? String(params[name]) : `{${name}}`));
    }
    return value;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const { t, locale, setLocale } = useContext(LanguageContext);
  return { t, locale, setLocale };
}