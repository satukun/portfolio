"use client";
import { useState } from "react";
import TechStackChart from "./TechStackChart";
import TechStackSlidePanel from "./TechStackSlidePanel";

/**
 * 技術スタッククライアントコンポーネント
 * スライドパネルの開閉等のクライアントサイド状態管理を担当
 */
export default function TechStackClient() {
  const [isTechStackPanelOpen, setIsTechStackPanelOpen] = useState(false);

  const handleTechStackOpen = () => {
    setIsTechStackPanelOpen(true);
  };

  const handleTechStackClose = () => {
    setIsTechStackPanelOpen(false);
  };

  return (
    <>
      <section id="tech-stack" className="section-tech-stack">
        <div className="container">
          <h2 className="section-title" data-reveal="fade-up">技術スタック</h2>
          <p className="muted" data-reveal="fade-up">
            フロントエンド開発を中心とした技術スキルの可視化チャートです。各技術の習熟度を表示しています。
          </p>
          <div className="tech-stack-container" data-reveal="scale">
            <TechStackChart />
          </div>
        </div>
      </section>

      <TechStackSlidePanel 
        isOpen={isTechStackPanelOpen}
        onClose={handleTechStackClose}
      />
    </>
  );
}
