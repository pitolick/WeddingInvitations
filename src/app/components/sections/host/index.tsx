/**
 * @description ホストセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { HostProfile } from './HostInfo.types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Sun from '@/app/components/common/icon/Sun';

const groom: HostProfile = {
  nameJa: '栗原 誠',
  nameEn: 'Makoto Kurihara',
  messages: (
    <>
      <p>メッセージ＆プロフィール等</p>
      <p>メッセージ＆プロフィール等</p>
      <p>メッセージ＆プロフィール等</p>
      <p>メッセージ＆プロフィール等</p>
    </>
  ),
  image: '/images/sections/host/host-groom.webp',
  frameLeft: '/images/sections/host/host-frame-left.webp',
};

const bride: HostProfile = {
  nameJa: '森下 紗伎',
  nameEn: 'Saki Morishita',
  messages: (
    <>
      <p>メッセージ＆プロフィール等</p>
      <p>メッセージ＆プロフィール等</p>
      <p>メッセージ＆プロフィール等</p>
      <p>メッセージ＆プロフィール等</p>
    </>
  ),
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
      id="host"
      className='relative flex flex-col items-center py-16 w-full bg-repeat bg-center'
      style={{
        backgroundImage: "url('/images/sections/host/host-background.webp')",
      }}
    >
      <div className='flex flex-col items-center w-full container mx-auto gap-8'>
        <h2 className='font-berkshire text-white text-4xl md:text-5xl leading-none text-center mb-2'>
          Host
        </h2>
        <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-8 w-full'>
          {/* Groom */}
          <ProfileCard profile={groom} />
          {/* Center Icon */}
          <div className='my-6 md:my-0 flex justify-center items-center md:h-[300px]'>
            <Sun className='w-20 h-20 md:w-24 md:h-24 text-yellow-300' />
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
 */
const ProfileCard: React.FC<{ profile: HostProfile }> = ({ profile }) => (
  <motion.div
    className='flex flex-col items-center px-6 gap-2'
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
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
      <span className='text-white font-bold text-2xl leading-8 font-noto'>
        {profile.nameJa}
      </span>
      <span className='text-white text-sm leading-5 font-rock'>
        {profile.nameEn}
      </span>
    </div>
    <div className='border-t border-b border-white flex flex-col justify-center items-center py-2 px-2 mt-2 w-full'>
      <div className='text-white text-base leading-6 font-noto text-center'>
        {profile.messages}
      </div>
    </div>
  </motion.div>
);

export default Host;
