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
- [x] Figma デザイン詳細分析の完了
- [x] 画像格納場所の設計

### 📋 画像管理規則

#### 画像命名規則

- **セクション別画像**: `{section-name}-{description}[-{breakpoint}].{extension}`
  - 例: `mv-hero.webp`, `mv-hero-mobile.webp`, `gallery-photo1-tablet.webp`, `host-groom-desktop.webp`
- **共通画像**: `{description}[-{breakpoint}].{extension}`
  - 例: `logo.png`, `background.webp`, `background-mobile.webp`, `favicon.ico`
- **アイコン画像**: SVG は `src/app/components/common/icon/` で React コンポーネントとして管理
  - 例: `Arrow.tsx`, `Menu.tsx`, `Close.tsx`
- **SNS アイコン**: SVG は `src/app/components/common/icon/` で React コンポーネントとして管理
  - 例: `Instagram.tsx`, `Facebook.tsx`, `Twitter.tsx`
- **ブレークポイント**: `mobile` (640px 以下), `tablet` (641px-1024px), `desktop` (1025px 以上)
- **注意**: デバイスごとの画像出し分けが不要な場合は `{breakpoint}` を省略可能

#### 画像最適化設定

- **WebP/PNG 形式**: モダンブラウザ向けに WebP 形式を優先、透過が必要な場合は PNG
- **SVG コンポーネント**: アイコンは React コンポーネントとして管理
- **レスポンシブ画像**: デバイスサイズに応じた画像サイズ
- **遅延読み込み**: パフォーマンス向上のため遅延読み込みを実装
- **画像圧縮**: 品質を保ちながらファイルサイズを最適化

#### レスポンシブ画像使用例

```typescript
// レスポンシブ画像オブジェクトの作成
import { createResponsiveImage } from "@/app/lib/utils/image";

const heroImage = createResponsiveImage(
  "/images/sections/mv/hero",
  "ヒーロー画像"
);

// コンポーネントでの使用
import ResponsiveImageComponent from "@/app/components/common/image/ResponsiveImage";

<ResponsiveImageComponent
  responsiveImage={heroImage}
  className="w-full h-64 object-cover"
  sizes={{
    mobile: "100vw",
    tablet: "100vw",
    desktop: "50vw",
  }}
  priority={true}
/>;
```

#### 画像ディレクトリ構造

```
public/images/
├── sections/          # セクション別画像
│   ├── mv/           # MVセクション画像
│   │   ├── hero.webp              # 共通ヒーロー画像（ブレークポイント省略）
│   │   ├── hero-mobile.webp       # モバイル用ヒーロー画像
│   │   ├── hero-tablet.webp       # タブレット用ヒーロー画像
│   │   ├── hero-desktop.webp      # デスクトップ用ヒーロー画像
│   │   ├── background.webp        # 共通背景画像
│   │   ├── background-mobile.webp # モバイル用背景画像
│   │   ├── background-tablet.webp # タブレット用背景画像
│   │   └── background-desktop.webp # デスクトップ用背景画像
│   ├── gallery/      # ギャラリー画像
│   │   ├── photo1.webp            # 共通写真1
│   │   ├── photo1-mobile.webp     # モバイル用写真1
│   │   ├── photo1-tablet.webp     # タブレット用写真1
│   │   ├── photo1-desktop.webp    # デスクトップ用写真1
│   │   ├── photo2.webp            # 共通写真2
│   │   ├── photo2-mobile.webp     # モバイル用写真2
│   │   ├── photo2-tablet.webp     # タブレット用写真2
│   │   └── photo2-desktop.webp    # デスクトップ用写真2
│   ├── host/         # ホスト画像
│   │   ├── groom.webp             # 共通新郎画像
│   │   ├── groom-mobile.webp      # モバイル用新郎画像
│   │   ├── groom-tablet.webp      # タブレット用新郎画像
│   │   ├── groom-desktop.webp     # デスクトップ用新郎画像
│   │   ├── bride.webp             # 共通新婦画像
│   │   ├── bride-mobile.webp      # モバイル用新婦画像
│   │   ├── bride-tablet.webp      # タブレット用新婦画像
│   │   └── bride-desktop.webp     # デスクトップ用新婦画像
│   ├── event/        # イベント画像
│   │   ├── venue.webp             # 共通会場画像
│   │   ├── venue-mobile.webp      # モバイル用会場画像
│   │   ├── venue-tablet.webp      # タブレット用会場画像
│   │   ├── venue-desktop.webp     # デスクトップ用会場画像
│   │   ├── map.webp               # 共通地図画像
│   │   ├── map-mobile.webp        # モバイル用地図画像
│   │   ├── map-tablet.webp        # タブレット用地図画像
│   │   └── map-desktop.webp       # デスクトップ用地図画像
│   └── countdown/    # カウントダウン画像
│       ├── background.webp        # 共通背景画像
│       ├── background-mobile.webp # モバイル用背景画像
│       ├── background-tablet.webp # タブレット用背景画像
│       └── background-desktop.webp # デスクトップ用背景画像
└── common/           # 共通画像
    ├── logo.png      # ロゴ（ブレークポイント省略）
    ├── background.webp        # 共通背景画像
    ├── background-mobile.webp # モバイル用背景画像
    ├── background-tablet.webp # タブレット用背景画像
    ├── background-desktop.webp # デスクトップ用背景画像
    └── favicon.ico   # ファビコン（ブレークポイント省略）
```

**注意**: SVG アイコンは `src/app/components/common/icon/` ディレクトリでコンポーネントとして管理します。

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
│   │   │   ├── types.ts              # 招待ページ固有型定義
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
│   │   │   │   │   ├── types.ts      # MVセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # MVテスト
│   │   │   │   ├── 📁 countdown/     # カウントダウンセクション
│   │   │   │   │   ├── index.tsx     # カウントダウンコンポーネント
│   │   │   │   │   ├── types.ts      # カウントダウンセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # カウントダウンテスト
│   │   │   │   ├── 📁 navigation/    # ナビゲーションセクション
│   │   │   │   │   ├── index.tsx     # ナビゲーションコンポーネント
│   │   │   │   │   ├── types.ts      # ナビゲーションセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ナビゲーションテスト
│   │   │   │   ├── 📁 host/          # ホストセクション
│   │   │   │   │   ├── index.tsx     # ホストコンポーネント
│   │   │   │   │   ├── HostInfo.types.ts # ホストセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ホストテスト
│   │   │   │   ├── 📁 message/       # メッセージセクション
│   │   │   │   │   ├── index.tsx     # メッセージコンポーネント
│   │   │   │   │   ├── Message.types.ts # メッセージセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # メッセージテスト
│   │   │   │   ├── 📁 gallery/       # ギャラリーセクション
│   │   │   │   │   ├── index.tsx     # ギャラリーコンポーネント
│   │   │   │   │   ├── types.ts      # ギャラリーセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ギャラリーテスト
│   │   │   │   ├── 📁 event/         # イベントセクション
│   │   │   │   │   ├── index.tsx     # イベントコンポーネント
│   │   │   │   │   ├── EventItem.tsx # 単一イベント表示コンポーネント
│   │   │   │   │   ├── types.ts      # イベントセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # イベントテスト
│   │   │   │   ├── 📁 rsvp/          # RSVPセクション
│   │   │   │   │   ├── index.tsx     # RSVPコンポーネント
│   │   │   │   │   ├── types.ts      # RSVPセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # RSVPテスト
│   │   │   │   ├── 📁 footer/        # フッターセクション
│   │   │   │   │   ├── index.tsx     # フッターコンポーネント
│   │   │   │   │   ├── types.ts      # フッターセクション型定義
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # フッターテスト
│   │   │   │   └── index.ts          # セクション全体のエクスポートバンドル
│   │   │   ├── 📁 common/            # 共通コンポーネント
│   │   │   │   ├── 📁 button/        # ボタンコンポーネント
│   │   │   │   │   ├── index.tsx     # ボタンコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ボタンテスト
│   │   │   │   ├── 📁 form/          # フォームコンポーネント
│   │   │   │   │   ├── index.tsx     # フォームコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # フォームテスト
│   │   │   │   ├── 📁 image/         # 画像コンポーネント
│   │   │   │   │   ├── index.tsx     # 画像コンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # 画像テスト
│   │   │   ├── 📁 icon/          # アイコンコンポーネント
│   │   │   │   ├── 📁 Arrow/     # 矢印アイコン
│   │   │   │   │   ├── Arrow.tsx # 矢印アイコンコンポーネント
│   │   │   │   │   └── __tests__/ # テストコード
│   │   │   │   │       └── Arrow.test.tsx # 矢印アイコンテスト
│   │   │   │   ├── 📁 Menu/      # メニューアイコン
│   │   │   │   │   ├── Menu.tsx  # メニューアイコンコンポーネント
│   │   │   │   │   └── __tests__/ # テストコード
│   │   │   │   │       └── Menu.test.tsx # メニューアイコンテスト
│   │   │   │   ├── 📁 Close/     # 閉じるアイコン
│   │   │   │   │   ├── Close.tsx # 閉じるアイコンコンポーネント
│   │   │   │   │   └── __tests__/ # テストコード
│   │   │   │   │       └── Close.test.tsx # 閉じるアイコンテスト
│   │   │   │   └── index.ts      # アイコン全体のエクスポートバンドル
│   │   │   └── index.ts          # 共通コンポーネント全体のエクスポートバンドル
│   │   │   ├── 📁 layouts/           # レイアウトコンポーネント
│   │   │   │   ├── 📁 header/        # ヘッダーコンポーネント
│   │   │   │   │   ├── index.tsx     # ヘッダーコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # ヘッダーテスト
│   │   │   │   ├── 📁 footer/        # フッターコンポーネント
│   │   │   │   │   ├── index.tsx     # フッターコンポーネント
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.tsx # フッターテスト
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
│   │   │   │   ├── 📁 image/         # 画像関連ユーティリティ
│   │   │   │   │   ├── index.ts      # 画像ユーティリティ
│   │   │   │   │   └── __tests__/    # テストコード
│   │   │   │   │       └── index.test.ts # 画像ユーティリティテスト
│   │   │   │   └── index.ts          # ユーティリティ全体のエクスポートバンドル
│   │   │   ├── 📁 types/             # グローバル・共通型定義
│   │   │   │   ├── microcms.ts       # microCMS関連型定義
│   │   │   │   ├── example-usage.ts  # 型定義使用例
│   │   │   │   └── index.ts          # 型定義全体のエクスポートバンドル
│   │   │   ├── 📁 constants/         # 定数
│   │   │   │   ├── events.ts         # イベント定数
│   │   │   │   ├── messages.ts       # メッセージ定数
│   │   │   │   ├── images.ts         # 画像パス定数
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
│   │   │   ├── 📁 useImage/          # 画像関連フック
│   │   │   │   ├── index.ts          # useImageフック
│   │   │   │   └── __tests__/        # テストコード
│   │   │   │       └── index.test.ts # useImageフックテスト
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
│   │   │   │   ├── hero-mobile.webp  # モバイル用ヒーロー画像
│   │   │   │   ├── hero-tablet.webp  # タブレット用ヒーロー画像
│   │   │   │   ├── hero-desktop.webp # デスクトップ用ヒーロー画像
│   │   │   │   ├── background-mobile.webp
│   │   │   │   ├── background-tablet.webp
│   │   │   │   └── background-desktop.webp
│   │   │   ├── gallery/              # ギャラリー画像
│   │   │   │   ├── photo1-mobile.webp
│   │   │   │   ├── photo1-tablet.webp
│   │   │   │   ├── photo1-desktop.webp
│   │   │   │   ├── photo2-mobile.webp
│   │   │   │   ├── photo2-tablet.webp
│   │   │   │   └── photo2-desktop.webp
│   │   │   ├── host/                 # ホスト画像
│   │   │   │   ├── groom-mobile.webp
│   │   │   │   ├── groom-tablet.webp
│   │   │   │   ├── groom-desktop.webp
│   │   │   │   ├── bride-mobile.webp
│   │   │   │   ├── bride-tablet.webp
│   │   │   │   └── bride-desktop.webp
│   │   │   ├── event/                # イベント画像
│   │   │   │   ├── venue-mobile.webp
│   │   │   │   ├── venue-tablet.webp
│   │   │   │   ├── venue-desktop.webp
│   │   │   │   ├── map-mobile.webp
│   │   │   │   ├── map-tablet.webp
│   │   │   │   └── map-desktop.webp
│   │   │   └── countdown/            # カウントダウン画像
│   │   │       ├── background-mobile.webp
│   │   │       ├── background-tablet.webp
│   │   │       └── background-desktop.webp
│   │   └── 📁 common/                # 共通画像
│   │       ├── logo.png              # ロゴ
│   │       ├── favicon.ico           # ファビコン
│   │       ├── background-mobile.webp
│   │       ├── background-tablet.webp
│   │       └── background-desktop.webp
│   └── 📁 icons/                     # アイコンファイル（SVG）
│       ├── next.svg                  # Next.jsアイコン
│       ├── vercel.svg                # Vercelアイコン
│       └── globe.svg                 # グローブアイコン
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

## フォント設定

### Google Fonts 利用

- **外部フォントファイル**: 直接格納せず、Google Fonts を利用
- **Berkshire Swash**: 装飾的なフォント（タイトル用）
- **Noto Sans JP**: 日本語対応フォント（本文用）
- **フォント読み込み**: Next.js の最適化されたフォント読み込みを使用

## 型定義ファイル管理規則

### 型定義ファイルの配置場所

#### 1. グローバル・共通型定義

- **場所**: `src/app/lib/types/`
- **対象**: アプリケーション全体で使用される共通型定義
- **ファイル例**:
  - `microcms.ts` - microCMS関連型定義
  - `example-usage.ts` - 型定義使用例
  - `index.ts` - エクスポート集約

#### 2. セクション固有型定義

- **場所**: `src/app/components/sections/{section}/types.ts`
- **対象**: 特定セクションでのみ使用される型定義
- **ファイル例**:
  - `src/app/components/sections/event/types.ts` - イベントセクション型定義
  - `src/app/components/sections/host/HostInfo.types.ts` - ホストセクション型定義
  - `src/app/components/sections/message/Message.types.ts` - メッセージセクション型定義

#### 3. ページ固有型定義

- **場所**: `src/app/[id]/types.ts`
- **対象**: 特定ページでのみ使用される型定義
- **ファイル例**:
  - `src/app/[id]/types.ts` - 招待ページ固有型定義

#### 4. コンポーネント内型定義

- **場所**: 各コンポーネントファイル内
- **対象**: そのコンポーネントのみで使用する型定義
- **推奨**: 最小限に抑制し、可能な限り外部ファイルに分離

### 型定義ファイル命名規則

- **セクション固有**: `types.ts`（統一）
- **特殊な場合**: `{SectionName}.types.ts`（例: `HostInfo.types.ts`）
- **グローバル**: 機能別ファイル名（例: `microcms.ts`）

### 型定義管理ベストプラクティス

1. **分離の原則**: セクション固有型定義は該当セクション内に配置
2. **再利用性**: 複数セクションで使用される型定義はグローバルに配置
3. **一貫性**: 命名規則とファイル配置を統一
4. **ドキュメント化**: 全ての型定義にJSDocsコメントを記述

## 開発ルール

### コミットメッセージ

- 日本語で記述
- 説明的なメッセージを使用
- conventional commit 形式に従う

### コード品質

- Linter Errors が無くなるまで修正
- コード品質を確保
- プッシュ前に linting チェック

### JSDocs コメント

- **日本語コメント**: 全ての関数・クラス・インターフェースに日本語の JSDocs コメントを記述
- **必須項目**:
  - `@description`: 機能の説明
  - `@param`: パラメータの説明（型情報含む）
  - `@returns`: 戻り値の説明（型情報含む）
  - `@example`: 使用例
- **オプション項目**:
  - `@throws`: 例外の説明
  - `@deprecated`: 非推奨の場合
  - `@since`: 追加されたバージョン
- **形式例**:

````typescript
/**
 * レスポンシブ画像オブジェクトを生成
 * @description 指定されたベースパスと代替テキストから、モバイル・タブレット・デスクトップ用の画像パスを持つオブジェクトを生成します
 * @param basePath - 画像のベースパス（例: '/images/sections/mv/hero'）
 * @param alt - 画像の代替テキスト
 * @param extension - ファイル拡張子（デフォルト: 'webp'）
 * @returns レスポンシブ画像オブジェクト
 * @example
 * ```typescript
 * const heroImage = createResponsiveImage('/images/sections/mv/hero', 'ヒーロー画像');
 * // 結果: { mobile: '/images/sections/mv/hero-mobile.webp', ... }
 * ```
 */
````

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
