/**
 * @description ギャラリーセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description ギャラリーアイテムの型定義
 * @example
 * ```typescript
 * const galleryItem: GalleryItem = {
 *   id: 'photo-1',
 *   image: '/images/gallery/photo-1.webp',
 *   thumbnail: '/images/gallery/photo-1-thumbnail.webp',
 *   alt: '結婚式の写真1',
 *   description: '挙式の様子'
 * };
 * ```
 */
export interface GalleryItem {
  /** アイテムID */
  id: string;
  /** 画像パス */
  image: string;
  /** サムネイル画像パス */
  thumbnail: string;
  /** 代替テキスト */
  alt: string;
  /** 画像の説明 */
  description?: string;
}

/**
 * @description GalleryコンポーネントのProps型
 * @example
 * ```typescript
 * const galleryProps: GalleryProps = {
 *   id: 'gallery',
 *   className: 'grid grid-cols-3 gap-4',
 *   items: [
 *     {
 *       id: 'photo-1',
 *       image: '/images/gallery/photo-1.webp',
 *       thumbnail: '/images/gallery/photo-1-thumbnail.webp',
 *       alt: '結婚式の写真1'
 *     }
 *   ]
 * };
 * ```
 */
export interface GalleryProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** ギャラリーアイテムの配列 */
  items?: GalleryItem[];
}
