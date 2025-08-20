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

```bash
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

**プルリクエスト作成:**

```bash
gh pr create --title "feat: 機能説明 fixes #123" --body "実装内容の説明"
```

詳細な CLI 例は「GitHub CLI」セクションを参照。

**API経由:**

```bash
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}/links" \
  -d '{"link_type": "pull_request", "link_url": "https://github.com/{owner}/{repo}/pull/{pr_number}"}'
```

**GitHub CLI経由:**

詳細な CLI 例は「GitHub CLI」セクションを参照。

#### プルリクエスト作成後の紐づけ

プルリクエスト作成後、以下のいずれかの方法でissueにリンクしてください：

**プルリクエスト説明に記載:**

```bash
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

**GitHub CLI経由:**

詳細な CLI 例は「GitHub CLI」セクションを参照。

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

### テストコード作成時のルール

#### 基本原則：対象処理の変更禁止

**すでに対象となる処理の動作確認が完了しているものに対してテストコードを作成する際は、基本的にテスト対象となる処理をテストコードに合わせて変更することは禁止します。**

#### 例外として許可される変更

##### 1. テスト用属性の追加（動作に影響しない場合のみ）

**許可される変更：**

- `data-testid`属性の追加
- `data-test-*`属性の追加
- その他、テストコードでのみ使用される属性の追加

**条件：**

- 対象処理の動作や仕様が変動しないこと
- ユーザーインターフェースに影響しないこと
- パフォーマンスに影響しないこと

**例：**

```tsx
// 許可される変更
<div data-testid="user-profile-section">
  <h1>ユーザープロフィール</h1>
</div>

// 禁止される変更
<div className="user-profile" data-testid="user-profile-section">
  <h1>ユーザープロフィール</h1>
</div>
```

##### 2. 明らかなバグの修正（事前承認が必要）

**許可される変更：**

- テストケースの方が動作として明らかに正しい場合
- 対象処理のどの部分がどのように誤っているかが明確な場合

**手順：**

1. バグの内容と修正方法を明確に説明
2. リーダーまたはチームメンバーからの承認を得る
3. 承認後に修正を実施

#### フロントエンドテストでの要素取得方法

##### 推奨される要素取得方法

1. **`data-testid`属性を使用**

   ```tsx
   screen.getByTestId('user-profile-section');
   ```

2. **テキスト内容を使用**

   ```tsx
   screen.getByText('ユーザープロフィール');
   screen.getByText(/ユーザー.*プロフィール/);
   ```

3. **ラベルを使用**

   ```tsx
   screen.getByLabelText('ユーザー名');
   ```

4. **ロールを使用**

   ```tsx
   screen.getByRole('button', { name: '送信' });
   screen.getByRole('form');
   ```

##### 禁止される要素取得方法

**以下の方法での要素取得は基本禁止：**

1. **クラス名による取得**

   **理由：** アクセシビリティに基づく取得（ロール/ラベル/テキスト）や data-testid に比べて
   テストがドキュメント構造や命名変更に脆弱で、意図が伝わりにくいため非推奨

##### 要素取得の優先順位

1. **最優先：** `data-testid`属性
2. **高優先：** テキスト内容、ラベル、ロール
3. **中優先：** 親要素からの相対的な位置
4. **低優先：** DOM構造に依存した取得

##### 実装例

```tsx
// 良い例
<div data-testid='contact-form'>
  <h2>連絡先フォーム</h2>
  <form>
    <label htmlFor='name'>お名前</label>
    <input id='name' type='text' />
    <button type='submit'>送信</button>
  </form>
</div>;

// テストコード
const form = screen.getByTestId('contact-form');
const nameInput = screen.getByLabelText('お名前');
const submitButton = screen.getByRole('button', { name: '送信' });
```

#### テストコード作成時のチェックリスト

- [ ] 対象処理の動作確認が完了している
- [ ] テスト用属性の追加のみで対応可能
- [ ] 動作や仕様に影響がない
- [ ] 要素取得方法が適切（クラス名・ID使用禁止）
- [ ] `data-testid`属性を適切に配置
- [ ] テストケースが網羅的
- [ ] テストが安定して動作する

## Git運用

### コミットメッセージ

- コミットメッセージは日本語で記述
- 機能追加: `feat: 機能説明 fixes #123`
- バグ修正: `fix: 修正内容 fixes #123`
- リファクタリング: `refactor: 変更内容 fixes #123`

### GitHub CLI

- GitHub CLI（`gh`コマンド）の使用を許可
- プルリクエスト作成、issue管理、レビュー等で活用
- 認証済みの場合は `gh auth status` で確認可能

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
