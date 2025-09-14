/**
 * Contact Form Types
 * お問い合わせフォーム関連の型定義
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: ContactFormData;
  isSubmitting?: boolean;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting?: boolean;
}
