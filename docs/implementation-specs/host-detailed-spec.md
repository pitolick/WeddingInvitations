# Hostセクション実装仕様書

## 概要

Hostセクションの実装仕様を定義します。

## デザイン仕様

### 色

- #ffffff

### フォント

- Berkshire Swash 400
- Noto Sans JP 700
- Rock Salt 400
- Noto Sans JP 400

## レイアウト仕様

```json
{
  "Host": {
    "x": 1084.5,
    "y": 1200,
    "width": 101,
    "height": 48,
    "padding": 0,
    "margin": 0
  },
  "container": {
    "x": 495,
    "y": 1200,
    "width": 1280,
    "height": 604,
    "padding": 0,
    "margin": 32
  },
  "contents": {
    "x": 495,
    "y": 1280,
    "width": 1280,
    "height": 524,
    "padding": 0,
    "margin": 8
  },
  "profiles": {
    "x": 731,
    "y": 1280,
    "width": 808,
    "height": 524,
    "padding": 0,
    "margin": 24
  },
  "profile": {
    "x": 1199,
    "y": 1280,
    "width": 340,
    "height": 524,
    "padding": 0,
    "margin": 8
  },
  "img": {
    "x": 1219,
    "y": 1300,
    "width": 300,
    "height": 300,
    "padding": 0,
    "margin": 0
  },
  "2025-07-04_13-33-07_719 1": {
    "x": 71.5,
    "y": 1872,
    "width": 149.03640747070312,
    "height": 160,
    "padding": 0,
    "margin": 0
  },
  "2025-07-04_13-33-40_711 1": {
    "x": 155,
    "y": 1944,
    "width": 149,
    "height": 160,
    "padding": 0,
    "margin": 0
  },
  "Name": {
    "x": 1306.5,
    "y": 1628,
    "width": 125,
    "height": 56,
    "padding": 0,
    "margin": 4
  },
  "栗原 誠": {
    "x": 1318,
    "y": 1628,
    "width": 102,
    "height": 32,
    "padding": 0,
    "margin": 0
  },
  "Makoto Kurihara": {
    "x": 1306.5,
    "y": 1664,
    "width": 125,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "Frame 1": {
    "x": 1199,
    "y": 1692,
    "width": 340,
    "height": 112,
    "padding": 8,
    "margin": 8
  },
  "メッセージ & プロフィール等 メッセージ & プロフィール等 メッセージ & プロフィール等 メッセージ & プロフィール等": {
    "x": 1264,
    "y": 1700,
    "width": 210,
    "height": 96,
    "padding": 0,
    "margin": 0
  },
  "icon": {
    "x": 1095,
    "y": 1390,
    "width": 80,
    "height": 80,
    "padding": 0,
    "margin": 0
  },
  "2025-07-04_13-33-07_719 2": {
    "x": 1199,
    "y": 1280,
    "width": 167.66595458984375,
    "height": 180,
    "padding": 0,
    "margin": 0
  },
  "2025-07-04_13-33-40_711 2": {
    "x": 1371,
    "y": 1440,
    "width": 168,
    "height": 180,
    "padding": 0,
    "margin": 0
  },
  "Frame 3": {
    "x": 1095,
    "y": 1280,
    "width": 80,
    "height": 300,
    "padding": 0,
    "margin": 8
  }
}
```

## コンポーネント

- profile (COMPONENT)
- profile (INSTANCE)
- profile (COMPONENT)
- profile (INSTANCE)

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
