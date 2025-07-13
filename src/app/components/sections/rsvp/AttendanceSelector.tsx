import React from 'react';
import Image from 'next/image';

interface AttendanceSelectorProps {
  value: 'attending' | 'declined' | '';
  onChange: (value: 'attending' | 'declined') => void;
  className?: string;
  required?: boolean;
  /**
   * ラジオボタンのname属性（IDも自動生成されます）
   * @default 'attendance'
   */
  name?: string;
  /**
   * 入力項目の見出しラベル
   * @default '出席・欠席の選択'
   */
  label?: string;
}

const AttendanceSelector: React.FC<AttendanceSelectorProps> = ({
  value,
  onChange,
  className = '',
  required = false,
  name = 'attendance',
  label = '出席・欠席の選択',
}) => {
  // nameからIDを自動生成
  const attendingId = `${name}-attending`;
  const declinedId = `${name}-declined`;
  // 動的ラベル設定
  const isSelected = value === 'attending' || value === 'declined';
  const attendingLabel = isSelected ? '出席' : '御出席';
  const declinedLabel = isSelected ? '欠席' : '御欠席';

  return (
    <div className={`${className} space-y-2`}>
      {/* 見出しラベル */}
      {label && (
        <p className='block font-noto text-sm font-medium text-gray-700 text-start'>
          {label}
          {required && <span className='text-pink-500 ml-1'>*</span>}
        </p>
      )}

      {/* ラジオボタン（非表示） */}
      <div className='sr-only'>
        <input
          type='radio'
          id={attendingId}
          name={name}
          value='attending'
          checked={value === 'attending'}
          onChange={() => onChange('attending')}
          required={required}
        />
        <input
          type='radio'
          id={declinedId}
          name={name}
          value='declined'
          checked={value === 'declined'}
          onChange={() => onChange('declined')}
          required={required}
        />
      </div>

      {/* 画像ボタンUI */}
      <div className='flex flex-row justify-center gap-8'>
        <label
          htmlFor={attendingId}
          className={`focus:outline-none flex flex-col items-center justify-center transition-all duration-200 cursor-pointer w-16 py-3 relative`}
        >
          {value === 'attending' && (
            <div className='absolute size-20 flex justify-center items-center'>
              <Image
                src='/images/sections/rsvp/rsvp-attendance.webp'
                alt={attendingLabel}
                width={80}
                height={80}
                className='object-cover'
              />
            </div>
          )}
          <div className='text-center font-noto font-bold text-xl'>
            {attendingLabel}
          </div>
        </label>

        <label
          htmlFor={declinedId}
          className={`focus:outline-none flex flex-col items-center justify-center transition-all duration-200 cursor-pointer w-16 relative`}
        >
          {value === 'declined' && (
            <div className='absolute size-20 flex justify-center items-center'>
              <Image
                src='/images/sections/rsvp/rsvp-absence.webp'
                alt={declinedLabel}
                width={80}
                height={80}
                className='object-cover'
              />
            </div>
          )}
          <div className='text-center font-noto font-bold text-xl'>
            {declinedLabel}
          </div>
        </label>
      </div>
    </div>
  );
};

export default AttendanceSelector;
