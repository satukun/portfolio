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
import BlogSection from "@/components/features/blog/BlogSection";
import FollowSection from "@/components/features/portfolio/FollowSection";
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
      <HeroSection />

      {/* Profile */}
      <ProfileSection />

      {/* Tech Stack */}
      <TechStackSection />

      {/* Works */}
      <WorksSection />

      {/* Blog */}
      <BlogSection posts={latestPosts} />

      {/* Follow */}
      <FollowSection />

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
