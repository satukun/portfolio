import { MicroCMSBaseClient } from '../microcms-client';

/**
 * 技術スタックの型定義（microCMS対応版）
 */
export interface TechStack {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Design' | 'Mobile' | 'Other';
  proficiencyLevel: number; // 1-100
  yearsOfExperience: number;
  isActive: boolean;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 技術スタックデータアクセス層
 * 技術スタック関連のすべてのデータ取得ロジックを集約
 */
export class TechStackDAL extends MicroCMSBaseClient {
  private readonly endpoint = 'tech-stacks';

  /**
   * 全技術スタックを取得
   */
  async getAllTechStacks(): Promise<TechStack[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      // フォールバック: 静的データを返す
      return [
        { id: '1', name: 'React', category: 'Frontend', proficiencyLevel: 95, yearsOfExperience: 5, isActive: true, color: '#61DAFB', createdAt: '', updatedAt: '' },
        { id: '2', name: 'Next.js', category: 'Frontend', proficiencyLevel: 90, yearsOfExperience: 3, isActive: true, color: '#000000', createdAt: '', updatedAt: '' },
        { id: '3', name: 'TypeScript', category: 'Frontend', proficiencyLevel: 88, yearsOfExperience: 4, isActive: true, color: '#3178C6', createdAt: '', updatedAt: '' },
        { id: '4', name: 'Tailwind CSS', category: 'Frontend', proficiencyLevel: 85, yearsOfExperience: 2, isActive: true, color: '#06B6D4', createdAt: '', updatedAt: '' },
        { id: '5', name: 'Node.js', category: 'Backend', proficiencyLevel: 80, yearsOfExperience: 4, isActive: true, color: '#339933', createdAt: '', updatedAt: '' },
        { id: '6', name: 'GraphQL', category: 'Backend', proficiencyLevel: 75, yearsOfExperience: 2, isActive: true, color: '#E10098', createdAt: '', updatedAt: '' }
      ];
    }

    try {
      return await this.getAll<TechStack>(this.endpoint, {
        orders: 'category,proficiencyLevel'
      });
    } catch (error) {
      console.warn('Failed to fetch tech stacks:', error);
      return [];
    }
  }

  /**
   * カテゴリ別技術スタック取得
   */
  async getTechStacksByCategory(category: string): Promise<TechStack[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      const allStacks = await this.getAllTechStacks();
      return allStacks.filter(stack => stack.category === category);
    }

    try {
      return await this.getWithFilters<TechStack>(
        this.endpoint,
        `category[equals]${category}`,
        { 
          orders: '-proficiencyLevel'
        }
      );
    } catch (error) {
      console.warn(`Failed to fetch tech stacks by category: ${category}`, error);
      return [];
    }
  }

  /**
   * アクティブな技術スタックのみ取得
   */
  async getActiveTechStacks(): Promise<TechStack[]> {
    if (!MicroCMSBaseClient.hasEnvironment()) {
      const allStacks = await this.getAllTechStacks();
      return allStacks.filter(stack => stack.isActive);
    }

    try {
      return await this.getWithFilters<TechStack>(
        this.endpoint,
        'isActive[equals]true',
        { 
          orders: 'category,-proficiencyLevel'
        }
      );
    } catch (error) {
      console.warn('Failed to fetch active tech stacks:', error);
      return [];
    }
  }

  /**
   * 技術チャート用データ取得
   */
  async getTechStacksForChart(): Promise<{
    frontend: TechStack[];
    backend: TechStack[];
    tools: TechStack[];
    design: TechStack[];
  }> {
    try {
      const allStacks = await this.getActiveTechStacks();
      
      return {
        frontend: allStacks.filter(s => s.category === 'Frontend'),
        backend: allStacks.filter(s => s.category === 'Backend'),
        tools: allStacks.filter(s => ['DevOps', 'Other'].includes(s.category)),
        design: allStacks.filter(s => s.category === 'Design')
      };
    } catch (error) {
      console.warn('Failed to fetch tech stacks for chart:', error);
      return {
        frontend: [],
        backend: [],
        tools: [],
        design: []
      };
    }
  }

  /**
   * 習熟度上位の技術を取得
   */
  async getTopTechStacks(limit: number = 10): Promise<TechStack[]> {
    try {
      const allStacks = await this.getActiveTechStacks();
      return allStacks
        .sort((a, b) => b.proficiencyLevel - a.proficiencyLevel)
        .slice(0, limit);
    } catch (error) {
      console.warn('Failed to fetch top tech stacks:', error);
      return [];
    }
  }
}

// シングルトンインスタンス
export const techStackDAL = new TechStackDAL();
