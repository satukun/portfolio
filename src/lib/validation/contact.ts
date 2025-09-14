/**
 * Contact Form Validation Schema
 * お問い合わせフォームのバリデーションスキーマ
 */

import * as yup from 'yup';

export const contactFormSchema = yup.object({
  name: yup
    .string()
    .required('お名前は必須です')
    .min(2, 'お名前は2文字以上で入力してください')
    .max(50, 'お名前は50文字以下で入力してください'),
  
  email: yup
    .string()
    .required('メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以下で入力してください'),
  
  message: yup
    .string()
    .required('お問い合わせ内容は必須です')
    .min(10, 'お問い合わせ内容は10文字以上で入力してください')
    .max(1000, 'お問い合わせ内容は1000文字以下で入力してください')
});

export type ContactFormData = yup.InferType<typeof contactFormSchema>;
