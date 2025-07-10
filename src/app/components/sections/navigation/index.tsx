/**
 * @description ナビゲーションセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description ナビゲーションセクションのProps型定義
 * @interface NavigationProps
 * @since 1.0.0
 */
interface NavigationProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description ナビゲーションセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Navigation id="navigation" className="section-navigation" />
 */
const Navigation: React.FC<NavigationProps> = ({
  id = 'navigation',
  className = '',
}) => {
  return (
    <section id={id} className={`navigation-section ${className}`}>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center'>
          ナビゲーションセクション
        </h2>
        <p className='text-center mt-4'>
          スムーススクロール機能とアクティブ状態管理
        </p>
      </div>
    </section>
  );
};

export default Navigation;
