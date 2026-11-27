import { calculateSettlement } from './settlement';
import { describe, it, expect } from 'vitest';

describe('calculateSettlement', () => {
  it('возвращает пустой массив, когда никто никому не должен', () => {
    const group = {
      id: 'group1',
      name: 'Поездка в Щучинщину',
      members: [
        { id: 'member11', name: 'Петя' },
        { id: 'member12', name: 'Вася' },
        { id: 'member13', name: 'Коля' },
      ],
      expenses: [
        {
          id: 'exp11',
          name: 'Аренда машины',
          date: '12.10.2026',
          paidById: 'member11',
          total: 9900,
          splits: [
            {
              memberId: 'member11',
              amount: 3300,
            },
            {
              memberId: 'member12',
              amount: 3300,
            },
            {
              memberId: 'member13',
              amount: 3300,
            },
          ],
        },
        {
          id: 'exp12',
          name: 'Ужин',
          date: '12.10.2026',
          paidById: 'member12',
          total: 9900,
          splits: [
            {
              memberId: 'member11',
              amount: 3300,
            },
            {
              memberId: 'member12',
              amount: 3300,
            },
            {
              memberId: 'member13',
              amount: 3300,
            },
          ],
        },
        {
          id: 'exp13',
          name: 'Бензин',
          date: '12.10.2026',
          paidById: 'member13',
          total: 9900,
          splits: [
            {
              memberId: 'member11',
              amount: 3300,
            },
            {
              memberId: 'member12',
              amount: 3300,
            },
            {
              memberId: 'member13',
              amount: 3300,
            },
          ],
        },
      ],
    };
    expect(calculateSettlement(group)).toEqual([]);
  });

  it('возвращает пустой массив когда в группе один участник', () => {
    const group = {
      id: 'group1',
      name: 'Поездка в Щучинщину',
      members: [{ id: 'member11', name: 'Петя' }],
      expenses: [
        {
          id: 'exp11',
          name: 'Аренда машины',
          date: '12.10.2026',
          paidById: 'member11',
          total: 9900,
          splits: [
            {
              memberId: 'member11',
              amount: 9900,
            },
          ],
        },
        {
          id: 'exp12',
          name: 'Аренда машины',
          date: '12.10.2026',
          paidById: 'member11',
          total: 9900,
          splits: [
            {
              memberId: 'member11',
              amount: 9900,
            },
          ],
        },
        {
          id: 'exp13',
          name: 'Аренда машины',
          date: '12.10.2026',
          paidById: 'member11',
          total: 9900,
          splits: [
            {
              memberId: 'member11',
              amount: 9900,
            },
          ],
        },
      ],
    };
    expect(calculateSettlement(group)).toEqual([]);
  });

  // TODO:
  // - тест на настоящих данных
});
