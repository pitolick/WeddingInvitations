/**
 * @description エラー通知コンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { cn } from '@/app/lib/utils';

/**
 * @description エラーの種類
 */
export type ErrorType = 'error' | 'warning' | 'info';

/**
 * @description エラー通知の位置
 */
export type ErrorNotificationPosition = 'top' | 'bottom' | 'center';

/**
 * @description エラー通知コンポーネントのプロパティ
 */
export interface ErrorNotificationProps {
  /** エラーメッセージ */
  message: string;
  /** エラーの種類 */
  type?: ErrorType;
  /** エラーのタイトル */
  title?: string;
  /** 表示時間（ミリ秒、0の場合は手動で閉じる） */
  duration?: number;
  /** エラー通知の位置 */
  position?: ErrorNotificationPosition;
  /** 手動で閉じるかどうか */
  closable?: boolean;
  /** 追加のCSSクラス */
  className?: string;
  /** 閉じるコールバック */
  onClose?: () => void;
  /** 子要素 */
  children?: React.ReactNode;
}

/**
 * @description エラー通知コンポーネント
 * @param props - ErrorNotificationProps
 * @returns JSX.Element | null
 * @example
 * ```tsx
 * <ErrorNotification
 *   message="エラーが発生しました"
 *   type="error"
 *   duration={5000}
 *   onClose={() => console.log('閉じられました')}
 * />
 * ```
 */
export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  type = 'error',
  title,
  duration = 0,
  position = 'top',
  closable = true,
  className,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // 自動閉じる処理
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // アニメーション完了後にコールバック実行
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const typeClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconClasses = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const positionClasses = {
    top: 'top-4 left-1/2 transform -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 transform -translate-x-1/2',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  const getIcon = () => {
    switch (type) {
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

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed z-50 max-w-sm w-full p-4 border rounded-lg shadow-lg transition-all duration-300',
        typeClasses[type],
        positionClasses[position],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
        className
      )}
      role='alert'
      aria-live='polite'
    >
      <div className='flex items-start'>
        <div className={`flex-shrink-0 mr-3 ${iconClasses[type]}`}>
          {getIcon()}
        </div>
        <div className='flex-1 min-w-0'>
          {title && <h4 className='text-sm font-medium mb-1'>{title}</h4>}
          <p className='text-sm'>{message}</p>
          {children && <div className='mt-2'>{children}</div>}
        </div>
        {closable && (
          <button
            onClick={handleClose}
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
    </div>
  );
};

/**
 * @description エラー通知マネージャーのプロパティ
 */
export interface ErrorNotificationManagerProps {
  /** 子要素 */
  children: React.ReactNode;
  /** エラー通知の位置 */
  position?: ErrorNotificationPosition;
  /** デフォルトの表示時間 */
  defaultDuration?: number;
}

/**
 * @description エラー通知マネージャーの状態
 */
export interface ErrorNotificationState {
  /** エラー通知のリスト */
  notifications: Array<{
    id: string;
    message: string;
    type: ErrorType;
    title?: string;
    duration?: number;
    closable?: boolean;
  }>;
}

/**
 * @description エラー通知マネージャーのコンテキスト
 */
export interface ErrorNotificationContextType {
  /** エラー通知を追加 */
  addNotification: (
    notification: Omit<ErrorNotificationState['notifications'][0], 'id'>
  ) => void;
  /** エラー通知を削除 */
  removeNotification: (id: string) => void;
  /** 全てのエラー通知を削除 */
  clearNotifications: () => void;
}

/**
 * @description エラー通知コンテキスト
 */
export const ErrorNotificationContext =
  React.createContext<ErrorNotificationContextType | null>(null);

/**
 * @description エラー通知コンテキストの使用フック
 * @returns ErrorNotificationContextType
 * @throws {Error} ErrorNotificationContextが提供されていない場合
 */
export const useErrorNotification = (): ErrorNotificationContextType => {
  const context = React.useContext(ErrorNotificationContext);
  if (!context) {
    throw new Error(
      'useErrorNotification must be used within an ErrorNotificationManager'
    );
  }
  return context;
};

/**
 * @description エラー通知マネージャーコンポーネント
 * @param props - ErrorNotificationManagerProps
 * @returns JSX.Element
 * @example
 * ```tsx
 * <ErrorNotificationManager position="top" defaultDuration={5000}>
 *   <App />
 * </ErrorNotificationManager>
 * ```
 */
export const ErrorNotificationManager: React.FC<
  ErrorNotificationManagerProps
> = ({ children, position = 'top', defaultDuration = 5000 }) => {
  const [notifications, setNotifications] = React.useState<
    ErrorNotificationState['notifications']
  >([]);

  const addNotification = React.useCallback(
    (notification: Omit<ErrorNotificationState['notifications'][0], 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newNotification = {
        ...notification,
        id,
        duration: notification.duration ?? defaultDuration,
      };

      setNotifications(prev => [...prev, newNotification]);
    },
    [defaultDuration]
  );

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  }, []);

  const clearNotifications = React.useCallback(() => {
    setNotifications([]);
  }, []);

  const contextValue: ErrorNotificationContextType = {
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <ErrorNotificationContext.Provider value={contextValue}>
      {children}
      {notifications.map(notification => (
        <ErrorNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          title={notification.title}
          duration={notification.duration}
          position={position}
          closable={notification.closable}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </ErrorNotificationContext.Provider>
  );
};

/**
 * @description エラー通知コンポーネントのデフォルトエクスポート
 */
export default ErrorNotification;
