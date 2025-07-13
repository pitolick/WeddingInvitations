/**
 * @description チェックボックスコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useId } from 'react';

/**
 * @description チェックボックスオプションの型定義
 * @interface CheckboxOption
 * @since 1.0.0
 */
interface CheckboxOption {
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
 * @description 単一チェックボックスのProps型定義
 * @interface SingleCheckboxProps
 * @since 1.0.0
 */
interface SingleCheckboxProps {
  /** チェック状態 */
  checked: boolean;
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
  /** 変更ハンドラー */
  onChange?: (checked: boolean) => void;
  /** 追加のCSSクラス */
  className?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 無効かどうか */
  disabled?: boolean;
  /** 名前属性 */
  name?: string;
  /** 値 */
  value?: string;
}

/**
 * @description チェックボックスグループのProps型定義
 * @interface CheckboxGroupProps
 * @since 1.0.0
 */
interface CheckboxGroupProps {
  /** 選択された値の配列 */
  values: string[];
  /** チェックボックスのオプション配列 */
  options: CheckboxOption[];
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
  /** 変更ハンドラー */
  onChange?: (values: string[]) => void;
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
 * @description 単一チェックボックスコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Checkbox
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   label="利用規約に同意する"
 *   required
 * />
 */
const SingleCheckbox: React.FC<SingleCheckboxProps> = ({
  checked,
  label,
  error,
  onChange,
  className = '',
  required = false,
  disabled = false,
  name,
  value,
}) => {
  const generatedId = useId();
  const checkboxId = name || `checkbox-${generatedId}`;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className='flex items-start'>
        <input
          id={checkboxId}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          name={name}
          value={value}
          className='mt-1 h-4 w-4 text-lavender-600 border-gray-300 rounded focus:ring-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed'
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
        {label && (
          <div className='ml-3 flex-1'>
            <label
              htmlFor={checkboxId}
              className={`block font-noto text-sm ${
                disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-900 cursor-pointer'
              }`}
            >
              {label}
              {required && <span className='text-pink-500 ml-1'>*</span>}
            </label>
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${checkboxId}-error`}
          className='font-noto text-sm text-pink-600'
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * @description チェックボックスグループコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <CheckboxGroup
 *   values={selectedValues}
 *   onChange={setSelectedValues}
 *   options={[
 *     { value: "option1", label: "オプション1" },
 *     { value: "option2", label: "オプション2", description: "説明文" }
 *   ]}
 *   label="複数選択してください"
 *   required
 * />
 */
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  values,
  options,
  label,
  error,
  onChange,
  className = '',
  required = false,
  disabled = false,
  name,
  layout = 'vertical',
}) => {
  const generatedId = useId();
  const groupId = name || `checkbox-group-${generatedId}`;

  const handleOptionChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    if (checked) {
      onChange([...values, optionValue]);
    } else {
      onChange(values.filter(value => value !== optionValue));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
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
          layout === 'horizontal' ? 'flex flex-row gap-4' : 'space-y-2'
        }`}
        role='checkboxgroup'
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const isChecked = values.includes(option.value);
          const isOptionDisabled = disabled || option.disabled;

          return (
            <div key={option.value} className='flex items-start'>
              <input
                id={optionId}
                type='checkbox'
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isOptionDisabled}
                onChange={e =>
                  handleOptionChange(option.value, e.target.checked)
                }
                className='mt-1 h-4 w-4 text-lavender-600 border-gray-300 rounded focus:ring-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed'
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
                    className={`font-noto text-xs ${
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
          id={`${groupId}-error`}
          className='font-noto text-sm text-pink-600'
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * @description チェックボックスコンポーネント（単一またはグループ）
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 */
const Checkbox: React.FC<SingleCheckboxProps | CheckboxGroupProps> = props => {
  // グループかどうかを判定（optionsプロパティの存在で判定）
  if ('options' in props) {
    return <CheckboxGroup {...(props as CheckboxGroupProps)} />;
  } else {
    return <SingleCheckbox {...(props as SingleCheckboxProps)} />;
  }
};

export default Checkbox;
