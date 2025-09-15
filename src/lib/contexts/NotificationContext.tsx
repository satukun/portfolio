'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  showSuccessNotification: (title?: string, message?: string) => void;
  hideNotification: () => void;
  notification: {
    isVisible: boolean;
    title: string;
    message: string;
  };
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState({
    isVisible: false,
    title: '送信完了',
    message: 'お問い合わせありがとうございます。確認次第、お返事いたします。'
  });

  const showSuccessNotification = (
    title = '送信完了',
    message = 'お問い合わせありがとうございます。確認次第、お返事いたします。'
  ) => {
    setNotification({
      isVisible: true,
      title,
      message
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccessNotification,
        hideNotification,
        notification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
