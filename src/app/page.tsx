import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Particles from "@/components/common/animations/Particles";
import ScrollTopButton from "@/components/common/buttons/ScrollTopButton";
import RevealInit from "@/components/common/animations/RevealInit";
import SmoothScroll from "@/components/layouts/SmoothScroll";
import HeroSection from "@/components/features/portfolio/HeroSection";
import ProfileSection from "@/components/features/portfolio/ProfileSection";
import TechStackSection from "@/components/features/tech-stack/TechStackSection";
import WorksSection from "@/components/features/works/WorksSection";
import FollowSection from "@/components/features/portfolio/FollowSection";
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
      <HeroSection />

      {/* Profile */}
      <ProfileSection />

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
      <FollowSection />

      <Footer />
      <ScriptTags />
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
