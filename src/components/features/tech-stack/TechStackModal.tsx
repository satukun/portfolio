"use client";
import { useEffect } from "react";

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TechCategory {
  name: string;
  icon: string;
  technologies: TechItem[];
}

interface TechItem {
  name: string;
  level: number; // 1-5のレベル
  description: string;
}

const techStackData: TechCategory[] = [
  {
    name: "フロントエンド",
    icon: "web",
    technologies: [
      { name: "Next.js 14", level: 5, description: "App Routerを使用したモダンReactフレームワーク" },
      { name: "TypeScript", level: 5, description: "型安全性とコード品質の向上" },
      { name: "React 18", level: 5, description: "Server ComponentsとClient Components" },
      { name: "CSS Variables", level: 4, description: "カスタムプロパティによるテーマシステム" }
    ]
  },
  {
    name: "スタイリング・アニメーション",
    icon: "palette",
    technologies: [
      { name: "CSS Grid", level: 5, description: "レスポンシブレイアウトシステム" },
      { name: "CSS Animations", level: 4, description: "スムーズなトランジションとホバー効果" },
      { name: "Intersection Observer", level: 4, description: "スクロールアニメーション（data-reveal）" },
      { name: "CSS Backdrop Filter", level: 3, description: "モーダル背景のブラー効果" }
    ]
  },
  {
    name: "開発・デプロイ",
    icon: "rocket_launch",
    technologies: [
      { name: "Vercel", level: 5, description: "Next.jsに最適化されたホスティング" },
      { name: "Git", level: 5, description: "バージョン管理とコード履歴" },
      { name: "ESLint", level: 4, description: "コード品質とスタイル統一" },
      { name: "Cursor", level: 5, description: "AI支援による効率的な開発" }
    ]
  },
  {
    name: "ユーザー体験",
    icon: "favorite",
    technologies: [
      { name: "Progressive Enhancement", level: 4, description: "段階的機能向上によるアクセシビリティ" },
      { name: "Responsive Design", level: 5, description: "モバイルファーストなレスポンシブ対応" },
      { name: "Dark Mode", level: 4, description: "ライト・ダークテーマの切り替え" },
      { name: "Performance Optimization", level: 4, description: "画像最適化と遅延読み込み" }
    ]
  }
];

export default function TechStackModal({ isOpen, onClose }: TechStackModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
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

  const getLevelColor = (level: number) => {
    switch (level) {
      case 5: return '#10b981'; // green
      case 4: return '#3b82f6'; // blue
      case 3: return '#f59e0b'; // amber
      case 2: return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getLevelText = (level: number) => {
    switch (level) {
      case 5: return 'エキスパート';
      case 4: return '上級';
      case 3: return '中級';
      case 2: return '初級';
      default: return '学習中';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="tech-modal-overlay" onClick={onClose}>
      <div className="tech-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="tech-modal-header">
          <h2>このサイトの技術スタック</h2>
          <button className="tech-modal-close" onClick={onClose} aria-label="Close modal">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="tech-modal-body">
          <p className="tech-modal-intro">
            このポートフォリオサイトで使用している技術スタックをご紹介します。
            モダンなフロントエンド技術とAI支援開発ツールを活用して構築されています。
          </p>
          
          <div className="tech-categories">
            {techStackData.map((category, index) => (
              <div key={index} className="tech-category">
                <div className="tech-category-header">
                  <span className="material-symbols-outlined tech-category-icon">
                    {category.icon}
                  </span>
                  <h3>{category.name}</h3>
                </div>
                
                <div className="tech-items">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-item">
                      <div className="tech-item-header">
                        <span className="tech-name">{tech.name}</span>
                        <div className="tech-level">
                          <span 
                            className="tech-level-badge"
                            style={{ backgroundColor: getLevelColor(tech.level) }}
                          >
                            {getLevelText(tech.level)}
                          </span>
                        </div>
                      </div>
                      <p className="tech-description">{tech.description}</p>
                      <div className="tech-progress">
                        <div 
                          className="tech-progress-bar"
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
  );
}
