import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { logger } from './lib/logger';

export const metadata: Metadata = {
  title: '404 - ページが見つかりません',
  description: 'ページが見つかりません',
  robots: 'noindex',
};

/**
 * @description トップページは使用しないため、404エラーを返す
 * @returns 404エラーページ
 */
export default async function Page() {
  // アクセス試行をログに記録
  await logger.info('page_access_denied', 'トップページへのアクセスを拒否', {
    context: {
      timestamp: new Date().toISOString(),
      page: 'home',
      action: 'not_found',
    },
    humanNote: 'トップページへのアクセスを404で拒否',
    aiTodo: 'アクセス拒否の統計を記録',
  });

  // 404エラーを返す
  notFound();
}
