/**
 * @description ユーティリティ関数のエクスポート
 * @author WeddingInvitations
 * @since 1.0.0
 */

export * from './calendar';
export * from './image';

/**
 * @description CSSクラス名を結合するユーティリティ関数
 * @param classes - 結合するクラス名の配列
 * @returns 結合されたクラス名文字列
 * @example
 * ```typescript
 * cn('base-class', condition && 'conditional-class', 'another-class')
 * // 結果: 'base-class another-class'
 * ```
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}
