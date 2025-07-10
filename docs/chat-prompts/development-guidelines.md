# 開発ガイドライン

## 開発フロー

### GitHub Flow の遵守

**全ての開発作業は以下のGitHub Flowに従って実施してください：**

1. **Issue作成**: 作業内容を明確に定義
2. **ブランチ作成**: `feature/issue-{number}-{title}`形式でブランチを作成
3. **Issueとブランチの紐づけ**: ブランチ作成後にissueにリンク
4. **開発作業**: ブランチ上で実装・テスト・lint・formatを実行
5. **プルリクエスト作成**: レビュー依頼を出す
6. **Issueとプルリクエストの紐づけ**: プルリクエスト作成後にissueにリンク
7. **レビュー対応**: レビューコメントに基づいて修正
8. **マージ**: レビュー承認後にmainブランチにマージ

### ブランチ命名規則

```
feature/issue-{number}-{title}
例: feature/issue-24-mv-section-implementation
```

### レビュー者アサイン

- **GitHub Copilot**: 全てのプルリクエストにレビュー者としてアサイン
- **レビュー承認**: GitHub Copilotのレビュー承認が必要

### Issueとブランチ・プルリクエストの紐づけ

#### ブランチ作成後の紐づけ

ブランチ作成後、以下のいずれかの方法でissueにリンクしてください：

**GitHub Web UI:**

1. issueページで「Create a branch」ボタンをクリック
2. ブランチ名を確認して「Create branch」をクリック

**GitHub CLI:**

```bash
gh issue create-branch {issue_number} --repo {owner}/{repo}
```

**API経由:**

```bash
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}/links" \
  -d '{"link_type": "branch", "link_url": "https://github.com/{owner}/{repo}/tree/{branch_name}"}'
```

#### プルリクエスト作成後の紐づけ

プルリクエスト作成後、以下のいずれかの方法でissueにリンクしてください：

**プルリクエスト説明に記載:**

```
fixes #123
closes #123
resolves #123
```

**GitHub Web UI:**

1. プルリクエストページで「Development」セクションを確認
2. 「Link issues」でissueを選択

**API経由:**

```bash
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}/links" \
  -d '{"link_type": "pull_request", "link_url": "https://github.com/{owner}/{repo}/pull/{pr_number}"}'
```

### プルリクエスト要件

- **タイトル**: `feat: {機能説明} fixes #{issue_number}`
- **説明**: 実装内容、変更理由、テスト結果を記載
- **レビュー**: GitHub Copilotのレビュー承認が必要
- **品質チェック**: 全てのテスト・lint・formatが通ることを確認

### マージ条件

- ✅ GitHub Copilotのレビュー承認済み
- ✅ 全てのテストがパス
- ✅ lint・formatチェックが通る
- ✅ コンフリクトが解決済み

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

### コミットメッセージ

- コミットメッセージは日本語で記述
- 機能追加: `feat: 機能説明 fixes #123`
- バグ修正: `fix: 修正内容 fixes #123`
- リファクタリング: `refactor: 変更内容 fixes #123`

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

- **コミット時はテスト・lint・format必須**
  - 全てのコミットでテスト・lint・formatチェックが通ることを確認してください。
  - エラーがある場合は修正してからコミットしてください。
  - 品質を保つため、チェックをスキップすることは禁止です。
