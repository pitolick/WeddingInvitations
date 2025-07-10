/**
 * @description セレクトコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useId } from 'react';

/**
 * @description オプションの型定義
 * @interface Option
 * @since 1.0.0
 */
interface Option {
  /** オプションの値 */
  value: string;
  /** オプションのラベル */
  label: string;
  /** 無効状態 */
  disabled?: boolean;
}

/**
 * @description SelectコンポーネントのProps型定義
 * @interface SelectProps
 * @since 1.0.0
 */
interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  /** 選択された値 */
  value: string;
  /** オプションの配列 */
  options: Option[];
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
 * @description Selectコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Select
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   options={[
 *     { value: "yes", label: "出席" },
 *     { value: "no", label: "欠席" }
 *   ]}
 *   placeholder="選択してください"
 *   label="出席状況"
 *   required
 *   multiple={false}
 * />
 */
const Select: React.FC<SelectProps> = ({
  value,
  options,
  label,
  error,
  onChange,
  className = '',
  id,
  name,
  required = false,
  disabled = false,
  multiple = false,
  size,
  onFocus,
  onBlur,
  ...rest
}) => {
  const generatedId = useId();
  const selectId = id || `select-${name || generatedId}`;

  const baseClasses =
    'w-full px-4 py-3 font-noto text-base text-gray-900 bg-white border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-gray-50 appearance-none bg-no-repeat bg-right pr-10';

  const errorClasses = error
    ? 'border-pink-500 focus:ring-pink-500 focus:border-pink-500'
    : '';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className='block font-noto text-sm font-medium text-gray-700'
        >
          {label}
          {required && <span className='text-pink-500 ml-1'>*</span>}
        </label>
      )}
      <div className='relative'>
        <select
          id={selectId}
          value={value}
          required={required}
          disabled={disabled}
          multiple={multiple}
          size={size}
          onChange={e => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          className={`${baseClasses} ${errorClasses}`}
          aria-describedby={error ? `${selectId}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
          }}
          {...rest}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p
          id={`${selectId}-error`}
          className='font-noto text-sm text-pink-600'
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
