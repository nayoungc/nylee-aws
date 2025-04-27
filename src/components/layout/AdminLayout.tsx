// src/components/layout/AdminLayout.tsx
import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import AdminSidebar from './components/AdminSidebar';
import AdminTools from './components/AdminTools';

interface AdminLayoutProps {
  children: ReactNode;
  activeHref?: string;
  breadcrumbs?: ReactNode;
  toolsHide?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeHref,
  breadcrumbs,
  toolsHide = false
}) => {
  return (
    <BaseLayout
      navigation={<AdminSidebar activeHref={activeHref} />}
      tools={!toolsHide && <AdminTools />}
      contentType="dashboard"
    >
      {breadcrumbs}
      {children}
    </BaseLayout>
  );
};

export default AdminLayout;