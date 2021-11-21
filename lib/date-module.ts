import dayjs from 'dayjs';

export const checkOneYearPassed = ({ date }: { date: string }) => {
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

export const changeDateFormat = ({ date }: { date: string }) => {
  return dayjs(date).format('YYYY/MM/DD');
};
