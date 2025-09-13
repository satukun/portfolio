import { NextRequest, NextResponse } from 'next/server';
import { dal } from '@/dal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { offset = 0, limit = 12, orders = '-publishedAt', filters } = body;

    const response = await dal.blog.getBlogPosts({
      offset,
      limit,
      orders,
      filters
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'ブログ記事の取得に失敗しました' },
      { status: 500 }
    );
  }
}
