// src/pages/admin/DashboardPage.tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { ContentLayout, Container, Header, SpaceBetween } from '@cloudscape-design/components';
import { useTranslation } from '@/hooks/useTranslation';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <AdminLayout activeHref="/admin/dashboard">
      <ContentLayout
        header={
          <Header variant="h1">
            {t('admin:dashboard.title')}
          </Header>
        }
      >
        <SpaceBetween size="l">
          <Container>
            <Header variant="h2">
              {t('admin:dashboard.summary')}
            </Header>
            {/* 대시보드 내용 */}
          </Container>
          {/* 다른 컨테이너들 */}
        </SpaceBetween>
      </ContentLayout>
    </AdminLayout>
  );
};

export default DashboardPage;