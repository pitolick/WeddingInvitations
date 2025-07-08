/**
 * @description RSVPセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description RSVPセクションのProps型定義
 * @interface RSVPProps
 * @since 1.0.0
 */
interface RSVPProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description RSVPセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <RSVP id="rsvp" className="section-rsvp" />
 */
const RSVP: React.FC<RSVPProps> = ({ id = "rsvp", className = "" }) => {
  return (
    <section id={id} className={`rsvp-section ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">RSVPセクション</h2>
        <p className="text-center mt-4">出欠確認セクション</p>
      </div>
    </section>
  );
};

export default RSVP;
