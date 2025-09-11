// MicroCMS用の基本型
export interface MicroCMSDate {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

// ブログ記事の型定義
export interface BlogPost extends MicroCMSDate {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
  tags?: BlogTag[];
  category?: BlogCategory;
  isPublished: boolean;
  publishDate?: string;
  author?: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

// タグの型定義
export interface BlogTag extends MicroCMSDate {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

// カテゴリの型定義
export interface BlogCategory extends MicroCMSDate {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// MicroCMS APIレスポンス型
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// ブログ記事一覧のクエリパラメータ
export interface BlogListQuery {
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  fields?: string;
  ids?: string;
  filters?: string;
  depth?: number;
}
