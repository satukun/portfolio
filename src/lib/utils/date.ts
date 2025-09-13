/**
 * 日付フォーマット関数
 * ベストプラクティス: 機能別にファイルを分割
 */

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

export const formatDateISO = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};
