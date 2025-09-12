import Link from 'next/link';

interface BlogSidebarProps {
  className?: string;
}

export default function BlogSidebar({ className = '' }: BlogSidebarProps) {
  const recentPosts = [
    {
      title: "Next.js App Routerでのパフォーマンス最適化",
      slug: "nextjs-performance",
      date: "2025-01-15"
    },
    {
      title: "TypeScriptの型安全性を高めるzod活用法",
      slug: "typescript-zod",
      date: "2025-01-10"
    },
    {
      title: "Tailwind CSSレスポンシブデザインパターン",
      slug: "tailwind-responsive",
      date: "2025-01-05"
    }
  ];

  const categories = [
    { name: "フロントエンド", slug: "frontend", count: 12 },
    { name: "パフォーマンス", slug: "performance", count: 8 },
    { name: "ツール・環境", slug: "tools", count: 6 },
    { name: "UI/UX", slug: "ui-ux", count: 4 }
  ];

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
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="recent-post">
              <h4 className="recent-post-title">{post.title}</h4>
              <time className="recent-post-date">{post.date}</time>
            </Link>
          ))}
        </div>
      </div>

      {/* カテゴリ */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">カテゴリ</h3>
        <div className="category-list">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/blog/category/${category.slug}`} 
              className="category-item"
            >
              <span className="category-name">{category.name}</span>
              <span className="category-count">({category.count})</span>
            </Link>
          ))}
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
