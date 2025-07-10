/**
 * @description メインビジュアル（MV）セクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description MVセクションのProps型定義
 * @interface MainVisualProps
 * @since 1.0.0
 */
interface MainVisualProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description メインビジュアル（MV）セクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <MainVisual id="mv" className="section-mv" />
 */
const MainVisual: React.FC<MainVisualProps> = ({
  id = 'mv',
  className = '',
}) => {
  return (
    <section id={id} className={`main-visual-section ${className}`}>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center'>
          メインビジュアルセクション
        </h1>
        <p className='text-center mt-4'>
          ディズニーテーマのアニメーション重視デザイン
        </p>
      </div>
    </section>
  );
};

export default MainVisual;
