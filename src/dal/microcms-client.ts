import { MicroCMSListResponse } from '@/lib/types';

const API_KEY = process.env.MICROCMS_API_KEY;
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const HAS_ENV = Boolean(API_KEY && SERVICE_DOMAIN);
const BASE_URL = HAS_ENV ? `https://${SERVICE_DOMAIN}.microcms.io/api/v1` : '';

if (!HAS_ENV) {
  console.warn('MicroCMS environment variables are not set');
}

/**
 * MicroCMS API基盤クライアント
 * 全てのmicroCMS APIアクセスの基盤となるクラス
 */
export class MicroCMSBaseClient {
  protected headers: HeadersInit;

  constructor() {
    this.headers = {
      'X-MICROCMS-API-KEY': API_KEY || '',
      'Content-Type': 'application/json',
    };
  }

  /**
   * 基本的なGETリクエスト
   */
  protected async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    if (!HAS_ENV) {
      throw new Error('MicroCMS environment variables are not configured');
    }

    const url = new URL(`${BASE_URL}/${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        headers: this.headers,
        next: { revalidate: 60 } // 1分間キャッシュ
      });

      if (!response.ok) {
        throw new Error(`MicroCMS API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * リスト形式のAPIから全件取得
   */
  protected async getAll<T>(endpoint: string, params?: Record<string, string | number>): Promise<T[]> {
    if (!HAS_ENV) {
      return [];
    }

    try {
      const response = await this.get<MicroCMSListResponse<T>>(endpoint, {
        limit: 100, // 最大取得数
        ...params
      });
      return response.contents;
    } catch (error) {
      console.warn(`Failed to fetch all from ${endpoint}:`, error);
      return [];
    }
  }

  /**
   * IDで単一コンテンツを取得
   */
  protected async getById<T>(endpoint: string, id: string): Promise<T | null> {
    if (!HAS_ENV) {
      return null;
    }

    try {
      return await this.get<T>(`${endpoint}/${id}`);
    } catch (error) {
      console.warn(`Failed to fetch ${endpoint}/${id}:`, error);
      return null;
    }
  }

  /**
   * フィルタ条件で取得
   */
  protected async getWithFilters<T>(
    endpoint: string, 
    filters: string, 
    params?: Record<string, string | number>
  ): Promise<T[]> {
    if (!HAS_ENV) {
      return [];
    }

    try {
      const response = await this.get<MicroCMSListResponse<T>>(endpoint, {
        filters,
        ...params
      });
      return response.contents;
    } catch (error) {
      console.warn(`Failed to fetch filtered ${endpoint}:`, error);
      return [];
    }
  }

  /**
   * 環境変数の設定状況を確認
   */
  public static hasEnvironment(): boolean {
    return HAS_ENV;
  }
}

/**
 * 日付フォーマット用ユーティリティ
 */
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
