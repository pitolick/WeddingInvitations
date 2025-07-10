# Navigationセクション実装仕様書

## 概要

Navigationセクションの実装仕様を定義します。

## デザイン仕様

### 色

- #73357a
- #ffffff

### フォント

- Berkshire Swash 400
- Noto Sans JP 700

## レイアウト仕様

```json
{
  "Navigation": {
    "x": 415,
    "y": 1002,
    "width": 1440,
    "height": 134,
    "padding": 16,
    "margin": 0
  },
  "container": {
    "x": 495,
    "y": 1018,
    "width": 1280,
    "height": 102,
    "padding": 0,
    "margin": 16
  },
  "NavList": {
    "x": 1207,
    "y": 1018,
    "width": 112,
    "height": 102,
    "padding": 0,
    "margin": 2
  },
  "icon": {
    "x": 1238,
    "y": 1018,
    "width": 50,
    "height": 50,
    "padding": 0,
    "margin": 0
  },
  "Message": {
    "x": 1235,
    "y": 1070,
    "width": 56,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "ご挨拶": {
    "x": 1242,
    "y": 1100,
    "width": 42,
    "height": 20,
    "padding": 0,
    "margin": 0
  }
}
```

## コンポーネント

- NavList (COMPONENT)
- NavList (INSTANCE)
- NavList (INSTANCE)
- NavList (INSTANCE)
- NavList (INSTANCE)
- NavList (INSTANCE)

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
