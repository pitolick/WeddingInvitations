# GitHub MCP コマンドメモ

## 基本的な使用方法

### 1. 環境変数の設定

```bash
# .envファイルから環境変数を読み込み
source .env
```

### 2. GitHub MCP サーバーの起動

```bash
npx github-mcp-custom stdio
```

### 3. 環境変数とサーバー起動を同時実行

```bash
source .env && npx github-mcp-custom stdio
```

## 代替方法（GitHub API 直接使用）

### 1. Issue 取得

```bash
# .envファイルから環境変数を読み込み
source .env

curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/issues/15"
```

### 2. 特定ラベルの Issue 一覧取得

```bash
# .envファイルから環境変数を読み込み
source .env

curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/issues?state=all&labels=phase1"
```

### 3. Issue 作成

```bash
# .envファイルから環境変数を読み込み
source .env

curl -X POST \
  -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Issue Title",
    "body": "Issue description",
    "labels": ["phase1", "task"]
  }' \
  "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/issues"
```

### 4. Issue 更新

```bash
# .envファイルから環境変数を読み込み
source .env

curl -X PATCH \
  -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d '{
    "state": "closed"
  }' \
  "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/issues/15"
```

## よく使うコマンド

### 1. 現在の issue 状況確認

```bash
# .envファイルから環境変数を読み込み
source .env

curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/issues?state=open"
```

### 2. 特定フェーズの issue 確認

```bash
# .envファイルから環境変数を読み込み
source .env

curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/issues?state=all&labels=phase1"
```

### 3. 環境変数ファイルからの読み込み

```bash
# .envファイルから環境変数を読み込んでGitHub MCPサーバーを起動
source .env && npx github-mcp-custom stdio
```

## 注意事項

1. **トークンの有効期限**: Personal Access Token は定期的に更新が必要
2. **権限設定**: リポジトリへの適切な権限が必要
3. **Rate Limit**: GitHub API の制限に注意
4. **stdio モード**: MCP サーバーは stdio モードで実行されるため、直接的なコマンド実行はできない

## トラブルシューティング

### よくあるエラー

1. **GITHUB_PERSONAL_ACCESS_TOKEN not set**

   - 環境変数が設定されていない
   - 解決: `export GITHUB_PERSONAL_ACCESS_TOKEN=your_token`

2. **権限エラー**

   - トークンの権限が不足
   - 解決: GitHub でトークンの権限を確認・更新

3. **Rate Limit**
   - API 制限に達した
   - 解決: しばらく待ってから再実行

## 参考情報

- **GitHub API ドキュメント**: https://docs.github.com/en/rest
- **GitHub MCP パッケージ**: `github-mcp-custom`
- **プロジェクトリポジトリ**: `$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME`
