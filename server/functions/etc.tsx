/* eslint-disable import/no-duplicates */
import {Link} from '@mui/material';
import format from 'date-fns/format';
import ja from 'date-fns/locale/ja';
import {Fragment} from 'react';
import NextLink from 'next/link';

export function extractUniquePostIds<T>(data: T[], idKey: keyof T): any[] {
  const ids = data.map((item) => item[idKey]).filter((id) => id !== null);
  return [...new Set(ids)];
}

export function booleanNullToInt(v: 'true' | 'false' | 'null') {
  if (v === 'true') return 1;
  if (v === 'false') return 0;
  return null;
}

export function intToBooleanNull(v: number | null | undefined) {
  if (v === 1) return 'true';
  if (v === 0) return 'false';
  return 'null';
}

// numberを'1' | '0' | 'null'に変換
export function intToBooleanNullString(v: number | null | undefined) {
  if (v === 2) return '2';
  if (v === 1) return '1';
  if (v === 0) return '0';
  return null;
}

// numberを'1' | '0'に変換
export function intToBooleanNullStringMax1(v: number | null | undefined) {
  if (v === 1) return '1';
  if (v === 0) return '0';
  return null;
}

// 閉じる確認の関数
export const alertThenExecute = (closeModal: VoidFunction, text?: string) => {
  // `window.confirm` を使用して確認ダイアログを表示
  if (window.confirm(text || '編集を終了してもよろしいですか？')) {
    // ユーザーが「OK」をクリックした場合、モーダルを閉じる関数を呼び出す
    closeModal();
  }
};

export function formatDate(date: Date | null | undefined) {
  if (!date) return '';
  return format(date, 'yyyy-MM-dd', {
    locale: ja,
  });
}

export function formatDateJp(date: Date | null | undefined) {
  if (!date) return '';
  // dateが文字列である場合、Dateオブジェクトに変換
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy年MM月dd日', {
    locale: ja,
  });
}

// この関数は、正しい日付形式をISO文字列に変換します
export const dateToISOString = (dateString: string) => {
  const date = new Date(dateString);
  // `Number.isNaN`を使用して数値であることを確認します
  return !Number.isNaN(date.getTime()) ? date.toISOString() : '';
};

export const contentToText = (content: string) => {
  return (
    <>
      {content
        .replace(/\\n/g, '\n')
        .split('\n')
        .map((line, index, array) => {
          // URLを検出する正規表現
          const urlRegex = /https?:\/\/[^\s]+/g;
          // テキストを単語に分割
          const words = line.split(' ');
          // 単語ごとに処理
          const processedLine = words.map((word, wordIndex) => {
            // 単語がURLの場合、リンクに変換
            if (urlRegex.test(word)) {
              return (
                <Link component={NextLink} href={word} key={wordIndex} rel="noopener noreferrer" color="#367B9D" sx={{textDecoration: 'underline'}}>
                  {word}
                </Link>
              );
            }
            // それ以外の場合、通常のテキストとして表示
            return `${word} `;
          });

          return (
            <Fragment key={index}>
              {processedLine}
              {index !== array.length - 1 && <br />}
            </Fragment>
          );
        })}
    </>
  );
};

// ハバーサイン公式を用いて２点間の距離を計算する関数
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6378.137; // 地球の半径(平均半径)をkmで
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return Math.round(distance);
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// これ全部に適応したい
