# microCMS設定タスクリスト

## 概要
ポートフォリオサイトにmicroCMSを導入して、ブログ記事の管理と配信を実現するための対応事項をまとめています。

## 🔧 環境設定

### 1. microCMSアカウント・プロジェクト設定
- [ ] microCMSアカウント作成
- [ ] 新規プロジェクト作成
- [ ] サービスドメイン設定
- [ ] APIキー取得

### 2. 環境変数設定
- [ ] `.env.local`ファイル作成
- [ ] `MICROCMS_API_KEY`設定
- [ ] `MICROCMS_SERVICE_DOMAIN`設定
- [ ] Vercelデプロイ用環境変数設定

```env
MICROCMS_API_KEY=your_api_key_here
MICROCMS_SERVICE_DOMAIN=your_service_domain
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

## 📝 microCMSコンテンツ設定

### 3. ブログAPIスキーマ設定
**エンドポイント名**: `blog`

**フィールド設定**:
- [ ] `title` (テキスト) - 記事タイトル
- [ ] `slug` (テキスト) - URL用スラッグ
- [ ] `content` (リッチエディタ) - 記事本文
- [ ] `excerpt` (テキストエリア) - 記事要約
- [ ] `thumbnail` (画像) - サムネイル画像
- [ ] `tags` (複数コンテンツ参照) - タグ
- [ ] `category` (コンテンツ参照) - カテゴリ
- [ ] `isPublished` (真偽値) - 公開状態
- [ ] `publishDate` (日時) - 公開日時
- [ ] `author` (オブジェクト) - 著者情報
  - `name` (テキスト)
  - `avatar` (画像)

### 4. タグAPIスキーマ設定
**エンドポイント名**: `tags`

**フィールド設定**:
- [ ] `name` (テキスト) - タグ名
- [ ] `slug` (テキスト) - URL用スラッグ
- [ ] `color` (テキスト) - タグカラー

### 5. カテゴリAPIスキーマ設定
**エンドポイント名**: `categories`

**フィールド設定**:
- [ ] `name` (テキスト) - カテゴリ名
- [ ] `slug` (テキスト) - URL用スラッグ
- [ ] `description` (テキストエリア) - カテゴリ説明

### 6. Works APIスキーマ設定
**エンドポイント名**: `works`
**用途**: トップページ（3件表示）+ スライドパネル（全件）+ モーダル（詳細）

**必須フィールド**:
- [ ] `title` (テキスト) - プロジェクトタイトル
- [ ] `description` (テキストエリア) - プロジェクト概要（カード表示用）
- [ ] `content` (リッチエディタ) - 詳細説明（モーダル表示用）
- [ ] `thumbnail` (画像) - サムネイル画像
- [ ] `techStack` (複数コンテンツ参照) - 使用技術
- [ ] `category` (コンテンツ参照) - プロジェクトカテゴリ
- [ ] `type` (選択肢) - プロジェクトタイプ
  - 選択肢: `Webアプリ`, `Webサイト`, `モバイルアプリ`, `システム開発`, `UI/UX設計`
- [ ] `year` (テキスト) - 制作年
- [ ] `isPublished` (真偽値) - 公開状態
- [ ] `order` (数値) - 表示順序（新しいものほど小さい値）

**モーダル表示用フィールド**:
- [ ] `images` (複数画像) - プロジェクト画像ギャラリー
- [ ] `duration` (テキスト) - 制作期間
- [ ] `role` (テキスト) - 担当役割
- [ ] `challenge` (テキストエリア) - 課題・チャレンジ
- [ ] `solution` (テキストエリア) - 解決方法
- [ ] `result` (テキストエリア) - 成果・結果
- [ ] `liveUrl` (テキスト) - 公開URL（任意）
- [ ] `githubUrl` (テキスト) - GitHubリポジトリURL（任意）

**任意フィールド**:
- [ ] `client` (テキスト) - クライアント名（任意）
- [ ] `status` (選択肢) - プロジェクト状態（任意）
  - 選択肢: `完了`, `進行中`, `一時停止`
- [ ] `isFeatured` (真偽値) - 注目プロジェクト（任意）

**⚠️ 不要なフィールド**:
- ❌ `slug` - 個別ページなしのため不要

### 7. 技術スタックAPIスキーマ設定
**エンドポイント名**: `tech-stacks`

**フィールド設定**:
- [ ] `name` (テキスト) - 技術名
- [ ] `slug` (テキスト) - URL用スラッグ
- [ ] `category` (選択肢) - 技術カテゴリ
  - 選択肢: `Frontend`, `Backend`, `Database`, `DevOps`, `Design`, `Mobile`, `Other`
- [ ] `icon` (画像) - 技術アイコン
- [ ] `color` (カラー) - ブランドカラー
- [ ] `description` (テキストエリア) - 技術説明
- [ ] `proficiencyLevel` (数値) - 習熟度（1-100）
- [ ] `yearsOfExperience` (数値) - 経験年数
- [ ] `isActive` (真偽値) - 現在使用中かどうか

### 8. プロジェクトカテゴリAPIスキーマ設定
**エンドポイント名**: `work-categories`

**フィールド設定**:
- [ ] `name` (テキスト) - カテゴリ名
- [ ] `slug` (テキスト) - URL用スラッグ
- [ ] `description` (テキストエリア) - カテゴリ説明
- [ ] `color` (カラー) - カテゴリカラー
- [ ] `icon` (テキスト) - アイコン名（Material Icons）
- [ ] `order` (数値) - 表示順序

## 💻 コード実装

### 6. 依存関係インストール
- [ ] microCMSクライアントライブラリインストール
```bash
npm install microcms-js-sdk
npm install @types/microcms-js-sdk -D
```

### 6.1. Works用APIクライアントメソッド追加
`src/lib/utils/microcms.ts`に以下のメソッドを追加：

```typescript
// Works関連API（トップページ + スライドパネル + モーダル用）
async getWorks(query?: WorkListQuery): Promise<MicroCMSListResponse<WorkItem>>
async getFeaturedWorks(limit: number = 3): Promise<WorkItem[]> // トップページ用
async getWorksByType(type: string): Promise<WorkItem[]> // フィルタリング用
async getAllWorksForPanel(): Promise<WorkItem[]> // スライドパネル用

// 技術スタック関連API
async getTechStacks(): Promise<TechStack[]>
async getTechStacksByCategory(category: string): Promise<TechStack[]>

// カテゴリ関連API
async getWorkCategories(): Promise<WorkCategory[]>

// ⚠️ 不要なメソッド（個別ページ用）
// ❌ getWork(contentId: string) - 個別詳細ページ不要のため削除
// ❌ getWorkBySlug(slug: string) - 個別詳細ページ不要のため削除
```

**実装方針**:
- トップページでは`getFeaturedWorks(3)`で最新3件を表示
- スライドパネルでは`getAllWorksForPanel()`で全件取得
- モーダルでは既にグリッドから渡されたデータを使用（追加API不要）
- フィルタリングは取得後にクライアント側で実行

### 7. 型定義の更新
- [x] `src/lib/types/blog.ts` - ブログ関連型定義（完了）
- [x] `src/lib/types/work.ts` - Works関連型定義（基本完了）
- [x] `src/lib/types/tech-stack.ts` - 技術スタック型定義（基本完了）
- [ ] Works型定義のmicroCMS対応拡張
- [ ] 技術スタック型定義のmicroCMS対応拡張
- [ ] 型定義の見直しとmicroCMS APIレスポンスとの整合性確認

**Works型定義の拡張が必要な項目**:
```typescript
export interface WorkItem extends MicroCMSDate {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string; // 追加
  thumbnail: {
    url: string;
    width?: number;
    height?: number;
  };
  images?: Array<{ // 追加
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  techStack: TechStack[]; // 参照型に変更
  category: WorkCategory; // 参照型に変更
  type: "Webアプリ" | "Webサイト" | "モバイルアプリ" | "システム開発" | "UI/UX設計";
  year: string;
  status: "完了" | "進行中" | "一時停止"; // 追加
  client?: string; // 追加
  duration: string; // 追加
  role: string; // 追加
  challenge: string; // 追加
  solution: string; // 追加
  result: string; // 追加
  liveUrl?: string; // 追加
  githubUrl?: string; // 追加
  isFeatured: boolean; // 追加
  isPublished: boolean; // 追加
  order: number; // 追加
}
```

### 8. APIクライアント実装
- [x] `src/lib/utils/microcms.ts` - APIクライアント実装（完了）
- [ ] Works API取得メソッド追加
- [ ] 技術スタックAPI取得メソッド追加
- [ ] エラーハンドリングの強化
- [ ] キャッシュ戦略の最適化
- [ ] 画像最適化の実装

### 9. ブログページ実装
- [x] `src/app/blog/page.tsx` - ブログ一覧ページ（完了）
- [x] `src/app/blog/[slug]/page.tsx` - 個別記事ページ（完了）
- [ ] ページネーション機能追加
- [ ] 検索機能追加
- [ ] タグ・カテゴリフィルタリング追加

### 10. ブログコンポーネント実装
- [x] `src/components/features/blog/BlogCard.tsx` - 記事カード（完了）
- [x] `src/components/features/blog/BlogList.tsx` - 記事一覧（完了）
- [x] `src/components/features/blog/BlogContent.tsx` - 記事コンテンツ（完了）
- [ ] ブログ記事のSEO最適化
- [ ] ソーシャルシェアボタン追加
- [ ] 関連記事表示機能

### 11. Worksコンポーネント実装（トップページ + スライドパネル + モーダル）
- [x] `src/components/features/works/WorksSection.tsx` - Worksセクション（完了）
- [x] `src/components/features/works/WorksGrid.tsx` - Works一覧グリッド（完了）
- [x] `src/components/features/works/WorkModal.tsx` - Works詳細モーダル（完了）
- [x] `src/components/features/works/WorksSlidePanel.tsx` - 全Works表示パネル（完了）
- [ ] microCMS連携でのデータ取得実装
  - [ ] トップページ用：最新3件の取得
  - [ ] スライドパネル用：全Works取得
  - [ ] フィルタリング機能（type別）
- [ ] Works詳細モーダルの拡張
  - [ ] 画像ギャラリー機能追加
  - [ ] ケーススタディ表示（課題・解決・成果）
  - [ ] 外部リンク（Live URL、GitHub）表示
- [ ] Works検索・フィルタリング機能強化

**⚠️ 不要な実装**:
- ❌ `src/app/works/page.tsx` - Works専用ページ（不要）
- ❌ `src/app/works/[slug]/page.tsx` - 個別Works詳細ページ（不要）

### 12. 技術スタック管理
- [x] `src/components/features/tech-stack/TechStackChart.tsx` - 技術チャート（完了）
- [x] `src/lib/constants/tech-stack-data.ts` - 技術データ（完了）
- [ ] microCMSからの技術データ取得実装
- [ ] 動的な技術スタックチャート更新
- [ ] 技術詳細ページ作成

## 🎨 デザイン・UX改善

### 11. レスポンシブデザイン
- [ ] モバイル表示の最適化
- [ ] タブレット表示の調整
- [ ] 画像の遅延読み込み実装

### 12. パフォーマンス最適化
- [ ] 画像最適化（Next.js Image）
- [ ] メタデータ最適化
- [ ] Open Graph画像生成
- [ ] サイトマップ自動生成

### 13. アクセシビリティ
- [ ] 適切なheading構造
- [ ] alt属性の設定
- [ ] キーボードナビゲーション
- [ ] スクリーンリーダー対応

## 🔗 統合・連携

### 14. ホームページ統合
- [x] メインページの記事セクション実装（完了）
- [x] メインページのWorksセクション実装（完了）
- [ ] 最新記事の動的取得（microCMS連携）
- [ ] 最新Works 3件の動的取得（microCMS連携）
- [ ] ホームページでの記事プレビュー改善
- [ ] ホームページでのWorks表示改善

### 15. ナビゲーション更新
- [ ] ヘッダーナビゲーションにブログリンク追加
- [ ] フッターのサイトマップ更新
- [ ] Works セクションへのアンカーリンク確認
- [ ] スライドパネル開閉のナビゲーション改善

**⚠️ 不要な実装**:
- ❌ Works個別ページへのナビゲーション（不要）
- ❌ パンくずナビゲーション（個別ページなしのため不要）

### 16. SEO・マーケティング
- [ ] Google Analytics設定
- [ ] Google Search Console設定
- [ ] OGP画像の動的生成
- [ ] 構造化データ（JSON-LD）実装
- [ ] RSS フィード生成

## 🧪 テスト・品質保証

### 17. テスト実装
- [ ] APIクライアントのユニットテスト
- [ ] ブログページのE2Eテスト
- [ ] エラーハンドリングのテスト

### 18. 本番デプロイ準備
- [ ] Vercel環境変数設定
- [ ] ビルドエラーの解消
- [ ] 本番環境でのAPI接続テスト
- [ ] パフォーマンステスト

## 📋 コンテンツ準備

### 19. 初期コンテンツ作成
- [ ] カテゴリ設定（フロントエンド、バックエンド、ツール等）
- [ ] タグ設定（React、TypeScript、Next.js等）
- [ ] サンプル記事作成（3-5記事）
- [ ] 著者情報設定

### 20. 運用ルール策定
- [ ] 記事投稿ワークフロー
- [ ] 画像アップロードガイドライン
- [ ] SEO対策チェックリスト
- [ ] 記事テンプレート作成

## 🚀 今後の拡張予定

### 21. 高度な機能
- [ ] 記事の検索機能（Algolia等）
- [ ] コメント機能（Disqus等）
- [ ] 記事の評価機能
- [ ] ニュースレター購読機能

### 22. 分析・改善
- [ ] 記事閲覧数トラッキング
- [ ] ユーザー行動分析
- [ ] A/Bテスト実装
- [ ] パフォーマンス監視

---

## 優先度

### 🔴 高優先度（即座に対応）
1. microCMSアカウント・プロジェクト設定
2. 環境変数設定
3. **Works APIスキーマ設定**
4. **技術スタックAPIスキーマ設定**
5. ブログAPIスキーマ設定
6. 本番デプロイ準備

### 🟡 中優先度（1週間以内）
1. **Works APIクライアント実装**
2. **Works型定義の拡張**
3. **初期Worksコンテンツ作成**
4. 初期ブログコンテンツ作成
5. SEO・マーケティング設定
6. パフォーマンス最適化
7. アクセシビリティ改善

### 🟢 低優先度（今後の拡張）
1. 高度な機能追加
2. 分析・改善機能
3. テスト強化
4. 運用自動化

---

**最終更新**: 2025年1月15日
**担当者**: YOUSUKE
**ステータス**: 設定準備中
