// src/components/layout/InstructorLayout.tsx
import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import InstructorSidebar from './components/InstructorSidebar';
import InstructorTools from './components/InstructorTools';

interface InstructorLayoutProps {
  children: ReactNode;
  activeHref?: string;
  breadcrumbs?: ReactNode;
  toolsHide?: boolean;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({
  children,
  activeHref,
  breadcrumbs,
  toolsHide = false
}) => {
  return (
    <BaseLayout
      navigation={<InstructorSidebar activeHref={activeHref} />}
      tools={!toolsHide && <InstructorTools />}
      contentType="default"
    >
      {breadcrumbs}
      {children}
    </BaseLayout>
  );
};

export default InstructorLayout;