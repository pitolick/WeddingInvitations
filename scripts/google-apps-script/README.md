# Google Apps Script セットアップガイド

## 概要

このディレクトリには、RSVP フォームのデータを Google スプレッドシートに保存するための Google Apps Script コードが含まれています。

## ファイル構成

- `rsvp-handler.gs`: RSVP データを処理するメインスクリプト

## セットアップ手順

### 1. Google Apps Script プロジェクトの作成

1. [Google Apps Script](https://script.google.com/) にアクセス
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を「Wedding RSVP Handler」に変更

### 2. コードの配置

1. `rsvp-handler.gs` の内容をコピー
2. Google Apps Script エディタに貼り付け
3. 保存（Ctrl+S または Cmd+S）

### 3. スプレッドシートの準備

1. 新しい Google スプレッドシートを作成
2. スプレッドシートの URL をコピー
3. Google Apps Script エディタで `setupSpreadsheet()` 関数を実行
   - 関数名を選択して「実行」ボタンをクリック
   - 初回実行時は権限の承認が必要

### 4. Web API としてデプロイ

1. 「デプロイ」→「新しいデプロイ」をクリック
2. 「種類の選択」で「ウェブアプリ」を選択
3. 以下の設定を行う：
   - **説明**: Wedding RSVP API
   - **次のユーザーとして実行**: 自分
   - **アクセスできるユーザー**: 全員
4. 「デプロイ」をクリック
5. 生成された URL をコピー（環境変数 `GOOGLE_APPS_SCRIPT_URL` に設定）

### 5. 環境変数の設定

Next.js プロジェクトの `.env` ファイルに以下を追加：

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## データ構造

### 送信されるデータ形式

```typescript
interface RSVPData {
  guestId: string; // 招待者ID
  guestName: string; // 招待者名
  events: string[]; // 参加予定イベント ['ceremony', 'reception', 'afterparty']
  attendees: number; // 参加人数
  companions?: Companion[]; // お連れ様情報
  message?: string; // メッセージ
}

interface Companion {
  name: string; // お連れ様名
  relationship?: string; // 関係性
}
```

### スプレッドシートの列構成

1. **招待者 ID**: microCMS の招待者 ID
2. **招待者名**: 招待者の名前
3. **参加予定イベント**: 挙式、披露宴、二次会の組み合わせ
4. **参加人数**: 総参加人数
5. **お連れ様情報**: JSON 形式で保存
6. **メッセージ**: 招待者からのメッセージ
7. **送信日時**: フォーム送信日時

## エラーハンドリング

### データ検証

- 必須フィールドの存在チェック
- イベント名の妥当性チェック
- データ形式の検証

### エラーレスポンス

```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

## テスト方法

### 1. ヘルスチェック

```bash
curl -X GET "YOUR_GOOGLE_APPS_SCRIPT_URL"
```

### 2. テストデータ送信

```bash
curl -X POST "YOUR_GOOGLE_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "guestId": "test123",
    "guestName": "テスト太郎",
    "events": ["ceremony", "reception"],
    "attendees": 2,
    "message": "テストメッセージ"
  }'
```

## トラブルシューティング

### よくある問題

1. **権限エラー**

   - Google Apps Script の権限を再承認
   - スプレッドシートへのアクセス権限を確認

2. **CORS エラー**

   - デプロイ設定で「全員」にアクセス権限を設定
   - ブラウザのキャッシュをクリア

3. **データが保存されない**
   - スプレッドシートの URL が正しいか確認
   - `setupSpreadsheet()` 関数を実行済みか確認

## セキュリティ注意事項

- Google Apps Script URL は公開されるため、機密情報を含めない
- 必要に応じて IP 制限や API キー認証を検討
- 定期的にログを確認し、不正なアクセスを監視

## 更新手順

1. Google Apps Script エディタでコードを更新
2. 保存
3. 「デプロイ」→「管理デプロイ」→「新しいバージョン」でデプロイ
4. 必要に応じて環境変数を更新
