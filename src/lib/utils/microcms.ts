import { BlogPost, BlogListQuery, MicroCMSListResponse } from '@/lib/types';

const API_KEY = process.env.MICROCMS_API_KEY;
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const HAS_ENV = Boolean(API_KEY && SERVICE_DOMAIN);
const BASE_URL = HAS_ENV ? `https://${SERVICE_DOMAIN}.microcms.io/api/v1` : '';

if (!HAS_ENV) {
  console.warn('MicroCMS environment variables are not set');
}

// MicroCMS APIクライアント
export class MicroCMSClient {
  private headers: HeadersInit;

  constructor() {
    this.headers = {
      'X-MICROCMS-API-KEY': API_KEY || '',
      'Content-Type': 'application/json',
    };
  }

  // ブログ記事一覧を取得
  async getBlogPosts(query?: BlogListQuery): Promise<MicroCMSListResponse<BlogPost>> {
    if (!HAS_ENV) {
      // Build/preview 時に ENV 未設定でも失敗させない
      return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: Number(query?.limit ?? 10),
      };
    }
    const params = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    const url = `${BASE_URL}/blog${params.toString() ? `?${params.toString()}` : ''}`;
    
    try {
      const response = await fetch(url, {
        headers: this.headers,
        next: { revalidate: 60 } // 1分間キャッシュ
      });

      if (!response.ok) {
        throw new Error(`MicroCMS API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch blog posts:', error);
      // フォールバック: 空のレスポンスを返す
      return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 10
      };
    }
  }

  // 個別のブログ記事を取得
  async getBlogPost(contentId: string): Promise<BlogPost | null> {
    if (!HAS_ENV) return null;
    const url = `${BASE_URL}/blog/${contentId}`;
    
    try {
      const response = await fetch(url, {
        headers: this.headers,
        next: { revalidate: 60 } // 1分間キャッシュ
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`MicroCMS API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch blog post:', error);
      return null;
    }
  }

  // スラッグで記事を取得
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const query: BlogListQuery = {
      filters: `slug[equals]${slug}`,
      limit: 1
    };

    const response = await this.getBlogPosts(query);
    return response.contents[0] || null;
  }
}

// シングルトンインスタンス
export const microCMSClient = new MicroCMSClient();

// 便利な関数
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
