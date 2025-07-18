/**
 * @description モーダルコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useEffect, useId } from 'react';

/**
 * @description ModalコンポーネントのProps型定義
 * @interface ModalProps
 * @since 1.0.0
 */
interface ModalProps {
  /** モーダルの表示状態 */
  isOpen: boolean;
  /** モーダルのタイトル */
  title?: string;
  /** モーダルの内容 */
  children: React.ReactNode;
  /** 閉じるハンドラー */
  onClose: () => void;
  /** モーダルのサイズ */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  /** 閉じるボタンの表示 */
  showCloseButton?: boolean;
  /** 追加のCSSクラス */
  className?: string;
  /** モーダルのID */
  id?: string;
}

/**
 * @description Modalコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element | null
 * @example
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="確認"
 *   size="md"
 * >
 *   <p>モーダルの内容</p>
 * </Modal>
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  size = 'md',
  showCloseButton = true,
  className = '',
  id,
}) => {
  const generatedId = useId();
  const modalId = id || `modal-${generatedId}`;

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen && typeof document !== 'undefined') {
      document.addEventListener('keydown', handleEscape);
      // スクロールを無効化
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose]);

  // モーダルが閉じている場合は何も表示しない
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    fullscreen: 'w-screen h-screen',
  };

  return (
    <>
      {/* モーダル */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? `${modalId}-title` : undefined}
        id={modalId}
      >
        {/* オーバーレイ */}
        <div
          className='fixed inset-0 bg-black/70'
          onClick={onClose}
          aria-hidden='true'
        />

        <div
          className={`inline-flex ${sizeClasses[size]} ${
            size === 'fullscreen'
              ? 'bg-transparent shadow-none rounded-none flex items-center justify-center'
              : 'bg-white rounded-lg shadow-xl'
          } transform transition-all duration-300 ease-in-out ${className}`}
          onClick={e => e.stopPropagation()}
        >
          {/* ヘッダー（fullscreen時は非表示） */}
          {(title || (showCloseButton && size !== 'fullscreen')) && (
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              {title && (
                <h2
                  id={`${modalId}-title`}
                  className='font-noto text-lg font-semibold text-gray-900'
                >
                  {title}
                </h2>
              )}
              {showCloseButton && size !== 'fullscreen' && (
                <button
                  onClick={onClose}
                  className='p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:ring-offset-2 rounded-md'
                  aria-label='モーダルを閉じる'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* コンテンツ */}
          <div
            className={
              size === 'fullscreen'
                ? 'flex items-center justify-center w-full h-full'
                : 'p-6'
            }
          >
            {size === 'fullscreen' ? (
              <div className='relative inline-flex items-center justify-center'>
                {children}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className='absolute top-0 right-0 m-2 p-2 text-white bg-black/60 hover:bg-black/80 rounded-full focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:ring-offset-2 z-50'
                    aria-label='モーダルを閉じる'
                  >
                    <svg
                      className='w-7 h-7'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
