'use client';

import { useState } from 'react';
import { Modal } from './common/modal';
import Button from './common/button';

/**
 * @description Modalコンポーネントのサンプルページ
 * @returns ModalサンプルのJSX要素
 */
export function ModalSample() {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isNoTitleModalOpen, setIsNoTitleModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('フォームデータ:', formData);
    setIsFormModalOpen(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
        Modal コンポーネントサンプル
      </h2>

      {/* 基本モーダル */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>基本モーダル</h3>
        <div className='flex flex-wrap gap-4'>
          <Button variant='primary' onClick={() => setIsBasicModalOpen(true)}>
            基本モーダルを開く
          </Button>
        </div>

        <Modal
          isOpen={isBasicModalOpen}
          onClose={() => setIsBasicModalOpen(false)}
          title='基本モーダル'
          size='md'
        >
          <div className='space-y-4'>
            <p className='font-noto text-gray-700'>
              これは基本的なモーダルコンポーネントのサンプルです。
            </p>
            <p className='font-noto text-gray-700'>
              モーダルは以下の機能を提供します：
            </p>
            <ul className='font-noto text-gray-700 list-disc list-inside space-y-1'>
              <li>ESCキーで閉じる</li>
              <li>オーバーレイクリックで閉じる</li>
              <li>アクセシビリティ対応</li>
              <li>スクロール制御</li>
            </ul>
          </div>
        </Modal>
      </section>

      {/* 確認モーダル */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>確認モーダル</h3>
        <div className='flex flex-wrap gap-4'>
          <Button
            variant='secondary'
            onClick={() => setIsConfirmModalOpen(true)}
          >
            確認モーダルを開く
          </Button>
        </div>

        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title='確認'
          size='sm'
        >
          <div className='space-y-4'>
            <p className='font-noto text-gray-700'>この操作を実行しますか？</p>
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                onClick={() => setIsConfirmModalOpen(false)}
              >
                キャンセル
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  console.log('確認ボタンがクリックされました');
                  setIsConfirmModalOpen(false);
                }}
              >
                確認
              </Button>
            </div>
          </div>
        </Modal>
      </section>

      {/* フォームモーダル */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>
          フォームモーダル
        </h3>
        <div className='flex flex-wrap gap-4'>
          <Button variant='primary' onClick={() => setIsFormModalOpen(true)}>
            フォームモーダルを開く
          </Button>
        </div>

        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title='お問い合わせフォーム'
          size='lg'
        >
          <form onSubmit={handleFormSubmit} className='space-y-4'>
            <div>
              <label className='block font-noto text-sm font-medium text-gray-700 mb-1'>
                お名前
              </label>
              <input
                type='text'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent'
                required
              />
            </div>
            <div>
              <label className='block font-noto text-sm font-medium text-gray-700 mb-1'>
                メールアドレス
              </label>
              <input
                type='email'
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent'
                required
              />
            </div>
            <div>
              <label className='block font-noto text-sm font-medium text-gray-700 mb-1'>
                メッセージ
              </label>
              <textarea
                value={formData.message}
                onChange={e =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent'
                required
              />
            </div>
            <div className='flex justify-end space-x-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsFormModalOpen(false)}
              >
                キャンセル
              </Button>
              <Button type='submit' variant='primary'>
                送信
              </Button>
            </div>
          </form>
        </Modal>
      </section>

      {/* 大サイズモーダル */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>
          大サイズモーダル
        </h3>
        <div className='flex flex-wrap gap-4'>
          <Button variant='secondary' onClick={() => setIsLargeModalOpen(true)}>
            大サイズモーダルを開く
          </Button>
        </div>

        <Modal
          isOpen={isLargeModalOpen}
          onClose={() => setIsLargeModalOpen(false)}
          title='詳細情報'
          size='xl'
        >
          <div className='space-y-4'>
            <p className='font-noto text-gray-700'>
              これは大サイズのモーダルです。より多くのコンテンツを表示できます。
            </p>
            <div className='bg-gray-50 p-4 rounded-md'>
              <h4 className='font-noto font-semibold text-gray-800 mb-2'>
                モーダルのサイズバリエーション
              </h4>
              <ul className='font-noto text-gray-700 space-y-1'>
                <li>• sm: 最大幅 384px</li>
                <li>• md: 最大幅 448px（デフォルト）</li>
                <li>• lg: 最大幅 512px</li>
                <li>• xl: 最大幅 576px</li>
              </ul>
            </div>
            <div className='bg-lavender-50 p-4 rounded-md'>
              <h4 className='font-noto font-semibold text-lavender-800 mb-2'>
                アクセシビリティ機能
              </h4>
              <ul className='font-noto text-lavender-700 space-y-1'>
                <li>• ARIA属性の適切な設定</li>
                <li>• キーボードナビゲーション対応</li>
                <li>• フォーカス管理</li>
                <li>• スクリーンリーダー対応</li>
              </ul>
            </div>
          </div>
        </Modal>
      </section>

      {/* タイトルなしモーダル */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>
          タイトルなしモーダル
        </h3>
        <div className='flex flex-wrap gap-4'>
          <Button variant='outline' onClick={() => setIsNoTitleModalOpen(true)}>
            タイトルなしモーダルを開く
          </Button>
        </div>

        <Modal
          isOpen={isNoTitleModalOpen}
          onClose={() => setIsNoTitleModalOpen(false)}
          size='md'
          showCloseButton={true}
        >
          <div className='space-y-4'>
            <div className='text-center'>
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-lavender-100 mb-4'>
                <svg
                  className='h-6 w-6 text-lavender-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='font-noto text-lg font-medium text-gray-900 mb-2'>
                成功しました！
              </h3>
              <p className='font-noto text-gray-700'>
                操作が正常に完了しました。
              </p>
            </div>
            <div className='flex justify-center pt-4'>
              <Button
                variant='primary'
                onClick={() => setIsNoTitleModalOpen(false)}
              >
                閉じる
              </Button>
            </div>
          </div>
        </Modal>
      </section>

      {/* モーダルの特徴説明 */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>
          Modalコンポーネントの特徴
        </h3>
        <div className='bg-gray-50 p-6 rounded-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h4 className='font-noto font-semibold text-gray-800 mb-3'>
                機能
              </h4>
              <ul className='font-noto text-gray-700 space-y-2'>
                <li>• 複数のサイズバリエーション</li>
                <li>• ESCキーでの閉じる機能</li>
                <li>• オーバーレイクリックでの閉じる機能</li>
                <li>• スクロール制御</li>
                <li>• アクセシビリティ対応</li>
                <li>• カスタマイズ可能なタイトル</li>
                <li>• 閉じるボタンの表示/非表示</li>
              </ul>
            </div>
            <div>
              <h4 className='font-noto font-semibold text-gray-800 mb-3'>
                使用例
              </h4>
              <ul className='font-noto text-gray-700 space-y-2'>
                <li>• 確認ダイアログ</li>
                <li>• フォーム入力</li>
                <li>• 詳細情報表示</li>
                <li>• 画像プレビュー</li>
                <li>• 設定画面</li>
                <li>• 通知メッセージ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
