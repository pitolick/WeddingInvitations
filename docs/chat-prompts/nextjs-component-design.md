# Next.js App Router コンポーネント設計ガイドライン

## 概要

このドキュメントは、結婚式招待状プロジェクトにおける Next.js App Router のコンポーネント設計方針を定義します。サーバーコンポーネントとクライアントコンポーネントの適切な分離により、パフォーマンスと SEO を最適化します。

## サーバーコンポーネントの使用方針

### page.tsx（サーバーコンポーネント）

```typescript
import { Metadata } from "next";
import { HomeClient } from "./components/HomeClient";

export const metadata: Metadata = {
  title: "結婚式招待状 - 共通コンポーネントサンプル",
  description:
    "美しい結婚式招待状のWebサイト - 共通コンポーネントのサンプルページ",
};

/**
 * @description 結婚式招待状のメインページ（サーバーコンポーネント）
 * @returns メインページのJSX要素
 */
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          結婚式招待状 - 共通コンポーネントサンプル
        </h1>

        <HomeClient />
      </div>
    </main>
  );
}
```

**実装ポイント:**

- `"use client"`ディレクティブを使用しない
- メタデータをエクスポートして SEO 対応
- 静的コンテンツ（タイトル、レイアウト）をサーバーサイドでレンダリング
- インタラクティブな部分はクライアントコンポーネントに分離

### layout.tsx（サーバーコンポーネント）

```typescript
import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Great_Vibes,
  Berkshire_Swash,
  Rock_Salt,
} from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

// フォント設定...

export const metadata: Metadata = {
  title: "結婚式招待状",
  description: "美しい結婚式招待状のWebサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
```

**実装ポイント:**

- フォント設定（next/font/google）
- グローバルメタデータ
- HTML 構造の定義
- 共通レイアウト要素

## クライアントコンポーネントの分離

### 分離対象

以下の機能を含むコンポーネントはクライアントコンポーネントとして分離します：

- **useState**: 状態管理
- **useEffect**: 副作用処理
- **イベントハンドラー**: onClick、onChange、onSubmit など
- **ブラウザ API**: localStorage、sessionStorage、window など
- **動的コンテンツ**: フォーム、モーダル、ナビゲーションなど

### 命名規則

クライアントコンポーネントは以下の命名規則に従います：

```
{ComponentName}Client.tsx
```

例：

- `HomeClient.tsx`
- `NavigationClient.tsx`
- `FormClient.tsx`

### 実装例

```typescript
"use client";

import { Input, TextArea, Select } from "./common/form";
import { Modal } from "./common/modal";
import { Card, CardHeader, CardContent } from "./common/card";
import { Navigation } from "./common/navigation";
import Button from "./common/button";
import { useState } from "react";

/**
 * @description 結婚式招待状のメインページのクライアントコンポーネント
 * @returns インタラクティブなコンポーネントを含むJSX要素
 */
export function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    attendance: "",
    phone: "",
    guests: "",
  });

  // インタラクティブな機能を実装...

  return (
    <>
      {/* ナビゲーション */}
      <Navigation
        items={navigationItems}
        onItemClick={(item) => console.log("Clicked:", item)}
        className="bg-white p-4 rounded-lg shadow-md"
      />

      {/* フォームコンポーネント */}
      <Input
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        placeholder="お名前を入力してください"
        label="お名前"
        required
      />

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="確認"
        size="md"
      >
        {/* モーダルコンテンツ */}
      </Modal>
    </>
  );
}
```

## アーキテクチャの利点

### パフォーマンス向上

1. **サーバーサイドレンダリング**: 初期 HTML がサーバーで生成される
2. **バンドルサイズ削減**: クライアントコンポーネントのみが JavaScript に含まれる
3. **高速な初期表示**: 静的コンテンツが即座に表示される

### SEO 対応

1. **メタデータ**: サーバーサイドでメタデータが生成される
2. **検索エンジン対応**: 静的コンテンツが検索エンジンに認識される
3. **ソーシャルメディア対応**: OGP タグが適切に設定される

### 開発効率

1. **関心の分離**: サーバーとクライアントの責務が明確
2. **保守性**: コードが整理され、理解しやすい
3. **再利用性**: コンポーネントが適切に分離されている

## 実装チェックリスト

### サーバーコンポーネント（page.tsx）

- [ ] `"use client"`ディレクティブを使用していない
- [ ] メタデータをエクスポートしている
- [ ] JSDocs コメントが記述されている
- [ ] 静的コンテンツのみを含んでいる
- [ ] クライアントコンポーネントを適切にインポートしている

### サーバーコンポーネント（layout.tsx）

- [ ] `"use client"`ディレクティブを使用していない
- [ ] フォント設定が適切に行われている
- [ ] グローバルメタデータが設定されている
- [ ] HTML 構造が適切に定義されている

### クライアントコンポーネント

- [ ] `"use client"`ディレクティブを使用している
- [ ] 適切な命名規則に従っている（{ComponentName}Client.tsx）
- [ ] インタラクティブな機能のみを含んでいる
- [ ] JSDocs コメントが記述されている
- [ ] サーバーコンポーネントから呼び出されている

## 注意事項

### 避けるべき実装

1. **サーバーコンポーネントで useState/useEffect を使用**
2. **クライアントコンポーネントでメタデータを設定**
3. **不適切な命名規則**
4. **過度なクライアントコンポーネント化**

### 推奨実装

1. **デフォルトでサーバーコンポーネントを使用**
2. **必要最小限のクライアントコンポーネント分離**
3. **適切な命名規則の遵守**
4. **JSDocs コメントの記述**

## 参考資料

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/learn/server-components)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
