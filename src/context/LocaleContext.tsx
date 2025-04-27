// src/context/LocaleContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SUPPORTED_LOCALES } from '../config/supportedLocales';
import i18n from './i18n';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

// 기본 컨텍스트 값 설정
export const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {}
});

export const LocaleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // 저장된 언어 또는 기본 언어(영어) 로드
  const [locale, setLocaleState] = useState<string>(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale && Object.keys(SUPPORTED_LOCALES).includes(savedLocale) 
      ? savedLocale 
      : 'en';
  });

  // 언어 변경 함수
  const setLocale = (newLocale: string) => {
    if (Object.keys(SUPPORTED_LOCALES).includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('locale', newLocale);
      i18n.changeLanguage(newLocale);
      // 문서의 언어 속성 변경 (SEO 및 접근성)
      document.documentElement.setAttribute('lang', newLocale);
    }
  };

  // 초기 설정
  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.setAttribute('lang', locale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};