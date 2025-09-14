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

interface SidebarData {
  recentPosts: RecentPost[];
  categories: Category[];
}

export default function BlogSidebar({ className = '' }: BlogSidebarProps) {
  const [sidebarData, setSidebarData] = useState<SidebarData>({
    recentPosts: [],
    categories: []
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

  const tags = [
    { name: "React", slug: "react", count: 15 },
    { name: "Next.js", slug: "nextjs", count: 12 },
    { name: "TypeScript", slug: "typescript", count: 10 },
    { name: "CSS", slug: "css", count: 8 },
    { name: "JavaScript", slug: "javascript", count: 7 },
    { name: "Vite", slug: "vite", count: 5 }
  ];

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
            sidebarData.recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="recent-post">
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
            sidebarData.categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/blog/category/${category.slug}`} 
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
          {tags.map((tag) => (
            <Link 
              key={tag.slug} 
              href={`/blog/tag/${tag.slug}`} 
              className="tag-item"
            >
              {tag.name}
              <span className="tag-count">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* アーカイブ */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">アーカイブ</h3>
        <div className="archive-list">
          <Link href="/blog/2025/01" className="archive-item">
            <span>2025年1月</span>
            <span className="archive-count">(8)</span>
          </Link>
          <Link href="/blog/2024/12" className="archive-item">
            <span>2024年12月</span>
            <span className="archive-count">(12)</span>
          </Link>
          <Link href="/blog/2024/11" className="archive-item">
            <span>2024年11月</span>
            <span className="archive-count">(10)</span>
          </Link>
        </div>
      </div>

    </aside>
  );
}
