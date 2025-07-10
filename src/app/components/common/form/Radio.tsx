/**
 * @description ラジオボタンコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useId } from 'react';

/**
 * @description ラジオボタンオプションの型定義
 * @interface RadioOption
 * @since 1.0.0
 */
interface RadioOption {
  /** オプションの値 */
  value: string;
  /** オプションのラベル */
  label: string;
  /** オプションの説明（オプション） */
  description?: string;
  /** オプションが無効かどうか */
  disabled?: boolean;
}

/**
 * @description RadioコンポーネントのProps型定義
 * @interface RadioProps
 * @since 1.0.0
 */
interface RadioProps {
  /** 選択された値 */
  value: string;
  /** ラジオボタンのオプション配列 */
  options: RadioOption[];
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
  /** 変更ハンドラー */
  onChange?: (value: string) => void;
  /** 追加のCSSクラス */
  className?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 無効かどうか */
  disabled?: boolean;
  /** 名前属性 */
  name?: string;
  /** レイアウトタイプ */
  layout?: 'vertical' | 'horizontal';
  /** 横並び時のカラム数（レスポンシブ対応） */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * @description Radioコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Radio
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   options={[
 *     { value: "option1", label: "オプション1" },
 *     { value: "option2", label: "オプション2", description: "説明文" }
 *   ]}
 *   label="選択してください"
 *   required
 * />
 */
const Radio: React.FC<RadioProps> = ({
  value,
  options,
  label,
  error,
  onChange,
  className = '',
  required = false,
  disabled = false,
  name,
  layout = 'vertical',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
}) => {
  const generatedId = useId();
  const radioGroupId = name || `radio-${generatedId}`;

  const baseClasses = 'space-y-3';
  const errorClasses = error ? 'border-pink-500' : '';

  // レスポンシブグリッドクラスの生成
  const getGridClasses = () => {
    const mobileCols = columns.mobile || 1;
    const tabletCols = columns.tablet || 2;
    const desktopCols = columns.desktop || 3;

    return `grid grid-cols-${mobileCols} sm:grid-cols-${tabletCols} lg:grid-cols-${desktopCols} gap-4`;
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      {label && (
        <div className='flex items-center'>
          <label className='block font-noto text-sm font-medium text-gray-700'>
            {label}
            {required && <span className='text-pink-500 ml-1'>*</span>}
          </label>
        </div>
      )}
      <div
        className={`${
          layout === 'horizontal' ? getGridClasses() : 'space-y-2'
        } ${errorClasses}`}
        role='radiogroup'
        aria-labelledby={label ? `${radioGroupId}-label` : undefined}
        aria-describedby={error ? `${radioGroupId}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      >
        {options.map((option, index) => {
          const optionId = `${radioGroupId}-${index}`;
          const isChecked = value === option.value;
          const isOptionDisabled = disabled || option.disabled;

          return (
            <div key={option.value} className='flex items-start'>
              <input
                id={optionId}
                type='radio'
                name={radioGroupId}
                value={option.value}
                checked={isChecked}
                disabled={isOptionDisabled}
                onChange={e => onChange?.(e.target.value)}
                className='mt-1 h-4 w-4 text-lavender-600 border-gray-300 focus:ring-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed'
                aria-describedby={
                  option.description ? `${optionId}-description` : undefined
                }
              />
              <div className='ml-3 flex-1'>
                <label
                  htmlFor={optionId}
                  className={`block font-noto text-sm ${
                    isOptionDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-900 cursor-pointer'
                  }`}
                >
                  {option.label}
                </label>
                {option.description && (
                  <p
                    id={`${optionId}-description`}
                    className={`font-noto text-sm mt-1 ${
                      isOptionDisabled ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {error && (
        <p
          id={`${radioGroupId}-error`}
          className='font-noto text-sm text-pink-600'
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Radio;
