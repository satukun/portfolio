import Link from "next/link";

/**
 * トップページの記事セクション
 * 静的なサンプル記事を表示
 */
export default function PostsSection() {
  const samplePosts = [
    {
      title: "Next.js App Routerでのパフォーマンス最適化テクニック",
      summary: "Server Componentsを活用した効率的なレンダリング戦略について解説",
      date: "2025-01-15",
      tags: ["Next.js", "パフォーマンス"]
    },
    {
      title: "TypeScriptの型安全性を高めるzodとの組み合わせ方",
      summary: "API通信やフォームバリデーションでの実践的なzod活用法",
      date: "2025-01-10",
      tags: ["TypeScript", "zod"]
    },
    {
      title: "Tailwind CSSでのレスポンシブデザイン設計パターン",
      summary: "モバイルファーストなUIコンポーネント設計のベストプラクティス",
      date: "2025-01-05",
      tags: ["CSS", "UI/UX"]
    }
  ];

  return (
    <section id="posts">
      <div className="container">
        <h2 className="section-title" data-reveal="fade-up">Posts</h2>
        <p className="muted" data-reveal="fade-up" style={{ marginBottom: '24px' }}>
          microCMSで管理されたフロントエンド技術に関する記事を配信しています。
        </p>
        <div className="posts-grid">
          {samplePosts.map((post, i) => (
            <div key={i} className="post-card" data-reveal="scale">
              <div className="post-meta">
                <time>{post.date}</time>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
               <h3 className="post-title">{post.title}</h3>
               <p className="post-summary">{post.summary}</p>
               <Link href="/blog" className="btn cta">記事を読む</Link>
            </div>
          ))}
        </div>
        
        {/* More Posts Button */}
        <div className="posts-more" style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/blog" className="btn secondary more-posts-btn" data-reveal="fade-up">
            <span className="material-symbols-outlined" aria-hidden>arrow_forward</span>
            More Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
