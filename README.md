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
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_ACTUAL_API_KEY",
        "--stdio"
      ]
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

```プロジェクト構造
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

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
