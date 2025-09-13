import { MicroCMSBaseClient } from '../microcms-client';
import { WorkItem } from '@/lib/types';
import { MicroCMSWorkItem } from '@/lib/types/microcms-work';

/**
 * microCMS WorkItem を既存の WorkItem 型に変換
 */
function convertMicroCMSWork(microCMSWork: MicroCMSWorkItem): WorkItem {
  return {
    id: microCMSWork.id,
    title: microCMSWork.title,
    description: microCMSWork.description,
    thumbnail: microCMSWork.thumbnail.url,
    techStack: microCMSWork.techStack.split(',').map(tech => tech.trim()),
    category: microCMSWork.category,
    year: microCMSWork.year,
    type: microCMSWork.type[0] as "Webアプリ" | "Webサイト", // 配列の最初の要素を使用
    // 追加フィールド（既存のWorkItem型にはないが、モーダル表示で使用可能）
    content: microCMSWork.content,
    images: microCMSWork.images?.map(img => img.url) || [],
    duration: microCMSWork.duration,
    role: microCMSWork.role,
    client: microCMSWork.client,
    challenge: microCMSWork.challenge,
    solution: microCMSWork.solution,
    result: microCMSWork.result,
    liveUrl: microCMSWork.liveUrl,
    githubUrl: microCMSWork.githubUrl,
    status: microCMSWork.status?.[0],
    isFeatured: microCMSWork.isFeatured,
    isPublished: microCMSWork.isPublished,
    order: microCMSWork.order
  } as WorkItem;
}

/**
 * Works（制作実績）データアクセス層
 * Works関連のすべてのデータ取得ロジックを集約
 */
export class WorksDAL extends MicroCMSBaseClient {
  private readonly endpoint = 'works';

  /**
   * 注目Works（トップページ用）を取得
   * isFeatured=true または最新3件を取得
   */
  async getFeaturedWorks(limit: number = 3): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      // 環境変数未設定時はサンプルデータを返す
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.slice(0, limit);
    }

    try {
      // まず注目プロジェクトを取得
      const featuredWorksRaw = await this.getWithFilters<MicroCMSWorkItem>(
        this.endpoint,
        'isPublished[equals]true[and]isFeatured[equals]true',
        { 
          limit,
          orders: 'order'
        }
      );
      const featuredWorks = featuredWorksRaw.map(convertMicroCMSWork);

      // 注目プロジェクトが不足している場合、最新のものを追加
      if (featuredWorks.length < limit) {
        const latestWorksRaw = await this.getWithFilters<MicroCMSWorkItem>(
          this.endpoint,
          'isPublished[equals]true',
          { 
            limit: limit - featuredWorks.length,
            orders: '-createdAt'
          }
        );
        const latestWorks = latestWorksRaw.map(convertMicroCMSWork);

        // 重複を除いて結合
        const featuredIds = new Set(featuredWorks.map(w => w.id));
        const additionalWorks = latestWorks.filter(w => !featuredIds.has(w.id));
        
        return [...featuredWorks, ...additionalWorks].slice(0, limit);
      }

      return featuredWorks;
    } catch (error) {
      console.warn('Failed to fetch featured works:', error);
      // フォールバック: サンプルデータを返す
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.slice(0, limit);
    }
  }

  /**
   * 全Works取得（スライドパネル用）
   */
  async getAllWorks(): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks;
    }

    try {
      const worksRaw = await this.getWithFilters<MicroCMSWorkItem>(
        this.endpoint,
        'isPublished[equals]true',
        { 
          limit: 100,
          orders: 'order,-createdAt'
        }
      );
      return worksRaw.map(convertMicroCMSWork);
    } catch (error) {
      console.warn('Failed to fetch all works:', error);
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks;
    }
  }

  /**
   * タイプ別Works取得（フィルタリング用）
   */
  async getWorksByType(type: string): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.filter(work => work.type === type);
    }

    try {
      const worksRaw = await this.getWithFilters<MicroCMSWorkItem>(
        this.endpoint,
        `isPublished[equals]true[and]type[contains]${type}`,
        { 
          limit: 100,
          orders: 'order,-createdAt'
        }
      );
      return worksRaw.map(convertMicroCMSWork);
    } catch (error) {
      console.warn(`Failed to fetch works by type: ${type}`, error);
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.filter(work => work.type === type);
    }
  }

  /**
   * 年度別Works取得
   */
  async getWorksByYear(year: string): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.filter(work => work.year === year);
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
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.filter(work => work.year === year);
    }
  }

  /**
   * カテゴリ別Works取得
   */
  async getWorksByCategory(category: string): Promise<WorkItem[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.filter(work => work.category === category);
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
      const { sampleWorks } = await import('@/lib/constants');
      return sampleWorks.filter(work => work.category === category);
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
      const types = [...new Set(allWorks.map(work => work.type))];
      return types;
    } catch (error) {
      console.warn('Failed to fetch available types:', error);
      return ['Webアプリ', 'Webサイト'];
    }
  }
}

// シングルトンインスタンス
export const worksDAL = new WorksDAL();
