import type { Group } from '../models/types';

export const MOCK_DATA: Group[] = [
  {
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
  },
  {
    id: 'group2',
    name: 'Ужин в ресторане',
    members: [
      { id: 'member21', name: 'Петя' },
      { id: 'member22', name: 'Жанна' },
      { id: 'member23', name: 'Игорь' },
    ],
    expenses: [],
  },
];
