import type { Group, Transfer } from '../models/types';
export function calculateSettlement(group: Group): Transfer[] {
  // TODO: Это временная заглушка! Должна быть заменена на настойщий алгоритм распределения
  const [first, second, third] = group.members;
  if (!first || !second || !third) return [];

  return [
    { fromMemberId: first.id, toMemberId: second.id, amount: 1000 },
    { fromMemberId: second.id, toMemberId: third.id, amount: 500 },
  ];
}
