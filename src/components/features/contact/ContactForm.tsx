'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactFormSchema, ContactFormData } from '@/lib/validation/contact';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting?: boolean;
}

export default function ContactForm({ onSubmit, isSubmitting = false }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    mode: 'onChange'
  });

  const handleFormSubmit = (data: ContactFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="contact-form">
      {/* お名前 */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          お名前 <span className="required">*</span>
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="山田 太郎"
          disabled={isSubmitting}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      {/* メールアドレス */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          メールアドレス <span className="required">*</span>
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="example@mail.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      {/* お問い合わせ内容 */}
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          お問い合わせ内容 <span className="required">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          className={`form-textarea ${errors.message ? 'error' : ''}`}
          placeholder="お問い合わせ内容をご記入ください..."
          rows={6}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span className="error-message">{errors.message.message}</span>
        )}
      </div>

      {/* 確認ボタン */}
      <div className="form-actions">
        <button
          type="submit"
          className={`btn btn-primary ${!isValid ? 'disabled' : ''}`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? '処理中...' : '確認する'}
        </button>
      </div>
    </form>
  );
}
