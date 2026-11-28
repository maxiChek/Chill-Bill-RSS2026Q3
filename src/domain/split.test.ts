import { describe, it, expect } from 'vitest';
import { buildEqualSplits } from './split';

describe('buildEqualSplits', () => {
  it('делит сумму поровну, если делится без остатка', () => {
    const result = buildEqualSplits(100, ['a', 'b', 'c', 'd']);
    expect(result).toEqual([
      { memberId: 'a', amount: 25 },
      { memberId: 'b', amount: 25 },
      { memberId: 'c', amount: 25 },
      { memberId: 'd', amount: 25 },
    ]);
  });

  it('распределяет остаток по одной копейке первым участникам', () => {
    // 100 на 3: по 33, остаток 1. Первый получает 34.
    const result = buildEqualSplits(100, ['a', 'b', 'c']);
    expect(result).toEqual([
      { memberId: 'a', amount: 34 },
      { memberId: 'b', amount: 33 },
      { memberId: 'c', amount: 33 },
    ]);
  });

  it('распределяет остаток, если он больше 1', () => {
    // 102 на 4: по 25, остаток 2. Первые двое получают по 26.
    const result = buildEqualSplits(102, ['a', 'b', 'c', 'd']);
    expect(result).toEqual([
      { memberId: 'a', amount: 26 },
      { memberId: 'b', amount: 26 },
      { memberId: 'c', amount: 25 },
      { memberId: 'd', amount: 25 },
    ]);
  });

  it('обрабатывает случай, когда сумма меньше количества участников', () => {
    // 2 копейки на 3 человека: базовая доля 0, остаток 2.
    const result = buildEqualSplits(2, ['a', 'b', 'c']);
    expect(result).toEqual([
      { memberId: 'a', amount: 1 },
      { memberId: 'b', amount: 1 },
      { memberId: 'c', amount: 0 },
    ]);
  });

  it('возвращает пустой массив, если нет участников', () => {
    expect(buildEqualSplits(100, [])).toEqual([]);
  });

  it('сумма всех долей всегда равна исходной сумме', () => {
    const total = 997; // Просто рандомное число
    const members = ['a', 'b', 'c', 'd', 'e'];
    const result = buildEqualSplits(total, members);

    const sum = result.reduce((acc, split) => acc + split.amount, 0);
    expect(sum).toBe(total);
  });
});
