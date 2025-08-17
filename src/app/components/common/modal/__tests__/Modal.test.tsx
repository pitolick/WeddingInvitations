/**
 * @description Modalコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

beforeEach(() => {
  // 各テスト前にbody.styleをリセット
  document.body.style.overflow = 'unset';
});

afterEach(() => {
  // 各テスト後のクリーンアップ
  document.body.style.overflow = 'unset';
});

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>モーダルコンテンツ</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('基本的なレンダリング', () => {
    it('isOpenがtrueの場合にモーダルが表示される', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('モーダルコンテンツ')).toBeInTheDocument();
    });

    it('isOpenがfalseの場合にモーダルが表示されない', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('モーダルコンテンツ')).not.toBeInTheDocument();
    });

    it('オーバーレイが表示される', () => {
      const { container } = render(<Modal {...defaultProps} />);

      const overlay = container.querySelector('.fixed.inset-0.bg-black\\/70');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('title プロパティ', () => {
    it('titleが指定された場合にヘッダーが表示される', () => {
      render(<Modal {...defaultProps} title='テストタイトル' />);

      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'テストタイトル'
      );
    });

    it('titleが未指定の場合にヘッダータイトルが表示されない', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('aria-labelledbyが正しく設定される', () => {
      render(
        <Modal {...defaultProps} title='テストタイトル' id='test-modal' />
      );

      const modal = screen.getByRole('dialog');
      const heading = screen.getByRole('heading');

      expect(modal).toHaveAttribute('aria-labelledby', 'test-modal-title');
      expect(heading).toHaveAttribute('id', 'test-modal-title');
    });
  });

  describe('size プロパティ', () => {
    it('デフォルトサイズ(md)が適用される', () => {
      const { container } = render(<Modal {...defaultProps} />);

      const modalContent = container.querySelector('.max-w-md');
      expect(modalContent).toBeInTheDocument();
    });

    it('smサイズが適用される', () => {
      const { container } = render(<Modal {...defaultProps} size='sm' />);

      const modalContent = container.querySelector('.max-w-sm');
      expect(modalContent).toBeInTheDocument();
    });

    it('lgサイズが適用される', () => {
      const { container } = render(<Modal {...defaultProps} size='lg' />);

      const modalContent = container.querySelector('.max-w-lg');
      expect(modalContent).toBeInTheDocument();
    });

    it('xlサイズが適用される', () => {
      const { container } = render(<Modal {...defaultProps} size='xl' />);

      const modalContent = container.querySelector('.max-w-xl');
      expect(modalContent).toBeInTheDocument();
    });

    it('fullscreenサイズが適用される', () => {
      const { container } = render(
        <Modal {...defaultProps} size='fullscreen' />
      );

      const modalContent = container.querySelector('.w-screen.h-screen');
      expect(modalContent).toBeInTheDocument();
    });
  });

  describe('showCloseButton プロパティ', () => {
    it('デフォルトで閉じるボタンが表示される', () => {
      render(<Modal {...defaultProps} title='テスト' />);

      const closeButton = screen.getByLabelText('モーダルを閉じる');
      expect(closeButton).toBeInTheDocument();
    });

    it('showCloseButtonがfalseの場合に閉じるボタンが表示されない', () => {
      render(
        <Modal {...defaultProps} title='テスト' showCloseButton={false} />
      );

      const closeButton = screen.queryByLabelText('モーダルを閉じる');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('fullscreenサイズの場合は特別な閉じるボタンが表示される', () => {
      render(
        <Modal {...defaultProps} size='fullscreen' showCloseButton={true} />
      );

      const closeButton = screen.getByLabelText('モーダルを閉じる');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveClass('bg-black/60');
    });

    it('fullscreenサイズでshowCloseButtonがfalseの場合は閉じるボタンが表示されない', () => {
      render(
        <Modal {...defaultProps} size='fullscreen' showCloseButton={false} />
      );

      const closeButton = screen.queryByLabelText('モーダルを閉じる');
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('className プロパティ', () => {
    it('カスタムクラスが追加される', () => {
      const { container } = render(
        <Modal {...defaultProps} className='custom-modal-class' />
      );

      const modalContent = container.querySelector('.custom-modal-class');
      expect(modalContent).toBeInTheDocument();
    });
  });

  describe('id プロパティ', () => {
    it('指定されたIDが適用される', () => {
      render(<Modal {...defaultProps} id='custom-modal-id' />);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('id', 'custom-modal-id');
    });

    it('IDが未指定の場合は自動生成されたIDが使用される', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('id');
      expect(modal.getAttribute('id')).toMatch(/^modal-/);
    });
  });

  describe('イベントハンドラー', () => {
    it('閉じるボタンクリックでonCloseが呼ばれる', () => {
      const handleClose = jest.fn();
      render(<Modal {...defaultProps} onClose={handleClose} title='テスト' />);

      const closeButton = screen.getByLabelText('モーダルを閉じる');
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('オーバーレイクリックでonCloseが呼ばれる', () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Modal {...defaultProps} onClose={handleClose} />
      );

      const overlay = container.querySelector(
        '.fixed.inset-0.bg-black\\/70'
      ) as HTMLElement;
      fireEvent.click(overlay);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('モーダルコンテンツクリックでonCloseが呼ばれない', () => {
      const handleClose = jest.fn();
      render(<Modal {...defaultProps} onClose={handleClose} />);

      const content = screen.getByText('モーダルコンテンツ');
      fireEvent.click(content);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('Escapeキー押下でonCloseが呼ばれる', () => {
      const handleClose = jest.fn();
      render(<Modal {...defaultProps} onClose={handleClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('モーダルが閉じている時はEscapeキーでonCloseが呼ばれない', () => {
      const handleClose = jest.fn();
      render(<Modal {...defaultProps} onClose={handleClose} isOpen={false} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('Escape以外のキー押下ではonCloseが呼ばれない', () => {
      const handleClose = jest.fn();
      render(<Modal {...defaultProps} onClose={handleClose} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('body overflow制御', () => {
    it('モーダル表示時にbody overflowがhiddenになる', () => {
      render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('モーダル非表示時はbody overflowが変更されない', () => {
      document.body.style.overflow = 'auto';
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe('auto');
    });

    it('コンポーネントアンマウント時にbody overflowがリセットされる', () => {
      const { unmount } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('アクセシビリティ', () => {
    it('role="dialog"が設定される', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });

    it('aria-modal="true"が設定される', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('オーバーレイにaria-hidden="true"が設定される', () => {
      const { container } = render(<Modal {...defaultProps} />);

      const overlay = container.querySelector('.fixed.inset-0.bg-black\\/70');
      expect(overlay).toHaveAttribute('aria-hidden', 'true');
    });

    it('閉じるボタンにaria-labelが設定される', () => {
      render(<Modal {...defaultProps} title='テスト' />);

      const closeButton = screen.getByLabelText('モーダルを閉じる');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('fullscreenモードの特殊動作', () => {
    it('fullscreenモードでもtitleがあればヘッダーが表示される', () => {
      render(<Modal {...defaultProps} size='fullscreen' title='テスト' />);

      // fullscreenでもtitleがあればヘッダーは表示される
      expect(screen.getByText('テスト')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('fullscreenモードでtitleもshowCloseButtonもfalseの場合はヘッダーが表示されない', () => {
      render(
        <Modal {...defaultProps} size='fullscreen' showCloseButton={false} />
      );

      // titleもshowCloseButtonもないのでヘッダーエリア全体が表示されない
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      const { container } = render(
        <Modal {...defaultProps} size='fullscreen' showCloseButton={false} />
      );
      const header = container.querySelector(
        '.flex.items-center.justify-between.p-6.border-b'
      );
      expect(header).not.toBeInTheDocument();
    });

    it('fullscreenモードでは特別なレイアウトが適用される', () => {
      const { container } = render(
        <Modal {...defaultProps} size='fullscreen' />
      );

      const content = container.querySelector(
        '.flex.items-center.justify-center.w-full.h-full'
      );
      expect(content).toBeInTheDocument();
    });

    it('fullscreenモードの閉じるボタンは特別なスタイルが適用される', () => {
      render(
        <Modal {...defaultProps} size='fullscreen' showCloseButton={true} />
      );

      const closeButton = screen.getByLabelText('モーダルを閉じる');
      expect(closeButton).toHaveClass('bg-black/60');
      expect(closeButton).toHaveClass('rounded-full');
    });
  });

  describe('複合プロパティのテスト', () => {
    it('すべてのプロパティが同時に正しく動作する', () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={handleClose}
          title='複合テストモーダル'
          size='lg'
          showCloseButton={true}
          className='custom-test-class'
          id='complex-modal'
        >
          <div>複合テストコンテンツ</div>
        </Modal>
      );

      // 基本表示
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('複合テストコンテンツ')).toBeInTheDocument();

      // タイトル
      expect(screen.getByText('複合テストモーダル')).toBeInTheDocument();

      // サイズ
      const modalContent = container.querySelector('.max-w-lg');
      expect(modalContent).toBeInTheDocument();

      // カスタムクラス
      const customClass = container.querySelector('.custom-test-class');
      expect(customClass).toBeInTheDocument();

      // ID
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('id', 'complex-modal');

      // 閉じるボタン機能
      const closeButton = screen.getByLabelText('モーダルを閉じる');
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
