// src/components/layout/components/AdminSidebar.tsx
import React from 'react';
import { SideNavigation } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';

interface AdminSidebarProps {
  activeHref?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeHref }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['navigation', 'common']);
  
  const items = [
    { type: 'link', text: t('navigation:admin.dashboard'), href: '/admin/dashboard' },
    { 
      type: 'section-group',
      title: t('navigation:admin.courseManagement'),
      items: [
        { type: 'link', text: t('navigation:admin.courseCatalog'), href: '/admin/catalog' },
        { type: 'link', text: t('navigation:admin.schedules'), href: '/admin/schedules' }
      ]
    },
    { 
      type: 'section-group',
      title: t('navigation:admin.userManagement'),
      items: [
        { type: 'link', text: t('navigation:admin.instructors'), href: '/admin/instructors' },
        { type: 'link', text: t('navigation:admin.students'), href: '/admin/students' }
      ]
    },
    { 
      type: 'section-group',
      title: t('navigation:admin.contentManagement'),
      items: [
        { type: 'link', text: t('navigation:admin.quizzes'), href: '/admin/quizzes' },
        { type: 'link', text: t('navigation:admin.surveys'), href: '/admin/surveys' }
      ]
    },
    { 
      type: 'section-group',
      title: t('navigation:admin.systemSettings'),
      items: [
        { type: 'link', text: t('navigation:admin.settings'), href: '/admin/settings' },
        { type: 'link', text: t('navigation:admin.backups'), href: '/admin/backups' }
      ]
    }
  ];
  
  return (
    <SideNavigation
      activeHref={activeHref}
      header={{
        text: t('navigation:admin.title'),
        href: '/admin'
      }}
      items={items}
      onFollow={(e) => {
        e.preventDefault();
        navigate(e.detail.href);
      }}
    />
  );
};

export default AdminSidebar;