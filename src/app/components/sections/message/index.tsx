/**
 * @description メッセージセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description メッセージセクションのProps型定義
 * @interface MessageProps
 * @since 1.0.0
 */
interface MessageProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description メッセージセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Message id="message" className="section-message" />
 */
const Message: React.FC<MessageProps> = ({
  id = "message",
  className = "",
}) => {
  return (
    <section id={id} className={`message-section ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">メッセージセクション</h2>
        <p className="text-center mt-4">メッセージ表示セクション</p>
      </div>
    </section>
  );
};

export default Message;
