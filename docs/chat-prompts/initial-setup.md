# 初期セットアップ指示リスト

## プロジェクト概要

**プロジェクト名**: 結婚式 Web 招待状  
**技術スタック**: Next.js 14 + TypeScript + Tailwind CSS + Figma-Context-MCP + microCMS + Google Apps Script  
**目的**: Figma デザインから結婚式の Web 招待状を実装

## 現在の状況

### ✅ 完了済み

- [x] Figma-Context-MCP のセットアップ
- [x] GitHub MCP のセットアップ
- [x] 環境変数の設定（FIGMA_API_KEY, FIGMA_FILE_KEY, GITHUB_TOKEN）
- [x] PRD の作成（docs/prd/requirements.md）
- [x] プロジェクト構造の整理
- [x] Next.js 14 + TypeScript 環境のセットアップ
- [x] Google Apps Script の準備（RSVP データ保存用）
- [x] 招待者管理システムの設計（microCMS）
- [x] ディレクトリ構成の統一
- [x] issue 作成スクリプトの準備（scripts/setup-github-issues.js）

### 📋 プロジェクト構造

```
WeddingInvitations/
├── 📁 docs/                          # プロジェクトドキュメント
│   ├── 📁 chat-prompts/              # チャットセッション用プロンプト
│   │   ├── README.md                 # チャットプロンプト概要
│   │   ├── initial-setup.md          # 初期セットアップ手順
│   │   ├── development-guidelines.md  # 開発ガイドライン
│   │   ├── github-mcp-commands.md    # GitHub MCPコマンドガイド
│   │   └── figma-integration.md      # Figma MCP統合ガイド
│   ├── 📁 prd/                       # 要件定義書
│   │   ├── README.md                 # PRD概要
│   │   └── requirements.md           # 詳細要件定義書
│   └── project-structure.md          # プロジェクト構造
├── 📁 scripts/                       # 外部スクリプト
│   ├── setup-github-issues.js        # GitHub issue作成スクリプト
│   └── 📁 google-apps-script/       # Google Apps Script
│       ├── README.md                 # セットアップガイド
│       ├── rsvp-handler.gs           # RSVP処理スクリプト
│       └── types.ts                  # 型定義
├── 📁 src/                           # ソースコード
│   ├── 📁 app/                       # Next.js App Router
│   │   ├── 📁 [id]/                  # 招待者別ページ（動的ルート）
│   │   │   ├── page.tsx              # 招待者別ページ
│   │   │   └── __tests__/            # テストコード
│   │   │       └── page.test.tsx     # ページテスト
│   │   ├── 📁 api/                   # API Routes
│   │   │   ├── 📁 guests/            # 招待者API
│   │   │   │   ├── route.ts          # API Route
│   │   │   │   └── __tests__/        # テストコード
│   │   │   │       └── route.test.ts # API Routeテスト
│   │   │   └── 📁 rsvp/              # RSVP API
│   │   │       ├── route.ts          # API Route
│   │   │       └── __tests__/        # テストコード
│   │   │           └── route.test.ts # API Routeテスト
│   │   ├── 📁 components/            # 共通コンポーネント
│   │   │   ├── 📁 sections/          # セクションコンポーネント
│   │   │   │   ├── 📁 mv/            # MVセクション
│   │   │   │   │   ├── index.tsx     # MVコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # MVテスト
│   │   │   │   ├── 📁 countdown/     # カウントダウンセクション
│   │   │   │   │   ├── index.tsx     # カウントダウンコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # カウントダウンテスト
│   │   │   │   ├── 📁 navigation/    # ナビゲーションセクション
│   │   │   │   │   ├── index.tsx     # ナビゲーションコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ナビゲーションテスト
│   │   │   │   ├── 📁 host/          # ホストセクション
│   │   │   │   │   ├── index.tsx     # ホストコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ホストテスト
│   │   │   │   ├── 📁 message/       # メッセージセクション
│   │   │   │   │   ├── index.tsx     # メッセージコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # メッセージテスト
│   │   │   │   ├── 📁 gallery/       # ギャラリーセクション
│   │   │   │   │   ├── index.tsx     # ギャラリーコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ギャラリーテスト
│   │   │   │   ├── 📁 event/         # イベントセクション
│   │   │   │   │   ├── index.tsx     # イベントコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # イベントテスト
│   │   │   │   ├── 📁 rsvp/          # RSVPセクション
│   │   │   │   │   ├── index.tsx     # RSVPコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # RSVPテスト
│   │   │   │   ├── 📁 footer/        # フッターセクション
│   │   │   │   │   ├── index.tsx     # フッターコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # フッターテスト
│   │   │   │   └── index.ts          # セクション全体のエクスポートバンドル
│   │   │   ├── 📁 ui/                # UIコンポーネント
│   │   │   │   ├── 📁 button/        # ボタンコンポーネント
│   │   │   │   │   ├── index.tsx     # ボタンコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ボタンテスト
│   │   │   │   ├── 📁 form/          # フォームコンポーネント
│   │   │   │   │   ├── index.tsx     # フォームコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # フォームテスト
│   │   │   │   └── index.ts          # UI全体のエクスポートバンドル
│   │   │   ├── 📁 layout/            # レイアウトコンポーネント
│   │   │   │   ├── 📁 header/        # ヘッダーコンポーネント
│   │   │   │   │   ├── index.tsx     # ヘッダーコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ヘッダーテスト
│   │   │   │   └── index.ts          # レイアウト全体のエクスポートバンドル
│   │   │   └── index.ts              # コンポーネント全体のエクスポートバンドル
│   │   ├── 📁 lib/                   # ユーティリティ
│   │   │   ├── 📁 api/               # API関連
│   │   │   │   ├── 📁 microcms/      # microCMS API
│   │   │   │   │   ├── client.ts     # microCMS クライアント
│   │   │   │   │   ├── types.ts      # 型定義
│   │   │   │   │   ├── index.ts      # エクスポートバンドル
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── client.test.ts # microCMS クライアントテスト
│   │   │   │   ├── 📁 google-apps-script/ # Google Apps Script API
│   │   │   │   │   ├── client.ts     # Google Apps Script クライアント
│   │   │   │   │   ├── types.ts      # 型定義
│   │   │   │   │   ├── index.ts      # エクスポートバンドル
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── client.test.ts # Google Apps Script クライアントテスト
│   │   │   │   └── index.ts          # API全体のエクスポートバンドル
│   │   │   ├── 📁 utils/             # ユーティリティ関数
│   │   │   │   ├── 📁 date/          # 日付関連ユーティリティ
│   │   │   │   │   ├── index.ts      # 日付ユーティリティ
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.ts # 日付ユーティリティテスト
│   │   │   │   ├── 📁 validation/    # バリデーション関連
│   │   │   │   │   ├── index.ts      # バリデーション関数
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.ts # バリデーションテスト
│   │   │   │   └── index.ts          # ユーティリティ全体のエクスポートバンドル
│   │   │   ├── 📁 types/             # 型定義
│   │   │   │   ├── guest.ts          # 招待者型定義
│   │   │   │   ├── rsvp.ts           # RSVP型定義
│   │   │   │   ├── event.ts          # イベント型定義
│   │   │   │   └── index.ts          # 型定義全体のエクスポートバンドル
│   │   │   ├── 📁 constants/         # 定数
│   │   │   │   ├── events.ts         # イベント定数
│   │   │   │   ├── messages.ts       # メッセージ定数
│   │   │   │   ├── index.ts          # エクスポートバンドル
│   │   │   │   └── __tests__/        # テストコード
│   │   │   │       └── events.test.ts # イベント定数テスト
│   │   │   └── index.ts              # lib全体のエクスポートバンドル
│   │   ├── 📁 hooks/                 # カスタムフック
│   │   │   ├── 📁 useGuest/          # 招待者関連フック
│   │   │   │   ├── index.ts          # useGuestフック
│   │   │   │   └── __tests__/        # テストコード
│   │   │   │       └── index.test.ts # useGuestフックテスト
│   │   │   ├── 📁 useRSVP/           # RSVP関連フック
│   │   │   │   ├── index.ts          # useRSVPフック
│   │   │   │   └── __tests__/        # テストコード
│   │   │   │       └── index.test.ts # useRSVPフックテスト
│   │   │   └── index.ts              # フック全体のエクスポートバンドル
│   │   ├── 📁 context/               # React Context
│   │   │   ├── 📁 GuestContext/      # 招待者コンテキスト
│   │   │   │   ├── index.tsx         # GuestContext
│   │   │   │   └── __tests__/        # テストコード
│   │   │   │       └── index.test.tsx # GuestContextテスト
│   │   │   └── index.ts              # コンテキスト全体のエクスポートバンドル
│   │   ├── layout.tsx                # ルートレイアウト
│   │   ├── page.tsx                  # ホームページ
│   │   ├── globals.css               # グローバルスタイル
│   │   └── favicon.ico               # ファビコン
├── 📁 public/                        # 静的ファイル
│   ├── 📁 images/                    # 画像ファイル
│   │   ├── 📁 sections/              # セクション別画像
│   │   │   ├── mv/                   # MVセクション画像
│   │   │   ├── gallery/              # ギャラリー画像
│   │   │   └── host/                 # ホスト画像
│   │   └── 📁 icons/                 # アイコン画像
│   ├── 📁 fonts/                     # フォントファイル
│   └── 📁 icons/                     # アイコンファイル
├── 📁 __tests__/                     # 統合テスト
│   ├── 📁 e2e/                       # E2Eテスト
│   │   └── guest-page.test.ts        # 招待者ページE2Eテスト
│   └── 📁 integration/               # 統合テスト
│       └── api.test.ts               # API統合テスト
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
├── tsconfig.json                     # TypeScript設定
├── jest.config.js                     # Jest設定
└── playwright.config.ts               # Playwright設定
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

## 新しいチャットセッション開始時のルール

**新しいチャットセッションを開始する際は、必ず以下の手順を実行してください：**

1. **GitHub MCP を使用して issue 状況を確認**

   - 現在の open な issue を取得
   - 優先度の高い issue を特定
   - 進行中の issue の進捗を確認

2. **次の作業の提案**

   - GitHub issue の状況に基づいて、次に着手すべきタスクを提案
   - 依存関係を考慮した作業順序の提示
   - 並行実行可能なタスクの特定

3. **プロジェクト状況の把握**
   - 現在の実装状況の確認
   - 完了済みタスクの確認
   - 残りの作業量の見積もり

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

## 次のステップ

**以下の作業は全て GitHub の issue で管理されています：**

- **Phase 1: 基盤構築** - microCMS セットアップ、Google Apps Script デプロイ、Figma MCP 詳細分析
- **Phase 2: 招待者別ページ実装** - 動的ルート実装、招待者データ取得 API
- **Phase 3: セクション実装** - 9 つのセクション（MV, Countdown, Navigation, Host, Message, Gallery, Event, RSVP, Footer）
- **Phase 4: 最適化・デプロイ** - パフォーマンス最適化、アクセシビリティ対応、Vercel デプロイ

**新しいチャットセッション開始時は、GitHub MCP を使用して issue 状況を確認し、次に着手すべきタスクを提案してください。**

## 重要なファイル

- **PRD**: `docs/prd/requirements.md`
- **プロジェクト構造**: `docs/project-structure.md`
- **環境変数**: `.env`（FIGMA_API_KEY, FIGMA_FILE_KEY, GITHUB_TOKEN, MICROCMS_API_KEY, GOOGLE_APPS_SCRIPT_URL）
- **Cursor 設定**: `.cursorrules`
- **プロジェクト概要**: `README.md`
- **Google Apps Script**: `scripts/google-apps-script/rsvp-handler.gs`
- **GitHub issue 作成スクリプト**: `scripts/setup-github-issues.js`

## Figma 連携

- **ファイルキー**: `a3KPzIpaw35tZ0nOWxJajl`
- **デザイン名**: "結婚式招待状"
- **セクション数**: 9 つ（MV, Countdown, Navigation, Host, Message, Gallery, Event, RSVP, Footer）
