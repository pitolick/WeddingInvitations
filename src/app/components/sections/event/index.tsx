/**
 * @description イベントセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description イベントセクションのProps型定義
 * @interface EventProps
 * @since 1.0.0
 */
interface EventProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description イベントセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Event id="event" className="section-event" />
 */
const Event: React.FC<EventProps> = ({ id = 'event', className = '' }) => {
  return (
    <section id={id} className={`event-section ${className}`}>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center'>イベントセクション</h2>
        <p className='text-center mt-4'>イベント詳細セクション</p>
      </div>
    </section>
  );
};

export default Event;
