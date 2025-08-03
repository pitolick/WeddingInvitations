/**
 * @description ホストセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React from 'react';
import { HostProfile } from './HostInfo.types';
import Image from 'next/image';
import { motion } from 'motion/react';
import Sun from '@/app/components/common/icon/Sun';

const groom: HostProfile = {
  nameJa: '栗原 誠',
  nameEn: 'Makoto Kurihara',
  messages: [
    ['ブルズアイ', 'ティモン'],
    ['トイ・ストーリー'],
    ['リーチ', 'ハッピーライド'],
  ],
  image: '/images/sections/host/host-groom.webp',
  frameLeft: '/images/sections/host/host-frame-left.webp',
};

const bride: HostProfile = {
  nameJa: '森下 紗伎',
  nameEn: 'Saki Morishita',
  messages: [
    ['ラプンツェル', 'ニック'],
    ['リメンバー・ミー'],
    ['ハモカラ', 'マメラグシアター'],
  ],
  image: '/images/sections/host/host-bride.webp',
  frameRight: '/images/sections/host/host-frame-right.webp',
};

/**
 * @description ホストセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Host id="host" className="section-host" />
 */
const Host: React.FC = () => {
  return (
    <section
      id='host'
      className='relative flex flex-col items-center py-16 w-full bg-repeat bg-center'
      style={{
        backgroundImage: "url('/images/sections/host/host-background.webp')",
      }}
    >
      <div className='flex flex-col items-center w-full container mx-auto gap-8'>
        <h2 className='font-berkshire text-white text-4xl md:text-5xl text-center mb-2'>
          Host
        </h2>
        <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-8 sm:gap-2 lg:gap-8 w-full'>
          {/* Groom */}
          <ProfileCard profile={groom} />
          {/* Center Icon */}
          <div className='my-6 md:my-0 flex justify-center items-center md:h-[300px]'>
            <Sun
              className='w-20 h-20 md:w-24 md:h-24 text-yellow-300'
              data-testid='sun-icon'
            />
          </div>
          {/* Bride */}
          <ProfileCard profile={bride} />
        </div>
      </div>
    </section>
  );
};

/**
 * @description プロフィールカード（新郎新婦共通）
 * @param profile - ホストプロフィール情報
 * @returns JSX.Element
 * @example
 * <ProfileCard profile={groomProfile} />
 */
const ProfileCard: React.FC<{ profile: HostProfile }> = ({ profile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className='flex flex-col items-center px-6 gap-2'
  >
    <div className='relative flex justify-center items-center size-fit p-4'>
      <Image
        src={profile.image}
        alt={profile.nameJa}
        width={300}
        height={300}
        className='object-cover w-[200px] h-auto md:w-[300px]'
        priority
      />
      {/* 花装飾 */}
      {profile.frameLeft && (
        <Image
          src={profile.frameLeft}
          alt='frame left'
          width={150}
          height={160}
          className='absolute left-0 top-0 w-[149px] h-[160px] md:w-[168px] md:h-[180px]'
        />
      )}
      {profile.frameRight && (
        <Image
          src={profile.frameRight}
          alt='frame right'
          width={150}
          height={160}
          className='absolute right-0 bottom-0 w-[149px] h-[160px] md:w-[168px] md:h-[180px]'
        />
      )}
    </div>
    <div className='flex flex-col items-center gap-1'>
      <span className='text-white font-bold text-2xl font-noto'>
        {profile.nameJa}
      </span>
      <span className='text-white text-sm font-rock'>{profile.nameEn}</span>
    </div>
    <div className='border-t border-b border-white flex flex-col justify-center items-center py-4 px-2 mt-2 w-full'>
      <div className='text-white text-base font-noto text-center space-y-1.5'>
        {profile.messages &&
          profile.messages.map((message, index) => (
            <div key={index} className='flex items-center gap-2'>
              <p className='text-xl'>
                {index === 0 && '💛'}
                {index === 1 && '🎥'}
                {index === 2 && '🏰'}
              </p>
              <ul className='flex gap-2'>
                {message.map(word => (
                  <li
                    key={word}
                    className='bg-pink-600 border border-pink-500 text-white text-sm px-2 py-1 rounded-full'
                  >
                    #{word}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  </motion.div>
);

export default Host;
