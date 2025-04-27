// src/hooks/useTranslation.ts
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string | string[]) => {
  return useI18nTranslation(namespace ?? ['common']);
};
// src/components/common/LanguageSelector.tsx
import React from 'react';
import Select from '@cloudscape-design/components/select';
import { useTranslation } from '../../hooks/useTranslation';
import { SUPPORTED_LOCALES } from '../../config/supportedLocales';
import { useLocale } from '../../hooks/useLocale';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { locale, setLocale } = useLocale();
  
  const options = Object.entries(SUPPORTED_LOCALES).map(([code, name]) => ({
    value: code,
    label: name,
  }));
  
  const handleChange = (e: any) => {
    const newLocale = e.detail.selectedOption.value;
    i18n.changeLanguage(newLocale);
    setLocale(newLocale);
  };

  return (
    <Select
      selectedOption={{ value: locale, label: SUPPORTED_LOCALES[locale] }}
      onChange={handleChange}
      options={options}
      ariaLabel="Select language"
    />
  );
};