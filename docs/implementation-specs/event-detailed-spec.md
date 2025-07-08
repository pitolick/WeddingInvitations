# Eventセクション実装仕様書

## 概要
Eventセクションの実装仕様を定義します。

## デザイン仕様

### 色
- #111827
- #73357a
- #ffffff
- #4b5563
- #000000

### フォント
- Berkshire Swash 400
- Noto Sans JP 400
- Noto Sans JP 700

## レイアウト仕様
```json
{
  "Event": {
    "x": 1075,
    "y": 3729,
    "width": 120,
    "height": 48,
    "padding": 0,
    "margin": 0
  },
  "container": {
    "x": 1151,
    "y": 3809,
    "width": 624,
    "height": 994,
    "padding": 0,
    "margin": 24
  },
  "contents": {
    "x": 495,
    "y": 3809,
    "width": 1280,
    "height": 994,
    "padding": 0,
    "margin": 0
  },
  "venue": {
    "x": 1151,
    "y": 3809,
    "width": 624,
    "height": 994,
    "padding": 0,
    "margin": 24
  },
  "Title": {
    "x": 1151,
    "y": 3809,
    "width": 624,
    "height": 92,
    "padding": 16,
    "margin": 0
  },
  "Wedding Ceremony": {
    "x": 1404,
    "y": 3825,
    "width": 118,
    "height": 32,
    "padding": 0,
    "margin": 0
  },
  "挙式": {
    "x": 1440,
    "y": 3857,
    "width": 46,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "Date": {
    "x": 1275.5,
    "y": 3925,
    "width": 375,
    "height": 84,
    "padding": 0,
    "margin": 4
  },
  "2025.11.08 Sat": {
    "x": 1398,
    "y": 3925,
    "width": 130,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "Frame 1": {
    "x": 1275.5,
    "y": 3957,
    "width": 375,
    "height": 52,
    "padding": 0,
    "margin": 0
  },
  "11:30 - 14:30": {
    "x": 1275.5,
    "y": 3957,
    "width": 375,
    "height": 32,
    "padding": 0,
    "margin": 0
  },
  "親族集合 / 10:00": {
    "x": 1275.5,
    "y": 3989,
    "width": 375,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "Venue": {
    "x": 1151,
    "y": 4033,
    "width": 624,
    "height": 446,
    "padding": 0,
    "margin": 24
  },
  "Data": {
    "x": 1151,
    "y": 4033,
    "width": 624,
    "height": 172,
    "padding": 0,
    "margin": 8
  },
  "Table": {
    "x": 1315,
    "y": 4033,
    "width": 296,
    "height": 172,
    "padding": 0,
    "margin": 8
  },
  "Row": {
    "x": 1323,
    "y": 4185,
    "width": 280,
    "height": 20,
    "padding": 0,
    "margin": 12
  },
  "Label": {
    "x": 1323,
    "y": 4185,
    "width": 40,
    "height": 20,
    "padding": 2,
    "margin": 0
  },
  "会場": {
    "x": 1331,
    "y": 4035,
    "width": 24,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "グラントリア": {
    "x": 1375,
    "y": 4033,
    "width": 88,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "URL": {
    "x": 1331,
    "y": 4063,
    "width": 24,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "https://www.grantria.jp": {
    "x": 1375,
    "y": 4061,
    "width": 169,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "住所": {
    "x": 1331,
    "y": 4091,
    "width": 24,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "〒918-8112 福井県福井市下馬2丁目1608": {
    "x": 1375,
    "y": 4089,
    "width": 228,
    "height": 60,
    "padding": 0,
    "margin": 0
  },
  "TEL": {
    "x": 1331,
    "y": 4159,
    "width": 24,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "0776-33-2345": {
    "x": 1375,
    "y": 4157,
    "width": 88,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "会費": {
    "x": 1331,
    "y": 4187,
    "width": 24,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "0,000円": {
    "x": 1375,
    "y": 4185,
    "width": 49,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "Message": {
    "x": 1430,
    "y": 4256,
    "width": 66,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "いつも私たちを 温かく見守ってくれて本当にありがとう この度、皆様に見守られながら 結婚式を挙げられること 心から嬉しく思っています ささやかではございますが 挙式前に10時00分に お集まりいただけたら幸いです 皆様とご一緒にリハーサルを行い 最高の瞬間を迎えたいと思っております 当日もしお召し替えが必要でしたら 更衣室をご用意していますので どうぞお気軽にご利用ください お車で来てくださる方は 会場前に00台停められる駐車場がありますので どうぞ安心してご利用ください": {
    "x": 68.5,
    "y": 7093,
    "width": 238,
    "height": 160,
    "padding": 0,
    "margin": 0
  },
  "GoogleMap": {
    "x": 1151,
    "y": 4503,
    "width": 624,
    "height": 300,
    "padding": 0,
    "margin": 0
  },
  "いつも私たちを温かく見守ってくれて、本当にありがとう。 この度、皆様に見守られながら結婚式を挙げられること、心から嬉しく思っています。 つきましては、ささやかではございますが、 挙式前に10時00分に、お集まりいただけたら幸いです。 皆様とご一緒にリハーサルを行い、最高の瞬間を迎えたいと思っております。 当日は、更衣室をご用意していますので、どうぞお気軽にご利用ください。 会場前に00台停められる駐車場がありますので、どうぞ安心してご利用ください。": {
    "x": 1344,
    "y": 4292,
    "width": 238,
    "height": 160,
    "padding": 0,
    "margin": 0
  }
}
```

## コンポーネント
- venue (COMPONENT)
- venue (INSTANCE)
- venue (INSTANCE)
- venue (COMPONENT)
- venue (INSTANCE)
- venue (INSTANCE)

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
