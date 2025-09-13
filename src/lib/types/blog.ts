import { BaseContent, BaseEntity, APIQueryParams } from './common';

// ブログ記事の型定義
export interface BlogPost extends BaseContent {
  content: string;
  excerpt?: string;
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
  tags?: BlogTag[];
  category?: BlogCategory;
  publishDate?: string;
  // 方法1: 個別フィールド
  authorName?: string;
  authorAvatar?: {
    url: string;
    width?: number;
    height?: number;
  };
  
  // 方法2: 著者API参照 (どちらか一つを選択)
  // author?: BlogAuthor;
}

// タグの型定義
export interface BlogTag extends BaseEntity {
  name: string;
  slug: string;
  color?: string;
}

// カテゴリの型定義
export interface BlogCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
}

// MicroCMSListResponseは共通型APIResponseを使用

// 著者の型定義（方法2を選ぶ場合）
export interface BlogAuthor extends BaseEntity {
  name: string;
  avatar?: {
    url: string;
    width?: number;
    height?: number;
  };
  bio?: string;
}

// BlogListQueryは共通型APIQueryParamsを使用
export interface BlogListQuery extends APIQueryParams {
  ids?: string;
}
