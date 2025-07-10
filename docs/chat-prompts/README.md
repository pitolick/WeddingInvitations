# Chat Prompts Directory

このディレクトリには、新しいチャット画面を開いた時に使用する指示リストが格納されています。

## ファイル構成

- `README.md` - このファイル（ディレクトリの説明）
- `initial-setup.md` - 初期セットアップ時の指示
- `development-guidelines.md` - 開発時のガイドライン
- `figma-integration.md` - Figma 連携時の指示
- `nextjs-component-design.md` - Next.js App Router コンポーネント設計ガイドライン

## 使用方法

新しいチャットを開始する際は、以下の手順でプロジェクトの状況を把握してください：

1. このディレクトリのファイルを確認
2. 現在のプロジェクト状況を把握
3. 適切な指示リストを使用

## 開発進行管理

このプロジェクトでは、**GitHub MCP**を使用して issue ベースの開発進行を行います：

### 開発フロー

1. **issue 確認**: 現在の issue 状況を GitHub MCP で確認
2. **ブランチ作成**: `feature/issue-{番号}-{タイトル}`形式でブランチを作成
3. **実装**: issue に基づいて機能を実装
4. **コミット**: 日本語メッセージでコミット（`fixes #{issue番号}`を含める）
5. **CodeRABBIT レビュー**: Cursor の CodeRABBIT 拡張機能でレビューを実行
6. **フィードバック修正**: CodeRABBIT のフィードバックがある場合は修正してコミット
7. **push**: 修正完了後に push
8. **PR 作成**: 実装完了後に Pull Request を作成
9. **レビュー**: コードレビューを実施し、必要に応じて修正
10. **マージ**: レビュー完了後に main ブランチにマージ
11. **issue 更新**: 完了した issue をクローズ

### issue テンプレート

- **enhancement**: 新機能追加（親 issue）
- **task**: 実装タスク（子 issue）
- **bug**: バグ修正

### ラベル体系

- **phase1-4**: 開発フェーズ
- **setup**: セットアップタスク
- **implementation**: 実装タスク
- **section**: セクション実装
- **microcms**: microCMS 関連
- **google-apps-script**: Google Apps Script 関連
- **figma-mcp**: Figma MCP 関連

## 更新履歴

- 2025-07-05: 初版作成
- 2025-01-XX: Next.js App Router コンポーネント設計ガイドライン追加
