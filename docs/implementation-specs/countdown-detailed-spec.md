# Countdownセクション実装仕様書

## 概要

Countdownセクションの実装仕様を定義します。

## デザイン仕様

### 色

- #000000
- #ffffff

### フォント

- Berkshire Swash 400
- Noto Sans JP 700

## レイアウト仕様

```json
{
  "24": {
    "x": 1307,
    "y": 830,
    "width": 71,
    "height": 60,
    "padding": 0,
    "margin": 0
  },
  "999": {
    "x": 878,
    "y": 794,
    "width": 170,
    "height": 96,
    "padding": 0,
    "margin": 0
  },
  "Countdown": {
    "x": 1020,
    "y": 714,
    "width": 230,
    "height": 48,
    "padding": 0,
    "margin": 0
  },
  "container": {
    "x": 495,
    "y": 714,
    "width": 1280,
    "height": 224,
    "padding": 0,
    "margin": 32
  },
  "contents": {
    "x": 878,
    "y": 794,
    "width": 514,
    "height": 144,
    "padding": 0,
    "margin": 16
  },
  "Day": {
    "x": 1048,
    "y": 858,
    "width": 44,
    "height": 32,
    "padding": 0,
    "margin": 0
  },
  "HHMMSS": {
    "x": 1108,
    "y": 830,
    "width": 284,
    "height": 60,
    "padding": 0,
    "margin": 8
  },
  "Hours": {
    "x": 1108,
    "y": 830,
    "width": 88,
    "height": 60,
    "padding": 0,
    "margin": 0
  },
  "Frame 1": {
    "x": 1307,
    "y": 830,
    "width": 85,
    "height": 60,
    "padding": 0,
    "margin": 4
  },
  "Minutes": {
    "x": 1204,
    "y": 830,
    "width": 95,
    "height": 60,
    "padding": 0,
    "margin": 0
  },
  "Seconds": {
    "x": 1307,
    "y": 830,
    "width": 85,
    "height": 60,
    "padding": 0,
    "margin": 0
  },
  "To": {
    "x": 1055.5,
    "y": 906,
    "width": 26,
    "height": 32,
    "padding": 0,
    "margin": 0
  },
  "2025.11.08": {
    "x": 1085.5,
    "y": 906,
    "width": 129,
    "height": 32,
    "padding": 0,
    "margin": 0
  },
  "h": {
    "x": 1382,
    "y": 858,
    "width": 10,
    "height": 32,
    "padding": 0,
    "margin": 0
  }
}
```

## コンポーネント

- Hours (COMPONENT)
- Minutes (INSTANCE)
- Seconds (INSTANCE)
- Hours (COMPONENT)
- Minutes (INSTANCE)
- Seconds (INSTANCE)

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
