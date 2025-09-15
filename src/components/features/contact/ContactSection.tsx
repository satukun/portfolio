'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';
import ContactConfirmationModal from './ContactConfirmationModal';
import { ContactFormData } from '@/lib/validation/contact';
import { useNotification } from '@/lib/contexts/NotificationContext';

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { showSuccessNotification } = useNotification();

  const handleFormSubmit = (data: ContactFormData) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setFormData(null);
    }
  };

  const handleFinalSubmit = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to send');
      }

      setSubmitStatus('success');
      setIsModalOpen(false);
      setFormData(null);
      
      // ヘッダー下に成功通知を表示
      showSuccessNotification();
      
      // 3秒後にステータスをリセット
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
      
      // 5秒後にステータスをリセット
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" data-reveal="fade-up">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <p className="section-description">
            お仕事のご依頼や技術的なご質問、コラボレーションのご相談など、<br />お気軽にお問い合わせください。
          </p>
        </div>

        {/* エラーメッセージのみ表示（成功メッセージはヘッダー下に表示） */}
        {submitStatus === 'error' && (
          <div className="status-message error" data-reveal="fade-up">
            <div className="status-icon">⚠</div>
            <div className="status-text">
              <h3>送信エラー</h3>
              <p>申し訳ございません。送信に失敗しました。再度お試しください。</p>
            </div>
          </div>
        )}

        <div className="contact-content">
          <div className="contact-form-container" data-reveal="fade-up">
            <ContactForm 
              onSubmit={handleFormSubmit} 
              isSubmitting={isSubmitting}
            />
          </div>

          <div className="contact-info" data-reveal="fade-left">
            <div className="contact-info-item">
              <h3>レスポンス時間</h3>
              <p>通常24時間以内にご返信いたします</p>
            </div>
            <div className="contact-info-item">
              <h3>対応可能な案件</h3>
              <ul>
                <li>フロントエンド開発（React/Next.js/Vue.js）</li>
                <li>Webサイト制作・リニューアル</li>
                <li>技術コンサルティング</li>
                <li>コードレビュー・技術支援</li>
              </ul>
            </div>
            <div className="contact-info-item">
              <h3>SNS</h3>
              <div className="social-links">
                <a href="https://note.com/yousuke" target="_blank" rel="noopener noreferrer" className="social-link">
                  Note
                </a>
                <a href="https://github.com/yousuke" target="_blank" rel="noopener noreferrer" className="social-link">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 確認モーダル */}
      {formData && (
        <ContactConfirmationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleFinalSubmit}
          formData={formData}
          isSubmitting={isSubmitting}
        />
      )}
    </section>
  );
}
