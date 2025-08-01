/**
 * @description トースト通知システムコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/app/lib/utils';

/**
 * @description トーストの種類
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * @description トーストの位置
 */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

/**
 * @description トーストアイテムのプロパティ
 */
export interface ToastItem {
  /** トーストのID */
  id: string;
  /** トーストの種類 */
  type: ToastType;
  /** トーストのタイトル */
  title: string;
  /** トーストのメッセージ */
  message?: string;
  /** 表示時間（ミリ秒） */
  duration?: number;
  /** 手動で閉じるかどうか */
  closable?: boolean;
  /** 作成時刻 */
  createdAt: number;
}

/**
 * @description トーストコンテキストのプロパティ
 */
export interface ToastContextType {
  /** トーストを追加 */
  addToast: (toast: Omit<ToastItem, 'id' | 'createdAt'>) => void;
  /** トーストを削除 */
  removeToast: (id: string) => void;
  /** 全てのトーストを削除 */
  clearToasts: () => void;
}

/**
 * @description トーストコンテキスト */
export const ToastContext = React.createContext<ToastContextType | null>(null);

/**
 * @description トーストコンテキストの使用フック
 * @returns ToastContextType
 * @throws {Error} ToastContextが提供されていない場合
 */
export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * @description トーストプロバイダーのプロパティ
 */
export interface ToastProviderProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トーストの位置 */
  position?: ToastPosition;
  /** デフォルトの表示時間 */
  defaultDuration?: number;
  /** 最大表示数 */
  maxToasts?: number;
}

/**
 * @description トーストプロバイダーコンポーネント
 * @param props - ToastProviderProps
 * @returns JSX.Element
 * @example
 * ```tsx
 * <ToastProvider position="top-right" maxToasts={5}>
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  defaultDuration = 5000,
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  /**
   * @description トーストを追加する
   * @param toast - 追加するトースト
   */
  const addToast = useCallback(
    (toast: Omit<ToastItem, 'id' | 'createdAt'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastItem = {
        ...toast,
        id,
        createdAt: Date.now(),
        duration: toast.duration ?? defaultDuration,
      };

      setToasts(prev => {
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });
    },
    [defaultDuration, maxToasts]
  );

  /**
   * @description トーストを削除する
   * @param id - 削除するトーストのID
   */
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * @description 全てのトーストを削除する
   */
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // 自動削除の処理
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setToasts(prev =>
        prev.filter(toast => {
          const shouldRemove =
            toast.duration && now - toast.createdAt > toast.duration;
          return !shouldRemove;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const contextValue: ToastContextType = {
    addToast,
    removeToast,
    clearToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position={position}
        toasts={toasts}
        onRemove={removeToast}
      />
    </ToastContext.Provider>
  );
};

/**
 * @description トーストコンテナのプロパティ
 */
export interface ToastContainerProps {
  /** トーストの位置 */
  position: ToastPosition;
  /** トーストのリスト */
  toasts: ToastItem[];
  /** トースト削除コールバック */
  onRemove: (id: string) => void;
}

/**
 * @description トーストコンテナコンポーネント
 * @param props - ToastContainerProps
 * @returns JSX.Element | null
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position,
  toasts,
  onRemove,
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const typeClasses = {
    success: 'bg-green-100 border-green-300 text-green-800',
    error: 'bg-red-100 border-red-300 text-red-800',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    info: 'bg-blue-100 border-blue-300 text-blue-800',
  };

  const iconClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={`fixed z-50 space-y-2 ${positionClasses[position]}`}>
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          typeClasses={typeClasses[toast.type]}
          iconClasses={iconClasses[toast.type]}
          onRemove={onRemove}
        />
      ))}
    </div>,
    document.body
  );
};

/**
 * @description トーストアイテムのプロパティ
 */
export interface ToastItemProps {
  /** トーストアイテム */
  toast: ToastItem;
  /** タイプ別のCSSクラス */
  typeClasses: string;
  /** アイコン別のCSSクラス */
  iconClasses: string;
  /** 削除コールバック */
  onRemove: (id: string) => void;
}

/**
 * @description トーストアイテムコンポーネント
 * @param props - ToastItemProps
 * @returns JSX.Element
 */
export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  typeClasses,
  iconClasses,
  onRemove,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // アニメーション用の遅延
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'error':
        return (
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'info':
        return (
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={cn(
        'flex items-start p-4 border rounded-lg shadow-lg max-w-sm transition-all duration-300',
        typeClasses,
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      )}
      role='alert'
      aria-live='polite'
    >
      <div className={`flex-shrink-0 mr-3 ${iconClasses}`}>{getIcon()}</div>
      <div className='flex-1 min-w-0'>
        <h4 className='text-sm font-medium'>{toast.title}</h4>
        {toast.message && (
          <p className='mt-1 text-sm opacity-90'>{toast.message}</p>
        )}
      </div>
      {toast.closable !== false && (
        <button
          onClick={handleRemove}
          className='flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors'
          aria-label='閉じる'
        >
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * @description トースト通知システムのデフォルトエクスポート
 */
export default ToastProvider;
