import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Noto_Sans_JP,
  Great_Vibes,
  Berkshire_Swash,
  Rock_Salt,
} from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const berkshireSwash = Berkshire_Swash({
  variable: '--font-berkshire-swash',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const rockSalt = Rock_Salt({
  variable: '--font-rock-salt',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '結婚式招待状',
  description: '美しい結婚式招待状のWebサイト',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className='scroll-smooth'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} ${greatVibes.variable} ${berkshireSwash.variable} ${rockSalt.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
