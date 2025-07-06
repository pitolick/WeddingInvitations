# GitHub MCP セットアップガイド

## 概要

GitHub MCP を使ってプロジェクトのタスクを issue・sub-issue として管理するためのセットアップガイドです。

## GitHub MCP Server

[GitHub MCP Server](https://github.com/github/github-mcp-server)は、GitHub の公式 MCP サーバーで、リポジトリ、issue、プルリクエストなどを管理できます。

### 主な機能

- **リポジトリ管理**: リポジトリの作成、検索、ファイル操作
- **Issue 管理**: issue の作成、更新、検索
- **プルリクエスト管理**: PR の作成、レビュー、マージ
- **ユーザー検索**: GitHub ユーザーの検索
- **コード検索**: リポジトリ内のコード検索

## セットアップ手順

### 1. GitHub Personal Access Token の取得

1. [GitHub Settings](https://github.com/settings/tokens) にアクセス
2. 「Generate new token (classic)」をクリック
3. 以下の権限を付与：
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `write:packages` (Upload packages to GitHub Package Registry)
   - `delete:packages` (Delete packages from GitHub Package Registry)
4. トークンを生成し、安全に保存

### 2. 環境変数の設定

`.env` ファイルに以下を追加：

```env
# GitHub MCP Configuration
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=WeddingInvitations
```

### 3. Cursor 設定の更新

`.cursorrules` ファイルに GitHub MCP の設定を追加：

```json
{
  "mcpServers": {
    "GitHub MCP": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github", "--stdio"],
      "env": {
        "GITHUB_TOKEN": "YOUR_GITHUB_TOKEN"
      }
    }
  }
}
```

## プロジェクトタスク構造

### Phase 1: 基盤構築

- **microCMS セットアップ**: 招待者データ管理環境構築
- **Google Apps Script デプロイ**: RSVP データ保存環境構築
- **Figma MCP 詳細分析**: デザイン詳細分析とデザイントークン抽出

### Phase 2: 招待者別ページ実装

- **動的ルート実装**: Next.js App Router での招待者別ページ
- **招待者データ取得 API**: microCMS からデータ取得する API

### Phase 3: セクション実装（9 つのセクション）

- **MV セクション**: メインビジュアル
- **Countdown セクション**: カウントダウン機能
- **Navigation セクション**: ナビゲーションメニュー
- **Host セクション**: 新郎新婦紹介
- **Message セクション**: 招待者別カスタムメッセージ
- **Gallery セクション**: 写真ギャラリー
- **Event セクション**: 結婚式詳細情報 + Google Maps
- **RSVP セクション**: 出欠確認フォーム
- **Footer セクション**: フッター情報

### Phase 4: 最適化・デプロイ

- **パフォーマンス最適化**: Core Web Vitals 対応
- **アクセシビリティ対応**: WCAG 2.1 AA 準拠
- **Vercel デプロイ**: 本番環境構築

## Issue 作成スクリプト

### 使用方法

```bash
# 環境変数を設定
export GITHUB_TOKEN=your_token
export GITHUB_REPO_OWNER=your_username
export GITHUB_REPO_NAME=WeddingInvitations

# スクリプトを実行
node scripts/setup-github-issues.js
```

### スクリプトの機能

1. **タスク定義**: 各フェーズのタスクを定義
2. **Issue 作成**: GitHub MCP を使って issue を作成
3. **ラベル付与**: 適切なラベルを自動付与
4. **詳細記述**: タスクの詳細、技術要件、完了条件を記述

## Issue 管理のベストプラクティス

### ラベル体系

- **phase1-4**: 開発フェーズ
- **setup**: セットアップタスク
- **implementation**: 実装タスク
- **api**: API 関連
- **design**: デザイン関連
- **optimization**: 最適化
- **deploy**: デプロイ関連
- **section**: セクション実装
- **microcms**: microCMS 関連
- **google-apps-script**: Google Apps Script 関連
- **figma-mcp**: Figma MCP 関連

### Issue テンプレート

```markdown
## 概要

[タスクの概要]

## タスク

- [ ] サブタスク 1
- [ ] サブタスク 2
- [ ] サブタスク 3

## 技術要件

- 技術要件 1
- 技術要件 2
- 技術要件 3

## 完了条件

- 完了条件 1
- 完了条件 2
- 完了条件 3
```

## GitHub MCP の活用方法

### 1. Issue 作成

```javascript
// GitHub MCPを使ってissueを作成
const issue = await github.createIssue({
  owner: "username",
  repo: "WeddingInvitations",
  title: "MVセクション実装",
  body: "メインビジュアルセクションの実装...",
  labels: ["implementation", "section", "mv", "phase3"],
});
```

### 2. Issue 検索

```javascript
// 特定のラベルのissueを検索
const issues = await github.searchIssues({
  query: "repo:username/WeddingInvitations label:phase3",
});
```

### 3. Issue 更新

```javascript
// issueのステータスを更新
await github.updateIssue({
  owner: "username",
  repo: "WeddingInvitations",
  issueNumber: 123,
  state: "closed",
});
```

## プロジェクト進行管理

### 週次レビュー

- 完了した issue の確認
- 進行中の issue の進捗確認
- 次の週の優先タスクの決定

### フェーズ別管理

- **Phase 1**: 基盤構築（1-2 週間）
- **Phase 2**: 招待者別ページ（1 週間）
- **Phase 3**: セクション実装（3-4 週間）
- **Phase 4**: 最適化・デプロイ（1 週間）

### 依存関係管理

- 各タスクの依存関係を明確化
- 並行実行可能なタスクの特定
- クリティカルパスの管理

## トラブルシューティング

### よくある問題

1. **権限エラー**

   - GitHub Token の権限を確認
   - リポジトリへのアクセス権限を確認

2. **Rate Limit**

   - GitHub API の制限を確認
   - 必要に応じてトークンを更新

3. **MCP 接続エラー**
   - Cursor 設定を確認
   - `.env`ファイルの環境変数を確認

## 次のステップ

1. **GitHub Token 取得**: Personal Access Token の作成
2. **環境変数設定**: `.env`の更新
3. **Cursor 設定更新**: `.cursorrules`の更新
4. **Issue 作成**: スクリプトの実行
5. **プロジェクト開始**: Phase 1 から順次実装

このセットアップにより、プロジェクトのタスクを体系的に管理し、効率的な開発を進めることができます。
