# YO.Blog — フロントエンドエンジニアの技術知見共有サイト（Next.js）

## 🌟 主要機能

- **シンプルHero**: 「YO.Blog」大型タイトル・中央配置・ミニマルデザイン
- **ブログシステム**: microCMS連携・カテゴリ別・タグ別表示・ISR対応
- **Works管理**: 制作実績・技術スタック・詳細モーダル表示
- **お問い合わせ**: バリデーション・確認フロー・成功通知（ヘッダー下固定表示）
- **技術スタック表示**: スライドパネル・習熟度表示・カテゴリ別
- **レスポンシブ対応**: 5段階ブレークポイント・モバイル最適化

## ローカル開発

- 起動: `npm run dev` → http://localhost:3000
- ビルド: `npm run build`
- 本番起動: `npm start`

## 環境変数

- `NEXT_PUBLIC_SITE_URL`: 本番サイトのフルURL（例: `https://<your-domain>`）

## GitHub / Vercel デプロイ

- リポジトリ: `https://github.com/satukun/portfolio`
- Vercel: New Project → GitHub から上記リポジトリを Import
- Environment Variables に `NEXT_PUBLIC_SITE_URL` を追加（Production/Preview）
- Build 設定はデフォルト（`next build`）でOK → Deploy
- カスタムドメインは Project → Domains で追加（必要に応じて DNS 設定）

サイトマップ/robots
- `https://…/sitemap.xml` と `https://…/robots.txt` が自ドメインを返すことを確認

## アセット差し替え（任意）

- `public/profile_image/sandaga.svg`（300x300 円形表示）
- `public/ogp.png`（1200x630）
- `public/favicon.ico`

## 技術要素

- **フレームワーク**: Next.js 15 (App Router, TypeScript, React 19)
- **CMS**: microCMS（ブログ・Works・カテゴリ・タグ管理）
- **スタイリング**: CSS3（レスポンシブ・ダークモード・アニメーション）
- **フォント**: Noto Sans JP / Montserrat / Source Code Pro（Google Fonts）
- **UI機能**: 
  - パーティクル背景・スクロールアニメーション
  - お問い合わせフォーム（React Hook Form + Yup）
  - 成功通知システム（NotificationContext）
  - 技術スタックスライドパネル
  - Works詳細モーダル・ブログページネーション
- **SEO**: メタデータ・OGP・サイトマップ・robots.txt
- **デプロイ**: Vercel（自動デプロイ・ISR・Edge Network）
