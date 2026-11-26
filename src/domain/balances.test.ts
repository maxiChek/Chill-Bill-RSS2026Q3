import { calculateBalances } from './balances';
import { describe, it, expect } from 'vitest';

describe('calculateBalances', () => {
  it('сумма балансов должна быть равна 0', () => {
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
          comment: 'Машина хорошая',
        },
        {
          id: 'exp12',
          name: 'Обед',
          date: '12.10.2026',
          paidById: 'member12',
          total: 10000,
          splits: [
            {
              memberId: 'member11',
              amount: 3000,
            },
            {
              memberId: 'member12',
              amount: 3000,
            },
            {
              memberId: 'member13',
              amount: 4000,
            },
          ],
          comment: 'Бензин дорогой',
        },
      ],
    };
    const balances = calculateBalances(group);
    const sum = [...balances].reduce((acc, [, balance]) => acc + balance, 0);
    expect(sum).toBe(0);
  });

  it('у всех участников баланс 0, если нет операций', () => {
    const group = {
      id: 'group1',
      name: 'Поездка в Щучинщину',
      members: [
        { id: 'member11', name: 'Петя' },
        { id: 'member12', name: 'Вася' },
        { id: 'member13', name: 'Коля' },
      ],
      expenses: [],
    };
    const balances = calculateBalances(group);
    expect([...balances].every(([, b]) => b === 0)).toBe(true);
  });

  // TODO:
  // - участник без участия (нигде не платил, ни в чём не участвовал)
});
