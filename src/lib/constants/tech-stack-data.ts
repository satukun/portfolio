import { TechCategory } from '@/lib/types';

export const techStackData: TechCategory[] = [
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
