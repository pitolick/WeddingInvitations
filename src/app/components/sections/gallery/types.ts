/**
 * @description ギャラリーセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description ギャラリーアイテムの型定義
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
 */
export interface GalleryProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** ギャラリーアイテムの配列 */
  items?: GalleryItem[];
}
