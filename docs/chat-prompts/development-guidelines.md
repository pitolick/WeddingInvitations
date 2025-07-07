# 開発ガイドライン

## 開発フロー

### 1. 新しい機能開発時

1. **issue 確認**: GitHub MCP で現在の issue 状況を確認
2. **ブランチ作成**: `feature/issue-{番号}-{タイトル}`形式でブランチを作成
3. **PRD 確認**: `docs/prd/requirements.md`を確認
4. **Figma 分析**: MCP を使用してデザイン詳細を取得
5. **実装**: セクションごとに段階的実装
6. **テスト**: Linter Errors の確認と修正
7. **コミット**: 日本語メッセージでコミット（`fixes #{issue番号}`を含める）
8. **push**: コミット完了後に push
9. **PR 作成**: 実装完了後に Pull Request を作成（GitHub Copilot をレビュー依頼者に設定）
10. **レビュー**: GitHub Copilot によるコードレビューを実施し、必要に応じて修正
11. **マージ**: レビュー完了後に main ブランチにマージ
12. **issue 更新**: 完了した issue をクローズ

### 2. コード品質管理

- **Linter Errors**: すべて修正してからコミット
- **コード可読性**: 適切なコメントと構造
- **デザイン忠実性**: Figma デザインとの一致度確認

### 3. ファイル命名規則

- **HTML**: `index.html`, `section-name.html`
- **CSS**: `styles.css`, `section-name.css`
- **JavaScript**: `script.js`, `section-name.js`
- **画像**: `images/`ディレクトリに配置

### 4. ブランチ命名規則

- **機能開発**: `feature/issue-{番号}-{タイトル}`
  - 例: `feature/issue-15-mv-section-implementation`
- **バグ修正**: `fix/issue-{番号}-{タイトル}`
  - 例: `fix/issue-23-responsive-layout-bug`
- **ドキュメント**: `docs/issue-{番号}-{タイトル}`
  - 例: `docs/issue-8-readme-update`

### 5. コミットメッセージ規則

- **形式**: `{タイプ}: {日本語での説明}`
- **タイプ**: feat, fix, docs, style, refactor, test, chore
- **issue 連携**: `fixes #{issue番号}`を含める
- **例**: `feat: MVセクションのレイアウト実装 fixes #15`

## 技術スタック

### フロントエンド

- **Next.js**: App Router、Server Components（最新版）
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: ユーティリティファースト CSS
- **Framer Motion**: アニメーションライブラリ
- **React Hook Form**: フォーム管理

### バックエンド

- **Next.js**: API Routes（最新版）
- **TypeScript**: 型安全性の確保
- **microCMS**: コンテンツ管理システム
- **Google Apps Script**: RSVP データ処理
- **Google Maps API**: 地図表示

### Figma 連携

- **MCP**: Figma-Context-MCP を使用
- **API**: Figma API でデザイン情報取得
- **デザインシステム**: Figma で定義された色・フォント・レイアウト

## レスポンシブ対応

### ブレークポイント

- **モバイル**: iPhone 13 mini（375px）
- **デスクトップ**: Desktop（1024px+）

### 実装方針

- **モバイルファースト**: モバイル優先で実装
- **プログレッシブエンハンスメント**: 基本機能から段階的拡張

## セクション実装順序

1. **MV (Main Visual)** - メインビジュアル
2. **Navigation** - ナビゲーション
3. **Countdown** - カウントダウン
4. **Host** - 新郎新婦紹介
5. **Message** - メッセージ
6. **Event** - イベント詳細
7. **Gallery** - 写真ギャラリー
8. **RSVP** - 出欠確認
9. **Footer** - フッター

## 品質チェックリスト

### コミット前確認

- [ ] Linter Errors が 0 件
- [ ] レスポンシブ対応確認
- [ ] Figma デザインとの一致度確認
- [ ] 日本語コミットメッセージ
- [ ] 適切なファイル構造
- [ ] issue 番号をコミットメッセージに含める

### push 前確認

- [ ] 実装が完了している
- [ ] コミットが完了している
- [ ] テストが通っている
- [ ] Linter Errors が 0 件

### PR 作成前確認

- [ ] 実装が完了している
- [ ] テストが通っている
- [ ] コミットメッセージが適切
- [ ] PR の説明に issue 番号を含める
- [ ] GitHub Copilot をレビュー依頼者に設定

### マージ前確認

- [ ] コードレビューが完了している
- [ ] 指摘事項が修正されている
- [ ] テストが通っている
- [ ] コンフリクトがない

### デプロイ前確認

- [ ] 全セクションの実装完了
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ対応
- [ ] クロスブラウザテスト
