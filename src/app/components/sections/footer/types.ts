/**
 * @description フッターセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description フッターリンクの型定義
 */
export interface FooterLink {
  /** リンクのラベル */
  label: string;
  /** リンクのURL */
  href: string;
  /** 外部リンクかどうか */
  external?: boolean;
}

/**
 * @description FooterコンポーネントのProps型
 */
export interface FooterProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** フッターリンクの配列 */
  links?: FooterLink[];
}
