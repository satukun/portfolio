'use client';

import { useState, useCallback } from 'react';
import { BlogPost } from '@/lib/types';
import BlogList from './BlogList';

interface InitialData {
  posts: BlogPost[];
  totalCount: number;
  hasMore: boolean;
}

interface BlogPageClientProps {
  initialData: InitialData;
}


export default function BlogPageClient({ initialData }: BlogPageClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialData.posts);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offset: posts.length,
          limit: 12,
          orders: '-publishedAt',
          filters: 'isPublished[equals]true'
        }),
      });

      if (!response.ok) {
        throw new Error('記事の読み込みに失敗しました');
      }

      const data = await response.json();
      
      setPosts(prevPosts => [...prevPosts, ...data.contents]);
      setHasMore(posts.length + data.contents.length < data.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  }, [posts.length, loading, hasMore]);

  // 初期データが空の場合の処理
  if (initialData.posts.length === 0 && !loading) {
    return (
      <div className="blog-empty">
        <div className="blog-empty-content">
          <span className="material-symbols-outlined blog-empty-icon">article</span>
          <h3>記事がありません</h3>
          <p>まだ公開された記事がありません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page-client">
      <BlogList 
        posts={posts}
        showLoadMore={hasMore}
        onLoadMore={loadMorePosts}
        loading={loading}
      />
      
      {error && (
        <div className="blog-error">
          <div className="blog-error-content">
            <span className="material-symbols-outlined blog-error-icon">error</span>
            <p>{error}</p>
            <button 
              className="btn primary blog-retry-btn"
              onClick={loadMorePosts}
            >
              再試行
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
