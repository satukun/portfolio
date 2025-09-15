# Vercel Basic認証設定手順

## 概要
サイト全体にBasic認証（ID・パスワード）を設定する手順です。

## 設定手順

### 1. Vercelダッシュボードでの環境変数設定

1. **Vercelダッシュボードにアクセス**
   - https://vercel.com/dashboard にログイン
   - 対象プロジェクト（YOUSUKEポートフォリオ）を選択

2. **環境変数の設定**
   - プロジェクト設定 → Settings → Environment Variables
   - 以下の環境変数を追加：

```
BASIC_AUTH_USER = admin
BASIC_AUTH_PASSWORD = your_secure_password_here
```

### 2. 環境設定の詳細

#### Production環境
```
Name: BASIC_AUTH_USER
Value: admin (または任意のユーザー名)
Environment: Production
```

```
Name: BASIC_AUTH_PASSWORD  
Value: 強固なパスワード（英数字記号混合、12文字以上推奨）
Environment: Production
```

#### Preview環境（任意）
```
Name: BASIC_AUTH_USER
Value: preview_admin
Environment: Preview
```

```
Name: BASIC_AUTH_PASSWORD
Value: preview_password
Environment: Preview
```

### 3. 推奨パスワード例
```
強固なパスワードの例:
- MyPortfolio2025!
- SecurePass#123
- YO_Blog_Auth_2025
```

### 4. 設定後の動作

#### 認証が適用されるページ
- トップページ (/)
- ブログページ (/blog/*)
- 全ての公開ページ

#### 認証が適用されないページ
- API routes (/api/*)
- 静的ファイル (画像、CSS、JS)
- Next.js内部ファイル (_next/*)
- 開発環境 (localhost)

### 5. デプロイ

環境変数設定後、以下の方法でデプロイ：

```bash
# Git pushで自動デプロイ
git add .
git commit -m "Add Basic authentication middleware"
git push origin main
```

または

- Vercelダッシュボードから手動デプロイ実行

### 6. 動作確認

1. **デプロイ完了後、サイトにアクセス**
   - ブラウザでサイトURL（https://your-domain.vercel.app）にアクセス

2. **認証ダイアログが表示される**
   - ユーザー名: 設定したBASIC_AUTH_USER
   - パスワード: 設定したBASIC_AUTH_PASSWORD

3. **認証成功後、通常通りサイトが表示される**

### 7. トラブルシューティング

#### 認証が動作しない場合
- 環境変数が正しく設定されているか確認
- デプロイが完了しているか確認
- ブラウザのキャッシュをクリア

#### 認証をスキップしたい場合
- 開発環境では自動的にスキップされます
- 本番環境で一時的にスキップしたい場合は、環境変数を削除

### 8. セキュリティ注意事項

- **強固なパスワードを設定**（12文字以上、英数字記号混合）
- **定期的なパスワード変更**（3-6ヶ月ごと推奨）
- **環境変数の機密管理**（Gitには含めない）
- **アクセスログの監視**（不正アクセス検知）

---

## 設定完了チェックリスト

- [ ] BASIC_AUTH_USER環境変数設定完了
- [ ] BASIC_AUTH_PASSWORD環境変数設定完了  
- [ ] Vercelでのデプロイ完了
- [ ] サイトアクセス時の認証ダイアログ表示確認
- [ ] 正しい認証情報での入場確認
- [ ] 間違った認証情報での拒否確認

設定に問題がある場合は、このドキュメントを参照して再設定してください。
