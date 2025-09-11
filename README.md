# YOUSUKE.SATO — 生成AIをエンジニア視点で共有する個人ブランディングサイト（Next.js）

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

- Next.js (App Router, TypeScript)
- フォント: Noto Sans JP / Montserrat / Source Code Pro（Google Fonts `<link>` 読み込み）
- 演出: パーティクル、タイプライター、スクロールリビール、波形SVG、モバイルメニュー、スクロールトップ
- SEO: OGP/Twitterカード、`robots.ts` / `sitemap.ts`
