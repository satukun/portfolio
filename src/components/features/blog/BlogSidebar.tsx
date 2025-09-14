'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogSidebarProps {
  className?: string;
}

interface RecentPost {
  title: string;
  slug: string;
  publishedAt: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface Tag {
  name: string;
  slug: string;
  count: number;
}

interface SidebarData {
  recentPosts: RecentPost[];
  categories: Category[];
  tags: Tag[];
}

export default function BlogSidebar({ className = '' }: BlogSidebarProps) {
  const [sidebarData, setSidebarData] = useState<SidebarData>({
    recentPosts: [],
    categories: [],
    tags: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await fetch('/api/blog/sidebar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('サイドバーデータの取得に失敗しました');
        }

        const data: SidebarData = await response.json();
        setSidebarData(data);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
        setError(error instanceof Error ? error.message : '不明なエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, [])

  return (
    <aside className={`blog-sidebar ${className}`}>
      
      {/* 検索 */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">記事を探す</h3>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="キーワードで検索..." 
            className="search-input"
          />
          <button className="search-btn" aria-label="検索">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      {/* 最新記事 */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">最新記事</h3>
        <div className="recent-posts">
          {loading ? (
            <div className="loading-message">読み込み中...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : sidebarData.recentPosts.length > 0 ? (
            sidebarData.recentPosts.map((post, index) => (
              <Link 
                key={`post-${post.slug || post.title || index}`} 
                href={`/blog/${post.slug || 'unknown'}`} 
                className="recent-post"
              >
                <h4 className="recent-post-title">{post.title}</h4>
                <time className="recent-post-date">
                  {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                </time>
              </Link>
            ))
          ) : (
            <div className="no-data-message">記事がありません</div>
          )}
        </div>
      </div>

      {/* カテゴリ */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">カテゴリ</h3>
        <div className="category-list">
          {loading ? (
            <div className="loading-message">読み込み中...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : sidebarData.categories.length > 0 ? (
            sidebarData.categories.map((category, index) => (
              <Link 
                key={`category-${category.slug || category.name || index}`} 
                href={`/blog/category/${category.slug || 'unknown'}`} 
                className="category-item"
              >
                <span className="category-name">{category.name}</span>
                <span className="category-count">({category.count})</span>
              </Link>
            ))
          ) : (
            <div className="no-data-message">カテゴリがありません</div>
          )}
        </div>
      </div>

      {/* タグ */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">タグ</h3>
        <div className="tag-cloud">
          {loading ? (
            <div className="loading-message">読み込み中...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : sidebarData.tags.length > 0 ? (
            sidebarData.tags.map((tag, index) => (
              <Link 
                key={`tag-${tag.slug || tag.name || index}`} 
                href={`/blog/tag/${tag.slug || 'unknown'}`} 
                className="tag-item"
              >
                {tag.name}
                <span className="tag-count">({tag.count})</span>
              </Link>
            ))
          ) : (
            <div className="no-data-message">タグがありません</div>
          )}
        </div>
      </div>

    </aside>
  );
}
