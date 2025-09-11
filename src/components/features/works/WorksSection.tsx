"use client";
import { useState } from "react";
import WorksGrid from "./WorksGrid";
import WorksSlidePanel from "./WorksSlidePanel";
import { WorkItem } from "@/lib/types";
import { sampleWorks } from "@/lib/constants";


export default function WorksSection() {
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  
  // 最初に表示する3つの案件
  const featuredWorks = sampleWorks.slice(0, 3);
  // スライドパネルで表示する全ての案件
  const allWorks = sampleWorks;

  const handleMoreClick = () => {
    setIsSlideOpen(true);
  };

  const handleSlideClose = () => {
    setIsSlideOpen(false);
  };

  return (
    <>
      <section id="works" className="section-works">
        <div className="container">
          <h2 className="section-title" data-reveal="fade-up">Works</h2>
          <p className="muted" data-reveal="fade-up">
            これまでに参加した主要なプロジェクトと開発案件をご紹介します。
          </p>
          
          <WorksGrid 
            works={featuredWorks} 
            columns={3} 
            showMore={true}
            onMoreClick={handleMoreClick}
          />
        </div>
      </section>

      <WorksSlidePanel 
        isOpen={isSlideOpen}
        onClose={handleSlideClose}
        works={allWorks}
      />
    </>
  );
}
