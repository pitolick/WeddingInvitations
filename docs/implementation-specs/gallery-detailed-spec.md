# Galleryセクション実装仕様書

## 概要

Galleryセクションの実装仕様を定義します。

## デザイン仕様

### 色

- #d1d5db
- #ffffff

### フォント

- 未定義

## レイアウト仕様

```json
{
  "Gallery": {
    "x": 495,
    "y": 3202,
    "width": 1280,
    "height": 426,
    "padding": 0,
    "margin": 0
  },
  "画像": {
    "x": 1561.6666259765625,
    "y": 3415,
    "width": 213,
    "height": 213,
    "padding": 0,
    "margin": 8
  },
  "img": {
    "x": 250,
    "y": 4136,
    "width": 125,
    "height": 125,
    "padding": 0,
    "margin": 0
  },
  "container": {
    "x": 495,
    "y": 3165,
    "width": 1280,
    "height": 500,
    "padding": 0,
    "margin": 0
  }
}
```

## コンポーネント

- 画像 (COMPONENT)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (COMPONENT)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)
- 画像 (INSTANCE)

## アニメーション仕様

- 未定義

## レスポンシブ対応

```json
{
  "mobile": {},
  "tablet": {},
  "desktop": {}
}
```

## 実装ガイドライン

1. コンポーネント設計
2. スタイリング
3. アニメーション実装
4. レスポンシブ対応

## 完了条件

- [ ] デザイン仕様に準拠した実装
- [ ] アニメーションの実装
- [ ] レスポンシブ対応の実装
- [ ] テストの実装
