"use client";
import { useState } from "react";
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
import TechStackSlidePanel from "@/components/features/tech-stack/TechStackSlidePanel";

export default function Home() {
  const [isTechStackPanelOpen, setIsTechStackPanelOpen] = useState(false);

  const handleTechStackOpen = () => {
    setIsTechStackPanelOpen(true);
  };

  const handleTechStackClose = () => {
    setIsTechStackPanelOpen(false);
  };

  return (
    <>
      <div className="particles-background">
        <Particles />
      </div>
      <Header onTechStackOpen={handleTechStackOpen} />

      {/* Hero */}
      <section className="hero" aria-label="ヒーロー">
        <div className="container hero-grid">
          <div>
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
          <div className="hero-vis" aria-hidden>
            <CodeSphere />
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
                style={{ display: 'block', width: '300px', height: '300px', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h3 data-reveal="fade-left">YOUSUKE</h3>
              <p className="muted" data-reveal="fade-left">
                フロントエンドエンジニア歴8年 / React・Next.js専門
              </p>
              <p className="muted" data-reveal="fade-left">
                フロントエンドの設計・パフォーマンス最適化・モダンな開発体験の向上を追求。React/Next.js/TypeScriptを軸とした実践的な技術知識を共有しています。
              </p>
              <div className="chips" data-reveal="fade-left">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Vite",
                  "GraphQL",
                ].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 14 }} data-reveal="fade-left">
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

      {/* Posts */}
      <section id="posts">
        <div className="container">
          <h2 className="section-title" data-reveal="fade-up">Posts</h2>
          <p className="muted" data-reveal="fade-up" style={{ marginBottom: '24px' }}>
            microCMSで管理されたフロントエンド技術に関する記事を配信しています。
          </p>
          <div className="posts-grid">
            {[
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
            ].map((post, i) => (
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
      <RevealInit />
      <SmoothScroll />
      <ScrollTopButton />
      <TechStackSlidePanel 
        isOpen={isTechStackPanelOpen}
        onClose={handleTechStackClose}
      />
    </>
  );
}