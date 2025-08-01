/**
 * @description React Error Boundaryコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
// Loggerはデバッグが必要な時だけ使用
// import { logError } from '@/app/lib/errors';

/**
 * @description ErrorBoundaryのプロパティ
 */
interface ErrorBoundaryProps {
  /** 子コンポーネント */
  children: ReactNode;
  /** フォールバックUI */
  fallback?: ReactNode;
  /** エラーが発生した時のコールバック */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * @description ErrorBoundaryの状態
 */
interface ErrorBoundaryState {
  /** エラーが発生したかどうか */
  hasError: boolean;
  /** エラーオブジェクト */
  error?: Error;
}

/**
 * @description React Error Boundaryコンポーネント
 * @example
 * ```typescript
 * <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @description エラーが発生した時に呼ばれる静的メソッド
   * @param error - エラーオブジェクト
   * @returns 新しい状態
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * @description エラーが発生した時に呼ばれるライフサイクルメソッド
   * @param error - エラーオブジェクト
   * @param errorInfo - エラー情報
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // デバッグが必要な時だけログ出力
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary Error:', {
        message: error.message,
        stack: error.stack,
        errorInfo: errorInfo,
      });
    }

    // カスタムエラーハンドラーを呼び出し
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * @description エラーをリセットする
   */
  resetError = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // カスタムフォールバックUIが指定されている場合はそれを使用
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // デフォルトのエラーUI
      return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4'>
          <div className='max-w-md w-full text-center'>
            {/* エラーアイコン */}
            <div className='mb-8'>
              <div className='text-6xl font-bold text-red-500 mb-4'>!</div>
              <div className='w-24 h-24 mx-auto mb-6'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  className='w-full h-full text-red-400'
                  strokeWidth='1.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                  />
                </svg>
              </div>
            </div>

            {/* メッセージ */}
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>
              コンポーネントエラー
            </h1>
            <div className='text-gray-600 space-y-4 mb-8'>
              <p>
                申し訳ございませんが、コンポーネントでエラーが発生しました。
              </p>
              <p>もう一度試すか、ページを再読み込みしてください。</p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='text-left bg-gray-100 p-4 rounded-lg'>
                  <summary className='cursor-pointer font-medium text-gray-700 mb-2'>
                    開発者向け情報
                  </summary>
                  <div className='text-sm text-gray-600 space-y-2'>
                    <p>
                      <strong>エラーメッセージ:</strong>{' '}
                      {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className='text-xs bg-gray-200 p-2 rounded overflow-auto max-h-32'>
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* アクションボタン */}
            <div className='space-y-4'>
              <button
                onClick={this.resetError}
                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                もう一度試す
              </button>
              <button
                onClick={() => window.location.reload()}
                className='w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              >
                ページを再読み込み
              </button>
            </div>

            {/* 装飾要素 */}
            <div className='mt-12 opacity-30'>
              <div className='flex justify-center space-x-2'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='w-2 h-2 bg-red-400 rounded-full animate-pulse'
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * @description ErrorBoundaryを使用するためのHOC（Higher-Order Component）
 * @param Component - ラップするコンポーネント
 * @param fallback - フォールバックUI（オプション）
 * @returns エラーハンドリング付きのコンポーネント
 * @example
 * ```typescript
 * const SafeComponent = withErrorBoundary(MyComponent, <div>エラーが発生しました</div>);
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
