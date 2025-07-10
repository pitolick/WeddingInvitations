/**
 * @description カウントダウンセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description カウントダウンセクションのProps型定義
 * @interface CountdownProps
 * @since 1.0.0
 */
interface CountdownProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description カウントダウンセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Countdown id="countdown" className="section-countdown" />
 */
const Countdown: React.FC<CountdownProps> = ({
  id = 'countdown',
  className = '',
}) => {
  return (
    <section id={id} className={`countdown-section ${className}`}>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center'>
          カウントダウンセクション
        </h2>
        <p className='text-center mt-4'>
          リアルタイムカウントダウン機能とアニメーション効果
        </p>
      </div>
    </section>
  );
};

export default Countdown;
