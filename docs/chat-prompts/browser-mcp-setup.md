# Browser MCP セットアップガイド

## 概要

Browser MCP を使用して Web サイトの動作確認を自動化します。AI アプリケーションからブラウザを制御して、テストやタスクの自動化が可能です。

## セットアップ手順

### 1. Browser MCP 拡張機能のインストール

1. [Browser MCP](https://browsermcp.io/)にアクセス
2. "Add to Chrome"ボタンをクリック
3. Chrome 拡張機能をインストール

### 2. Cursor 設定の更新

`.cursorrules`ファイルに以下の設定を追加済み：

```json
"Browser MCP": {
  "command": "npx",
  "args": ["@browsermcp/mcp@latest"]
}
```

### 3. Cursor の再起動

設定を反映するために Cursor を再起動してください。

## 利用可能な機能

Browser MCP では以下の操作が可能です：

- 🌐 **Navigate**: URL に移動
- ⬅️ **Go Back**: 前のページに戻る
- ➡️ **Go Forward**: 次のページに進む
- ⏱️ **Wait**: 指定時間待機
- ⌨️ **Press Key**: キーボード操作
- 📸 **Snapshot**: 現在のページのアクセシビリティスナップショット
- 👆 **Click**: ページ上でクリック
- ✋ **Drag & Drop**: 要素間のドラッグ&ドロップ
- 👋 **Hover**: 要素上でホバー
- 🔤 **Type Text**: 編集可能要素にテキスト入力
- 🖥️ **Get Console Logs**: ブラウザのコンソールログ取得
- 🖼️ **Screenshot**: 現在のページのスクリーンショット

## 開発での活用例

### 自動テスト

- ユーザーフローの自動テスト
- UI 要素の検証
- 異なるシナリオでの動作確認

### タスク自動化

- フォーム入力の自動化
- データ収集の自動化
- ワークフローの自動化

## セキュリティとプライバシー

- ⚡ **高速**: ローカルマシンで実行されるため、ネットワーク遅延なし
- 🔒 **プライベート**: ブラウザ活動はデバイス内に保持
- 👤 **ログイン状態**: 既存のブラウザプロファイルを使用
- 🥷 **ステルス**: 基本的なボット検出や CAPTCHA を回避

## トラブルシューティング

### よくある問題

1. **拡張機能が認識されない**
   - Chrome 拡張機能が正しくインストールされているか確認
   - 拡張機能が有効になっているか確認

2. **MCP サーバーが起動しない**
   - Cursor を再起動
   - `.cursorrules`の設定を確認

3. **ブラウザ操作が動作しない**
   - 対象の Web サイトが開いているか確認
   - ブラウザのセキュリティ設定を確認

## 参考リンク

- [Browser MCP 公式サイト](https://browsermcp.io/)
- [セットアップガイド](https://docs.browsermcp.io/setup-server)
- [GitHub リポジトリ](https://github.com/browsermcp/mcp)
