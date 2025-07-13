'use client';

import React, { useState } from 'react';
import { Input, Select, Radio, TextArea } from '@/app/components/common/form';
import Button from '@/app/components/common/button';
import AttendanceSelector from './AttendanceSelector';
import AllergyTagsInput from './AllergyTagsInput';

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

// 出席者情報の型定義
interface Attendee {
  id: string;
  name: string;
  furigana: string;
  birthday: string;
  hotelUse: string;
  taxiUse: string;
  parkingUse: string;
  allergies: string[];
  dislikedFoods: string;
  ceremony: 'attending' | 'declined' | '';
  reception: 'attending' | 'declined' | '';
  afterParty: 'attending' | 'declined' | '';
}

const RSVPClient: React.FC = () => {
  // 連絡先情報の状態
  const [contactInfo, setContactInfo] = useState({
    postalCode: '',
    prefecture: '',
    address: '',
    phone: '',
    email: '',
  });

  // 出席者情報の状態
  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      id: '1',
      name: '',
      furigana: '',
      birthday: '',
      hotelUse: '',
      taxiUse: '',
      parkingUse: '',
      allergies: [],
      dislikedFoods: '',
      ceremony: '',
      reception: '',
      afterParty: '',
    },
  ]);

  // メッセージの状態
  const [message, setMessage] = useState('');

  // お連れ様を追加
  const addAttendee = () => {
    const newAttendee: Attendee = {
      id: Date.now().toString(),
      name: '',
      furigana: '',
      birthday: '',
      hotelUse: '',
      taxiUse: '',
      parkingUse: '',
      allergies: [],
      dislikedFoods: '',
      ceremony: '',
      reception: '',
      afterParty: '',
    };
    setAttendees([...attendees, newAttendee]);
  };

  // お連れ様を削除
  const removeAttendee = (id: string) => {
    if (attendees.length > 1) {
      setAttendees(attendees.filter(attendee => attendee.id !== id));
    }
  };

  // 出席者情報を更新
  const updateAttendee = (id: string, field: keyof Attendee, value: any) => {
    setAttendees(
      attendees.map(attendee =>
        attendee.id === id ? { ...attendee, [field]: value } : attendee
      )
    );
  };

  return (
    <div>
      {/* 連絡先情報 */}
      <div className='w-full space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2'>
            連絡先
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='郵便番号'
              placeholder='1234567'
              required
              value={contactInfo.postalCode}
              onChange={value =>
                setContactInfo({ ...contactInfo, postalCode: value })
              }
            />
            <Select
              label='都道府県'
              required
              value={contactInfo.prefecture}
              onChange={value =>
                setContactInfo({ ...contactInfo, prefecture: value })
              }
              options={PREFECTURES}
            />
          </div>
          <Input
            label='ご住所'
            placeholder='市区町村番地'
            required
            value={contactInfo.address}
            onChange={value =>
              setContactInfo({ ...contactInfo, address: value })
            }
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='電話番号'
              type='tel'
              placeholder='09012345678'
              required
              value={contactInfo.phone}
              onChange={value =>
                setContactInfo({ ...contactInfo, phone: value })
              }
            />
            <Input
              label='メールアドレス'
              type='email'
              placeholder='example@email.com'
              required
              value={contactInfo.email}
              onChange={value =>
                setContactInfo({ ...contactInfo, email: value })
              }
            />
          </div>
        </div>

        {/* 出席者情報 */}
        {attendees.map((attendee, index) => (
          <div key={attendee.id} className='space-y-4'>
            <h3 className='flex items-center justify-between text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2'>
              <span>{index === 0 ? '出席者' : `お連れ様${index}`}</span>
              {index > 0 && (
                <span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => removeAttendee(attendee.id)}
                    className='text-red-600 hover:text-red-800'
                  >
                    削除
                  </Button>
                </span>
              )}
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                label='ご芳名'
                placeholder='山田 太郎'
                required
                value={attendee.name}
                onChange={value => updateAttendee(attendee.id, 'name', value)}
              />
              <Input
                label='ふりがな'
                placeholder='やまだ たろう'
                required
                value={attendee.furigana}
                onChange={value =>
                  updateAttendee(attendee.id, 'furigana', value)
                }
              />
            </div>

            <Input
              label='誕生日'
              type='date'
              required
              value={attendee.birthday}
              onChange={value => updateAttendee(attendee.id, 'birthday', value)}
            />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Radio
                label='ホテル利用'
                required
                value={attendee.hotelUse}
                onChange={value =>
                  updateAttendee(attendee.id, 'hotelUse', value)
                }
                options={[
                  { value: 'なし', label: 'なし' },
                  {
                    value: 'あり',
                    label: index === 0 ? 'あり' : 'あり',
                    description: index === 0 ? '' : '※代表者と同室含む',
                  },
                ]}
                layout='horizontal'
              />
              <Radio
                label='タクシー利用'
                required
                value={attendee.taxiUse}
                onChange={value =>
                  updateAttendee(attendee.id, 'taxiUse', value)
                }
                options={[
                  { value: 'なし', label: 'なし' },
                  { value: 'あり', label: 'あり' },
                ]}
                layout='horizontal'
              />
              <Radio
                label='駐車場利用'
                required
                value={attendee.parkingUse}
                onChange={value =>
                  updateAttendee(attendee.id, 'parkingUse', value)
                }
                options={[
                  { value: 'なし', label: 'なし' },
                  {
                    value: 'あり',
                    label: 'あり',
                    description: '※検討中含む',
                  },
                ]}
                layout='horizontal'
                columns={{ mobile: 2 }}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <AllergyTagsInput
                value={attendee.allergies}
                onChange={value =>
                  updateAttendee(attendee.id, 'allergies', value)
                }
                label='食べ物アレルギー'
                required={false}
              />
              <Input
                label='苦手な食べ物'
                placeholder='例：ピーマン、ナス'
                value={attendee.dislikedFoods}
                onChange={value =>
                  updateAttendee(attendee.id, 'dislikedFoods', value)
                }
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <AttendanceSelector
                value={attendee.ceremony}
                onChange={value =>
                  updateAttendee(attendee.id, 'ceremony', value)
                }
                className='text-center'
                required={true}
                name={`attendee-${attendee.id}-ceremony`}
              />
              <AttendanceSelector
                value={attendee.reception}
                onChange={value =>
                  updateAttendee(attendee.id, 'reception', value)
                }
                className='text-center'
                required={true}
                name={`attendee-${attendee.id}-reception`}
              />
              <AttendanceSelector
                value={attendee.afterParty}
                onChange={value =>
                  updateAttendee(attendee.id, 'afterParty', value)
                }
                className='text-center'
                required={true}
                name={`attendee-${attendee.id}-afterParty`}
              />
            </div>
          </div>
        ))}

        {/* お連れ様追加ボタン */}
        <div className='w-full text-center'>
          <Button
            variant='outline'
            size='sm'
            onClick={addAttendee}
            className='mb-4'
          >
            + お連れ様を追加
          </Button>
          <p className='text-xs text-gray-500'>
            ご回答により詳細をお聞きする場合がございます
          </p>
        </div>

        {/* メッセージ */}
        <div className='w-full space-y-4'>
          <h3 className='text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2'>
            メッセージ
          </h3>
          <TextArea
            label='メッセージ（任意）'
            placeholder='ご出席に関する追加情報や新郎新婦に伝えたいメッセージがあればご記入ください'
            rows={4}
            value={message}
            onChange={value => setMessage(value)}
          />
        </div>

        {/* 送信ボタン */}
        <Button variant='primary' size='lg' className='w-full mt-6'>
          送信する
        </Button>
      </div>
    </div>
  );
};

export default RSVPClient;
