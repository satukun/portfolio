"use client";
import { useEffect } from "react";
// import { TechCategory } from "@/lib/types";
import { techStackData } from "@/lib/constants";
import { getLevelColor, getLevelText } from "@/lib/utils";

interface TechStackSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function TechStackSlidePanel({ isOpen, onClose }: TechStackSlidePanelProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div className={`tech-slide-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className={`tech-slide-panel ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="tech-slide-panel-header">
            <h2>このサイトの技術スタック</h2>
            <button className="tech-slide-panel-close" onClick={onClose} aria-label="Close panel">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="tech-slide-panel-content">
            <p className="tech-slide-panel-intro">
              このポートフォリオサイトで使用している技術スタックをご紹介します。
              モダンなフロントエンド技術とAI支援開発ツールを活用して構築されています。
            </p>
            
            <div className="tech-slide-categories">
              {techStackData.map((category, index) => (
                <div key={index} className="tech-slide-category">
                  <div className="tech-slide-category-header">
                    <span className="material-symbols-outlined tech-slide-category-icon">
                      {category.icon}
                    </span>
                    <h3>{category.name}</h3>
                  </div>
                  
                  <div className="tech-slide-items">
                    {category.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="tech-slide-item">
                        <div className="tech-slide-item-header">
                          <span className="tech-slide-name">{tech.name}</span>
                          <div className="tech-slide-level">
                            <span 
                              className="tech-slide-level-badge"
                              style={{ backgroundColor: getLevelColor(tech.level) }}
                            >
                              {getLevelText(tech.level)}
                            </span>
                          </div>
                        </div>
                        <p className="tech-slide-description">{tech.description}</p>
                        <div className="tech-slide-progress">
                          <div 
                            className="tech-slide-progress-bar"
                            style={{ 
                              width: `${tech.level * 20}%`,
                              backgroundColor: getLevelColor(tech.level)
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
