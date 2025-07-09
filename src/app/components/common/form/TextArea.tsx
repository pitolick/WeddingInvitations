/**
 * @description テキストエリアコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useId } from "react";

/**
 * @description TextAreaコンポーネントのProps型定義
 * @interface TextAreaProps
 * @since 1.0.0
 */
interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  /** 入力値 */
  value: string;
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
  /** 変更ハンドラー */
  onChange?: (value: string) => void;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description TextAreaコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <TextArea
 *   value={value}
 *   onChange={setValue}
 *   placeholder="メッセージを入力してください"
 *   label="メッセージ"
 *   rows={4}
 *   maxLength={500}
 * />
 */
const TextArea: React.FC<TextAreaProps> = ({
  value,
  label,
  error,
  onChange,
  className = "",
  id,
  name,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  rows = 4,
  cols,
  onFocus,
  onBlur,
  ...rest
}) => {
  const generatedId = useId();
  const textareaId = id || `textarea-${name || generatedId}`;

  const baseClasses =
    "w-full px-4 py-3 font-noto text-base text-gray-900 bg-white border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-gray-50 resize-vertical";

  const errorClasses = error
    ? "border-pink-500 focus:ring-pink-500 focus:border-pink-500"
    : "";

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block font-noto text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-pink-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        rows={rows}
        cols={cols}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        className={`${baseClasses} ${errorClasses}`}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        aria-invalid={error ? "true" : "false"}
        {...rest}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="font-noto text-sm text-pink-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
