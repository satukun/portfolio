"use client";
import { useState } from "react";
import WorksGrid from "./WorksGrid";
import WorksSlidePanel from "./WorksSlidePanel";
import { WorkItem } from "@/lib/types";

interface WorksClientProps {
  featuredWorks: WorkItem[];
  allWorks: WorkItem[];
}

/**
 * Works クライアントコンポーネント
 * スライドパネルの開閉等のクライアントサイド状態管理を担当
 */
export default function WorksClient({ featuredWorks, allWorks }: WorksClientProps) {
  const [isSlideOpen, setIsSlideOpen] = useState(false);

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
