# 結婚式Web招待状プロジェクト

Figma-Context-MCPを使用して、Figmaデザインから結婚式のWeb招待状を効率的に実装するプロジェクトです。

## セットアップ手順

### 1. Figma API キーの取得

1. [Figma設定ページ](https://www.figma.com/settings)にアクセス
2. 「Personal access tokens」セクションで新しいトークンを生成
3. 生成されたトークンをコピー

### 2. Cursor設定の更新

`.cursorrules`ファイル内の`YOUR_FIGMA_API_KEY`を実際のFigma APIキーに置き換えてください。

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_ACTUAL_API_KEY", "--stdio"]
    }
  }
}
```

### 3. Cursorの再起動

設定を反映させるため、Cursorを再起動してください。

## 使用方法

1. CursorのチャットでFigmaファイルのリンクを貼り付け
2. 「このデザインを結婚式招待状として実装して」と指示
3. AIがFigmaデータを取得してコードを生成

## プロジェクト構造

``` プロジェクト構造
├── .cursorrules          # Cursor設定ファイル
├── env.example           # 環境変数サンプル
├── package.json          # プロジェクト設定
└── README.md            # このファイル
```

## 技術スタック

- Figma-Context-MCP: Figmaデザインの取得
- HTML/CSS/JavaScript: Web招待状の実装
- レスポンシブデザイン対応

## 注意事項

- Figma APIキーは機密情報です。公開リポジトリにコミットしないでください
- 環境変数ファイル（.env）は.gitignoreに含めることを推奨します
