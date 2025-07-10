import React from 'react';
import { devLogger } from '../../../../lib/logger';

interface ArrowProps {
  className?: string;
  width?: number;
  height?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: string;
  /**
   * @description アクセシビリティ用ラベル
   */
  'aria-label'?: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  className = '',
  width = 24,
  height = 24,
  direction = 'right',
  color = 'currentColor',
  'aria-label': ariaLabel = '矢印アイコン',
}) => {
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'rotate(-90)';
      case 'down':
        return 'rotate(90)';
      case 'left':
        return 'rotate(180)';
      case 'right':
      default:
        return '';
    }
  };

  // コンポーネント使用をログに記録
  React.useEffect(() => {
    devLogger.info('component_rendered', 'Arrow component rendered', {
      direction,
      width,
      height,
      color,
      className: className || 'default',
    });
  }, [direction, width, height, color, className]);

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      role='img'
      aria-label={ariaLabel}
      style={{ transform: getTransform() }}
    >
      <path
        d='M9 6L15 12L9 18'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Arrow;
