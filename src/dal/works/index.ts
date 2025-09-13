import { MicroCMSBaseClient } from '../microcms-client';
import { WorkItem } from '@/lib/types';

/**
 * WorkItemのヘルパー関数
 */
export const workHelpers = {
  // サムネイルURLを取得
  getThumbnailUrl: (work: WorkItem): string => {
    return typeof work.thumbnail === 'string' ? work.thumbnail : work.thumbnail.url;
  },
  
  // 技術スタック配列を取得
  getTechStackArray: (work: WorkItem): string[] => {
    return typeof work.techStack === 'string' 
      ? work.techStack.split(',').map(tech => tech.trim())
      : work.techStack;
  },
  
  // タイプ文字列を取得
  getTypeString: (work: WorkItem): "Webアプリ" | "Webサイト" => {
    return Array.isArray(work.type) ? work.type[0] as "Webアプリ" | "Webサイト" : work.type;
  },
  
  // ステータス文字列を取得
  getStatusString: (work: WorkItem): string | undefined => {
    return Array.isArray(work.status) ? work.status[0] : work.status;
  }
};

/**
 * Works（制作実績）データアクセス層
 * Works関連のすべてのデータ取得ロジックを集約
 */
export class WorksDAL extends MicroCMSBaseClient {
  private readonly endpoint = 'works';

  /**
   * 注目Works（トップページ用）を取得
   * isFeatured=true のプロジェクトを優先表示、不足分は最新で補完
   */
  async getFeaturedWorks(limit: number = 3): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      // 環境変数未設定時は空配列を返す
      return [];
    }

    try {
      // 1. まずisFeatured=trueの注目プロジェクトを取得
      const featuredWorks = await this.getWithFilters<WorkItem>(
        this.endpoint,
        'isPublished[equals]true[and]isFeatured[equals]true',
        { 
          limit,
          orders: '-publishedAt,-createdAt' // 公開日時順、作成日時順
        }
      );

      // 2. 注目プロジェクトが不足している場合、最新のプロジェクトで補完
      if (featuredWorks.length < limit) {
        const latestWorks = await this.getWithFilters<WorkItem>(
          this.endpoint,
          'isPublished[equals]true',
          { 
            limit: limit * 2, // 余裕を持って取得
            orders: '-publishedAt,-createdAt'
          }
        );
        
        // 3. 重複を除いて不足分を補完
        const featuredIds = new Set(featuredWorks.map(w => w.id));
        const additionalWorks = latestWorks
          .filter(w => !featuredIds.has(w.id))
          .slice(0, limit - featuredWorks.length);
        
        return [...featuredWorks, ...additionalWorks].slice(0, limit);
      }

      return featuredWorks;
    } catch (error) {
      console.warn('Failed to fetch featured works:', error);
      // フォールバック: 空配列を返す  
      return [];
    }
  }

  /**
   * 全Works取得（スライドパネル用）
   */
  async getAllWorks(): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      // 環境変数未設定時は空配列を返す
      return [];
    }

    try {
      return await this.getWithFilters<WorkItem>(
        this.endpoint,
        'isPublished[equals]true',
        { 
          limit: 100,
          orders: 'order,-createdAt'
        }
      );
    } catch (error) {
      console.warn('Failed to fetch all works:', error);
      return [];
    }
  }

  /**
   * タイプ別Works取得（フィルタリング用）
   */
  async getWorksByType(type: string): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      return [];
    }

    try {
      return await this.getWithFilters<WorkItem>(
        this.endpoint,
        `isPublished[equals]true[and]type[contains]${type}`,
        { 
          limit: 100,
          orders: 'order,-createdAt'
        }
      );
    } catch (error) {
      console.warn(`Failed to fetch works by type: ${type}`, error);
      return [];
    }
  }

  /**
   * 年度別Works取得
   */
  async getWorksByYear(year: string): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      return [];
    }

    try {
      return await this.getWithFilters<WorkItem>(
        this.endpoint,
        `isPublished[equals]true[and]year[equals]${year}`,
        { 
          limit: 100,
          orders: 'order,-createdAt'
        }
      );
    } catch (error) {
      console.warn(`Failed to fetch works by year: ${year}`, error);
      return [];
    }
  }

  /**
   * カテゴリ別Works取得
   */
  async getWorksByCategory(category: string): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      return [];
    }

    try {
      return await this.getWithFilters<WorkItem>(
        this.endpoint,
        `isPublished[equals]true[and]category[contains]${category}`,
        { 
          limit: 100,
          orders: 'order,-createdAt'
        }
      );
    } catch (error) {
      console.warn(`Failed to fetch works by category: ${category}`, error);
      return [];
    }
  }

  /**
   * 利用可能な年度一覧を取得
   */
  async getAvailableYears(): Promise<string[]> {
    try {
      const allWorks = await this.getAllWorks();
      const years = [...new Set(allWorks.map(work => work.year))];
      return years.sort((a, b) => b.localeCompare(a)); // 降順ソート
    } catch (error) {
      console.warn('Failed to fetch available years:', error);
      return ['2024', '2023', '2022'];
    }
  }

  /**
   * 利用可能なタイプ一覧を取得
   */
  async getAvailableTypes(): Promise<string[]> {
    try {
      const allWorks = await this.getAllWorks();
      const types = [...new Set(allWorks.map(work => workHelpers.getTypeString(work)))];
      return types;
    } catch (error) {
      console.warn('Failed to fetch available types:', error);
      return ['Webアプリ', 'Webサイト'];
    }
  }
}

// シングルトンインスタンス
export const worksDAL = new WorksDAL();
