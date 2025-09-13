import { MicroCMSDate } from './blog';

/**
 * microCMS Works APIレスポンス型
 * 実際のAPIレスポンス構造に基づく型定義
 */
export interface MicroCMSWorkItem extends MicroCMSDate {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  type: string[]; // microCMSでは配列形式
  category: string;
  techStack: string; // カンマ区切り文字列
  year: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  status?: string[]; // microCMSでは配列形式
  duration?: string;
  role?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  liveUrl?: string;
  githubUrl?: string;
}
