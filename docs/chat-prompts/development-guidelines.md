# 開発ガイドライン

## コーディング規約

### TypeScript

- 厳密な型定義を使用
- `any`型の使用は最小限に
- インターフェースとタイプエイリアスを適切に使い分け

### React/Next.js

- 関数コンポーネントを使用
- Hooksを適切に活用
- Server ComponentsとClient Componentsを適切に分離

### Tailwind CSS

- ユーティリティファーストのアプローチ
- カスタムクラスは最小限に
- レスポンシブデザインを考慮

## ログ・デバッグ

### VibeCoding Logger

- デバッグが必要な場合は `src/app/lib/logger` で定義している `vibelogger` を使用してください
- 出力されるログは `logs` フォルダで確認してください

#### 使用例

```typescript
import { logger, devLogger, logUtils } from '@/lib/logger';

// 基本的なログ出力
await logger.info('operation_name', 'メッセージ', {
  context: { key: 'value' },
  humanNote: '人間向け注釈',
  aiTodo: 'AI向け指示',
});

// エラーログ
await logUtils.logError('operation_name', error, { context: '追加情報' });

// 開発環境用ログ
devLogger.info('debug_info', 'デバッグ情報', { data: 'value' });
```

#### ログファイルの確認

- ログファイル: `logs/wedding-invitations/vibe_YYYYMMDD_HHMMSS.log`
- JSON形式で構造化されたログが記録されます
- AI解析や運用監視に最適化された形式

## テスト

- Jest + Testing Libraryを使用
- コンポーネント、ユーティリティ、APIのテストを実装
- カバレッジ80%以上を目標

## Git運用

- コミットメッセージは日本語で記述
- 機能追加: `feat: 機能説明`
- バグ修正: `fix: 修正内容`
- リファクタリング: `refactor: 変更内容`

## パフォーマンス

- 画像の最適化
- コード分割の活用
- 不要な再レンダリングの回避

## セキュリティ

- 環境変数の適切な管理
- 入力値の検証
- XSS対策の実装

## コミット運用ルール

- コミット時に `--no-verify` オプションを付与して、Husky等のプリフックによるテスト・Lint・Formatチェックを回避することを**禁止**します。
  - 必ず全てのチェックが通った状態でコミットしてください。
  - 強制コミットが必要な場合は、必ずリーダーの承認を得てから実施してください。
