import HomeClient from "@/components/features/portfolio/HomeClient";
import HeroSection from "@/components/features/portfolio/HeroSection";
import ProfileSection from "@/components/features/portfolio/ProfileSection";
import TechStackSection from "@/components/features/tech-stack/TechStackSection";
import WorksSection from "@/components/features/works/WorksSection";
import BlogSection from "@/components/features/blog/BlogSection";
import FollowSection from "@/components/features/portfolio/FollowSection";
import Footer from "@/components/layouts/Footer";
import RevealInit from "@/components/common/animations/RevealInit";
import SmoothScroll from "@/components/layouts/SmoothScroll";
import ScrollTopButton from "@/components/common/buttons/ScrollTopButton";
import { dal } from "@/dal";

export default async function Home() {
  // 実際のmicroCMS記事を取得
  let latestPosts;
  try {
    latestPosts = await dal.blog.getLatestPosts(3); // 最新3件を取得
  } catch (error) {
    console.error('Failed to fetch latest posts:', error);
    latestPosts = []; // エラー時は空配列
  }
  return (
    <>
      <HomeClient />
      
      {/* Server Components */}
      <HeroSection />
      <ProfileSection />
      <TechStackSection />
      <WorksSection />
      
      {/* Blog */}
      <BlogSection posts={latestPosts} />
      
      <FollowSection />
      <Footer />
      <RevealInit />
      <SmoothScroll />
      <ScrollTopButton />
    </>
  );
}