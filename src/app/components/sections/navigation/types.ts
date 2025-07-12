/**
 * @description ナビゲーションセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description ナビゲーションアイテムの型定義
 */
export interface NavItem {
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
 */
export interface NavigationProps {
  /** ナビゲーションアイテムの配列 */
  items?: NavItem[];
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
