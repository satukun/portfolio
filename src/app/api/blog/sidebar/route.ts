import { NextResponse } from 'next/server';
import { dal } from '@/dal';

export async function POST() {
  try {
    // 最新記事を取得（サイドバー用に3件まで）
    const recentPosts = await dal.blog.getLatestPosts(3);
    
    // カテゴリ一覧を取得（カウント付き）
    const categoriesWithCount = await getCategoriesWithCount();
    
    // タグ一覧を取得（カウント付き）
    const tagsWithCount = await getTagsWithCount();
    
    return NextResponse.json(
      {
        recentPosts: recentPosts.map(post => ({
          title: post.title,
          slug: post.slug,
          publishedAt: post.publishedAt || post.createdAt
        })),
        categories: categoriesWithCount,
        tags: tagsWithCount
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
    // 記事数を制限して全記事を取得してカテゴリごとにグループ化
    const allPosts = await dal.blog.getPublishedPosts(100);
    console.log('Categories - Total posts fetched:', allPosts.length);
    
    // カテゴリごとの記事数をカウント
    const categoryCount = new Map<string, {name: string; slug: string; count: number}>();
    
    allPosts.forEach(post => {
      if (post.category) {
        const key = post.category.id || post.category.name;
        if (categoryCount.has(key)) {
          const existing = categoryCount.get(key)!;
          categoryCount.set(key, { ...existing, count: existing.count + 1 });
        } else {
          categoryCount.set(key, {
            name: post.category.name,
            slug: post.category.slug || post.category.name.toLowerCase().replace(/\s+/g, '-'),
            count: 1
          });
        }
      }
    });
    
    const categories = Array.from(categoryCount.values());
    console.log('Categories found:', categories);
    return categories;
  } catch (error) {
    console.error('Failed to get categories with count:', error);
    return [];
  }
}

/**
 * タグごとの記事数を取得する関数
 */
async function getTagsWithCount(): Promise<Array<{name: string; slug: string; count: number}>> {
  try {
    // 全記事を取得してタグごとにグループ化
    const allPosts = await dal.blog.getPublishedPosts(100);
    console.log('Tags - Total posts fetched:', allPosts.length);
    
    // タグごとの記事数をカウント
    const tagCount = new Map<string, {name: string; slug: string; count: number}>();
    
    allPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          const key = tag.id || tag.name;
          if (tagCount.has(key)) {
            const existing = tagCount.get(key)!;
            tagCount.set(key, { ...existing, count: existing.count + 1 });
          } else {
            tagCount.set(key, {
              name: tag.name,
              slug: tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-'),
              count: 1
            });
          }
        });
      }
    });
    
    const tags = Array.from(tagCount.values())
      .sort((a, b) => b.count - a.count) // 記事数でソート
      .slice(0, 10); // 上位10件に制限
    
    console.log('Tags found:', tags);
    return tags;
  } catch (error) {
    console.error('Failed to get tags with count:', error);
    return [];
  }
}
