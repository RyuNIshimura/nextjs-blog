import { checkOneYearPassed, changeDateFormat } from '../../lib/date';

describe('changeDateFormat()', () => {
  it('YYYY/MM/DD のフォーマットで日付を返す', () => {
    expect(changeDateFormat('2021-07-12T09:47:22.426Z')).toBe('2021/07/12');
  });

  it("date が無い場合、''を返す", () => {
    expect(changeDateFormat('')).toBe('');
  });
});
