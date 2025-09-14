"use client";
import { useState } from "react";
import Header from "@/components/layouts/Header";
import Particles from "@/components/common/animations/Particles";
import TechStackSlidePanel from "@/components/features/tech-stack/TechStackSlidePanel";

/**
 * ホームページのクライアントサイド機能のみを担当
 * ヘッダー、パーティクル、技術スタックパネルの状態管理
 */
export default function HomeClient() {
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
      
      <TechStackSlidePanel 
        isOpen={isTechStackPanelOpen}
        onClose={handleTechStackClose}
      />
    </>
  );
}
