import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Particles from "@/components/common/animations/Particles";
import CodeSphere from "@/components/common/animations/CodeSphere";
import ScrollTopButton from "@/components/common/buttons/ScrollTopButton";
import RevealInit from "@/components/common/animations/RevealInit";
import WorksSection from "@/components/features/works/WorksSection";
import TechStackSection from "@/components/features/tech-stack/TechStackSection";
import SmoothScroll from "@/components/layouts/SmoothScroll";
import { dal } from "@/dal";
import { BlogPost } from "@/lib/types";

export default async function Home() {
  // 並列データ取得でパフォーマンス最適化（Next.jsベストプラクティス）
  let latestPosts: BlogPost[];
  
  try {
    [latestPosts] = await Promise.all([
      dal.blog.getLatestPosts(9)
      // 将来的に他のデータも並列取得可能
    ]);
  } catch (error) {
    console.error('Failed to fetch data for home page:', error);
    // フォールバック: 空配列で継続動作
    latestPosts = [];
  }

  return (
    <>
      <div className="particles-background">
        <Particles />
      </div>
      <Header />

      {/* Hero */}
      <section className="hero" aria-label="ヒーロー">
        <div className="hero-background" aria-hidden>
          <CodeSphere width={800} height={600} />
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              フロントエンドエンジニアとして
              <br />
              技術知見を共有・発信
            </h1>
            <p className="lead">
              フロントエンドの最新技術・ベストプラクティスを実務経験を通じて発信しています。
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="#posts">最新記事を見る</a>
              <a className="btn secondary" href="#profile">プロフィールを見る</a>
            </div>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="section-profile">
        <div className="container">
          <h2 className="section-title" data-reveal="fade-up">Profile</h2>
          <div className="profile">
            <div className="avatar-xl" data-reveal="scale">
              <img
                src="/profile_image/sandaga.svg"
                alt="YOUSUKE"
                width={300}
                height={300}
                style={{ display: 'block', width: '300px', height: '300px', objectFit: 'cover',transform:'scale(1.1)' }}
              />
            </div>
            <div>
              <h3 data-reveal="fade-right">YOUSUKE</h3>
              <p className="muted" data-reveal="fade-right">
                エンジニア歴10年以上 / フロントエンド×AI活用
              </p>
              <p className="muted" data-reveal="fade-right">
                実務で使える生成AI活用を、エンジニア視点で検証・発信しています。フロントエンドの実装においてもAIツールを積極的に活用し、開発効率と品質向上を追求しています。
              </p>
              <div className="chips" data-reveal="fade-right">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Vite",
                  "GraphQL"
                ].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 14 }} data-reveal>
                <a className="btn secondary icon-btn" href="https://note.com/akira_papa_ai" target="_blank" title="note">
                  <span className="material-symbols-outlined">article</span>
                  note
                </a>
                <span style={{ display: "inline-block", width: 8 }} />
                <a className="btn primary icon-btn" href="https://github.com/yousuke" target="_blank" title="GitHub">
                  <span className="material-symbols-outlined">code</span>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackSection />

      {/* Works */}
      <WorksSection />

      {/* Blog */}
      <section id="blog">
        <div className="container">
          <h2 className="section-title" data-reveal="fade-up">Blog</h2>
          <p className="muted" data-reveal="fade-up" style={{ marginBottom: '24px' }}>
            フロントエンド技術に関する記事やノウハウを発信しています。
          </p>
          {latestPosts.length > 0 ? (
            <div className="blog-grid">
              {latestPosts.map((post) => (
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
                   <p className="blog-summary">{post.excerpt || post.content?.replace(/<[^>]*>/g, '').slice(0, 100) + '...'}</p>
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

      {/* Follow */}
      <section id="contact">
        <div className="container">
          <h2 className="section-title" data-reveal="fade-up">Follow</h2>
          <p className="muted" data-reveal="fade-up">
            フロントエンドの最新技術・開発ノウハウを各プラットフォームで発信中。
          </p>
          <div className="follow-grid" style={{ marginTop: 16 }}>
            <a className="sns-card" href="https://note.com/akira_papa_ai" target="_blank" data-reveal="fade-left">
              <strong>note</strong>
              <svg className="float-icon" width="48" height="48" viewBox="0 0 24 24" fill="#10b981"><path d="M3 5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm14 1.5V8h2.5L17 6.5z"/></svg>
            </a>
            <a className="sns-card" href="https://github.com/yousuke" target="_blank" data-reveal="fade-right">
              <strong>GitHub</strong>
              <svg className="float-icon" width="48" height="48" viewBox="0 0 24 24" fill="#0f172a"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ScriptTags />
      <RevealInit />
      <SmoothScroll />
      <ScrollTopButton />
    </>
  );
}

function ScriptTags() {
  return (
    <>
      {/* Twitter widgets for embeds (loads on client) */}
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
    </>
  );
}

// ScrollTopButton moved to a client component
