# Figma 連携指示リスト

## Figma API 設定

### 環境変数

```bash
FIGMA_API_KEY=your_figma_api_key_here
FIGMA_FILE_KEY=your_figma_file_key_here
```

### ファイル情報

- **ファイル名**: "結婚式招待状"
- **最終更新**: 2025-07-05T06:49:57Z
- **セクション数**: 9 つ

## MCP 使用方法

### 1. デザイン情報取得

```bash
# ファイル構造取得
curl -H "X-Figma-Token: $FIGMA_API_KEY" \
  "https://api.figma.com/v1/files/$FIGMA_FILE_KEY"

# 特定セクションの詳細取得
curl -H "X-Figma-Token: $FIGMA_API_KEY" \
  "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/nodes?ids=node-id"
```

### 2. Cursor での使用

1. Cursor チャットで Figma ファイルのリンクを貼り付け
2. 「このデザインを実装して」と指示
3. MCP が自動的にデザイン情報を取得

## セクション詳細

### 1. MV (Main Visual)

- **目的**: メインビジュアルセクション
- **内容**: 結婚式の印象的な画像やアニメーション

### 2. Countdown

- **目的**: 結婚式までのカウントダウン機能
- **内容**: 日時表示、リアルタイム更新

### 3. Navigation

- **目的**: ナビゲーションメニュー
- **内容**: 各セクションへのスムーズな移動

### 4. Host

- **目的**: 新郎新婦の紹介セクション
- **内容**: プロフィール情報、写真

### 5. Message

- **目的**: 新郎新婦からのメッセージ
- **内容**: 招待状の本文、思い出話

### 6. Gallery

- **目的**: 写真ギャラリー
- **内容**: 新郎新婦の思い出写真

### 7. Event

- **目的**: 結婚式の詳細情報
- **内容**: 日時、会場、アクセス情報

### 8. RSVP

- **目的**: 出欠確認フォーム
- **内容**: 参加者情報の入力

### 9. Footer

- **目的**: フッター情報
- **内容**: 連絡先、その他の情報

## デザイン要素

### カラーパレット

- Figma で定義された色を使用
- カスタムカラー（lavender, yellow, pink 等）

### タイポグラフィ

- **フォント**: Inter, Noto Sans JP, Great Vibes 等
- **サイズ**: text-xs から text-9xl まで
- **ウェイト**: normal, medium, semibold, bold 等

### レイアウト

- **レスポンシブ**: iPhone 13 mini + Desktop
- **グリッドシステム**: Flexbox/Grid
- **スペーシング**: 統一された余白設定

## 実装時の注意点

### 1. デザイン忠実性

- Figma デザインとの一致度を重視
- ピクセルパーフェクトな実装

### 2. レスポンシブ対応

- モバイルファーストアプローチ
- ブレークポイントでの適切な切り替え

### 3. パフォーマンス

- 画像の最適化
- 軽量な実装

### 4. アクセシビリティ

- セマンティックな HTML 構造
- スクリーンリーダー対応
