import React from 'react';

interface MenuProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const Menu: React.FC<MenuProps> = ({
  className = '',
  width = 24,
  height = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M3 12H21'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 6H21'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 18H21'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Menu;
