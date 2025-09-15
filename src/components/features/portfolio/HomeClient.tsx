"use client";
import { useState } from "react";
import Header from "@/components/layouts/Header";
import Particles from "@/components/common/animations/Particles";
import TechStackSlidePanel from "@/components/features/tech-stack/TechStackSlidePanel";
import SuccessNotification from "@/components/common/notifications/SuccessNotification";
import { useNotification } from "@/lib/contexts/NotificationContext";

/**
 * ホームページのクライアントサイド機能のみを担当
 * ヘッダー、パーティクル、技術スタックパネルの状態管理
 */
export default function HomeClient() {
  const [isTechStackPanelOpen, setIsTechStackPanelOpen] = useState(false);
  const { notification, hideNotification } = useNotification();

  const handleTechStackOpen = () => {
    setIsTechStackPanelOpen(true);
  };

  const handleTechStackClose = () => {
    setIsTechStackPanelOpen(false);
  };

  return (
    <>
      <SuccessNotification
        isVisible={notification.isVisible}
        onClose={hideNotification}
        title={notification.title}
        message={notification.message}
      />
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

