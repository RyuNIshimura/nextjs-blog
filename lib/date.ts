import dayjs from 'dayjs';

/**
 * 1年以上経過したを判定する
 * @param {Date} date 日付
 * @returns {boolean} true: 1年以上経過した, false: 1年以上経過していない
 */
export const isOneYearPassed = (date: Date): boolean => {
  const oneYear = 365;
  const now = new Date();

  // 1970年の1月1日の0時0分0秒から現在まで何ミリ秒が経過したか
  const nowTime = now.getTime();
  const target = new Date(date);
  const targetTime = target.getTime();

  // ms -> 1日に置き換える
  const termDay = Math.ceil((nowTime - targetTime) / 86400000);

  // 365より(366から)多い場合は、1年以上経過している
  if (oneYear < termDay) return true;
  return false;
};

/**
 * 日付のフォーマットを変更する
 * @param {Date} date 日付
 * @returns {string} 'YYYY/MM/DD'
 */
export const dateFormat = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD');
};
