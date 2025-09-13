import { MicroCMSBaseClient } from '../microcms-client';
import { BlogPost, BlogListQuery, APIResponse } from '@/lib/types';

/**
 * ブログ記事データアクセス層
 * ブログ関連のすべてのデータ取得ロジックを集約
 * 旧 src/lib/utils/microcms.ts から移行
 */
export class BlogDAL extends MicroCMSBaseClient {
  private readonly endpoint = 'blog';

  /**
   * ブログ記事一覧を取得
   */
  async getBlogPosts(query?: BlogListQuery): Promise<APIResponse<BlogPost>> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: Number(query?.limit ?? 10),
      };
    }

    try {
      const params: Record<string, string | number> = {};
      
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined) {
            params[key] = value;
          }
        });
      }

      return await this.get<APIResponse<BlogPost>>(this.endpoint, params);
    } catch (error) {
      console.warn('Failed to fetch blog posts:', error);
      return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 10
      };
    }
  }

  /**
   * 個別のブログ記事を取得
   */
  async getBlogPost(contentId: string): Promise<BlogPost | null> {
    return await this.getById<BlogPost>(this.endpoint, contentId);
  }

  /**
   * スラッグで記事を取得
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const posts = await this.getWithFilters<BlogPost>(
        this.endpoint,
        `slug[equals]${slug}`,
        { limit: 1 }
      );
      return posts[0] || null;
    } catch (error) {
      console.warn(`Failed to fetch blog post by slug: ${slug}`, error);
      return null;
    }
  }

  /**
   * 公開済みの記事のみを取得
   */
  async getPublishedPosts(limit?: number): Promise<BlogPost[]> {
    return await this.getWithFilters<BlogPost>(
      this.endpoint,
      'isPublished[equals]true',
      { 
        limit: limit || 10,
        orders: '-publishedAt'
      }
    );
  }

  /**
   * 最新記事を取得（ホームページ用）
   */
  async getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
    return await this.getWithFilters<BlogPost>(
      this.endpoint,
      'isPublished[equals]true',
      { 
        limit,
        orders: '-publishedAt'
      }
    );
  }

  /**
   * タグで記事を絞り込み
   */
  async getPostsByTag(tagId: string, limit?: number): Promise<BlogPost[]> {
    return await this.getWithFilters<BlogPost>(
      this.endpoint,
      `tags[contains]${tagId}`,
      { 
        limit: limit || 10,
        orders: '-publishedAt'
      }
    );
  }

  /**
   * カテゴリで記事を絞り込み
   */
  async getPostsByCategory(categoryId: string, limit?: number): Promise<BlogPost[]> {
    return await this.getWithFilters<BlogPost>(
      this.endpoint,
      `category[equals]${categoryId}`,
      { 
        limit: limit || 10,
        orders: '-publishedAt'
      }
    );
  }
}

// シングルトンインスタンス
export const blogDAL = new BlogDAL();
