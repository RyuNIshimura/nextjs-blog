import { isOneYearPassed, dateFormat } from '../../lib/date';

describe('isOneYearPassed()', () => {
  it('1年以上経過していた場合、true を返す', () => {
    const date = new Date('2020-01-01T00:00:00.426Z');
    expect(isOneYearPassed(date)).toBe(true);
  });

  it('1年未満の経過の場合、false を返す', () => {
    const date = new Date();
    expect(isOneYearPassed(date)).toBe(false);
  });
});

describe('dateFormat()', () => {
  it('YYYY/MM/DD のフォーマットで日付を返す', () => {
    const date = new Date('2021-07-12T09:47:22.426Z');
    expect(dateFormat(date)).toBe('2021/07/12');
  });
});
