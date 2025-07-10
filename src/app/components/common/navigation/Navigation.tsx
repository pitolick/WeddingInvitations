/**
 * @description ナビゲーションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useState } from 'react';

/**
 * @description ナビゲーションアイテムの型定義
 * @interface NavItem
 * @since 1.0.0
 */
interface NavItem {
  /** アイテムのID */
  id: string;
  /** アイテムのラベル */
  label: string;
  /** アイテムのリンク */
  href?: string;
  /** アイテムのアイコン */
  icon?: React.ReactNode;
  /** 子アイテム */
  children?: NavItem[];
  /** アクティブ状態 */
  isActive?: boolean;
}

/**
 * @description NavigationコンポーネントのProps型定義
 * @interface NavigationProps
 * @since 1.0.0
 */
interface NavigationProps {
  /** ナビゲーションアイテムの配列 */
  items: NavItem[];
  /** ナビゲーションのタイプ */
  type?: 'horizontal' | 'vertical';
  /** モバイルメニューの表示 */
  showMobileMenu?: boolean;
  /** アイテムクリックハンドラー */
  onItemClick?: (item: NavItem) => void;
  /** 追加のCSSクラス */
  className?: string;
  /** ナビゲーションのID */
  id?: string;
}

/**
 * @description Navigationコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Navigation
 *   items={[
 *     { id: "home", label: "ホーム", href: "/" },
 *     { id: "about", label: "私たちについて", href: "/about" },
 *     { id: "rsvp", label: "RSVP", href: "/rsvp" }
 *   ]}
 *   type="horizontal"
 *   onItemClick={(item) => console.log(item)}
 * />
 */
const Navigation: React.FC<NavigationProps> = ({
  items,
  type = 'horizontal',
  showMobileMenu = true,
  onItemClick,
  className = '',
  id,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemClick = (item: NavItem) => {
    onItemClick?.(item);
    if (type === 'horizontal' && showMobileMenu) {
      setIsMobileMenuOpen(false);
    }
  };

  const baseClasses = 'font-noto';

  const typeClasses = {
    horizontal: 'flex items-center space-x-8',
    vertical: 'flex flex-col space-y-4',
  };

  const mobileMenuClasses = isMobileMenuOpen ? 'block' : 'hidden';

  return (
    <nav className={`${baseClasses} ${className}`} id={id}>
      {/* デスクトップナビゲーション */}
      <div className={`hidden md:${typeClasses[type]}`}>
        {items.map(item => (
          <NavItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item)}
            type={type}
          />
        ))}
      </div>

      {/* モバイルナビゲーション */}
      {showMobileMenu && (
        <div className='md:hidden'>
          {/* ハンバーガーメニューボタン */}
          <button
            onClick={toggleMobileMenu}
            className='p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:ring-offset-2 rounded-md'
            aria-label='メニューを開く'
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>

          {/* モバイルメニュー */}
          <div
            className={`absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 ${mobileMenuClasses}`}
          >
            <div className='px-4 py-2 space-y-1'>
              {items.map(item => (
                <NavItem
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item)}
                  type='vertical'
                  isMobile
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

/**
 * @description ナビゲーションアイテムコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 */
interface NavItemProps {
  item: NavItem;
  onClick: () => void;
  type: 'horizontal' | 'vertical';
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ item, onClick, isMobile }) => {
  const baseClasses =
    'flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:ring-offset-2';

  const stateClasses = item.isActive
    ? 'bg-lavender-100 text-lavender-700 font-medium'
    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';

  const mobileClasses = isMobile ? 'text-base' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${stateClasses} ${mobileClasses}`}
    >
      {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
      <span className='font-noto'>{item.label}</span>
    </button>
  );
};

export default Navigation;
