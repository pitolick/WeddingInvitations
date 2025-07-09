/**
 * @description 入力フィールドコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useId } from "react";

/**
 * @description InputコンポーネントのProps型定義
 * @interface InputProps
 * @since 1.0.0
 */
interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
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
 * @description Inputコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Input
 *   value={value}
 *   onChange={setValue}
 *   placeholder="お名前を入力してください"
 *   label="お名前"
 *   required
 *   type="text"
 *   maxLength={50}
 * />
 */
const Input: React.FC<InputProps> = ({
  value,
  label,
  error,
  onChange,
  className = "",
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  onFocus,
  onBlur,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id || `input-${name || generatedId}`;

  const baseClasses =
    "w-full px-4 py-3 font-noto text-base text-gray-900 bg-white border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-gray-50";

  const errorClasses = error
    ? "border-pink-500 focus:ring-pink-500 focus:border-pink-500"
    : "";

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block font-noto text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-pink-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        className={`${baseClasses} ${errorClasses}`}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={error ? "true" : "false"}
        {...rest}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="font-noto text-sm text-pink-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
