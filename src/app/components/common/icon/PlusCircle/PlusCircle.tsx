/**
 * @description PlusCircleアイコンコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description PlusCircleアイコンコンポーネントのProps型定義
 * @interface PlusCircleProps
 * @since 1.0.0
 */
interface PlusCircleProps {
  /** アイコンのサイズ */
  size?: number;
  /** アイコンの色 */
  color?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description PlusCircleアイコンコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <PlusCircle size={24} color="currentColor" />
 */
const PlusCircle: React.FC<PlusCircleProps> = ({
  size = 17,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.5 16C10.6217 16 12.6566 15.1571 14.1569 13.6569C15.6571 12.1566 16.5 10.1217 16.5 8C16.5 5.87827 15.6571 3.84344 14.1569 2.34315C12.6566 0.842855 10.6217 0 8.5 0C6.37827 0 4.34344 0.842855 2.84315 2.34315C1.34285 3.84344 0.5 5.87827 0.5 8C0.5 10.1217 1.34285 12.1566 2.84315 13.6569C4.34344 15.1571 6.37827 16 8.5 16ZM9.5 5C9.5 4.73478 9.39464 4.48043 9.20711 4.29289C9.01957 4.10536 8.76522 4 8.5 4C8.23478 4 7.98043 4.10536 7.79289 4.29289C7.60536 4.48043 7.5 4.73478 7.5 5V7H5.5C5.23478 7 4.98043 7.10536 4.79289 7.29289C4.60536 7.48043 4.5 7.73478 4.5 8C4.5 8.26522 4.60536 8.51957 4.79289 8.70711C4.98043 8.89464 5.23478 9 5.5 9H7.5V11C7.5 11.2652 7.60536 11.5196 7.79289 11.7071C7.98043 11.8946 8.23478 12 8.5 12C8.76522 12 9.01957 11.8946 9.20711 11.7071C9.39464 11.5196 9.5 11.2652 9.5 11V9H11.5C11.7652 9 12.0196 8.89464 12.2071 8.70711C12.3946 8.51957 12.5 8.26522 12.5 8C12.5 7.73478 12.3946 7.48043 12.2071 7.29289C12.0196 7.10536 11.7652 7 11.5 7H9.5V5Z'
        fill={color}
      />
    </svg>
  );
};

export default PlusCircle;
