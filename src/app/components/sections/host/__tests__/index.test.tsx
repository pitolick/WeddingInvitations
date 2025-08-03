import React from 'react';
import { render, screen } from '@testing-library/react';
import Host from '../index';
import '@testing-library/jest-dom';

describe('Hostセクション', () => {
  it('タイトルが正しく表示される', () => {
    render(<Host />);
    expect(screen.getByText('Host')).toBeInTheDocument();
  });

  it('新郎新婦の日本語名・英語名が表示される', () => {
    render(<Host />);
    expect(screen.getByText('栗原 誠')).toBeInTheDocument();
    expect(screen.getByText('Makoto Kurihara')).toBeInTheDocument();
    expect(screen.getByText('森下 紗伎')).toBeInTheDocument();
    expect(screen.getByText('Saki Morishita')).toBeInTheDocument();
  });

  it('プロフィール画像がalt属性付きで表示される', () => {
    render(<Host />);
    expect(screen.getByAltText('栗原 誠')).toBeInTheDocument();
    expect(screen.getByAltText('森下 紗伎')).toBeInTheDocument();
  });

  it('プロフィールメッセージが新しい形式で表示される', () => {
    render(<Host />);
    // 新郎のメッセージ
    expect(screen.getByText('#ブルズアイ')).toBeInTheDocument();
    expect(screen.getByText('#ティモン')).toBeInTheDocument();
    expect(screen.getByText('#トイ・ストーリー')).toBeInTheDocument();
    expect(screen.getByText('#リーチ')).toBeInTheDocument();
    expect(screen.getByText('#ハッピーライド')).toBeInTheDocument();

    // 新婦のメッセージ
    expect(screen.getByText('#ラプンツェル')).toBeInTheDocument();
    expect(screen.getByText('#ニック')).toBeInTheDocument();
    expect(screen.getByText('#リメンバー・ミー')).toBeInTheDocument();
    expect(screen.getByText('#ハモカラ')).toBeInTheDocument();
    expect(screen.getByText('#マメラグシアター')).toBeInTheDocument();
  });

  it('中央にSunアイコンが表示される', () => {
    render(<Host />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  // it('アクセシビリティ的に主要要素が存在する', () => {
  //   render(<Host />);
  //   expect(screen.getByRole('region')).toBeInTheDocument();
  // });

  // レスポンシブやアニメーションの詳細な動作はE2Eやビジュアルリグレッションで担保するのがベター
});
