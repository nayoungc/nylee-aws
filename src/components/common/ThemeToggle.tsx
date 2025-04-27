// src/components/common/ThemeToggle.tsx
import React from 'react';
import Toggle from '@cloudscape-design/components/toggle';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from '../../hooks/useTranslation';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Toggle
      checked={theme === 'dark'}
      onChange={toggleTheme}
      label={t('common:darkMode')}
    />
  );
};