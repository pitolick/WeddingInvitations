/**
 * @description フォームコンポーネントの使用例サンプル
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { Input, TextArea, Radio, Checkbox } from './index';

/**
 * @description フォームサンプルコンポーネント
 * @returns JSX.Element
 */
const FormSample: React.FC = () => {
  // フォームの状態管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    attendance: '',
    dietaryRestrictions: [] as string[],
    agreeToTerms: false,
    receiveUpdates: false,
  });

  // エラー状態管理
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * @description 入力値の変更ハンドラー
   * @param field - フィールド名
   * @param value - 新しい値
   */
  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  /**
   * @description フォーム送信ハンドラー
   * @param e - フォームイベント
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前は必須です';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.attendance) {
      newErrors.attendance = '出欠の選択は必須です';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '利用規約への同意は必須です';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // フォーム送信処理（実際の実装ではAPI呼び出しなど）
    console.log('フォームデータ:', formData);
    alert('フォームが送信されました！');
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-noto font-bold text-gray-900 mb-6'>
        結婚式出欠確認フォーム
      </h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* 基本情報セクション */}
        <div className='space-y-4'>
          <h3 className='text-lg font-noto font-semibold text-gray-800'>
            基本情報
          </h3>

          <Input
            label='お名前'
            value={formData.name}
            onChange={value => handleInputChange('name', value)}
            placeholder='山田太郎'
            required
            error={errors.name}
          />

          <Input
            label='メールアドレス'
            type='email'
            value={formData.email}
            onChange={value => handleInputChange('email', value)}
            placeholder='example@email.com'
            required
            error={errors.email}
          />

          <Input
            label='電話番号'
            type='tel'
            value={formData.phone}
            onChange={value => handleInputChange('phone', value)}
            placeholder='090-1234-5678'
          />
        </div>

        {/* 出欠確認セクション */}
        <div className='space-y-4'>
          <h3 className='text-lg font-noto font-semibold text-gray-800'>
            出欠確認
          </h3>

          <Radio
            label='ご出席について'
            value={formData.attendance}
            onChange={value => handleInputChange('attendance', value)}
            options={[
              {
                value: 'attend',
                label: '出席します',
                description: '結婚式に出席いたします',
              },
              {
                value: 'absent',
                label: '欠席いたします',
                description: '申し訳ございませんが、都合により欠席いたします',
              },
              {
                value: 'undecided',
                label: '未定です',
                description: '現在検討中です。決まり次第ご連絡いたします',
              },
            ]}
            required
            error={errors.attendance}
          />
        </div>

        {/* 食事制限セクション */}
        <div className='space-y-4'>
          <h3 className='text-lg font-noto font-semibold text-gray-800'>
            食事制限
          </h3>

          <Checkbox
            label='食事制限がある場合は以下から選択してください（複数選択可）'
            values={formData.dietaryRestrictions}
            onChange={(values: string[]) =>
              handleInputChange('dietaryRestrictions', values)
            }
            options={[
              {
                value: 'vegetarian',
                label: 'ベジタリアン',
                description: '肉・魚を食べません',
              },
              {
                value: 'vegan',
                label: 'ビーガン',
                description: '動物性食品を一切食べません',
              },
              {
                value: 'gluten-free',
                label: 'グルテンフリー',
                description: '小麦製品を食べません',
              },
              {
                value: 'dairy-free',
                label: '乳製品フリー',
                description: '牛乳・チーズなどを食べません',
              },
              {
                value: 'nut-free',
                label: 'ナッツフリー',
                description: 'ナッツ類を食べません',
              },
            ]}
          />
        </div>

        {/* 横並びレイアウトサンプル */}
        <div className='space-y-4'>
          <h3 className='text-lg font-noto font-semibold text-gray-800'>
            横並びレイアウトサンプル
          </h3>

          {/* 横並びラジオボタン */}
          <div className='space-y-4'>
            <h4 className='text-md font-noto font-medium text-gray-700'>
              横並びラジオボタン（3列）
            </h4>
            <Radio
              label='お気持ちの選択'
              value={formData.attendance}
              onChange={value => handleInputChange('attendance', value)}
              options={[
                { value: 'attend', label: '出席します' },
                { value: 'absent', label: '欠席いたします' },
                { value: 'undecided', label: '未定です' },
              ]}
              layout='horizontal'
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              required
            />
          </div>

          {/* 横並びチェックボックス */}
          <div className='space-y-4'>
            <h4 className='text-md font-noto font-medium text-gray-700'>
              横並びチェックボックス（2列）
            </h4>
            <Checkbox
              label='お好みの料理（複数選択可）'
              values={formData.dietaryRestrictions}
              onChange={(values: string[]) =>
                handleInputChange('dietaryRestrictions', values)
              }
              options={[
                { value: 'japanese', label: '和食' },
                { value: 'western', label: '洋食' },
                { value: 'chinese', label: '中華' },
                { value: 'italian', label: 'イタリアン' },
                { value: 'french', label: 'フレンチ' },
                { value: 'other', label: 'その他' },
              ]}
              layout='horizontal'
              columns={{ mobile: 1, tablet: 2, desktop: 2 }}
            />
          </div>

          {/* レスポンシブ横並びチェックボックス */}
          <div className='space-y-4'>
            <h4 className='text-md font-noto font-medium text-gray-700'>
              レスポンシブ横並びチェックボックス
            </h4>
            <Checkbox
              label='参加希望のイベント（複数選択可）'
              values={formData.dietaryRestrictions}
              onChange={(values: string[]) =>
                handleInputChange('dietaryRestrictions', values)
              }
              options={[
                { value: 'ceremony', label: '結婚式' },
                { value: 'reception', label: '披露宴' },
                { value: 'after-party', label: '二次会' },
                { value: 'photo-session', label: '写真撮影' },
                { value: 'rehearsal', label: 'リハーサル' },
                { value: 'pre-wedding', label: '前夜祭' },
              ]}
              layout='horizontal'
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            />
          </div>
        </div>

        {/* メッセージセクション */}
        <div className='space-y-4'>
          <h3 className='text-lg font-noto font-semibold text-gray-800'>
            メッセージ
          </h3>

          <TextArea
            label='新郎新婦へのメッセージ'
            value={formData.message}
            onChange={value => handleInputChange('message', value)}
            placeholder='お祝いのメッセージや思い出などをお聞かせください'
            rows={4}
          />
        </div>

        {/* 同意事項セクション */}
        <div className='space-y-4'>
          <h3 className='text-lg font-noto font-semibold text-gray-800'>
            同意事項
          </h3>

          <Checkbox
            label='利用規約に同意します'
            checked={formData.agreeToTerms}
            onChange={(checked: boolean) =>
              handleInputChange('agreeToTerms', checked)
            }
            required
            error={errors.agreeToTerms}
          />

          <Checkbox
            label='結婚式の最新情報を受け取る（任意）'
            checked={formData.receiveUpdates}
            onChange={(checked: boolean) =>
              handleInputChange('receiveUpdates', checked)
            }
          />
        </div>

        {/* 送信ボタン */}
        <div className='pt-4'>
          <button
            type='submit'
            className='w-full bg-lavender-600 text-white font-noto font-medium py-3 px-6 rounded-lg hover:bg-lavender-700 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:ring-offset-2 transition-colors duration-200'
          >
            送信する
          </button>
        </div>
      </form>

      {/* デバッグ用：フォームデータの表示 */}
      <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
        <h4 className='font-noto font-medium text-gray-700 mb-2'>
          デバッグ情報（開発用）
        </h4>
        <pre className='text-sm text-gray-600 overflow-auto'>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormSample;
