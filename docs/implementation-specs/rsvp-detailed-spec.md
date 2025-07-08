# RSVPセクション実装仕様書

## 概要
RSVPセクションの実装仕様を定義します。

## デザイン仕様

### 色
- #ffffff
- #111827
- #ae385b
- #d1d5db
- #71717a
- #6b7280
- #73357a
- #9ca3af
- #3b82f6
- #000000

### フォント
- Berkshire Swash 400
- Noto Sans JP 400
- Helvetica Neue 400
- Noto Sans JP 700

## レイアウト仕様
```json
{
  "RSVP": {
    "x": 511,
    "y": 8730,
    "width": 1248,
    "height": 76,
    "padding": 8,
    "margin": 32
  },
  "container": {
    "x": 495,
    "y": 4931,
    "width": 1280,
    "height": 3959,
    "padding": 0,
    "margin": 32
  },
  "contents": {
    "x": 495,
    "y": 5011,
    "width": 1280,
    "height": 3879,
    "padding": 24,
    "margin": 24
  },
  "お手数ではございますが 2025/09/15 迄に 出欠のお返事賜りますよう お願い申し上げます": {
    "x": 511,
    "y": 5035,
    "width": 1248,
    "height": 104,
    "padding": 0,
    "margin": 0
  },
  "From": {
    "x": 511,
    "y": 5163,
    "width": 1248,
    "height": 3703,
    "padding": 0,
    "margin": 24
  },
  "contact": {
    "x": 511,
    "y": 5163,
    "width": 1248,
    "height": 439,
    "padding": 0,
    "margin": 16
  },
  "【連絡先】": {
    "x": 1095,
    "y": 5163,
    "width": 80,
    "height": 24,
    "padding": 0,
    "margin": 0
  },
  "InputBox/Input": {
    "x": 511,
    "y": 8391,
    "width": 1248,
    "height": 67,
    "padding": 0,
    "margin": 4
  },
  "Frame 1": {
    "x": 511,
    "y": 8706,
    "width": 90,
    "height": 20,
    "padding": 0,
    "margin": 8
  },
  "Label": {
    "x": 511,
    "y": 8706,
    "width": 40,
    "height": 20,
    "padding": 2,
    "margin": 0
  },
  "必須": {
    "x": 519,
    "y": 8708,
    "width": 24,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "名前": {
    "x": 559,
    "y": 8391,
    "width": 84,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "Text/Field": {
    "x": 511,
    "y": 8415,
    "width": 1248,
    "height": 43,
    "padding": 0,
    "margin": 0
  },
  "Text/Primitive": {
    "x": 511,
    "y": 8415,
    "width": 1248,
    "height": 43,
    "padding": 0,
    "margin": 0
  },
  "Select": {
    "x": 1471,
    "y": 8427,
    "width": 276,
    "height": 19,
    "padding": 0,
    "margin": 0
  },
  "Icon": {
    "x": 1737,
    "y": 8433.556640625,
    "width": 9.800002098083496,
    "height": 5.885858058929443,
    "padding": 0,
    "margin": 0
  },
  "Input": {
    "x": 523,
    "y": 8427,
    "width": 276,
    "height": 19,
    "padding": 0,
    "margin": 0
  },
  "Jane Doe": {
    "x": 523,
    "y": 8425,
    "width": 276,
    "height": 24,
    "padding": 0,
    "margin": 0
  },
  "InputBox/Select": {
    "x": 511,
    "y": 5286,
    "width": 1248,
    "height": 67,
    "padding": 0,
    "margin": 4
  },
  "都道府県": {
    "x": 559,
    "y": 5286,
    "width": 56,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "Text/Select": {
    "x": 511,
    "y": 5310,
    "width": 295,
    "height": 43,
    "padding": 0,
    "margin": 0
  },
  "hr": {
    "x": 511,
    "y": 7802,
    "width": 1248,
    "height": 1,
    "padding": 8,
    "margin": 8
  },
  "left": {
    "x": 511,
    "y": 7791,
    "width": 37.91999816894531,
    "height": 12,
    "padding": 0,
    "margin": 0
  },
  "right": {
    "x": 1721,
    "y": 7791,
    "width": 37.91999816894531,
    "height": 12,
    "padding": 0,
    "margin": 0
  },
  "attendees": {
    "x": 511,
    "y": 7827,
    "width": 1248,
    "height": 1039,
    "padding": 0,
    "margin": 16
  },
  "【出席者】": {
    "x": 1082.5,
    "y": 7827,
    "width": 105,
    "height": 24,
    "padding": 0,
    "margin": 0
  },
  "InputBox/Radio": {
    "x": 511,
    "y": 8244,
    "width": 1248,
    "height": 48,
    "padding": 0,
    "margin": 4
  },
  "ホテル利用": {
    "x": 559,
    "y": 8244,
    "width": 70,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "RadioGroup": {
    "x": 511,
    "y": 8268,
    "width": 1248,
    "height": 24,
    "padding": 0,
    "margin": 12
  },
  "Radio": {
    "x": 632,
    "y": 8268,
    "width": 77,
    "height": 24,
    "padding": 0,
    "margin": 4
  },
  "Box/Radio/Default": {
    "x": 632,
    "y": 8272,
    "width": 16,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "Box/DefaultPrimitive": {
    "x": 632,
    "y": 8272,
    "width": 16,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "Unchecked": {
    "x": 632,
    "y": 8272,
    "width": 16,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "Checked": {
    "x": 632,
    "y": 8272,
    "width": 16,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "Circle": {
    "x": 638,
    "y": 8278,
    "width": 4,
    "height": 4,
    "padding": 0,
    "margin": 0
  },
  "Vector": {
    "x": 1170,
    "y": 8836,
    "width": 14,
    "height": 16,
    "padding": 0,
    "margin": 0
  },
  "なし": {
    "x": 652,
    "y": 8268,
    "width": 57,
    "height": 24,
    "padding": 0,
    "margin": 0
  },
  "EventBox": {
    "x": 511,
    "y": 8706,
    "width": 1248,
    "height": 100,
    "padding": 0,
    "margin": 4
  },
  "挙式": {
    "x": 559,
    "y": 8474,
    "width": 28,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "attend": {
    "x": 1063,
    "y": 8738,
    "width": 56,
    "height": 60,
    "padding": 16,
    "margin": 8
  },
  "check": {
    "x": 1136,
    "y": 8725,
    "width": 86,
    "height": 86,
    "padding": 0,
    "margin": 4
  },
  "Frame 5": {
    "x": 1136,
    "y": 8725,
    "width": 86,
    "height": 86,
    "padding": 0,
    "margin": 8
  },
  "2025-07-05_14-12-20_294 1": {
    "x": 1136,
    "y": 8725,
    "width": 86,
    "height": 86,
    "padding": 0,
    "margin": 0
  },
  "御出席": {
    "x": 1051,
    "y": 8522,
    "width": 60,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "Strikethrough": {
    "x": 1151,
    "y": 8750,
    "width": 56,
    "height": 36,
    "padding": 0,
    "margin": 4
  },
  "22813787-line 1": {
    "x": 1152,
    "y": 8762,
    "width": 54,
    "height": 12,
    "padding": 0,
    "margin": 0
  },
  "declien": {
    "x": 1151,
    "y": 8738,
    "width": 56,
    "height": 60,
    "padding": 16,
    "margin": 8
  },
  "御欠席": {
    "x": 1159,
    "y": 8522,
    "width": 60,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "披露宴": {
    "x": 559,
    "y": 8590,
    "width": 42,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "出席": {
    "x": 1071,
    "y": 8754,
    "width": 40,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "欠席": {
    "x": 1159,
    "y": 8754,
    "width": 40,
    "height": 28,
    "padding": 0,
    "margin": 0
  },
  "二次会": {
    "x": 559,
    "y": 8706,
    "width": 42,
    "height": 20,
    "padding": 0,
    "margin": 0
  },
  "Companion": {
    "x": 511,
    "y": 8822,
    "width": 1248,
    "height": 44,
    "padding": 8,
    "margin": 8
  },
  "Button": {
    "x": 1138,
    "y": 8830,
    "width": 142,
    "height": 28,
    "padding": 4,
    "margin": 4
  },
  "お連れ様を追加": {
    "x": 1170,
    "y": 8834,
    "width": 98,
    "height": 20,
    "padding": 0,
    "margin": 0
  }
}
```

## コンポーネント
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Select (COMPONENT)
- Text/Select (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- hr (INSTANCE)
- attendees (COMPONENT)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- Button (INSTANCE)
- Button (INSTANCE)
- hr (INSTANCE)
- attendees (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- Button (INSTANCE)
- Button (INSTANCE)
- hr (INSTANCE)
- attendees (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- Button (INSTANCE)
- Button (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Select (INSTANCE)
- Text/Select (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- hr (INSTANCE)
- attendees (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- Button (INSTANCE)
- Button (INSTANCE)
- hr (INSTANCE)
- attendees (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- Button (INSTANCE)
- Button (INSTANCE)
- hr (INSTANCE)
- attendees (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Radio (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- Radio (INSTANCE)
- Box/Radio/Default (INSTANCE)
- Box/DefaultPrimitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- InputBox/Input (INSTANCE)
- Text/Field (INSTANCE)
- Text/Primitive (INSTANCE)
- Button (INSTANCE)
- Button (INSTANCE)

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
