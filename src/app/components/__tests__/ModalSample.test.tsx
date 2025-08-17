import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalSample } from '../ModalSample';

// 依存コンポーネントをモック
jest.mock('../common/modal', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Modal: ({ children, isOpen, onClose, title, size, showCloseButton }: any) =>
    isOpen ? (
      <div data-testid='modal' data-size={size}>
        {title && <div data-testid='modal-title'>{title}</div>}
        {showCloseButton && (
          <button onClick={onClose} data-testid='modal-close-button'>
            Close
          </button>
        )}
        <div data-testid='modal-overlay' onClick={onClose}></div>
        {children}
      </div>
    ) : null,
}));

jest.mock('../common/button', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockButton = ({ children, onClick, variant, type, ...props }: any) => (
    <button
      onClick={onClick}
      data-testid={`button-${variant || 'default'}`}
      data-variant={variant}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
  return MockButton;
});

// console.logをモック
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('ModalSample', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('コンポーネントが正常にレンダリングされる', () => {
    render(<ModalSample />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Modal コンポーネントサンプル'
    );
  });

  it('全てのセクション見出しが表示される', () => {
    render(<ModalSample />);

    expect(
      screen.getByRole('heading', { name: '基本モーダル' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '確認モーダル' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'フォームモーダル' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '大サイズモーダル' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'タイトルなしモーダル' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Modalコンポーネントの特徴' })
    ).toBeInTheDocument();
  });

  it('全てのボタンが表示される', () => {
    render(<ModalSample />);

    expect(screen.getByText('基本モーダルを開く')).toBeInTheDocument();
    expect(screen.getByText('確認モーダルを開く')).toBeInTheDocument();
    expect(screen.getByText('フォームモーダルを開く')).toBeInTheDocument();
    expect(screen.getByText('大サイズモーダルを開く')).toBeInTheDocument();
    expect(screen.getByText('タイトルなしモーダルを開く')).toBeInTheDocument();
  });

  describe('基本モーダル', () => {
    it('基本モーダルを開閉できる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルが初期状態で閉じている
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

      // ボタンをクリックしてモーダルを開く
      const openButton = screen.getByText('基本モーダルを開く');
      await user.click(openButton);

      // モーダルが開かれる
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent(
        '基本モーダル'
      );
      expect(screen.getByTestId('modal')).toHaveAttribute('data-size', 'md');

      // モーダル内容を確認
      expect(
        screen.getByText('これは基本的なモーダルコンポーネントのサンプルです。')
      ).toBeInTheDocument();
      expect(screen.getByText('ESCキーで閉じる')).toBeInTheDocument();

      // オーバーレイクリックでモーダルを閉じる
      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('確認モーダル', () => {
    it('確認モーダルを開閉できる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // ボタンをクリックしてモーダルを開く
      const openButton = screen.getByText('確認モーダルを開く');
      await user.click(openButton);

      // モーダルが開かれる
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent('確認');
      expect(screen.getByTestId('modal')).toHaveAttribute('data-size', 'sm');

      // モーダル内容を確認
      expect(screen.getByText('この操作を実行しますか？')).toBeInTheDocument();
      expect(screen.getByText('キャンセル')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '確認' })).toBeInTheDocument();
    });

    it('キャンセルボタンでモーダルを閉じることができる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('確認モーダルを開く');
      await user.click(openButton);

      // キャンセルボタンをクリック
      const cancelButton = screen.getByText('キャンセル');
      await user.click(cancelButton);

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('確認ボタンをクリックするとログが出力されモーダルが閉じる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('確認モーダルを開く');
      await user.click(openButton);

      // 確認ボタンをクリック
      const confirmButton = screen.getByRole('button', { name: '確認' });
      await user.click(confirmButton);

      // ログが出力される
      expect(consoleSpy).toHaveBeenCalledWith('確認ボタンがクリックされました');

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('フォームモーダル', () => {
    it('フォームモーダルを開閉できる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // ボタンをクリックしてモーダルを開く
      const openButton = screen.getByText('フォームモーダルを開く');
      await user.click(openButton);

      // モーダルが開かれる
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent(
        'お問い合わせフォーム'
      );
      expect(screen.getByTestId('modal')).toHaveAttribute('data-size', 'lg');

      // フォーム要素を確認（ラベルテキストで確認）
      expect(screen.getByText('お名前')).toBeInTheDocument();
      expect(screen.getByText('メールアドレス')).toBeInTheDocument();
      expect(screen.getByText('メッセージ')).toBeInTheDocument();
      expect(screen.getByText('送信')).toBeInTheDocument();
    });

    it('フォームに入力できる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('フォームモーダルを開く');
      await user.click(openButton);

      // フォームに入力（複数のinputがあるので順序で取得）
      const inputs = screen.getAllByDisplayValue('');
      const nameInput = inputs[0]; // 最初のinput（お名前）
      const emailInput = inputs[1]; // 2番目のinput（メールアドレス）
      const messageInput = inputs[2]; // 3番目のtextarea（メッセージ）

      await user.type(nameInput, '田中太郎');
      await user.type(emailInput, 'taro@example.com');
      await user.type(messageInput, 'テストメッセージです');

      // 入力値を確認
      expect(nameInput).toHaveValue('田中太郎');
      expect(emailInput).toHaveValue('taro@example.com');
      expect(messageInput).toHaveValue('テストメッセージです');
    });

    it('フォームを送信するとログが出力されフォームがリセットされる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('フォームモーダルを開く');
      await user.click(openButton);

      // フォームに入力
      const inputs = screen.getAllByDisplayValue('');
      const nameInput = inputs[0];
      const emailInput = inputs[1];
      const messageInput = inputs[2];

      await user.type(nameInput, '田中太郎');
      await user.type(emailInput, 'taro@example.com');
      await user.type(messageInput, 'テストメッセージです');

      // フォームを送信
      const form = nameInput.closest('form');
      expect(form).toBeInTheDocument();

      await act(async () => {
        fireEvent.submit(form!);
      });

      // ログが出力される
      expect(consoleSpy).toHaveBeenCalledWith('フォームデータ:', {
        name: '田中太郎',
        email: 'taro@example.com',
        message: 'テストメッセージです',
      });

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('フォームのキャンセルボタンでモーダルを閉じることができる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('フォームモーダルを開く');
      await user.click(openButton);

      // フォームに入力
      const inputs = screen.getAllByDisplayValue('');
      const nameInput = inputs[0];
      await user.type(nameInput, '田中太郎');

      // キャンセルボタンをクリック
      const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
      await user.click(cancelButton);

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

      // 再度開いてフォームがリセットされていないことを確認（キャンセル時はリセットしない）
      await user.click(openButton);
      const reopenedInputs = screen.getAllByDisplayValue('田中太郎');
      expect(reopenedInputs[0]).toHaveValue('田中太郎');
    });
  });

  describe('大サイズモーダル', () => {
    it('大サイズモーダルを開閉できる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // ボタンをクリックしてモーダルを開く
      const openButton = screen.getByText('大サイズモーダルを開く');
      await user.click(openButton);

      // モーダルが開かれる
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent('詳細情報');
      expect(screen.getByTestId('modal')).toHaveAttribute('data-size', 'xl');

      // モーダル内容を確認
      expect(
        screen.getByText(
          'これは大サイズのモーダルです。より多くのコンテンツを表示できます。'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('モーダルのサイズバリエーション')
      ).toBeInTheDocument();
      expect(screen.getByText('アクセシビリティ機能')).toBeInTheDocument();
    });
  });

  describe('タイトルなしモーダル', () => {
    it('タイトルなしモーダルを開閉できる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // ボタンをクリックしてモーダルを開く
      const openButton = screen.getByText('タイトルなしモーダルを開く');
      await user.click(openButton);

      // モーダルが開かれる
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
      expect(screen.getByTestId('modal')).toHaveAttribute('data-size', 'md');

      // 閉じるボタンが表示される
      expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();

      // モーダル内容を確認
      expect(screen.getByText('成功しました！')).toBeInTheDocument();
      expect(
        screen.getByText('操作が正常に完了しました。')
      ).toBeInTheDocument();

      // SVGアイコンを確認（querySelector使用）
      const modal = screen.getByTestId('modal');
      const svg = modal.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('タイトルなしモーダルの閉じるボタンで閉じることができる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('タイトルなしモーダルを開く');
      await user.click(openButton);

      // 閉じるボタンをクリック
      const closeButton = screen.getByText('閉じる');
      await user.click(closeButton);

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('タイトルなしモーダルのXボタンで閉じることができる', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // モーダルを開く
      const openButton = screen.getByText('タイトルなしモーダルを開く');
      await user.click(openButton);

      // Xボタンをクリック
      const xButton = screen.getByTestId('modal-close-button');
      await user.click(xButton);

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Modalコンポーネントの特徴セクション', () => {
    it('特徴セクションが表示される', () => {
      render(<ModalSample />);

      // セクション見出しを確認
      expect(screen.getByText('機能')).toBeInTheDocument();
      expect(screen.getByText('使用例')).toBeInTheDocument();

      // 機能リストを確認
      expect(
        screen.getByText('• 複数のサイズバリエーション')
      ).toBeInTheDocument();
      expect(screen.getByText('• ESCキーでの閉じる機能')).toBeInTheDocument();
      expect(screen.getByText('• アクセシビリティ対応')).toBeInTheDocument();

      // 使用例リストを確認
      expect(screen.getByText('• 確認ダイアログ')).toBeInTheDocument();
      expect(screen.getByText('• フォーム入力')).toBeInTheDocument();
      expect(screen.getByText('• 画像プレビュー')).toBeInTheDocument();
    });
  });

  describe('複数のモーダル状態管理', () => {
    it('複数のモーダルが独立して動作する', async () => {
      const user = userEvent.setup();
      render(<ModalSample />);

      // 基本モーダルを開く
      const basicButton = screen.getByText('基本モーダルを開く');
      await user.click(basicButton);

      expect(screen.getByTestId('modal-title')).toHaveTextContent(
        '基本モーダル'
      );

      // オーバーレイクリックで閉じる
      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);

      // 別のモーダル（確認モーダル）を開く
      const confirmButton = screen.getByText('確認モーダルを開く');
      await user.click(confirmButton);

      expect(screen.getByTestId('modal-title')).toHaveTextContent('確認');

      // キャンセルで閉じる
      const cancelButton = screen.getByText('キャンセル');
      await user.click(cancelButton);

      // モーダルが閉じられる
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });
});
