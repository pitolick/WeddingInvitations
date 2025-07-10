# Footerセクション実装仕様書

## 概要

Footerセクションの実装仕様を定義します。

## デザイン仕様

### 色

- #111827
- #73357a
- #ffffff
- #000000

### フォント

- Rock Salt 400
- Noto Sans JP 400

## レイアウト仕様

```json
{
  "Footer": {
    "x": 415,
    "y": 8954,
    "width": 1440,
    "height": 136,
    "padding": 0,
    "margin": 0
  },
  "Message": {
    "x": 976.5,
    "y": 8954,
    "width": 317,
    "height": 112,
    "padding": 32,
    "margin": 8
  },
  "Thank You !": {
    "x": 976.5,
    "y": 8986,
    "width": 317,
    "height": 48,
    "padding": 0,
    "margin": 0
  },
  "copyright": {
    "x": 415,
    "y": 9066,
    "width": 1440,
    "height": 24,
    "padding": 4,
    "margin": 8
  },
  "©︎ 2025 ぴいてっく": {
    "x": 1084.5,
    "y": 9070,
    "width": 101,
    "height": 16,
    "padding": 0,
    "margin": 0
  }
}
```

## コンポーネント

- 未定義

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
