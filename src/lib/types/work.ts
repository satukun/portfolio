import { BaseContent } from './common';

export interface WorkItem extends BaseContent {
  title: string;
  description: string;
  content?: string;
  thumbnail: {
    url: string;
    height?: number;
    width?: number;
  } | string; // 文字列も許可（後方互換性）
  images?: Array<{
    url: string;
    height?: number;
    width?: number;
  }>;
  techStack: string | string[]; // microCMS形式（文字列）と表示用（配列）両対応
  category: string;
  year: string;
  type: string[] | "Webアプリ" | "Webサイト"; // microCMS形式（配列）と表示用（文字列）両対応
  duration?: string;
  role?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: string[] | string; // microCMS形式（配列）と表示用（文字列）両対応
  isFeatured?: boolean;
  order?: number;
}

// MicroCMSWorkItem型を削除 - WorkItem型で統一

export type FilterType = "All" | "Webアプリ" | "Webサイト";
