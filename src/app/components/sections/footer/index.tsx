/**
 * @description フッターセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description フッターセクションのProps型定義
 * @interface FooterProps
 * @since 1.0.0
 */
interface FooterProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description フッターセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Footer id="footer" className="section-footer" />
 */
const Footer: React.FC<FooterProps> = ({ id = "footer", className = "" }) => {
  return (
    <section id={id} className={`footer-section ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">フッターセクション</h2>
        <p className="text-center mt-4">フッターセクション</p>
      </div>
    </section>
  );
};

export default Footer;
