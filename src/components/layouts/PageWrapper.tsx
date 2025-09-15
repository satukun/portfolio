'use client';

import { ReactNode } from 'react';
import { NotificationProvider } from '@/lib/contexts/NotificationContext';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
}
