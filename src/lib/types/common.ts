/**
 * 共通型定義
 * ベストプラクティス: 共通型は分離して管理
 */

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

export interface BaseContent extends BaseEntity {
  title: string;
  slug: string;
  isPublished: boolean;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface SortParams {
  orders?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  filters?: string;
  q?: string;
  fields?: string;
}

export interface APIQueryParams extends PaginationParams, SortParams, FilterParams {
  depth?: number;
}

export interface APIResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
