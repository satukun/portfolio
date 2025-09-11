import { WorkItem } from '@/lib/types';

export const sampleWorks: WorkItem[] = [
  {
    id: "1",
    title: "ECサイトリニューアル",
    description: "大手アパレル企業のECサイトを全面リニューアル。モバイルファーストなレスポンシブデザインを採用し、UXを大幅に改善。決済システムの刷新も行い、コンバージョン率を30%向上させました。",
    thumbnail: "https://placehold.jp/24/2563eb/ffffff/400x250.png?text=EC%E3%82%B5%E3%82%A4%E3%83%88",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    category: "Web Development",
    year: "2024",
    type: "Webアプリ"
  },
  {
    id: "2", 
    title: "社内管理システム開発",
    description: "中規模企業向けの社内管理システムを開発。従業員管理、勤怠管理、プロジェクト管理機能を統合したWebアプリケーション。リアルタイム通知機能やデータ分析ダッシュボードも実装。",
    thumbnail: "https://placehold.jp/24/10b981/ffffff/400x250.png?text=%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0",
    techStack: ["React", "Node.js", "PostgreSQL", "Socket.io", "Chart.js"],
    category: "System Development",
    year: "2024",
    type: "Webアプリ"
  },
  {
    id: "3",
    title: "モバイルアプリUI/UX設計",
    description: "フィットネス系モバイルアプリのUI/UX設計とフロントエンド実装。ユーザビリティテストを重ねてインターフェースを最適化。アクセシビリティにも配慮した設計を行いました。",
    thumbnail: "https://placehold.jp/24/8b5cf6/ffffff/400x250.png?text=%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%97%E3%83%AA", 
    techStack: ["React Native", "Figma", "TypeScript", "Redux"],
    category: "Mobile App",
    year: "2023",
    type: "Webサイト"
  },
  {
    id: "4",
    title: "コーポレートサイト制作",
    description: "スタートアップ企業のコーポレートサイトを制作。SEO最適化とページ速度の向上に注力し、Lighthouse スコア95点以上を達成。CMSを導入してクライアント側での更新も可能に。",
    thumbnail: "https://placehold.jp/24/f59e0b/ffffff/400x250.png?text=%E3%82%B3%E3%83%BC%E3%83%9D%E3%83%AC%E3%83%BC%E3%83%88%E3%82%B5%E3%82%A4%E3%83%88",
    techStack: ["Gatsby", "GraphQL", "Contentful", "Netlify"],
    category: "Web Development", 
    year: "2023",
    type: "Webサイト"
  },
  {
    id: "5",
    title: "データ可視化ダッシュボード",
    description: "製造業向けのリアルタイムデータ可視化ダッシュボードを開発。IoTデバイスからのデータを収集・分析し、直感的なグラフとメトリクスで表示。アラート機能も実装。",
    thumbnail: "https://placehold.jp/24/ef4444/ffffff/400x250.png?text=%E3%83%87%E3%83%BC%E3%82%BF%E5%8F%AF%E8%A6%96%E5%8C%96",
    techStack: ["Vue.js", "D3.js", "Python", "FastAPI", "InfluxDB"],
    category: "Data Visualization",
    year: "2023",
    type: "Webサイト"
  },
  {
    id: "6",
    title: "Webアプリケーション最適化",
    description: "既存のWebアプリケーションのパフォーマンス最適化プロジェクト。コード分割、画像最適化、キャッシュ戦略の見直しにより、初期読み込み時間を60%短縮。",
    thumbnail: "https://placehold.jp/24/06b6d4/ffffff/400x250.png?text=%E6%9C%80%E9%81%A9%E5%8C%96",
    techStack: ["React", "Webpack", "PWA", "Service Worker"],
    category: "Performance Optimization",
    year: "2022",
    type: "Webアプリ"
  }
];
