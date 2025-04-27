// src/components/layout/PublicLayout.tsx
import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import PublicHeader from './components/PublicHeader';

interface PublicLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  fullWidth = false
}) => {
  return (
    <>
      <PublicHeader />
      <BaseLayout
        navigation={null}
        tools={null}
        contentType="default"
      >
        <div className={fullWidth ? 'full-width-container' : 'container'}>
          {children}
        </div>
      </BaseLayout>
    </>
  );
};

export default PublicLayout;
