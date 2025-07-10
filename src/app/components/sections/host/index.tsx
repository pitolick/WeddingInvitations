/**
 * @description ホストセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description ホストセクションのProps型定義
 * @interface HostProps
 * @since 1.0.0
 */
interface HostProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description ホストセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Host id="host" className="section-host" />
 */
const Host: React.FC<HostProps> = ({ id = 'host', className = '' }) => {
  return (
    <section id={id} className={`host-section ${className}`}>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center'>ホストセクション</h2>
        <p className='text-center mt-4'>新郎新婦紹介セクション</p>
      </div>
    </section>
  );
};

export default Host;
