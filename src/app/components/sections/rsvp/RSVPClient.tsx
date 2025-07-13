'use client';

import React, { Fragment } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Select,
  Radio,
  TextArea,
  PostalCodeInput,
} from '@/app/components/common/form';
import Button from '@/app/components/common/button';
import AttendanceSelector from './AttendanceSelector';
import AllergyTagsInput from './AllergyTagsInput';
import Hr from '@/app/components/common/decoration/Hr';
import { GuestContent } from '@/app/lib/types/microcms';

// 都道府県リスト
const PREFECTURES = [
  { value: '', label: '選択してください' },
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '岩手県', label: '岩手県' },
  { value: '宮城県', label: '宮城県' },
  { value: '秋田県', label: '秋田県' },
  { value: '山形県', label: '山形県' },
  { value: '福島県', label: '福島県' },
  { value: '茨城県', label: '茨城県' },
  { value: '栃木県', label: '栃木県' },
  { value: '群馬県', label: '群馬県' },
  { value: '埼玉県', label: '埼玉県' },
  { value: '千葉県', label: '千葉県' },
  { value: '東京都', label: '東京都' },
  { value: '神奈川県', label: '神奈川県' },
  { value: '新潟県', label: '新潟県' },
  { value: '富山県', label: '富山県' },
  { value: '石川県', label: '石川県' },
  { value: '福井県', label: '福井県' },
  { value: '山梨県', label: '山梨県' },
  { value: '長野県', label: '長野県' },
  { value: '岐阜県', label: '岐阜県' },
  { value: '静岡県', label: '静岡県' },
  { value: '愛知県', label: '愛知県' },
  { value: '三重県', label: '三重県' },
  { value: '滋賀県', label: '滋賀県' },
  { value: '京都府', label: '京都府' },
  { value: '大阪府', label: '大阪府' },
  { value: '兵庫県', label: '兵庫県' },
  { value: '奈良県', label: '奈良県' },
  { value: '和歌山県', label: '和歌山県' },
  { value: '鳥取県', label: '鳥取県' },
  { value: '島根県', label: '島根県' },
  { value: '岡山県', label: '岡山県' },
  { value: '広島県', label: '広島県' },
  { value: '山口県', label: '山口県' },
  { value: '徳島県', label: '徳島県' },
  { value: '香川県', label: '香川県' },
  { value: '愛媛県', label: '愛媛県' },
  { value: '高知県', label: '高知県' },
  { value: '福岡県', label: '福岡県' },
  { value: '佐賀県', label: '佐賀県' },
  { value: '長崎県', label: '長崎県' },
  { value: '熊本県', label: '熊本県' },
  { value: '大分県', label: '大分県' },
  { value: '宮崎県', label: '宮崎県' },
  { value: '鹿児島県', label: '鹿児島県' },
  { value: '沖縄県', label: '沖縄県' },
];

// zodスキーマ定義
const attendeeSchema = z.object({
  name: z.string().min(1, 'ご芳名は必須です'),
  furigana: z.string().min(1, 'ふりがなは必須です'),
  birthday: z.string().min(1, '誕生日は必須です'),
  hotelUse: z.string().min(1, 'ホテル利用を選択してください'),
  taxiUse: z.string().min(1, 'タクシー利用を選択してください'),
  parkingUse: z.string().min(1, '駐車場利用を選択してください'),
  allergies: z.array(z.string()),
  dislikedFoods: z.string().optional(),
  ceremony: z.string().min(1, '挙式の出欠を選択してください'),
  reception: z.string().min(1, '披露宴の出欠を選択してください'),
  afterParty: z.string().min(1, '二次会の出欠を選択してください'),
});

const rsvpSchema = z.object({
  contactInfo: z.object({
    postalCode: z
      .string()
      .min(1, '郵便番号は必須です')
      .regex(
        /^\d{3}-?\d{4}$/,
        '郵便番号は7桁の数字で入力してください（例：123-4567）'
      )
      .transform(val => val.replace('-', '')), // ハイフンを除去して保存
    prefecture: z.string().min(1, '都道府県は必須です'),
    address: z.string().min(1, 'ご住所は必須です'),
    phone: z
      .string()
      .min(1, '電話番号は必須です')
      .regex(/^[\d-]+$/, '電話番号は数字とハイフンのみで入力してください')
      .min(10, '電話番号は10桁以上で入力してください')
      .max(15, '電話番号は15桁以下で入力してください')
      .transform(val => val.replace(/-/g, '')), // ハイフンを除去して保存
    email: z.string().email('メールアドレスの形式が正しくありません'),
  }),
  attendees: z.array(attendeeSchema).min(1),
  message: z.string().optional(),
});

type RSVPFormType = z.infer<typeof rsvpSchema>;

/**
 * @description デフォルトの出席者情報を生成
 * @param guestInfo - ゲスト情報（オプション）
 * @returns デフォルトの出席者情報
 * @since 1.0.0
 */
const defaultAttendee = (guestInfo?: {
  name: string;
  kana?: string;
  invite: string[];
  autofill?: { name: boolean; kana: boolean } | null;
}) => ({
  name:
    guestInfo?.name && guestInfo?.autofill?.name === true
      ? guestInfo?.name
      : '',
  furigana:
    guestInfo?.kana && guestInfo?.autofill?.kana === true
      ? guestInfo?.kana
      : '',
  birthday: '',
  hotelUse: '',
  taxiUse: '',
  parkingUse: '',
  allergies: [],
  dislikedFoods: '',
  ceremony: '',
  reception: '',
  afterParty: '',
});

/**
 * @description RSVPClientコンポーネントのprops型定義
 * @interface RSVPClientProps
 * @since 1.0.0
 */
interface RSVPClientProps {
  /** ゲスト情報 */
  guestInfo?: GuestContent;
}

/**
 * @description RSVPClientコンポーネント
 * @param props - コンポーネントのprops
 * @returns RSVPClientコンポーネント
 * @since 1.0.0
 */
const RSVPClient: React.FC<RSVPClientProps> = ({ guestInfo }) => {
  // ゲスト情報から初期値を生成
  const initialAttendees = React.useMemo(() => {
    if (!guestInfo) {
      return [defaultAttendee()];
    }

    const attendees = [defaultAttendee(guestInfo)];

    // 家族情報がある場合は追加
    if (guestInfo.family && guestInfo.family.length > 0) {
      guestInfo.family.forEach(familyMember => {
        attendees.push(defaultAttendee(familyMember));
      });
    }

    return attendees;
  }, [guestInfo]);

  const form = useForm<RSVPFormType>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      contactInfo: {
        postalCode: '',
        prefecture: '',
        address: '',
        phone: '',
        email: '',
      },
      attendees: initialAttendees,
      message: '',
    },
    mode: 'onBlur',
  });

  const {
    fields: attendeeFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'attendees',
  });

  const errors = form.formState.errors;

  const handleAddAttendee = () => {
    append(defaultAttendee());
  };

  const handleRemoveAttendee = (index: number) => {
    if (attendeeFields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (data: RSVPFormType) => {
    // フォーム送信前の追加バリデーション
    const hasInvalidAttendance = data.attendees.some((attendee, index) => {
      // メインゲスト（index === 0）または家族メンバー（guestInfo.familyに含まれる）
      const isMainGuest = index === 0;
      const isFamilyMember =
        guestInfo?.family && index > 0 && index <= guestInfo.family.length;
      const isAdditionalGuest = index > 0 && !isFamilyMember;

      let inviteTypes: string[] = [];

      if (isMainGuest) {
        // メインゲストの場合
        inviteTypes = guestInfo?.invite || [];
      } else if (isFamilyMember) {
        // 家族メンバーの場合
        const familyMember = guestInfo?.family?.[index - 1];
        inviteTypes = familyMember?.invite || [];
      } else if (isAdditionalGuest) {
        // 追加されたお連れ様の場合（guestInfo.familyに含まれていない）
        // メインゲストの招待種別に基づいて表示項目を決定
        const mainGuestInviteTypes = guestInfo?.invite || [];

        // メインゲストが二次会のみの場合、追加されたお連れ様も二次会のみ表示
        if (
          mainGuestInviteTypes.length === 1 &&
          mainGuestInviteTypes.includes('二次会')
        ) {
          inviteTypes = ['二次会'];
        } else {
          // それ以外の場合は披露宴と二次会を表示
          inviteTypes = ['披露宴', '二次会'];
        }
      }

      // 招待されている項目のみチェック
      const hasInvalidCeremony =
        inviteTypes.includes('挙式') &&
        !['attending', 'declined'].includes(attendee.ceremony);
      const hasInvalidReception =
        inviteTypes.includes('披露宴') &&
        !['attending', 'declined'].includes(attendee.reception);
      const hasInvalidAfterParty =
        inviteTypes.includes('二次会') &&
        !['attending', 'declined'].includes(attendee.afterParty);

      return hasInvalidCeremony || hasInvalidReception || hasInvalidAfterParty;
    });

    if (hasInvalidAttendance) {
      alert(
        '全ての出席者について、招待されているイベントの出欠を選択してください。'
      );
      return;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full '>
      {/* 連絡先情報 */}
      <div className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2'>
          連絡先
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Controller
            control={form.control}
            name='contactInfo.postalCode'
            render={({ field }) => (
              <PostalCodeInput
                label='郵便番号'
                placeholder='1234567'
                required
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.contactInfo?.postalCode?.message}
                onAddressChange={({ prefecture, address }) => {
                  // 都道府県と住所を自動入力
                  form.setValue('contactInfo.prefecture', prefecture);
                  form.setValue('contactInfo.address', address);
                }}
              />
            )}
          />
          <Controller
            control={form.control}
            name='contactInfo.prefecture'
            render={({ field }) => (
              <Select
                label='都道府県'
                required
                options={PREFECTURES}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.contactInfo?.prefecture?.message}
              />
            )}
          />
        </div>
        <Controller
          control={form.control}
          name='contactInfo.address'
          render={({ field }) => (
            <Input
              label='ご住所'
              placeholder='市区町村番地'
              required
              value={field.value ?? ''}
              onChange={field.onChange}
              error={errors.contactInfo?.address?.message}
            />
          )}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Controller
            control={form.control}
            name='contactInfo.phone'
            render={({ field }) => (
              <Input
                label='電話番号'
                type='tel'
                placeholder='09012345678'
                required
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.contactInfo?.phone?.message}
                maxLength={15}
              />
            )}
          />
          <Controller
            control={form.control}
            name='contactInfo.email'
            render={({ field }) => (
              <Input
                label='メールアドレス'
                type='email'
                placeholder='example@email.com'
                required
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.contactInfo?.email?.message}
              />
            )}
          />
        </div>
      </div>

      {/* 出席者情報 */}
      {attendeeFields.map((attendee, index) => (
        <Fragment key={attendee.id}>
          <Hr />
          <div className='space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
              <h3 className='text-xl font-semibold text-gray-900'>
                {index === 0 ? '出席者' : `お連れ様 ${index}`}
              </h3>
              {index > 0 && (
                <Button
                  type='button'
                  variant='danger'
                  size='sm'
                  onClick={() => handleRemoveAttendee(index)}
                >
                  削除
                </Button>
              )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Controller
                control={form.control}
                name={`attendees.${index}.name`}
                render={({ field }) => {
                  return (
                    <Input
                      label='ご芳名'
                      placeholder='山田 太郎'
                      required
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={errors.attendees?.[index]?.name?.message}
                    />
                  );
                }}
              />
              <Controller
                control={form.control}
                name={`attendees.${index}.furigana`}
                render={({ field }) => {
                  return (
                    <Input
                      label='ふりがな'
                      placeholder='やまだ たろう'
                      required
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={errors.attendees?.[index]?.furigana?.message}
                    />
                  );
                }}
              />
            </div>
            <Controller
              control={form.control}
              name={`attendees.${index}.birthday`}
              render={({ field }) => (
                <Input
                  label='誕生日'
                  type='date'
                  required
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={errors.attendees?.[index]?.birthday?.message}
                />
              )}
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Controller
                control={form.control}
                name={`attendees.${index}.hotelUse`}
                render={({ field }) => (
                  <Radio
                    label='ホテル利用'
                    required
                    options={[
                      { value: 'なし', label: 'なし' },
                      { value: 'あり', label: 'あり' },
                    ]}
                    layout='horizontal'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={errors.attendees?.[index]?.hotelUse?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`attendees.${index}.taxiUse`}
                render={({ field }) => (
                  <Radio
                    label='タクシー利用'
                    required
                    options={[
                      { value: 'なし', label: 'なし' },
                      { value: 'あり', label: 'あり' },
                    ]}
                    layout='horizontal'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={errors.attendees?.[index]?.taxiUse?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`attendees.${index}.parkingUse`}
                render={({ field }) => (
                  <Radio
                    label='駐車場利用'
                    required
                    options={[
                      { value: 'なし', label: 'なし' },
                      {
                        value: 'あり',
                        label: 'あり',
                        description: '※検討中含む',
                      },
                    ]}
                    layout='horizontal'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={errors.attendees?.[index]?.parkingUse?.message}
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Controller
                control={form.control}
                name={`attendees.${index}.allergies`}
                render={({ field }) => (
                  <AllergyTagsInput
                    label='食べ物アレルギー'
                    name={`attendee-${index}-allergies`}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    required={false}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`attendees.${index}.dislikedFoods`}
                render={({ field }) => (
                  <Input
                    label='苦手な食べ物'
                    placeholder='例：ピーマン、ナス'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={errors.attendees?.[index]?.dislikedFoods?.message}
                  />
                )}
              />
            </div>
            <div className='flex flex-col md:flex-row justify-center gap-4'>
              {/* ゲスト情報から招待種別を取得 */}
              {(() => {
                // メインゲスト（index === 0）または家族メンバー（guestInfo.familyに含まれる）
                const isMainGuest = index === 0;
                const isFamilyMember =
                  guestInfo?.family &&
                  index > 0 &&
                  index <= guestInfo.family.length;
                const isAdditionalGuest = index > 0 && !isFamilyMember;

                let inviteTypes: string[] = [];

                if (isMainGuest) {
                  // メインゲストの場合
                  inviteTypes = guestInfo?.invite || [];
                } else if (isFamilyMember) {
                  // 家族メンバーの場合
                  const familyMember = guestInfo?.family?.[index - 1];
                  inviteTypes = familyMember?.invite || [];
                } else if (isAdditionalGuest) {
                  // 追加されたお連れ様の場合（guestInfo.familyに含まれていない）
                  // メインゲストの招待種別に基づいて表示項目を決定
                  const mainGuestInviteTypes = guestInfo?.invite || [];

                  // メインゲストが二次会のみの場合、追加されたお連れ様も二次会のみ表示
                  if (
                    mainGuestInviteTypes.length === 1 &&
                    mainGuestInviteTypes.includes('二次会')
                  ) {
                    inviteTypes = ['二次会'];
                  } else {
                    // それ以外の場合は披露宴と二次会を表示
                    inviteTypes = ['披露宴', '二次会'];
                  }
                }

                return (
                  <>
                    {inviteTypes.includes('挙式') && (
                      <Controller
                        control={form.control}
                        name={`attendees.${index}.ceremony`}
                        render={({ field }) => (
                          <AttendanceSelector
                            className='flex-1'
                            value={field.value as 'attending' | 'declined' | ''}
                            onChange={value =>
                              field.onChange(value as 'attending' | 'declined')
                            }
                            required={true}
                            name={`attendee-${index}-ceremony`}
                            label='挙式'
                          />
                        )}
                      />
                    )}
                    {inviteTypes.includes('披露宴') && (
                      <Controller
                        control={form.control}
                        name={`attendees.${index}.reception`}
                        render={({ field }) => (
                          <AttendanceSelector
                            className='flex-1'
                            value={field.value as 'attending' | 'declined' | ''}
                            onChange={value =>
                              field.onChange(value as 'attending' | 'declined')
                            }
                            required={true}
                            name={`attendee-${index}-reception`}
                            label='披露宴'
                          />
                        )}
                      />
                    )}
                    {inviteTypes.includes('二次会') && (
                      <Controller
                        control={form.control}
                        name={`attendees.${index}.afterParty`}
                        render={({ field }) => (
                          <AttendanceSelector
                            className='flex-1'
                            value={field.value as 'attending' | 'declined' | ''}
                            onChange={value =>
                              field.onChange(value as 'attending' | 'declined')
                            }
                            required={true}
                            name={`attendee-${index}-afterParty`}
                            label='二次会'
                          />
                        )}
                      />
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </Fragment>
      ))}

      {/* お連れ様追加ボタン */}
      <div className='flex flex-col items-center justify-center gap-2'>
        <Button
          type='button'
          variant='secondary'
          size='lg'
          onClick={handleAddAttendee}
        >
          + お連れ様を追加
        </Button>

        <p className='text-xs text-gray-500'>
          ご回答により詳細をお聞きする場合がございます
        </p>
      </div>

      <Hr />

      {/* メッセージ */}
      <Controller
        control={form.control}
        name='message'
        render={({ field }) => (
          <TextArea
            label='メッセージ（任意）'
            placeholder='ご出席に関する追加情報や新郎新婦に伝えたいメッセージがあればご記入ください'
            rows={4}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={errors.message?.message}
          />
        )}
      />

      {/* 送信ボタン */}
      <div className='flex justify-center mt-6'>
        <Button
          type='submit'
          variant='primary'
          size='lg'
          className='w-full md:max-w-md mx-auto'
        >
          送信する
        </Button>
      </div>
    </form>
  );
};

export default RSVPClient;
