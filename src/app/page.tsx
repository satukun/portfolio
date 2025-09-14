import HomeClient from "@/components/features/portfolio/HomeClient";
import HeroSection from "@/components/features/portfolio/HeroSection";
import ProfileSection from "@/components/features/portfolio/ProfileSection";
import TechStackSection from "@/components/features/tech-stack/TechStackSection";
import WorksSection from "@/components/features/works/WorksSection";
import PostsSection from "@/components/features/portfolio/PostsSection";
import FollowSection from "@/components/features/portfolio/FollowSection";
import Footer from "@/components/layouts/Footer";
import RevealInit from "@/components/common/animations/RevealInit";
import SmoothScroll from "@/components/layouts/SmoothScroll";
import ScrollTopButton from "@/components/common/buttons/ScrollTopButton";

export default function Home() {
  return (
    <>
      <HomeClient />
      
      {/* Server Components */}
      <HeroSection />
      <ProfileSection />
      <TechStackSection />
      <WorksSection />
      
      {/* Posts */}
      <PostsSection />
      
      <FollowSection />
      <Footer />
      <RevealInit />
      <SmoothScroll />
      <ScrollTopButton />
    </>
  );
}