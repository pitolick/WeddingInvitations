/**
 * @description イベントデータの定数定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description 会場情報の型定義
 */
interface VenueInfo {
  key: string;
  value: string;
  url?: string;
  lines?: string[];
}

/**
 * @description イベントデータの型定義
 */
interface EventData {
  type: 'ceremony' | 'reception' | 'afterparty';
  title: string;
  subtitle: string;
  date: string;
  time: string;
  receptionTime: string;
  venue: VenueInfo[];
  message: React.ReactNode;
  mapUrl: string;
}

/**
 * @description デフォルトイベントデータ（JSXを含まない形式）
 * 将来的にAPIやmicroCMS連携で動的に取得する予定
 */
export const DEFAULT_EVENTS_DATA: EventData[] = [
  {
    type: 'ceremony',
    title: 'Wedding Ceremony',
    subtitle: '挙式',
    date: '2025.11.08 Sat',
    time: '11:30 - 14:30',
    receptionTime: '親族集合 / 10:00',
    venue: [
      {
        key: '会場',
        value: 'グラントリア',
      },
      {
        key: 'URL',
        value: 'https://www.grantria.jp',
        url: 'https://www.grantria.jp',
      },
      {
        key: '住所',
        value: '〒918-8112 福井県福井市下馬2丁目1608',
        lines: ['〒918-8112', '福井県福井市下馬2丁目1608'],
      },
      {
        key: 'TEL',
        value: '0776-33-2345',
      },
    ],
    message: (
      <p>
        いつも私たちを
        <br />
        温かく見守ってくれて本当にありがとう
        <br />
        この度みなさまに見守られながら
        <br />
        結婚式を挙げられること
        <br />
        心から嬉しく思っています
        <br />
        <br />
        ささやかではございますが
        <br />
        挙式前に10時00分に
        <br />
        お集まりいただけたら幸いです
        <br />
        皆様とご一緒にリハーサルを行い
        <br />
        最高の瞬間を迎えたいと思っております
        <br />
        <br />
        当日もしお召し替えが必要でしたら
        <br />
        更衣室をご用意していますので
        <br />
        どうぞお気軽にご利用ください
        <br />
        <br />
        お車で来てくださる方は
        <br />
        会場前に00台停められる
        <br className='block lg:hidden' />
        駐車場がありますので
        <br />
        どうぞ安心してご利用ください
      </p>
    ),
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.1618796348916!2d136.23535797646164!3d36.04075497247342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bc1089571675%3A0x88037966578e0a8f!2z44Kw44Op44Oz44OI44Oq44Ki!5e0!3m2!1sja!2sjp!4v1752288869695!5m2!1sja!2sjp',
  },
  {
    type: 'reception',
    title: 'Wedding Reception',
    subtitle: '披露宴',
    date: '2025.11.08 Sat',
    time: '16:30 - 19:00',
    receptionTime: '受付時間 / 15:30 - 16:00',
    venue: [
      {
        key: '会場',
        value: 'グラントリア',
      },
      {
        key: 'URL',
        value: 'https://www.grantria.jp',
        url: 'https://www.grantria.jp',
      },
      {
        key: '住所',
        value: '〒918-8112 福井県福井市下馬2丁目1608',
        lines: ['〒918-8112', '福井県福井市下馬2丁目1608'],
      },
      {
        key: 'TEL',
        value: '0776-33-2345',
      },
    ],
    message: (
      <p>
        当日は
        <br />
        お召し替えいただける
        <br />
        更衣室がございます
        <br />
        <br />
        クロークは
        <br />
        受付手前にございますので
        <br />
        先にお荷物をお預けいただき
        <br />
        受付にお進みください
        <br />
        <br />
        お子様連れの場合は
        <br />
        披露宴会場内のキッズスペースを
        <br />
        ご利用いただけます
        <br />
        <br />
        お車でお越しの場合は
        <br />
        会場前に00台収容可能な駐車場が
        <br />
        ございますのでご利用ください
      </p>
    ),
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.1618796348916!2d136.23535797646164!3d36.04075497247342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bc1089571675%3A0x88037966578e0a8f!2z44Kw44Op44Oz44OI44Oq44Ki!5e0!3m2!1sja!2sjp!4v1752288869695!5m2!1sja!2sjp',
  },
  {
    type: 'afterparty',
    title: 'After Party',
    subtitle: '2次会',
    date: '2025.11.08 Sat',
    time: '20:00 - 23:00（仮）',
    receptionTime: '受付時間 / 19:30',
    venue: [
      {
        key: '会場',
        value: 'Three8（仮）',
      },
      {
        key: 'URL',
        value: 'http://eight-inc-fukui.com',
        url: 'http://eight-inc-fukui.com',
      },
      {
        key: '住所',
        value:
          '〒918-8112 福井県福井市下馬3丁目1302 福井パークサイドヴィレッジ敷地内',
        lines: [
          '〒918-8112',
          '福井県福井市下馬3丁目1302',
          '福井パークサイドヴィレッジ敷地内',
        ],
      },
      {
        key: 'TEL',
        value: '0776-97-5969',
      },
      {
        key: '会費',
        value: '0,000円',
      },
    ],
    message: (
      <p>
        二次会は会費制にさせていただきます
        <br />
        <br />
        披露宴会場から徒歩10分の距離にございます
        <br />
        <br />
        お車でお越しの場合は
        <br />
        会場前に25台収容可能な駐車場が
        <br />
        ございますのでご利用ください
      </p>
    ),
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.15786039839!2d136.2306522764615!3d36.04085307247343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bd2e338fcd73%3A0x3e335579dd30ccb0!2sThree8%EF%BC%8FYOLUCAFE!5e0!3m2!1sja!2sjp!4v1752288955859!5m2!1sja!2sjp',
  },
];
