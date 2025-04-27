// src/components/layout/BaseLayout.tsx
import React, { ReactNode } from 'react';
import { AppLayout } from '@cloudscape-design/components';
import Header from './components/Header';
import Footer from './components/Footer';

interface BaseLayoutProps {
  children: ReactNode;
  navigation?: ReactNode;
  tools?: ReactNode;
  contentType?: 'default' | 'form' | 'table' | 'dashboard';
  headerSelector?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  navigation,
  tools,
  contentType = 'default',
  headerSelector = '#header'
}) => {
  return (
    <>
      <div id="header">
        <Header />
      </div>
      
      <AppLayout
        content={children}
        navigation={navigation}
        tools={tools}
        headerSelector={headerSelector}
        contentType={contentType}
        footerSelector="#footer"
      />
      
      <div id="footer">
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;