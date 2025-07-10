# GitHub MCP セットアップ・コマンドガイド

## 概要

[GitHub MCP Server](https://github.com/github/github-mcp-server)は、GitHub の公式 MCP サーバーで、リポジトリ、issue、プルリクエストなどを管理できます。

**注意**: GitHub CLI（`gh`コマンド）の使用も許可されています。MCP が利用できない場合は GitHub CLI
を使用してください。
初回のみ `gh auth login` で Personal Access Token を登録してください。

### 主な機能

- **リポジトリ管理**: リポジトリの作成、検索、ファイル操作
- **Issue 管理**: issue の作成、更新、検索
- **プルリクエスト管理**: PR の作成、レビュー、マージ
- **ユーザー検索**: GitHub ユーザーの検索
- **コード検索**: リポジトリ内のコード検索

### GitHub CLIとの併用

GitHub MCPが利用できない場合は、GitHub CLI（`gh`コマンド）を使用してください：

```bash
# プルリクエスト作成
gh pr create --title "feat: 機能説明 fixes #123" --body "実装内容の説明"

# Issue一覧取得
gh issue list

# Issue詳細表示
gh issue view 123

# Issue作成
gh issue create --title "タイトル" --body "内容"
```

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

## 基本的な使用方法

### 1. 環境変数の設定

```bash
# .envファイルから環境変数を読み込み
source .env
```

### 2. GitHub MCP サーバーの起動

```bash
# 環境変数を明示的にexportしてから起動
source .env && export GITHUB_TOKEN=$GITHUB_TOKEN && export GITHUB_REPO_OWNER=$GITHUB_REPO_OWNER && export GITHUB_REPO_NAME=$GITHUB_REPO_NAME && npx @modelcontextprotocol/server-github stdio
```

### 3. 環境変数とサーバー起動を同時実行（推奨）

```bash
# 環境変数を明示的にexportしてから起動
source .env && export GITHUB_TOKEN=$GITHUB_TOKEN && export GITHUB_REPO_OWNER=$GITHUB_REPO_OWNER && export GITHUB_REPO_NAME=$GITHUB_REPO_NAME && npx @modelcontextprotocol/server-github stdio
```

## GitHub MCP を使用した操作

### 1. Issue 管理

#### Issue 一覧取得

```bash
# 環境変数を設定してからMCPサーバーを起動
source .env && export GITHUB_TOKEN=$GITHUB_TOKEN && export GITHUB_REPO_OWNER=$GITHUB_REPO_OWNER && export GITHUB_REPO_NAME=$GITHUB_REPO_NAME && npx @modelcontextprotocol/server-github stdio
```

Cursor 内で以下の操作が可能：

- Issue の詳細取得
- Issue 一覧の取得
- 特定ラベルの Issue 検索
- Issue の作成・更新・削除

#### よく使う操作

**Issue 状況確認**

- 現在の open な issue の確認
- 特定フェーズの issue 確認
- ラベル別の issue 検索

**Issue 管理**

- 新しい issue の作成
- 既存 issue の更新
- issue のステータス変更

### 2. リポジトリ管理

- **リポジトリ作成**: 新しいリポジトリの作成
- **ファイル操作**: ファイルの作成・更新・削除
- **ブランチ管理**: ブランチの作成・管理
- **コミット管理**: コミット履歴の確認

### 3. プルリクエスト管理

- **PR 作成**: 新しいプルリクエストの作成
- **レビュー**: プルリクエストのレビュー
- **マージ**: プルリクエストのマージ
- **コメント**: プルリクエストへのコメント追加

### 4. 検索機能

- **コード検索**: リポジトリ内のコード検索
- **Issue 検索**: 特定条件での issue 検索
- **ユーザー検索**: GitHub ユーザーの検索
- **リポジトリ検索**: リポジトリの検索

### 5. 通知管理

- **通知一覧**: 通知の確認
- **通知詳細**: 特定通知の詳細確認
- **通知管理**: 通知の既読・削除

## 環境変数ファイルからの読み込み

```bash
# .envファイルから環境変数を読み込んでGitHub MCPサーバーを起動
source .env && export GITHUB_TOKEN=$GITHUB_TOKEN && export GITHUB_REPO_OWNER=$GITHUB_REPO_OWNER && export GITHUB_REPO_NAME=$GITHUB_REPO_NAME && npx @modelcontextprotocol/server-github stdio
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

Issue テンプレートは `.github/ISSUE_TEMPLATE` ディレクトリ内のファイルを参照してください。

#### 利用可能なテンプレート

- **enhancement.md**: 新機能実装用テンプレート
- **task.md**: サブタスク用テンプレート
- **bug.md**: バグ修正用テンプレート

#### テンプレートの使用方法

1. GitHub リポジトリで新しい Issue を作成
2. 「Get started」ボタンをクリック
3. 適切なテンプレートを選択
4. テンプレートに従って内容を記入

#### テンプレートの構造例

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

## GitHub 情報取得の活用方法

### 1. GitHub MCP を使用した方法

```javascript
// GitHub MCPを使ってissueを作成
const issue = await github.createIssue({
  owner: 'username',
  repo: 'WeddingInvitations',
  title: 'MVセクション実装',
  body: 'メインビジュアルセクションの実装...',
  labels: ['implementation', 'section', 'mv', 'phase3'],
});
```

### 2. GitHub API を使用した方法

```bash
# GitHub APIを使用してissue一覧を取得
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/username/WeddingInvitations/issues
```

### 3. Web インターフェースを使用した方法

- GitHub の Web インターフェースで直接 issue を確認
- ブラウザでリポジトリページにアクセスして issue 一覧を確認

### 4. 柔軟な情報取得

- **GitHub MCP**: 利用可能な場合は最優先で使用
- **GitHub API**: MCP が利用できない場合の代替手段
- **Web インターフェース**: 手動での確認が必要な場合
- **curl コマンド**: コマンドラインでの直接アクセス

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

## 注意事項

1. **トークンの有効期限**: Personal Access Token は定期的に更新が必要
2. **権限設定**: リポジトリへの適切な権限が必要
3. **Rate Limit**: GitHub API の制限に注意
4. **stdio モード**: MCP サーバーは stdio モードで実行されるため、直接的なコマンド実行はできない
5. **柔軟な情報取得**: GitHub MCP が利用できない場合は、他の方法（API、Web インターフェース、curl 等）を使用して GitHub 情報を取得する

## トラブルシューティング

### よくあるエラー

1. **GITHUB_TOKEN not set**
   - 環境変数が設定されていない
   - 解決: `export GITHUB_TOKEN=your_token`

2. **権限エラー**
   - トークンの権限が不足
   - 解決: GitHub でトークンの権限を確認・更新

3. **Rate Limit**
   - API 制限に達した
   - 解決: しばらく待ってから再実行

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
6. **柔軟な情報取得**: 必要に応じて GitHub MCP、API、Web インターフェース等を使用

## 参考情報

- **GitHub MCP Server**: https://github.com/github/github-mcp-server
- **GitHub API ドキュメント**: https://docs.github.com/en/rest
- **GitHub MCP パッケージ**: `@modelcontextprotocol/server-github`
- **プロジェクトリポジトリ**: `$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME`

このセットアップにより、プロジェクトのタスクを体系的に管理し、効率的な開発を進めることができます。
