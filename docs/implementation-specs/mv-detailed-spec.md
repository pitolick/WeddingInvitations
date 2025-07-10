# MVセクション実装仕様書

## 概要

FigmaMCPから取得したデザイン情報に基づくMVセクションの実装仕様を定義します。

## FigmaMCP分析結果

### デザイン仕様

#### 色

- **プライマリ**: #ffffff (白)
- **背景**: グラデーション (blue-400 → purple-500 → pink-400)

#### タイポグラフィ

- **メインタイトル**: "Wedding Celebration" (固定)
- **フォント**: Great Vibes, 128px, 400 weight, center align
- **行間**: デフォルト (leading-tight)
- **文字間隔**: デフォルト

#### レイアウト仕様

```json
{
  "MV": {
    "x": 415,
    "y": 0,
    "width": 1440,
    "height": 650,
    "padding": 0,
    "margin": 0
  },
  "container": {
    "x": 495,
    "y": 197,
    "width": 1280,
    "height": 256,
    "padding": 0,
    "margin": 32
  },
  "Wedding Celebration": {
    "x": 904,
    "y": 197,
    "width": 462,
    "height": 256,
    "padding": 0,
    "margin": 0
  }
}
```

## 実装仕様

### コンポーネント構造

```tsx
<section className='relative w-full h-screen min-h-[650px]'>
  {/* 背景画像 */}
  <img className='absolute inset-0 w-full h-full object-cover z-10' />

  {/* コンテンツコンテナ */}
  <div className='relative z-30 text-center max-w-[1280px] px-8 mx-auto'>
    {/* メインタイトル */}
    <h1 className='font-great-vibes text-[128px] text-white'>
      Wedding Celebration
    </h1>
  </div>
</section>
```

### アニメーション仕様

- **メインタイトル**: fadeIn 1s ease-in-out
- **ローディング**: spin animation

### レスポンシブ対応

```json
{
  "mobile": {
    "title": "text-6xl",
    "container": "px-4"
  },
  "tablet": {
    "title": "text-7xl",
    "container": "px-6"
  },
  "desktop": {
    "title": "text-8xl",
    "container": "px-8"
  },
  "xl": {
    "title": "text-[128px]",
    "container": "max-w-[1280px]"
  }
}
```

### 画像仕様

- **背景画像**: `/images/sections/mv/mv-hero.webp`
- **最適化**: WebP形式、プリロード対応
- **エラーハンドリング**: 画像読み込み失敗時のフォールバック

### アクセシビリティ

- **alt属性**: 全ての画像に適切なalt属性を設定
- **aria-label**: インタラクティブ要素にaria-labelを設定
- **キーボード操作**: フォーカス可能な要素の適切な管理
- **スクリーンリーダー**: セマンティックなHTML構造

### パフォーマンス最適化

- **画像プリロード**: 重要な画像のプリロード
- **遅延読み込み**: 非重要な画像の遅延読み込み
- **アニメーション最適化**: CSS transform/opacityの使用
- **バンドル最適化**: 不要なコードの削除

## 実装ガイドライン

### 1. コンポーネント設計

- [x] FigmaMCPのデザイン情報に基づく実装
- [x] TypeScript型定義の完備
- [x] Propsの適切な設計
- [x] デフォルト値の設定
- [x] タイトルの直接記述
- [x] 背景画像のみの使用

### 2. スタイリング

- [x] Tailwind CSSクラスの使用
- [x] FigmaMCPの色・フォント情報の適用
- [x] レスポンシブデザインの実装
- [x] シンプルで洗練されたデザイン

### 3. アニメーション実装

- [x] CSSアニメーションの実装
- [x] パフォーマンスを考慮した実装
- [x] ユーザー設定への配慮
- [x] スムーズなトランジション

### 4. レスポンシブ対応

- [x] モバイルファーストアプローチ
- [x] ブレークポイントの適切な設定
- [x] 画像の最適化
- [x] タッチデバイスへの対応

### 5. テスト実装

- [x] ユニットテストの作成
- [x] FigmaMCPデザイン情報の検証
- [x] アニメーションのテスト
- [x] レスポンシブのテスト

## 完了条件

- [x] FigmaMCPのデザイン仕様に準拠した実装
- [x] アニメーションの実装
- [x] レスポンシブ対応の実装
- [x] テストの実装
- [x] アクセシビリティ対応
- [x] パフォーマンス最適化
- [x] タイトルの直接記述
- [x] シンプルなデザイン（星パターン・オーバーレイ削除）
- [x] 背景画像のみの使用（ヒーロー画像削除）

## 技術スタック

- **フレームワーク**: Next.js 14 + TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: CSS Animations
- **テスト**: Jest + React Testing Library
- **ログ**: VibeCoding Logger
- **デザイン情報**: FigmaMCP

## 更新履歴

- 2025-07-10: FigmaMCP分析結果に基づく実装仕様の更新
- 2025-07-10: アニメーション・レスポンシブ対応の詳細化
- 2025-07-10: アクセシビリティ・パフォーマンス要件の追加
- 2025-07-10: サブタイトルを削除してシンプルなデザインに変更
- 2025-07-10: タイトルを引数から直接記述に変更
- 2025-07-10: ディズニーテーマの星パターンと背景オーバーレイを削除
- 2025-07-10: ヒーロー画像を削除し、背景画像のみを使用するように変更
