'use client';

import React, { useState, useRef, useEffect } from 'react';

// アレルギー候補リスト（カテゴリ別）
const ALLERGY_SUGGESTIONS = {
  肉: ['牛肉', '豚肉', '鶏肉'],
  乳製品: ['卵', '乳'],
  穀物: [
    '小麦',
    'そば',
    '大豆',
    '落花生(ピーナッツ)',
    'アーモンド',
    'カシューナッツ',
    'くるみ',
    'ごま',
  ],
  果物: ['桃', 'りんご', 'バナナ', 'オレンジ', 'キウイフルーツ'],
  魚介類: ['えび', 'かに', 'あわび', 'いか', '鮭', 'いくら'],
  その他: ['まつたけ', 'やまいも', 'ゼラチン'],
};

interface AllergyTagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * アレルギー情報入力用のタグ型セレクトコンポーネント
 * @description カテゴリ別の候補リストから選択または自由入力でアレルギー情報を管理
 * @param value - 選択中のアレルギータグ配列
 * @param onChange - タグ変更時のコールバック
 * @param label - ラベルテキスト
 * @param placeholder - プレースホルダーテキスト
 * @param className - 追加のCSSクラス
 * @param disabled - 無効化フラグ
 */
const AllergyTagsInput: React.FC<AllergyTagsInputProps> = ({
  value = [],
  onChange,
  label = 'アレルギー情報',
  placeholder = '選択または入力してください',
  className = '',
  disabled = false,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 入力値に基づいて候補をフィルタリング
  useEffect(() => {
    const allSuggestions = Object.values(ALLERGY_SUGGESTIONS).flat();

    if (!inputValue.trim()) {
      setFilteredSuggestions(
        allSuggestions.filter(item => !value.includes(item))
      );
    } else {
      const filtered = allSuggestions.filter(
        item =>
          !value.includes(item) &&
          item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [inputValue, value]);

  // タグを追加
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  // タグを削除
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  // 入力欄のキーハンドリング
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  // 候補をクリック
  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  // 候補リストの表示/非表示
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // 少し遅延させてクリックイベントを処理
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* ラベル */}
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      {/* タグ入力エリア */}
      <div className='relative'>
        <div className='min-h-[44px] border border-gray-300 rounded-lg bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500'>
          {/* 選択済みタグ */}
          <div className='flex flex-wrap gap-2 mb-2'>
            {value.map((tag, index) => (
              <span
                key={index}
                className='inline-flex items-center gap-1 px-2 py-1 text-sm bg-pink-100 text-pink-800 rounded-md'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  disabled={disabled}
                  className='text-pink-600 hover:text-pink-800 disabled:opacity-50'
                >
                  <svg
                    className='h-3 w-3'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>

          {/* 入力欄 */}
          <input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              value.length === 0 ? placeholder : '追加のアレルギーを入力...'
            }
            disabled={disabled}
            className='w-full border-none outline-none text-sm placeholder-gray-400 disabled:bg-gray-50'
          />
        </div>

        {/* 候補リスト */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'
          >
            {Object.entries(ALLERGY_SUGGESTIONS).map(([category, items]) => {
              const categoryItems = items.filter(item =>
                filteredSuggestions.includes(item)
              );

              if (categoryItems.length === 0) return null;

              return (
                <div key={category}>
                  <div className='px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200'>
                    {category}
                  </div>
                  {categoryItems.map(item => (
                    <button
                      key={item}
                      type='button'
                      onClick={() => handleSuggestionClick(item)}
                      className='w-full text-left px-3 py-2 text-sm hover:bg-pink-50 hover:text-pink-700 focus:bg-pink-50 focus:text-pink-700 focus:outline-none'
                    >
                      {item}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ヘルプテキスト */}
      <p className='mt-1 text-xs text-gray-500'>
        候補から選択するか、自由に入力してください。Enter または ,
        でタグを追加できます。
      </p>
    </div>
  );
};

export default AllergyTagsInput;
