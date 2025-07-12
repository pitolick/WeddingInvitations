/**
 * @description フッターセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description フッターリンクの型定義
 * @example
 * ```typescript
 * const footerLink: FooterLink = {
 *   label: 'ホーム',
 *   href: '/',
 *   external: false
 * };
 * ```
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
 * @example
 * ```typescript
 * const footerProps: FooterProps = {
 *   id: 'footer',
 *   className: 'bg-gray-100',
 *   links: [
 *     { label: 'ホーム', href: '/', external: false },
 *     { label: 'GitHub', href: 'https://github.com', external: true }
 *   ]
 * };
 * ```
 */
export interface FooterProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** フッターリンクの配列 */
  links?: FooterLink[];
}
