# 初期セットアップ指示リスト

## プロジェクト概要

**プロジェクト名**: 結婚式 Web 招待状  
**技術スタック**: Next.js 14 + TypeScript + Tailwind CSS + Figma-Context-MCP + microCMS + Google Apps Script  
**目的**: Figma デザインから結婚式の Web 招待状を実装

## 現在の状況

### ✅ 完了済み

- [x] Figma-Context-MCP のセットアップ
- [x] 環境変数の設定（FIGMA_API_KEY, FIGMA_FILE_KEY）
- [x] PRD の作成（docs/prd/requirements.md）
- [x] プロジェクト構造の整理
- [x] Next.js 14 + TypeScript 環境のセットアップ
- [x] Google Apps Script の準備（RSVP データ保存用）
- [x] 招待者管理システムの設計（microCMS）
- [x] ディレクトリ構成の統一

### 📋 プロジェクト構造

```
WeddingInvitations/
├── 📁 docs/                          # プロジェクトドキュメント
│   ├── 📁 chat-prompts/              # チャットセッション用プロンプト
│   │   ├── README.md                 # チャットプロンプト概要
│   │   ├── initial-setup.md          # 初期セットアップ手順
│   │   ├── development-guidelines.md  # 開発ガイドライン
│   │   └── figma-integration.md      # Figma MCP統合ガイド
│   ├── 📁 prd/                       # 要件定義書
│   │   ├── README.md                 # PRD概要
│   │   └── requirements.md           # 詳細要件定義書
│   └── project-structure.md          # プロジェクト構造
├── 📁 scripts/                       # 外部スクリプト
│   └── 📁 google-apps-script/       # Google Apps Script
│       ├── README.md                 # セットアップガイド
│       ├── rsvp-handler.gs           # RSVP処理スクリプト
│       └── types.ts                  # 型定義
├── 📁 src/                           # ソースコード
│   ├── 📁 app/                       # Next.js App Router
│   │   ├── 📁 [id]/                  # 招待者別ページ（動的ルート）
│   │   ├── 📁 api/                   # API Routes
│   │   ├── 📁 components/            # 共通コンポーネント
│   │   │   ├── 📁 sections/          # セクションコンポーネント
│   │   │   ├── 📁 ui/                # UIコンポーネント
│   │   │   └── 📁 layout/            # レイアウトコンポーネント
│   │   ├── 📁 lib/                   # ユーティリティ
│   │   │   ├── 📁 api/               # API関連
│   │   │   ├── 📁 utils/             # ユーティリティ関数
│   │   │   ├── 📁 types/             # 型定義
│   │   │   └── 📁 constants/         # 定数
│   │   ├── 📁 hooks/                 # カスタムフック
│   │   ├── 📁 context/               # React Context
│   │   ├── layout.tsx                # ルートレイアウト
│   │   ├── page.tsx                  # ホームページ
│   │   ├── globals.css               # グローバルスタイル
│   │   └── favicon.ico               # ファビコン
├── 📁 public/                        # 静的ファイル
│   ├── 📁 images/                    # 画像ファイル
│   ├── 📁 fonts/                     # フォントファイル
│   └── 📁 icons/                     # アイコンファイル
├── .cursorrules                       # Cursor設定
├── .gitignore                        # Git除外設定
├── env.example                       # 環境変数例
├── eslint.config.mjs                 # ESLint設定
├── next-env.d.ts                     # Next.js型定義
├── next.config.ts                     # Next.js設定
├── package.json                       # プロジェクト設定
├── package-lock.json                  # npm依存関係
├── postcss.config.mjs                # PostCSS設定
├── README.md                         # プロジェクト概要
└── tsconfig.json                     # TypeScript設定
```

## 開発ルール

### コミットメッセージ

- 日本語で記述
- 説明的なメッセージを使用
- conventional commit 形式に従う

### コード品質

- Linter Errors が無くなるまで修正
- コード品質を確保
- プッシュ前に linting チェック

## 次のステップ

1. **GitHub MCP セットアップ**: issue 管理環境の構築
2. **プロジェクトタスク作成**: 各フェーズの issue 作成
3. **詳細設計**: 各セクションの実装設計
4. **プロトタイプ作成**: 最初のセクション（MV）の実装
5. **Figma 詳細分析**: 各セクションのデザイン詳細分析

## 開発進行管理

このプロジェクトでは、**GitHub MCP**を使用した issue ベースの開発進行を行います：

### 開発フロー

1. **issue 確認**: GitHub MCP で現在の issue 状況を確認
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

### issue 管理

- **enhancement**: 新機能追加（親 issue）
- **task**: 実装タスク（子 issue）
- **ラベル**: phase1-4, setup, implementation, section 等

## 重要なファイル

- **PRD**: `docs/prd/requirements.md`
- **プロジェクト構造**: `docs/project-structure.md`
- **環境変数**: `.env`（FIGMA_API_KEY, FIGMA_FILE_KEY, MICROCMS_API_KEY, GOOGLE_APPS_SCRIPT_URL）
- **Cursor 設定**: `.cursorrules`
- **プロジェクト概要**: `README.md`
- **Google Apps Script**: `scripts/google-apps-script/rsvp-handler.gs`

## Figma 連携

- **ファイルキー**: `a3KPzIpaw35tZ0nOWxJajl`
- **デザイン名**: "結婚式招待状"
- **セクション数**: 9 つ（MV, Countdown, Navigation, Host, Message, Gallery, Event, RSVP, Footer）
