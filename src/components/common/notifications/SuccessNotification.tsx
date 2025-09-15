'use client';

import { useEffect } from 'react';

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessNotification({
  isVisible,
  onClose,
  title = '送信完了',
  message = 'お問い合わせありがとうございます。確認次第、お返事いたします。'
}: SuccessNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      // 自動で5秒後に閉じる
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="success-notification">
      <div className="success-notification-content">
        <div className="success-notification-icon">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <div className="success-notification-text">
          <h3 className="success-notification-title">{title}</h3>
          <p className="success-notification-message">{message}</p>
        </div>
        <button
          className="success-notification-close"
          onClick={onClose}
          aria-label="通知を閉じる"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
