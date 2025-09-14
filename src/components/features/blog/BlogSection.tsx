import Link from "next/link";
import { BlogPost } from "@/lib/types";

interface BlogSectionProps {
  posts: BlogPost[];
}

/**
 * ブログセクション
 * 最新のブログ記事を表示するセクション
 */
export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog">
      <div className="container">
        <h2 className="section-title" data-reveal="fade-up">Blog</h2>
        <p className="section-description" data-reveal="fade-up">
          フロントエンド技術に関する記事やノウハウを発信しています。
        </p>
        
        {posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => (
              <div key={post.id} className="blog-card" data-reveal="scale">
                <div className="blog-meta">
                  <time>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('ja-JP')}</time>
                  <div className="blog-tags">
                    {post.tags?.slice(0, 2).map((tag, tagIndex) => (
                      <span key={`${post.id}-tag-${tagIndex}`} className="tag" style={{ backgroundColor: tag.color }}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-summary">
                  {post.excerpt || post.content?.replace(/<[^>]*>/g, '').slice(0, 100) + '...'}
                </p>
                <Link href={`/blog/${post.slug}`} className="btn cta">記事を読む</Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-posts-message" data-reveal="fade-up">
            <p className="muted">記事を準備中です。しばらくお待ちください。</p>
          </div>
        )}
        
        {/* More Blog Button */}
        <div className="blog-more" style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/blog" className="btn secondary more-btn" data-reveal="fade-up">
            <span className="material-symbols-outlined" aria-hidden>arrow_forward</span>
            More Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
