/**
 * @description メッセージコンテンツコンポーネント（Client Component・アニメーション付き）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageProps } from './Message.types';
import DearBlock from './DearBlock';
import Button from '@/app/components/common/button';
import { MagicEffect } from '@/app/components/common/animation';

/**
 * @description メッセージコンテンツコンポーネント（Client Component）
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <MessageContent invitationId="test" draftKey="xxxx" />
 */
export const MessageContent: React.FC<MessageProps> = ({
  invitationId,
  draftKey,
}) => {
  const [isDream, setIsDream] = useState(false);
  const [showMagicEffect, setShowMagicEffect] = useState(false);

  const handleClick = () => {
    // 魔法のエフェクトを表示
    setShowMagicEffect(true);

    // 少し遅延してから文章を切り替え
    setTimeout(() => {
      setIsDream(!isDream);
      setShowMagicEffect(false);
    }, 2000);
  };

  return (
    <>
      {/* タイトル・本文ブロック */}
      <div className='flex flex-col items-center gap-8 w-full md:w-auto z-10'>
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='w-full'
        >
          <h2 className='font-berkshire text-2xl md:text-5xl text-center text-gray-900 md:text-black mb-0'>
            Message
          </h2>
        </motion.div>
        {/* 本文 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='w-full'
        >
          <div className='flex flex-col items-center gap-4'>
            <div className='prose prose-p:my-3 text-base md:text-base text-center text-gray-900 md:text-black whitespace-pre-line relative'>
              {/* 魔法のエフェクト */}
              <MagicEffect
                isActive={showMagicEffect}
                left='50%'
                top='50%'
                size='lg'
              />

              <AnimatePresence mode='wait'>
                <motion.div
                  key={isDream ? 'dream' : 'normal'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className='min-h-[200px] md:min-h-[150px]'
                >
                  {!isDream ? (
                    <>
                      <p>
                        立冬とは申せ今年はオラフも
                        <br className='block md:hidden' />
                        溶けてしまいそうな
                        <br className='block md:hidden' />
                        晩秋でございます⛄️
                      </p>
                      <p>
                        皆様にはお健やかにお過ごしのことと
                        <br className='block md:hidden' />
                        お慶び申し上げます
                      </p>
                      <p>
                        このたび私たちは{' '}
                        <span className='line-through'>戴冠式👑</span> 結婚式 を
                        <br className='block md:hidden' />
                        挙げることとなりました👰🤵
                      </p>
                      <p>
                        つきましては親しい皆様への
                        <br className='block md:hidden' />
                        ご挨拶をかねて
                        <br />
                        心ばかりのパーティーを
                        <br className='block md:hidden' />
                        催したいと思います🎉
                      </p>
                      <p>
                        おいそがしいところ誠に恐縮ですが
                        <br />
                        ふたりの門出を
                        <br className='block md:hidden' />
                        共に祝っていただけましたら
                        <br />
                        幸いです
                      </p>
                      <p>
                        ぜひ夢と魔法の会場へ
                        <br className='block md:hidden' />
                        ご出席くださいますよう
                        <br className='block md:hidden' />
                        ご案内申し上げます✨✨
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        『サラーム！🐍』『ヨーホー！🏴‍☠️』
                        <br />
                        『オラフ！溶け始めてる⛄️』
                      </p>
                      <p>
                        『やぁイーヨー 元気かい？🍯』
                        <br />
                        『私たち！そう…！結婚します！うふふ👸』
                      </p>
                      <p>
                        『なんでもない日おめーでーとー！🐰』
                        <br />
                        『さぁみんなティーパーティを始めよう！♠️』
                        <br />
                        『特別な日をみんなーでお祝いしよう！❄️』
                        <br />
                        『いつも本当にありがとー！🫎』
                      </p>
                      <p>
                        『夢と魔法の王国のお祝いが始まるよ！ﾊﾊｯ🐭』
                        <br />
                        『無限の彼方へさぁ行くぞ！🚀』
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <Button
              type='button'
              variant='primary'
              size='lg'
              className='w-full md:max-w-xs'
              onClick={handleClick}
            >
              {isDream ? '元に戻る' : '夢と魔法を体験する'}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Dearブロック */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='relative z-10 w-full'
      >
        <DearBlock invitationId={invitationId} draftKey={draftKey} />
      </motion.div>
    </>
  );
};
