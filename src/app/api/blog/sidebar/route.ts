import { NextRequest, NextResponse } from 'next/server';
import { dal } from '@/dal';

export async function POST(request: NextRequest) {
  try {
    // 最新記事を取得（サイドバー用に少なめ）
    const recentPosts = await dal.blog.getLatestPosts(5);
    
    // カテゴリ一覧を取得（カウント付き）
    const categoriesWithCount = await getCategoriesWithCount();
    
    return NextResponse.json(
      {
        recentPosts: recentPosts.map(post => ({
          title: post.title,
          slug: post.slug,
          publishedAt: post.publishedAt || post.createdAt
        })),
        categories: categoriesWithCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Blog sidebar API error:', error);
    return NextResponse.json(
      { error: 'サイドバーデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * カテゴリごとの記事数を取得する関数
 */
async function getCategoriesWithCount(): Promise<Array<{name: string; slug: string; count: number}>> {
  try {
    // 全記事を取得してカテゴリごとにグループ化
    const allPosts = await dal.blog.getPublishedPosts(1000); // 大きめの数値で全件取得
    
    // カテゴリごとの記事数をカウント
    const categoryCount = new Map<string, {name: string; slug: string; count: number}>();
    
    allPosts.forEach(post => {
      if (post.category) {
        const key = post.category.id;
        if (categoryCount.has(key)) {
          const existing = categoryCount.get(key)!;
          categoryCount.set(key, { ...existing, count: existing.count + 1 });
        } else {
          categoryCount.set(key, {
            name: post.category.name,
            slug: post.category.slug,
            count: 1
          });
        }
      }
    });
    
    return Array.from(categoryCount.values());
  } catch (error) {
    console.error('Failed to get categories with count:', error);
    return [];
  }
}
