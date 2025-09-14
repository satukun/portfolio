'use client';

import { useEffect } from 'react';
import { ContactFormData } from '@/lib/validation/contact';

interface ContactConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: ContactFormData;
  isSubmitting?: boolean;
}

export default function ContactConfirmationModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  isSubmitting = false
}: ContactConfirmationModalProps) {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="モーダルを閉じる"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="modal-body">
          <h3 className="modal-title">お問い合わせ内容の確認</h3>
          
          <div className="confirmation-content">
            <p className="confirmation-note">
              以下の内容でお問い合わせを送信します。内容をご確認ください。
            </p>

            <div className="confirmation-item">
              <label className="confirmation-label">お名前</label>
              <div className="confirmation-value">{formData.name}</div>
            </div>

            <div className="confirmation-item">
              <label className="confirmation-label">メールアドレス</label>
              <div className="confirmation-value">{formData.email}</div>
            </div>

            <div className="confirmation-item">
              <label className="confirmation-label">お問い合わせ内容</label>
              <div className="confirmation-value message-content">
                {formData.message.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              戻る
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
